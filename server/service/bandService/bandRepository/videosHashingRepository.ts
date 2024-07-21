import fs from 'fs'
import ConnectStorageService from '../../connectStorageService/ConnectStorageService'


const videosHashingRepository = async (band: any, videos: any)=>{

    const { uploadFile, hashFile } = ConnectStorageService()

    if (!videos || !band.videos ) return []
    const oldImageHashes = band.videos.map((video: { url: string, hash: string }) => video.hash)
        const newVideoDatas = await Promise.all(videos.map(async (video: any) => {
            const hash = await hashFile(video.path)
            if(oldImageHashes.includes(hash)){
              fs.unlinkSync(video.path) 
              return null
            }
            const url = await uploadFile(video.path)
            fs.unlinkSync(video.path) 
            return { hash, url }
        }))
    const filteredNewVideoDatas: { url: string; hash: string }[] = newVideoDatas.filter((data): data is { url: string; hash: string } => data !== null)

    return filteredNewVideoDatas
}

export default videosHashingRepository