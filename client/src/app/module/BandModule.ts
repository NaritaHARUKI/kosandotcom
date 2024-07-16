import api from "../componets/hooks/api"

const BandModule = {
    
    createBand: async (foromData: any) => {
        const response = await api('createBand', 'POST', foromData)
        return response as Response
    },

    getBand: async (email: string) => {
        const response = await api('getBand', 'POST', { email })
        return response as Response
    },

    editBand: async (foromData: any) => {
        const response = await api('editBand', 'PUT', foromData)
        return response as Response
    },

    showBand: async (page: number) => {
        const response = await api('showBand', 'POST', { page })
        return response as Response
    }

}

export default BandModule