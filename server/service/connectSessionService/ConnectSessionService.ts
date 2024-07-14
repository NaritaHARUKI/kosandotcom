import session from 'express-session'
import Redis from 'ioredis'
// import { createClient } from 'redis'
import connectRedis from 'connect-redis'

const RedisStore = connectRedis(session)
const redisClient = new Redis()

const connectSessionService = (app: any) =>{
    redisClient.on('error', (err) => console.error('Redis Client Error', err))

    app.use(session({
        store: new RedisStore({ client: redisClient, ttl: 3600 }), // TTLを1時間に設定
        secret: process.env.SESSION_SECRET!, // 環境変数から秘密キーを取得
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 3600000 }, // cookieの有効期限を1時間に設定
    }))
}

export { connectSessionService, redisClient }