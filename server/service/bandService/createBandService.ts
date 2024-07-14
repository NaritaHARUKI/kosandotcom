import { Request, Response } from 'express'
import Band from '../../models/Band'
import User from '../../models/User'
import fs from 'fs'
import path from 'path'
import { ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import crypto from 'crypto'

const createBandService = async (req: Request, res: Response) =>{
    try {
        const { name, location, links, description, administrator } = req.body
        // imagesとvideosを配列に変換
        const images = Object.keys(req.files || {})
          .filter(key => key.startsWith('images'))
          .map(key => (req.files as { [fieldname: string]: Express.Multer.File[] })[key][0])
        const videos = Object.keys(req.files || {})
          .filter(key => key.startsWith('videos'))
          .map(key => (req.files as { [fieldname: string]: Express.Multer.File[] })[key][0])
    
        if (!name || !location) return res.status(400).json({ error: 'All fields are required' })
        let imageDatas: {url: string, hash: string}[] = []
        let movieDatas: {url: string, hash: string}[] = []
    
        if (images) {
          imageDatas = await Promise.all(images.map(async (image) => {
            const hash = await hashFile(image.path)
            const url = await uploadFile(image.path)
            fs.unlinkSync(image.path)
            return { url, hash }
          }))
        }
    
        if (videos) {
          movieDatas = await Promise.all(videos.map(async (video) => {
            const hash = await hashFile(video.path)
            const url = await uploadFile(video.path)
            fs.unlinkSync(video.path)
            return { url, hash }
          }))
        }
    
        const newBand = new Band({
          name,
          location,
          administrator: [administrator],
          links: JSON.parse(links),
          description,
          images: imageDatas,
          movies: movieDatas,
        })
        await newBand.save()
    
        const updateUser = await User.findOne({ email: administrator }).exec()
        if (updateUser) {
          updateUser.isAdministrator = true
          await updateUser.save()
        }
    
        res.status(201).json({ name: updateUser?.name, email: updateUser?.email, isAdministrator: updateUser?.isAdministrator })
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
      }
}

export { createBandService, uploadFields, upload }

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