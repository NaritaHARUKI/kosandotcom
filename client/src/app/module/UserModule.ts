import api from "../componets/hooks/api"

const UserModules = {
    
    login: async (email: string, password: string) => {
        const response = await api('login', 'POST',{ email, password })
        return response as Response
    },

    registerUser: async (name: string, email: string, password: string) => {
        const response = await api('users', 'POST',{ name, email, password })
        return response as Response
    },

    getAllUsers: async () => {
        const response = await api('users', 'GET', {})
        return response as Response
    },

    getUser: async (email: string) => {
        const response = await api('getUser', 'GET', {email})
        return response as Response
    },
}

export default UserModules