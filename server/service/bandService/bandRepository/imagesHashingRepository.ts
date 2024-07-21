import fs from 'fs'
import ConnectStorageService from '../../connectStorageService/ConnectStorageService'


const imagesHashingRepository = async (band: any, images: any)=>{

    const { uploadFile, hashFile } = ConnectStorageService()

    if (!images || !band.images) return []
    const oldImageHashes = band.images.map((img: { url: string, hash: string }) => img.hash)
        const newImageDatas = await Promise.all(images.map(async (image: any) => {
            const hash = await hashFile(image.path)
            if(oldImageHashes.includes(hash)){
              fs.unlinkSync(image.path) 
              return null
            }
            const url = await uploadFile(image.path)
            fs.unlinkSync(image.path) 
            return { hash, url }
        }))
    const filteredNewImageDatas: { url: string; hash: string }[] = newImageDatas.filter((data): data is { url: string; hash: string } => data !== null)

    return filteredNewImageDatas
}

export default imagesHashingRepository