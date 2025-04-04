import { useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import Loading from "../Loading"
import MovieCast from "./MovieCast"
import Related from "../Related"

const MovieDetails = () => {
    const { movieId } = useParams()
    const { movieDetails, isLoading, actors } = useFetch(`movie/${movieId}`)
    return (
        <div>
            {
                !isLoading ?
                    <>
                        <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start mt-5">
                            <div className="movie-img mb-3">
                                <div className="imgage text-center">
                                    <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt="Image Of The Movie" className="rounded img-fluid img-details" />
                                </div>
                            </div>
                            <div className="movie-details text-center text-sm-start">
                                <h1>{movieDetails.title}</h1>
                                <p className="movie-desc mt-3 p-1 rounded">{movieDetails.overview}</p>
                                <div className="details row">
                                    <div className="movie-detail col-md-6">
                                        <p>Categoreis:
                                            <span className="text-danger">
                                                {
                                                    movieDetails.genres!.map(category => ` ${category.name}, `)
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="movie-detail col-md-6">
                                        <p>Rating: <span className="text-danger">{movieDetails.vote_average.toFixed(1)}</span></p>
                                    </div>
                                    <div className="movie-detail col-md-6">
                                        <p>Language: <span className="text-danger">{movieDetails.original_language}</span></p>
                                    </div>
                                    <div className="movie-detail col-md-6">
                                        <p>Realease Date: <span className="text-danger">{movieDetails.release_date}</span></p>
                                    </div>
                                    <div className="movie-detail col-md-6">
                                        <p>Country: <span className="text-danger">{movieDetails.origin_country?.join(", ")}</span></p>
                                    </div>
                                </div>
                                <MovieCast actors={actors.slice(0, 8)} />
                                <Related url={`movie/${movieId}/similar`} />
                            </div>
                        </div>

                        {/* Seasons  */}

                        {/* {
                        content == "tv" &&
                        <div className="seasons mt-3">
                            <h3>Seasons</h3>
                            <div className="d-flex gap-3 flex-wrap justify-content-around">
                                {
                                    seasons.map(e => {
                                        return <div key={e.id}>
                                            <img src={`https://image.tmdb.org/t/p/w200${e.poster_path}`} alt="" className="img-fluid" onClick={() => {
                                                navigate(`/serie/${movieId}/seasons/${e.season_number}`)
                                            }} />
                                            <h5 className="text-center">{e.name}</h5>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    } */}

                        {/* Related Movies */}

                        {/* <div className="related mt-4">
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
                    </div> */}
                    </> : <Loading />
            }
        </div >
    )
}

export default MovieDetails