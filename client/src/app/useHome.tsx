import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import QRMoudle from './module/QRModule'
import getUser from './componets/hooks/getUser'

const useHomePage = () => {
    const [userData, setUserData] = useState<{name: string, email: string, isAdministrator?: boolean, attendLives: {_id: string, liveId: string,name: string, location: string, createdAt: string}[]}>()
    const [isJoining, setIsJoining] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const liveId = searchParams.get('liveId')
    const router = useRouter()

    const joinLive =  async (liveId: string, email: string) => {
        try {
          const response = await QRMoudle.joinLive(liveId, email)
          const responseData = await response.json()
          localStorage.setItem('data', utf8ToBase64(JSON.stringify(responseData)))
          setUserData(responseData)
        } catch (error) {
          console.error('Join live failed', error)
        } finally {
          setIsJoining(false)
          router.push('/')
        }
    }
  
    const utf8ToBase64 = (str: string) => {
      return btoa(unescape(encodeURIComponent(str)))
    }
    
    useEffect(() => {
      const user = getUser()
      setUserData(user)
  
      if(liveId && !user) router.push(`/login?liveId=${liveId}`)
      if(liveId && user && !isJoining) {
        setIsJoining(true)
        joinLive(liveId, user.email)
      }
    }, [])

    return { userData }
}

export default useHomePage