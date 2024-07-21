import BandModule from "@/app/module/BandModule"
import { cp } from "fs"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const useShowBandDetail = () => {
    const { id } = useParams()
    const showBandDetail = async (id: string) => await BandModule.showBandDetail(id) 
    const [band, setBand] = useState<any>(null)

    useEffect(()=>{
        if (!id) return
        const fetchData = async () => {
            const response = await showBandDetail(id as string)
            const responseData = await response.json()
            setBand(responseData.band)
        }
        fetchData()
    },[id])

    return { band }
}

export default useShowBandDetail