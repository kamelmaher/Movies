import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Movie as MovieType, Season } from "../../Store/MovieSlice"
import Movie from "./Movie"
import { Actor } from "../types/Actor"
import { useAppSelector } from "../../Store/Store"
import { Category } from "../types/Category"

const MovieDetails = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState<MovieType>()
    const [isLoading, setLoading] = useState(true)
    const [errMessage, setErrMessage] = useState("Loading...")
    const [related, setRelated] = useState<MovieType[]>([])
    const [actors, setActors] = useState<Actor[]>([])
    // If Content is TV
    const [seasons, setSeasons] = useState<Season[]>([])
    const content = useAppSelector(state => state.Link.content)
    const allCategories = useAppSelector(state => state.Category.categories)
    const navigate = useNavigate()
    useEffect(() => {
        // Get Serie Details (Seasons)
        // Returns Season Array 
        // Season Object
        // Dont include Epsoides Array 
        if (content == "tv") {
            axios.get(`https://api.themoviedb.org/3/tv/${movieId}?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
                setSeasons(data.seasons)
                console.log(data.seasons)
            })
        }

        // Get Serie Epsoides (Season id )
        // axios.get(`https://api.themoviedb.org/3/tv/${movieId}/season/1?api_key=acecc2235b3b867602d49291bcc21926`).then(({data}) => {
        // console.log(data)
        // })

        // Get Selected Movie
        axios.get(`https://api.themoviedb.org/3/${content}/${movieId}?language=en-US&api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
            setMovie(data)
            setLoading(false)
            // console.log(data)
        }).catch((err) => {
            setErrMessage("Error : " + err.message)
        })

        // Get Related Movies
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
            setRelated(data.results)
        })

        // Get Actors
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
            const mainActors = data.cast.slice(0, 5)
            setActors(mainActors)
        })

    }, [movieId])
    return (
        <div>
            {
                !isLoading ?
                    <>
                        <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start mt-5">
                            <div className="movie-img mb-3">
                                <div className="imgage text-center">
                                    <img src={`https://image.tmdb.org/t/p/w300${movie!.poster_path}`} alt="Image Of The Movie" className="rounded img-fluid img-details" />
                                </div>
                            </div>
                            <div className="movie-details text-center text-sm-start">
                                <div>
                                    <h1>{content == "movie" ? movie!.original_title : movie?.name}</h1>
                                    <p className="movie-desc mt-3 p-1 rounded">{movie!.overview}</p>
                                    <div className="details row">
                                        <div className="movie-detail col-md-6">
                                            <p>Categoreis: <span className="text-danger">{
                                                movie!.genres.map((e, i) => {
                                                    return i != movie!.genres.length - 1 ? e.name + " , " : e.name
                                                })
                                            }</span></p>
                                        </div>
                                        <div className="movie-detail col-md-6">
                                            <p>Rating: <span className="text-danger">{movie?.vote_average}</span></p>
                                        </div>
                                        {
                                            movie?.homepage != "" &&
                                            <div className="movie-detail col-md-6 mb-2">
                                                <a className="btn btn-danger" href={movie!.homepage} target="_blank">Go To Trailer</a>
                                            </div>
                                        }
                                        <div className="movie-detail col-md-6">
                                            <p>Language: <span className="text-danger">{movie!.original_language}</span></p>
                                        </div>
                                        <div className="movie-detail col-md-6">
                                            <p>Realease Date: <span className="text-danger">{content == "movie" ? movie!.release_date : movie?.first_air_date}</span></p>
                                        </div>
                                        <div className="movie-detail col-md-6">
                                            <p>Country: <span className="text-danger">{movie!.origin_country}</span></p>
                                        </div>
                                    </div>
                                    <div className="actors row mt-3">
                                        <h5>Cast</h5>
                                        {
                                            actors &&
                                            actors.map((e, i) => {
                                                return <div key={i} className="col-sm-6 col-md-4 actor d-flex gap-2 align-items-center mb-3">
                                                    <div className="image">
                                                        <img src={`https://image.tmdb.org/t/p/w300${e.profile_path}`} alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="name">
                                                        <p className="mb-0 ">{e.name}</p>
                                                        <p className="mb-0 text-danger">{e.character}</p>
                                                    </div>
                                                </div>
                                            })
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            content == "tv" &&
                            <div className="seasons mt-3">
                                <h3>Seasons</h3>
                                <div className="d-flex gap-3 flex-wrap justify-content-around">
                                    {
                                        seasons.map(e => {
                                            return <div key={e.id}>
                                                <img src={`https://image.tmdb.org/t/p/w200${e.poster_path}`} alt="" className="img-fluid" onClick={() => {
                                                    
                                                    navigate(`/serie/${movieId}/seasons/${e.season_number}`)
                                                }}/>
                                                <h5 className="text-center">{e.name}</h5>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        }
                        <div className="related mt-4">
                            <h3>Related {content == "tv" ? "Series" : "Movies"}</h3>
                            <div className="row mt-3">
                                {
                                    related.map(e => {
                                        const myCategories: Category[] = []
                                        allCategories.map(category => {
                                            e.genre_ids.map(id => {
                                                if (id == category.id) myCategories.push(category)
                                            })
                                        })
                                        return <div key={e.id} className="col-md-3" onClick={() => {
                                            setLoading(true)
                                        }}>
                                            <Movie movie={e} myCategories={myCategories}></Movie>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                    </>
                    : <h3 className="text-danger">{errMessage}</h3>
            }
        </div>
    )
}

export default MovieDetails