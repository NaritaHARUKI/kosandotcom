"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import BandModule from '../module/BandModule';

const ShowBandPage = () => {
    const [bands, setBands] = useState<any>()
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver | null>(null)

    const loadBands = useCallback(async () => {
        try {
            const response = await BandModule.showBand(page)
          const newBands = await response.json()
          if (newBands.length === 0) {
            setHasMore(false);
          } else {
            setBands((prevBands: any) => [...prevBands, ...newBands])
          }
        } catch (error) {
          console.error("Error loading bands:", error)
        }
    }, [page])

    useEffect(() => {
        loadBands()
    }, [page, loadBands])

    const lastBandElementRef = useCallback((node:any) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        });
        if (node) observer.current.observe(node);
    }, [hasMore])

    return (
        <div className="App">
            {Array.isArray(bands) && bands.map((band: any, index: number) => {
                if (bands.length === index + 1) {
                return <div ref={lastBandElementRef} key={band._id}>{band.name}</div>;
                } else {
                return <div key={band._id}>{band.name}</div>;
                }
            })}
            {hasMore && <div>Loading...</div>}
        </div>
    )
}

export default ShowBandPage