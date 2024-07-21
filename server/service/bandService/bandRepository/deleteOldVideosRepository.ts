import ConnectStorageService from "../../connectStorageService/ConnectStorageService"

const deleteOldVideosRepository = async (deletedImages: string, videoDatas: {url: string, hash: string}[]) => {

    const { deleteFile } = ConnectStorageService()
    let newVideoDatas :{url: string, hash: string}[] = videoDatas

    const parsedDeletedVideos = JSON.parse(deletedImages)
    if(!Array.isArray(parsedDeletedVideos)) return []
    if(parsedDeletedVideos.length > 0){
        await Promise.all(parsedDeletedVideos.map(async (image: {url: string, hash: string}) => {
            await deleteFile(image.url)
        }))
        newVideoDatas = newVideoDatas.filter((video: { url: string, hash: string }) => !parsedDeletedVideos.map((video: { url: string, hash: string }) => video.hash).includes(video.hash))
    }
    return newVideoDatas
}

export default deleteOldVideosRepository