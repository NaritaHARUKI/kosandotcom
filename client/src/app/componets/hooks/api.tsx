const api = async (url: string, method: string,payload: any)=>{
    const host = 'http://localhost:8080'

    if(payload instanceof FormData){
        try {
            const response = await fetch(`${host}/api/${url}`, {
                method: method.toUpperCase(),
                body: payload
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(JSON.stringify(errorData))
            }

            return response
        } catch (error) {
            throw new Error(`Network error: ${error}`)
        }
    }
    
    try {
       const response = await fetch(`${host}/api/${url}`, {
              method: method.toUpperCase(),
              body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(JSON.stringify(errorData))
        }

        return response
    } catch (error) {
        throw new Error(`Network error: ${error}`)
    }
}

export default api
