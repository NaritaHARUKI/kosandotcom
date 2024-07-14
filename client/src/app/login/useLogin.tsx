
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import UserModules from "../module/UserModule"

const useLogin = () => {
    const { control, handleSubmit } = useForm()
    const router = useRouter()
    const searchParams = useSearchParams()
    const liveId = searchParams.get('liveId') || null
    const login = async (email: string, password: string) => await UserModules.login(email, password) as Response

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            const response = await login(data.email, data.password)
            const responseData = await response.json()
            localStorage.setItem('data', utf8ToBase64(JSON.stringify(responseData)))
            liveId ? router.push(`/?liveId=${liveId}`) : router.push('/')
        } catch (error) {
            console.error('Login failed', error)
        }
    }

    const utf8ToBase64 = (str: string) => {
        return btoa(unescape(encodeURIComponent(str)))
    }

    return { 
        handleSubmit,
        onSubmit,
        control
    }
}

export default useLogin