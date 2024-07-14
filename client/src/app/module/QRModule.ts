import api from "../componets/hooks/api"

const QRMoudle = {

    createQR: async (name: string, location: string, email: string) => {
        const response = await api('createQR', 'POST', { name, location, email })
        return response as Response
    },

    joinLive: async (liveId: string, email: string) => {
        const response = await api('joinLive', 'POST', { liveId, email })
        return response as Response
    }

}

export default QRMoudle