import { Request, Response } from 'express'
import Band from '../../models/Band'

//バンド情報をページネーションで取得する
const showBandService = async (req: Request, res: Response) => {
    try{
        const { page } = req.body
        const band = await Band.find().skip((page - 1) * 10).limit(10)
        return res.status(200).json(band)
    } catch (err) {
        return res.status(500).json({ error: 'Server error' })
    }
}

export default showBandService
