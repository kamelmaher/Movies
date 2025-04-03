import { useContext } from "react"
import { getCategories } from "../../hooks/getCategories"
import { MovieType } from "../../types/MovieType"
import { dataContext } from "../../context/DataContextProvider"
type MovieProps = {
    movie: MovieType
}
const Movie = ({ movie }: MovieProps) => {
    const { categories: allCategories } = useContext(dataContext)
    const categories = getCategories(movie.genre_ids, allCategories)
    return (
        <div className="movie">
            <div className="image mb-3" >
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="img-fluid rounded" loading="lazy" />
            </div>
            <div className="body">
                <h5>{movie.title}</h5>
            </div>
            <div className="hidden">
                <ul className="category d-flex justify-content-center gap-2 p-0">
                    {
                        categories.length > 0 &&
                        categories.map(category => <li key={category.id}>{category.name}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Movie
