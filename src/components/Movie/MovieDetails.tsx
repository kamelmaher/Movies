import { useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import Loading from "../Loading"
import MovieCast from "./MovieCast"
import Related from "../Related"
import Details from "./Details"

const MovieDetails = () => {
    const { movieId } = useParams()
    const { movieDetails, isLoading } = useFetch(`movie/${movieId}`)
    return (
        <div>
            {
                !isLoading ?
                    <>
                        <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start mt-5">
                            <div className="movie-img mb-3">
                                <div className="imgage text-center">
                                    <img src={`https://image.tmdb.org/t/p/w300${movieDetails.movie.poster_path}`} alt="Image Of The Movie" className="rounded img-fluid img-details" />
                                </div>
                            </div>
                            <div className="movie-details text-center text-sm-start">
                                <h1>{movieDetails.movie.title}</h1>
                                <p className="movie-desc mt-3 p-1 rounded">{movieDetails.movie.overview}</p>
                                <Details movie={movieDetails.movie} />
                                <MovieCast actors={movieDetails.cast.slice(0, 8)} />
                            </div>
                        </div>
                        <Related url={`movie/${movieId}/similar`} />
                    </> : <Loading />
            }
        </div >
    )
}

export default MovieDetails