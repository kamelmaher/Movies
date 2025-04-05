import { getCategories } from "../../hooks/getCategories"
import { MovieType } from "../../types/MovieType"
import { useData } from "../../context/DataContextProvider"
type MovieProps = {
    movie: MovieType
}
const Movie = ({ movie }: MovieProps) => {
    const { categories: allCategories } = useData()
    if (allCategories.error) return
    if (allCategories.isLoading) return
    const categories = getCategories(movie.genre_ids, allCategories.data!)
    return (
        <div className="movie">
            <div className="image rounded mb-3" >
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="img-fluid movie-img" loading="lazy" />
            </div>
            <div className="body">
                <h5>{movie.title}</h5>
                <div className="hidden">
                    <ul className="category d-flex justify-content-center gap-2 p-0">
                        {
                            categories.length > 0 &&
                            categories.slice(0, 2).map(category => <li key={category.id}>{category.name}</li>)
                        }
                    </ul>
                </div>
            </div>
            <div className="rate">
                <span className="bg-danger ">{movie.vote_average.toFixed(1)}</span>
            </div>
        </div>
    )
}

export default Movie
