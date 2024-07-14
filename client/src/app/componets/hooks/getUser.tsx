const getUser = () => {
    const localStorageValue: string | null = localStorage.getItem('data')
    if (!localStorageValue) return
    const user = JSON.parse(base64ToUtf8(localStorage.getItem('data') as string))
    return user
}

export default getUser

const base64ToUtf8 = (str: string) => {
    return decodeURIComponent(escape(atob(str)));
}