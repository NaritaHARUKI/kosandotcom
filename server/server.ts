import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

//DBService
import connetDBService from './service/connectDBService.ts/connetDBService'
//userServices
import getAllUserService from './service/userServices/getAllUserService'
import createUserService from './service/userServices/createUserService'
import getUserService from './service/userServices/getUserService'
import loginService from './service/userServices/loginService'
//bandServices
import { createBandService, uploadFields, upload } from './service/bandService/createBandService'
import getBandByEmailService from './service/bandService/getBandByEmailService'
import getBandService from './service/bandService/getBandService'
import { connectSessionService, redisClient } from './service/connectSessionService/ConnectSessionService'
import editBandService from './service/bandService/editBandService'
import showBandService from './service/bandService/showBandService'
//QRService
import createQRCodeService from './service/qrService/createQRCodeService'
import joinLiveService from './service/qrService/joinLiveService'

import Band from './models/Band'
import User from './models/User'
import Live from './models/Live'


const app = express()
const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json())

connectSessionService(app)
connetDBService()

/*
* ユーザーの操作
*/
// ユーザー一覧を取得する
app.get('/api/allUsers', async (req, res) => {
  const response = await getAllUserService(req, res)
  return response
})

// ユーザーを作成する
app.post('/api/users', async (req: Request, res: Response) => {
  const response = await createUserService(req, res, redisClient)
  return response
})

// ユーザー情報を取得する
app.get('/api/getUser', async (req: Request, res: Response) => {
  const response = await getUserService(req, res)
  return response
})

// ログイン
app.post('/api/login', async (req: Request, res: Response) => {
  const response = await loginService(req, res, redisClient)
  return response
})

/*
  バンドの操作
*/
// バンドを作成する
app.post('/api/createBand', upload.fields(uploadFields), async (req: Request, res: Response) => {
  const response = await createBandService(req, res)
  return response
})

// バンド情報を取得する
app.post('/api/getBand', async (req: Request, res: Response) => {
  const response = await getBandByEmailService(req, res)
  return response
})

// バンド情報をidで取得する
app.post('/api/getBandById', async (req: Request, res: Response) => {
  const response = await getBandService(req, res, redisClient)
  return response
})

//バンド情報をページネーションで取得する
app.post('/api/showBand', async (req: Request, res: Response) => {
  const response = await showBandService(req, res)
  return response
})

//バンド情報を編集する
app.put('/api/editBand', upload.fields(uploadFields),async (req: Request, res: Response) => {
  const response = await editBandService(req, res)
  return response
})

//QRコードを作成する
app.post('/api/createQR', async (req: Request, res: Response) => {
  const response = await createQRCodeService(req, res, redisClient)
  return response
})

//QRコードからライブに参加したことを記録する
app.post('/api/joinLive', async (req: Request, res: Response) => {
  const response = await joinLiveService(req, res, redisClient)
  return response
})

// 全てのキャッシュを取得する
interface RedisValue {
  key: string;
  value: any;
}

app.get('/api/getAllCache', async (req: Request, res: Response) => {
  try {
    const keys = await redisClient.keys('*');
    if (!keys || keys.length === 0) {
      return res.status(404).json({ error: 'No keys found' });
    }

    const values: RedisValue[] = await Promise.all(
      keys.map(async (key): Promise<RedisValue> => {
        const value = await redisClient.get(key);
        return { key, value: value ? JSON.parse(value) : null }; // キーとその値を返す
      })
    );

    res.status(200).json(values);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})

// 全てのキャッシュを削除する
app.delete('/api/deleteAllCache', async (req: Request, res: Response) => {
  redisClient.flushall((err, reply) => {
    if (err) return res.status(500).json({ error: 'Server error' })
    res.status(200).json(reply)
  })
})

//全てのバンドを取得する
app.get('/api/getAllBands', async (req: Request, res: Response) => {
  try{
    const bands = await Band.find({})
    res.status(200).json(bands)
  }catch(error){
    res.status(500).json({error: 'Server error'})
  }
})

//全てのバンドを削除する
app.delete('/api/deleteAllBands', async (req: Request, res: Response) => {
  try{
    await Band.deleteMany({})
    res.status(200).json({message: 'All bands deleted'})
  }catch(error){
    res.status(500).json({error: 'Server error'})
  }
})

//全てのユーザーを取得する
app.get('/api/getAllUsers', async (req: Request, res: Response) => {
  try{
    const users = await User.find({})
    res.status(200).json(users)
  }catch(error){
    res.status(500).json({error: 'Server error'})
  }
})

//全てのユーザーを削除する
app.delete('/api/deleteAllUsers', async (req: Request, res: Response) => {
  try{
    await User.deleteMany({})
    res.status(200).json({message: 'All users deleted'})
  }catch(error){
    res.status(500).json({error: 'Server error'})
  }
})

//全てのライブを取得する
app.get('/api/getAllLives', async (req: Request, res: Response) => {
  try{
    const lives = await Live.find({})
    res.status(200).json(lives)
  }catch(error){
    res.status(500).json({error: 'Server error'})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})