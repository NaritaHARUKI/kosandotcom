import { Request, Response } from 'express'
import Band from '../../models/Band'
// repositorys
import imagesHashingRepository from './bandRepository/imagesHashingRepository'
import deleteOldImagesRepository from './bandRepository/deleteOldImagesRepository'
import videosHashingRepository from './bandRepository/videosHashingRepository'
import deleteOldVideosRepository from './bandRepository/deleteOldVideosRepository'

const editBandService =  async (req: Request, res: Response) =>{
    try {
        const { id, name, location, links, description, deletedImages, deletedVideos } = req.body
        if (!name || !location) return res.status(400).json({ error: 'All fields are required' })
  
        const images = Object.keys(req.files || {}).filter(key => key.startsWith('images')).map(key => (req.files as { [fieldname: string]: Express.Multer.File[] })[key][0])
        const videos = Object.keys(req.files || {}).filter(key => key.startsWith('videos')).map(key => (req.files as { [fieldname: string]: Express.Multer.File[] })[key][0])
    
        const band = await Band.findById(id)
        if (!band) return res.status(404).json({ error: 'Band not found' })
        let imageDatas: {url: string, hash: string}[] = band.images ?? []
        let videoDatas: {url: string, hash: string}[] = band.videos ?? []

        //送られてきたファイルをハッシュ化
        const newImageDatas = await imagesHashingRepository(band, images)
        const newVideoDatas = await videosHashingRepository(band, videos)
        imageDatas = [...imageDatas, ...newImageDatas]
        videoDatas = [...videoDatas, ...newVideoDatas]

        //古いファイルを削除
        imageDatas = await deleteOldImagesRepository(deletedImages, imageDatas)
        videoDatas = await deleteOldVideosRepository(deletedVideos, videoDatas)

        //バンド情報を更新
        const newBand = await Band.findByIdAndUpdate(
          id,
          {
            name,
            location,
            links: [...JSON.parse(links)],
            description,
            images: imageDatas,
            videos: videoDatas
          },
          { new: true }
        )

        return res.status(200).json({ band: newBand })
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
      }
}

export default editBandService

