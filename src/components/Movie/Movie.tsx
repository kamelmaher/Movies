import { useNavigate } from "react-router"
import { Movie as MovieType } from "../../Store/MovieSlice"
import { Category } from "../types/Category"
import { useAppDispatch } from "../../Store/Store"
import { setSearch } from "../../Store/SearchSlice"

type MovieProps = {
    movie: MovieType,
    myCategories: Category[]
}

const Movie = ({ movie , myCategories}: MovieProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    console.log(myCategories)
    return (

        <div className="movie" onClick={() => {
            navigate(`/movie/${movie.id}`)
            dispatch(setSearch(""))
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }}>
            <div className="image mb-3" >
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="" className="img-fluid rounded" />
            </div>
            <div className="body">
                <h5>{movie.original_title ? movie.original_title : movie.name}</h5>
            </div>
            <div className="hidden">
                <ul className="category d-flex justify-content-center gap-2 p-0">
                    {
                    myCategories.length > 0 &&
                    myCategories.slice(0, 2).map((e, i) => {
                        return <li key={i}>{e.name}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Movie
