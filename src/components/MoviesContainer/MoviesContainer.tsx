import Movie from "../Movie/Movie"
import Navigators from "../Navigators"
import { useFetch } from "../../hooks/useFetch"
import Loading from "../Loading"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { MovieType } from "../../types/MovieType"
import { getUrl } from "../../hooks/getUrl"
import { getRealData } from "../../hooks/getRealData"
import { Root } from "../../types/Root"
import MoviesContainerHead from "./MoviesContainerHead"
import MoviesTypes from "./MoviesTypes"

export const loadData = (data: MovieType[]) =>
    data.map(movie => <NavLink key={movie.id} className="col-6 col-sm-3" to={`/movie/${movie.id}`}>
        <Movie movie={movie} />
    </NavLink>)
const MoviesContainer = () => {
    const [movies, setMovies] = useState<MovieType[]>([])
    const { data, isLoading } = useFetch("discover/movie")
    const typeOfMovies = ["Now Playing", "Popular", "Top Rated", "UpComing"]
    const [movieType, setMovieType] = useState("")
    const [typeLoading, setTypeLoading] = useState(false)
    useEffect(() => {
        if (movieType != "") {
            setMovies([])
            setTypeLoading(true)
            fetch(getUrl(`movie/${movieType.split(" ").join("_").toLowerCase()}`)).then((data) => data.json()).then(response => {
                response.results.map((movie: Root) => setMovies(prev => [...prev, getRealData(movie)]))
                setTypeLoading(false)
            })
        }
    }, [movieType])


    return (
        <div>
            <div className="row movieCont justify-content-center">
                <MoviesContainerHead movieType={movieType} />
                <MoviesTypes movieType={movieType} typeOfMovies={typeOfMovies} handleMovieType={e => setMovieType(e)} />
                <div className="row justify-content-center" >
                    {
                        !isLoading ?
                            !movieType ?
                                data.length > 0 ?
                                    loadData(data) : <p className="text-dange">There is No Movies</p>
                                :
                                !typeLoading ?
                                    loadData(movies)
                                    : <Loading />
                            : <Loading />
                    }

                </div>
                <Navigators />

            </div>
        </div >
    )
}

export default MoviesContainer