import User from "../../models/User"
import { Request, Response } from 'express'

const createUserService  = async (req: Request, res: Response, redisClient: any): Promise<Response> => {
    const userData = req.body
    const { name, email, password } = userData

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }

    try {
        const newUser = new User({
            name,
            email,
            password,
            isAdministrator: false,
          })
          await newUser.save()
      
          if (newUser) {
            await setUserInRedis(email, newUser, redisClient)
          }
          return res.status(201).json(newUser)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Server error' })
    }
}

export default createUserService


const setUserInRedis = async (email: string, user: any, redisClient: any) => {
    try {
        await redisClient.set(email, JSON.stringify(user));
    } catch (error) {
        console.error('Error setting data in Redis:', error);
    }
}