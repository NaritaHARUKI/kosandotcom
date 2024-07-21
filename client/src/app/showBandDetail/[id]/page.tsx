"use client"
import useShowBandDetail from "./useShowBandDetail"

const ShowBandDetailPage = ()=>{

    const { band } = useShowBandDetail()
    
    return (
        <div>
            <h1>Show Band Detail Page</h1>
            <div>
                {band && (
                    <div>
                        <p>{band.name}</p>
                        <p>{band.location}</p>
                        <p>{band.description}</p>
                        {Array.isArray(band?.links) && band.links.map((link: string, index: number) => (
                            <p key={link}>{link}</p>
                        ))}
                        {Array.isArray(band?.images) && band.images.map((image: {url: string}, index: number) => (
                            <p key={image.url}>{image.url}</p>
                        ))}
                        {Array.isArray(band?.movies) && band.movies.map((movie: {url: string}, index: number) => (
                            <p key={movie.url}>{movie.url}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowBandDetailPage