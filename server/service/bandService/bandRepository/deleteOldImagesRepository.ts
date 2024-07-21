import ConnectStorageService from "../../connectStorageService/ConnectStorageService"

const deleteOldImagesRepository = async (deletedImages: string, imageDatas: {url: string, hash: string}[]) => {

    const { deleteFile } = ConnectStorageService()
    let newImageDatas:{url: string, hash: string}[] = imageDatas

    const parsedDeletedImages = JSON.parse(deletedImages)
    if(!Array.isArray(parsedDeletedImages)) return []
    if(parsedDeletedImages.length > 0){
        await Promise.all(parsedDeletedImages.map(async (image: {url: string, hash: string}) => {
            await deleteFile(image.url)
        }))
        newImageDatas = newImageDatas.filter((img: { url: string, hash: string }) => !parsedDeletedImages.map((img: { url: string, hash: string }) => img.hash).includes(img.hash))
    }
    return newImageDatas
}

export default deleteOldImagesRepository