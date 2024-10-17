import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Season } from "../../Store/MovieSlice"

const Seasons = () => {
    const { serieId, seasonNumber } = useParams()
    const [season, setSeason] = useState<Season>()
    useEffect(() => {
        // https://api.themoviedb.org/3/tv/{tv_id}/season/{season_number}?api_key=YOUR_TMDB_API_KEY
        axios.get(`https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
            setSeason(data)
            console.log(data)
        })

    }, [])
    return (
        <div className="p-3">
            {
                season &&
                <>
                    <div className="text-center mb-4">
                        <div className="season-img mb-2">
                            <img src={`https://image.tmdb.org/t/p/w200${season.poster_path}`} alt="" />
                        </div>
                        <h4>{season.name}</h4>
                    </div>
                    <div>
                        <h4 className="ps-4">Epsoides</h4>
                        <div className="row">
                            {
                                season.episodes.map(e => {
                                    return <div key={e.id} className="col-sm-6 col-md-3 mb-3 text-center">
                                        <div className="ep-img mb-2">
                                            <img src={`https://image.tmdb.org/t/p/w200${e.still_path}`} alt="" />
                                        </div>
                                        <div className="text">
                                            <p className="mb-0">Epsoide {e.episode_number}: {e.name}</p>
                                            <p className="text-danger">{e.vote_average.toFixed(1)}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Seasons
