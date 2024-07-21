import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const ConnectStorageService = () => {
    const wasabiEndpoint = "https://s3.ap-northeast-1.wasabisys.com"
    const s3Client = new S3Client({
        endpoint: wasabiEndpoint,
        region: 'ap-northeast-1',
        credentials: {
        accessKeyId: process.env.STORAGE_ACCESS_KEY!,
        secretAccessKey: process.env.STORAGE_SECRET_KEY!,
        },
    })

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

// ファイルのハッシュを取得する関数
const hashFile = async (filePath: string) => {
    const fileContent = fs.readFileSync(filePath)
    const hash = crypto.createHash('sha256')
    hash.update(fileContent)
    return hash.digest('hex')
  }

    return { uploadFile, deleteFile, hashFile }
}

export default ConnectStorageService
