import User from '../../models/User'
import { Request, Response } from 'express'

const loginService = async (req: Request, res: Response, redisClient: any) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ error: 'All fields are required' })
    
        // Redisからユーザー情報を取得
        let cachedUser = await getByRedis(email, redisClient)
        if (cachedUser) {
          console.log('login:hit by cache')
          if (cachedUser?.password === password) {
            req.session.userId = cachedUser?.id
            return res.status(200).json({ name: cachedUser?.name, email, isAdministrator: cachedUser?.isAdministrator, attendLives: cachedUser?.attendLives })
          }
          return res.status(401).json({ error: 'Invalid credentials' })
        }
    
        // RedisになかったらMongoDBからユーザー情報を取得
        const user = await getByMongo(email, password)
        if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    
        // Redisにユーザー情報をキャッシュ
        await cacheToRedis(req, email, user, password, redisClient)

        res.status(200).json({ name: user.name, email, isAdministrator: user.isAdministrator, attendLives: user.attendLives })
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
      }

}

export default loginService

const getByRedis = async (email: string, redisClient: any) => {
    const cachedUser = await redisClient.get(email)
    console.log('cachedUser:', cachedUser)
    return cachedUser ? JSON.parse(cachedUser) : null
}

const getByMongo = async (email: string, password: string) => {
    const user = await User.findOne({ email, password }).exec()
    return user
}

const cacheToRedis = async (req :Request,email: string, user: any, password: string ,redisClient: any) => {
    const cacheData: string =  JSON.stringify({ id: user.id, email ,name: user.name, password })
    await redisClient.set(email, cacheData)
    req.session.userId = user.id
    return true
}