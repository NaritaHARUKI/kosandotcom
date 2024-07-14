import User from '../../models/User'
import { Request, Response } from 'express'

const getUserService = async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string
        const user = await User.findById(id)
        res.status(200).json(user)
      } catch (err) {
        res.status(500).json({ error: 'Server error' })
      }
}

export default getUserService