import User from '../../models/User'
import { Request, Response } from 'express'


const getAllUserService = async (req: Request, res: Response): Promise<Response> => {
    try {
    // if (!req.session.userId) {
    //   return res.status(401).json({ error: 'Unauthorized: sessionがないよ！', session: req.session })
    // }
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getAllUserService