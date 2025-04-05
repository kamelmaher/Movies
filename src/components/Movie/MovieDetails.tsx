import { useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import Loading from "../Loading"
import MovieCast from "./MovieCast"
import Details from "./Details"
import { MovieType } from "../../types/MovieType"
import { Actor } from "../../types/Actor"
import Related from "../Related"

const MovieDetails = () => {
    const { movieId } = useParams()
    const movieDetails = useFetch<MovieType>(`movie/${movieId}`, {}, (data) => data)
    const actors = useFetch<Actor[]>(`movie/${movieId}/credits`, {}, (data) => data.cast
    )
    if (movieDetails.isLoading) return <Loading />
    return (
        <div>
            <>
                <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start mt-5">
                    <div className="movie-img mb-3">
                        <div className="imgage text-center">
                            <img src={`https://image.tmdb.org/t/p/w300${movieDetails.data.poster_path}`} alt="Image Of The Movie" className="rounded img-fluid img-details" />
                        </div>
                    </div>
                    <div className="movie-details text-center text-sm-start">
                        <Details movie={movieDetails.data} />
                        {!actors.isLoading &&
                            < MovieCast actors={actors.data.slice(0, 8)} />
                        }
                    </div>
                </div>
                <Related url={`movie/${movieId}/similar`} />
            </>
        </div >
    )
}

export default MovieDetails