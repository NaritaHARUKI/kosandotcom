import { Request, Response } from 'express'
import Band from '../../models/Band'

//バンド情報をidで取得する
const getBandService = async (req: Request, res: Response, redisClient: any) => {
    try {
        const id = req.body.id
        console.log(id)
        // Redisからバンド情報を取得
        const cachedBand = await getByRedis(id, redisClient)
        if (cachedBand) {
            console.log('getBand:hit by cache')
            return res.status(200).json({ band: cachedBand })
        }
        // RedisになかったらMongoDBからバンド情報を取得
        const band = await getByMongo(id, redisClient)
        res.status(200).json({ band })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
}

export default getBandService

const getByRedis = async (id: string, redisClient: any) => {
    const cachedUser = await redisClient.get(id)
    return cachedUser ? JSON.parse(cachedUser) : null
}

const getByMongo = async (id: string, redisClient: any) => {
    const band = await Band.findById(id)
    await redisClient.set(id, JSON.stringify(band))
    return band
}