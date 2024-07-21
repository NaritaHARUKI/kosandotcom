"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import BandModule from '../module/BandModule';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const ShowBandPage = () => {
    const [bands, setBands] = useState<any>()
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)
    const router = useRouter()

    const loadBands = useCallback(async () => {
        try {
            const response = await BandModule.showBand(page)
            const newBands = await response.json()
            if (newBands.length === 0) {
                setHasMore(false)
                return
            } 
            setBands((prevBands: any) => {
                return [...(prevBands || []), ...newBands]
            })
        } catch (error) {
          console.error("Error loading bands:", error)
        }
    }, [page])

    useEffect(() => {
        loadBands()
    }, [page, loadBands])

    const handleRoute = (id: number)=>{
        router.push(`/showBandDetail/${id}`)
    }

    const lastBandElementRef = useCallback((node:any) => {
        //新しいIntersectionObserverを設定する前に、古いIntersectionObserverを解放
        if (observer.current) observer.current.disconnect()
        //新しいIntersectionObserverを作成し、コールバック関数を定義します。
        // entriesは観察対象の要素に対するIntersectionObserverEntryの配列
        // entries[0].isIntersectingは、要素がビューポートに入ったかどうかを示す
        // hasMoreがtrueの場合のみ、次のページ番号に更新（setPage）
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevPage => prevPage + 1)
          }
        })
        if (node) observer.current.observe(node)
    }, [hasMore])

    return (
        <div className="App">
            {Array.isArray(bands) && bands.map((band: any, index: number) => {
                if (bands.length === index + 1) {
                return <StyledBand ref={lastBandElementRef} key={band._id} onClick={()=>{handleRoute(band._id)}}>{band.name}</StyledBand>
                } else {
                return <StyledBand key={band._id} onClick={()=>{handleRoute(band._id)}}>{band.name}</StyledBand>
                }
            })}
            {hasMore && <div>Loading...</div>}
        </div>
    )
}

export default ShowBandPage

const StyledBand = styled.div`
    width: 90%;
    margin-left: 5%;
    height: 200px;
    background-color: #f0f0f0;
    margin-top: 20px;
`