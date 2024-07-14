import { Request, Response } from 'express'
import qrcode from 'qrcode'
import Band from '../../models/Band'
import Live from '../../models/Live'

const createQRCodeService = async (req: Request, res: Response, redisClient: any)=> {
    const { name, location, email } = req.body
    if(!name || !location || !email) return res.status(400).json({error: 'All fields are required'})

    const band = await getBandDataByEmail(email)
    if(!band) return res.status(400).json({error: 'Band not found'})

    const { ok, liveId ,error } = await saveForLiveTable(name, location, band, redisClient)
    if(!ok) return res.status(500).json({error})

    const qrCode = await retunQrCodeData(liveId)
    return res.status(200).json({qrCode})
}

export default createQRCodeService

const saveForLiveTable = async (name: string, location: string, band: {_id: string }, redisClient: any) => {
    try {
        const validDate = new Date()
        validDate.setHours(23, 59, 59, 999)

        const newLive = new Live({
            name,
            location,
            bandID: band._id,
            valid_date: validDate
        })
        await newLive.save()
        // Redisにライブ情報をキャッシュ
        const now = new Date();
        const ttl = validDate.getTime() - now.getTime()
        redisClient.set(newLive._id.toString(), JSON.stringify(newLive), 'PX', ttl)
        return { ok: true ,liveId: newLive._id }
    } catch (error) {
        return { ok: false, error }
    }
}

const retunQrCodeData = async (liveId: string) => {
    const qrCodeData = `http://localhost:3000/?liveId=${liveId}`
    const qrCode = await qrcode.toDataURL(qrCodeData)
    return qrCode
}

const getBandDataByEmail = async (email: string) => {
    const band = await Band.findOne({ administrator: email }).exec()
    return band ?? null
}