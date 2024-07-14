import { Request, Response } from 'express'
import User from '../../models/User'
import Live from '../../models/Live'

const joinLiveService = async (req: Request, res: Response, redisClient: any) => {
    const { liveId, email } = req.body
    if(!liveId || !email) return res.status(400).json({error: 'All fields are required'})

    try {
        const user = await getUserDataByEmail(email)
        if(!user) return res.status(400).json({error: 'User not found'})
        const live = await getLiveDataById(liveId, redisClient)
        if(!live) return res.status(400).json({error: 'Live not found'})

        const alreadyAttend = checkAlreadyAttend(user, liveId)
        if(alreadyAttend) return res.status(400).json({error: 'Already attend'})
        
        user.attendLives.push({
            liveId,
            name: live.name,
            location: live.location,
            createdAt: new Date()
        })
        await user.save()
        redisClient.set(email, JSON.stringify(user))

        return res.status(200).json({ name: user.name, email, isAdministrator: user.isAdministrator, attendLives: user.attendLives })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

export default joinLiveService

const getUserDataByEmail = async (email: string) => {
    const user = await User.findOne({ email }).exec()
    return user ?? null
}

const getLiveDataById = async (liveId: string, redisClient: any) => {
    const cachedLive = await redisClient.get(liveId)
    if(cachedLive) {
        console.log('joinLive:hit by cache')
        return JSON.parse(cachedLive)
    }
    const live = await Live.findOne({ _id: liveId }).exec()
    return live ?? null
}

const checkAlreadyAttend = (user: any, liveId: string) => {
    let alreadyAttend = false

    user.attendLives.forEach((l: {liveId: string}) => {
        if(String(l.liveId) === liveId) {
            alreadyAttend = true
        }
    })

    return alreadyAttend
}