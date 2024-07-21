import { Request, Response } from 'express'
import Band from '../../models/Band'

const getBandByEmailService = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        console.log(email)
        const band = await getBandDataByEmail(email)
        if (!band) return res.status(404).json({ error: 'Band not found' })        
        res.status(200).json(band)
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
      }
}

export default getBandByEmailService

const getBandDataByEmail = async (email: string) => {
    const band = await Band.findOne({ administrator: email }).exec()
    return band ?? null
}