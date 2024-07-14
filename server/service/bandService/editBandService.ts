import { Request, Response } from 'express'
import Band from '../../models/Band'
import fs from 'fs'
import multer from 'multer'
import { ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import path from 'path'

const editBandService =  async (req: Request, res: Response) =>{
    try {
        const { id, name, location, links, description } = req.body
        const images = Object.keys(req.files || {})
          .filter(key => key.startsWith('images'))
          .map(key => (req.files as { [fieldname: string]: Express.Multer.File[] })[key][0])
        const videos = Object.keys(req.files || {})
          .filter(key => key.startsWith('videos'))
          .map(key => (req.files as { [fieldname: string]: Express.Multer.File[] })[key][0])
    
        if (!name || !location) return res.status(400).json({ error: 'All fields are required' })
    
        const band = await Band.findById(id)
        if (!band) return res.status(404).json({ error: 'Band not found' })

        //ファイルをハッシュ化して、新しい画像か動画かを判定
        const imageHashs = await Promise.all(images.map(async (image) => {
            const hash = await hashFile(image.path)
            return hash
        }))
    
        // 新しい画像と動画のURLを格納する配列
        let newImageUrls: string[] = []
        let newMovieUrls: string[] = []

        const oldImageDatas = band.images

        // 古い画像と新しい画像を比較
        const newImages = oldImageDatas.filter((data:{url: string, hash: string}) => {
          if(imageHashs.includes(data.hash)){
            console.log('sended file is already exist!!', data.hash, imageHashs)
          }
          !imageHashs.includes(data.hash)
        })
        return res.status(200).json({ newImages })
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
      }
}

export default editBandService

// Wasabiのエンドポイントを設定
const wasabiEndpoint = "https://s3.ap-northeast-1.wasabisys.com"
const s3Client = new S3Client({
  endpoint: wasabiEndpoint,
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY!,
    secretAccessKey: process.env.STORAGE_SECRET_KEY!,
  },
})

// multerの設定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  const upload = multer({ storage: storage })
  const uploadFields: multer.Field[] = []
  for (let i = 0; i < 10; i++) {
    uploadFields.push({ name: `images[${i}]`, maxCount: 1 })
  }
  for (let i = 0; i < 3; i++) {
    uploadFields.push({ name: `videos[${i}]`, maxCount: 1 })
  }

// ファイルをアップロードする関数
const uploadFile = async (filePath: string) => {
    const fileContent = fs.readFileSync(filePath)
    const fileName = path.basename(filePath)
  
    const uploadParams = {
      Bucket: "band-test",
      Key: fileName,
      Body: fileContent,
      ACL: 'public-read' as ObjectCannedACL,
    }
  
    try {
      const command = new PutObjectCommand(uploadParams)
      await s3Client.send(command)
      const url = `${wasabiEndpoint}/band-test/${fileName}`
      return url
    } catch (err) {
      console.error('Error uploading file:', err)
      throw err
    }
}

//ファイルをハッシュ化する関数
const hashFile = async (filePath: string) => {
  const fileContent = fs.readFileSync(filePath)
  const hash = crypto.createHash('sha256')
  hash.update(fileContent)
  return hash.digest('hex')
}

// ファイルを削除する関数
const deleteFile = async (url: string) => {
    const fileName = url.split('/').pop()
    if (!fileName) return
  
    const deleteParams = {
      Bucket: "band-test",
      Key: fileName,
    }
  
    try {
      const command = new PutObjectCommand(deleteParams)
      await s3Client.send(command)
      return true
    } catch (err) {
      console.error('Error deleting file:', err)
      throw err
    }
}