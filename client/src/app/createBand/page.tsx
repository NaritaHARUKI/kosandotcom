'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from 'antd'
import styled from 'styled-components'
import InputController from '../componets/InputController'
import SelectBoxController from '../componets/SelectBoxController'
import TextareaController from '../componets/TextareaController'
import { useRouter } from 'next/navigation'
import getUser from '../componets/hooks/getUser'
import BandModule from '../module/BandModule'


const CreateBandPage = () => {
  const { control, handleSubmit } = useForm()
  const router = useRouter()
  const [images, setImages] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [links, setLinks] = useState<{ name: string; url: string }[]>([{ name: '', url: '' }])
  const userData = getUser()

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setImages(prevFiles => {
        const newFiles = [...prevFiles, ...selectedFiles]
        if (newFiles.length > 10) {
          alert('画像の数が多すぎます。最大10個までアップロードできます。')
          return prevFiles
        }
        return newFiles
      })
    }
  }

  const handleVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setVideos(prevFiles => {
        const newFiles = [...prevFiles, ...selectedFiles]
        if (newFiles.length > 3) {
          alert('動画の数が多すぎます。最大3個までアップロードできます。')
          return prevFiles
        }
        return newFiles
      })
    }
  }

  const handleLinkChange = (index: number, field: 'name' | 'url', value: string) => {
    const newLinks = [...links]
    newLinks[index][field] = value
    setLinks(newLinks)
  }

  const addLinkForm = () => {
    setLinks([...links, { name: '', url: '' }])
  }

    const removeLinkForm = () => {
        if (links.length > 1) {
        setLinks(links.slice(0, links.length - 1))
        }
    }

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append('administrator', userData.email)
    formData.append('name', data.name)
    formData.append('location', data.location)
    formData.append('description', data.description)
    formData.append('links', JSON.stringify(links))
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image)
    })
    videos.forEach((video, index) => {
      formData.append(`videos[${index}]`, video)
    })



    try {
      const response = await BandModule.createBand(formData)
        localStorage.removeItem('data')
        const responseData = await response.json()
        localStorage.setItem('data', utf8ToBase64(JSON.stringify(responseData)))
        router.push('/')
      } catch (error) {
        console.error(error)
        alert('バンドの登録に失敗しました')
      }
    
    // try{
    //     const response = await fetch('http://localhost:8080/api/createBand', {
    //         method: 'POST',
    //         body: formData
    //     })
    //     if (response.ok) {
    //         localStorage.removeItem('data')
    //         const responseData = await response.json()
    //         localStorage.setItem('data', utf8ToBase64(JSON.stringify(responseData)))
    //         console.log(responseData)
    //         // router.push('/')
    //     } else {
    //         alert('バンドの登録に失敗しました')
    //     }
    // } catch (error) {
    //     console.error(error)
    //     alert('バンドの登録に失敗しました')
    // }
  }

  const utf8ToBase64 = (str: string) => {
    return btoa(unescape(encodeURIComponent(str)))
}

  return (
    <div>
      <h1>Register Band</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputController name="name" label="バンド名" placeholder="バンド名" control={control} rules={{ required: 'バンド名は必須です' }}/>
        <SelectBoxController name="location" label="活動場所" placeholder="活動場所を選択してください" control={control} rules={{ required: '活動場所は必須です' }} options={options}/>
        <TextareaController name="description" label="説明" placeholder="説明" control={control} rules={{ required: 'ジャンルは必須です' }}/>

        <div>
          リンク
          {links.map((link, index) => (
            <StyledLinkForm key={index}>
              <Input
                placeholder="リンク先 例）Youtube"
                value={link.name}
                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
              />
              <Input
                placeholder="https://youtube.com"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              />
            </StyledLinkForm>
          ))}
          <Button onClick={addLinkForm}>リンクを追加</Button>
          <Button onClick={removeLinkForm}>リンクを削除</Button>
        </div>

        <label>画像 (最大10個)</label>
        <Input type="file" multiple accept="image/*" onChange={handleImagesChange} />
        <ul>
          {images.map((image, index) => (
            <li key={index}>{image.name}</li>
          ))}
        </ul>

        <label>動画 (最大3個)</label>
        <Input type="file" multiple accept="video/*" onChange={handleVideosChange} />
        <ul>
          {videos.map((video, index) => (
            <li key={index}>{video.name}</li>
          ))}
        </ul>

        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default CreateBandPage

const options = [
  { value: '北海道', label: '北海道' },
  { value: '青森県', label: '青森県' },
  { value: '岩手県', label: '岩手県' },
  { value: '宮城県', label: '宮城県' },
  { value: '秋田県', label: '秋田県' },
  { value: '山形県', label: '山形県' },
  { value: '福島県', label: '福島県' },
  { value: '茨城県', label: '茨城県' },
  { value: '栃木県', label: '栃木県' },
  { value: '群馬県', label: '群馬県' },
  { value: '埼玉県', label: '埼玉県' },
  { value: '千葉県', label: '千葉県' },
  { value: '東京都', label: '東京都' },
  { value: '神奈川県', label: '神奈川県' },
  { value: '新潟県', label: '新潟県' },
  { value: '富山県', label: '富山県' },
  { value: '石川県', label: '石川県' },
  { value: '福井県', label: '福井県' },
  { value: '山梨県', label: '山梨県' },
  { value: '長野県', label: '長野県' },
  { value: '岐阜県', label: '岐阜県' },
  { value: '静岡県', label: '静岡県' },
  { value: '愛知県', label: '愛知県' },
  { value: '三重県', label: '三重県' },
  { value: '滋賀県', label: '滋賀県' },
  { value: '京都府', label: '京都府' },
  { value: '大阪府', label: '大阪府' },
  { value: '兵庫県', label: '兵庫県' },
  { value: '奈良県', label: '奈良県' },
  { value: '和歌山県', label: '和歌山県' },
  { value: '鳥取県', label: '鳥取県' },
  { value: '島根県', label: '島根県' },
  { value: '岡山県', label: '岡山県' },
  { value: '広島県', label: '広島県' },
  { value: '山口県', label: '山口県' },
  { value: '徳島県', label: '徳島県' },
  { value: '香川県', label: '香川県' },
  { value: '愛媛県', label: '愛媛県' },
  { value: '高知県', label: '高知県' },
  { value: '福岡県', label: '福岡県' },
  { value: '佐賀県', label: '佐賀県' },
  { value: '長崎県', label: '長崎県' },
  { value: '熊本県', label: '熊本県' },
  { value: '大分県', label: '大分県' },
  { value: '宮崎県', label: '宮崎県' },
  { value: '鹿児島県', label: '鹿児島県' },
  { value: '沖縄県', label: '沖縄県' },
]

const StyledLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

const StyledLinkForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledLinks>{children}</StyledLinks>
}
