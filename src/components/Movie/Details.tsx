import { MovieType } from "../../types/MovieType"

type DetailsProps = {
    movie: MovieType
}
const Details = ({ movie }: DetailsProps) => {
    return (
        <>
            <h1>{movie.title}</h1>
            <p className="movie-desc mt-3 p-1 rounded">{movie.overview}</p>
            <div className="details row">
                <div className="movie-detail col-md-6">
                    <p>Categoreis:
                        <span className="text-danger">
                            {
                                movie.genres!.map(category => ` ${category.name}, `)
                            }
                        </span>
                    </p>
                </div>
                <div className="movie-detail col-md-6">
                    <p>Rating: <span className="text-danger">{movie.vote_average.toFixed(1)}</span></p>
                </div>
                <div className="movie-detail col-md-6">
                    <p>Language: <span className="text-danger">{movie.original_language}</span></p>
                </div>
                <div className="movie-detail col-md-6">
                    <p>Realease Date: <span className="text-danger">{movie.release_date}</span></p>
                </div>
                <div className="movie-detail col-md-6">
                    <p>Country: <span className="text-danger">{movie.origin_country?.join(", ")}</span></p>
                </div>
            </div>
        </>
    )
}

export default Details
