'use client'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from 'antd'
import styled from 'styled-components'
import InputController from '../componets/InputController'
import SelectBoxController from '../componets/SelectBoxController'
import TextareaController from '../componets/TextareaController'
import { useRouter } from 'next/navigation'
import getUser from '../componets/hooks/getUser'
import BandModule from '../module/BandModule'
import Trash from '../../../public/Trash.png'

const EditBandPage = () => {
  const { control, handleSubmit, reset } = useForm({})
  const router = useRouter()
  const [bandId, setBandId] = useState<string | null>(null)
  const [images, setImages] = useState<{url: string, hash: string}[]>()
  const [videos, setVideos] = useState<{url: string, hash: string}[]>()
  const [sendImages, setSendImages] = useState<File[]>()
  const [links, setLinks] = useState<{ name: string; url: string }[]>()
  const [deletedImages, setDeletedImages] = useState<{url: string, hash: string}[]>([])
  const [deletedVideos, setDeletedVideos] = useState<{url: string, hash: string}[]>([])

  useEffect(() => {
    // バンドの既存データを取得してフォームにセットする
    const fetchBandData = async () => {
      try {
        const userData = getUser()
        if (!userData) return
        const response = await BandModule.getBand(userData.email)
        const data = await response.json()
        setLinks(data.links)
        setBandId(data._id)
        setImages(data.images)
        setVideos(data.videos)
        reset({
            name: data.name,
            location: data.location,
            description: data.description,  
        })
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBandData()
  }, [])

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setSendImages((prevFiles = []) => {
        const newFiles = [...prevFiles, ...selectedFiles]
        if (newFiles.length > 10) {
          alert('画像の数が多すぎます。最大10個までアップロードできます。')
          return prevFiles
        }
        return newFiles
      })
    }
  }

  const handleLinkChange = (index: number, field: 'name' | 'url', value: string) => {
    const newLinks = Array.isArray(links) ? [...links] : []
    newLinks[index][field] = value
    setLinks(newLinks)
  }

  const addLinkForm = () => {
    if(!Array.isArray(links)){
        setLinks([{ name: '', url: '' }])
        return
    }
    setLinks([...links, { name: '', url: '' }])
  }

  const removeLinkForm = () => {
    if (Array.isArray(links) && links.length > 0) {
      if(links.length === 1){
        setLinks([{ name: '', url: '' }])
        return
      }
      setLinks(links.slice(0, links.length - 1))
    }
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    if(!bandId) return
    formData.append('id', bandId)
    formData.append('name', data.name)
    formData.append('location', data.location)
    formData.append('description', data.description)
    formData.append('links', JSON.stringify(links))
    formData.append('deletedImages', JSON.stringify(deletedImages))
    formData.append('deletedVideos', JSON.stringify(deletedVideos))
    if(Array.isArray(sendImages)){
        sendImages.forEach((image, index) => {
            formData.append(`images[${index}]`, image)
        })
    }
    if(Array.isArray(videos)){
        videos.forEach((video, index) => {
            formData.append(`videos[${index}]`, video.url)
        })
    }

    try {
      const response = await fetch('http://localhost:8080/api/editBand', {
        method: 'PUT',
        body: formData,
      })
      if (response.ok) {
        router.push('/')
        return
      }
      alert('バンドの編集に失敗しました')
    } catch (error) {
      alert('バンドの編集に失敗しました')
    }
  }

  const handleDeleteImage = (image: {url: string, hash: string}) => {
    if (confirm('本当に画像を削除してよろしいですか？')) {
      deleteImage(image.url)
      setDeletedImages([...deletedImages, image])
    }
  }

  const deleteImage = (url: string) => {
    const newImages = images?.filter((image) => image.url !== url)
    setImages(newImages)
  }

  return (
    <div>
      <h1>EditBandPage</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputController
          name="name"
          label="バンド名"
          placeholder="バンド名"
          control={control}
          rules={{ required: 'バンド名は必須です' }}
        />
        <SelectBoxController
          name="location"
          label="活動場所"
          placeholder="活動場所を選択してください"
          control={control}
          rules={{ required: '活動場所は必須です' }}
          options={options}
        />
        <TextareaController
          name="description"
          label="説明"
          placeholder="説明"
          control={control}
          rules={{ required: '説明は必須です' }}
        />

        <div>
          リンク
          {Array.isArray(links) && links.map((link, index) => (
            <StyledLinkForm key={index}>
              <Input
                placeholder="リンク先 例）Youtube"
                defaultValue={links[index].name}
                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
              />
              <Input
                placeholder="https://youtube.com"
                defaultValue={links[index].url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
              />
            </StyledLinkForm>
          ))}
          <Button onClick={addLinkForm}>リンクを追加</Button>
          <Button onClick={removeLinkForm}>リンクを削除</Button>
        </div>

        <label>画像 (最大10個)</label>
        <Input type="file" multiple accept="image/*" onChange={handleImagesChange}/>
        <StyledFileWrapper>
          {images && images.map((image, index) => (
              <StyledFileList key={index}><img src={image.url} alt=''/>
                <StyledDeleteButton onClick={() => handleDeleteImage(image)}>
                  <StyledTrsah src={Trash.src} alt=''/>
                </StyledDeleteButton>
              </StyledFileList>
          ))}
          {sendImages && sendImages.map((image, index) => (
              <StyledFileList key={index}><img src={URL.createObjectURL(image)} alt=''/>
                <StyledDeleteButton onClick={() => {
                  setSendImages(sendImages.filter((_, i) => i !== index))
                }}>
                  <StyledTrsah src={Trash.src} alt=''/>
                </StyledDeleteButton>
              </StyledFileList>
          ))}
        </StyledFileWrapper>

        <label>動画 (最大3個)</label>
        <Input type="file" multiple accept="video/*" />
        <ul>
          {videos && videos.map((video, index) => (
            <li key={index}>{video.url}</li>
          ))}
        </ul>

        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default EditBandPage

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
const StyledFileList = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  background-color: #333;
  position: relative;
`
const StyledFileWrapper = styled.div`
  display: flex;
`
const StyledDeleteButton = styled(Button)`
  margin-left: 8px;
  background-color: #EF5A6F;
  color: white;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    color: white;
  }
`
const StyledTrsah = styled.img`
  width: 20px;
  height: 20px;
`

const StyledLinkForm: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledLinks>{children}</StyledLinks>
}
