import { Movie as MovieType } from "../../Store/MovieSlice"
import { Category } from "../types/Category"
type MovieProps = {
    movie: MovieType,
    category: Category[]
}
const Movie = ({ movie, category }: MovieProps) => {
    const myCategory: Category[] = []
    movie.genre_ids.map(id => {
        category.map(e => {
            if (e.id == id) myCategory.push(e)
        })
    })
    return (
        <div className="movie">
            <div className="image mb-3">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="" className="img-fluid rounded" />
            </div>
            <div className="body">
                <h5>{movie.original_title ?  movie.original_title : movie.name}</h5>
            </div>
            <div className="hidden">
                <ul className="category d-flex justify-content-center gap-2 p-0">
                    {myCategory.slice(0 , 2).map((e, i) => {
                        return <li key={i}>{e.name}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Movie
