import Navigators from "../Navigators"
import { useFetch } from "../../hooks/useFetch"
import Loading from "../Loading"
import { useEffect, useState } from "react"
import { MovieType } from "../../types/MovieType"
import { getUrl } from "../../hooks/getUrl"
import { getRealData } from "../../hooks/getRealData"
import { Root } from "../../types/Root"
import MoviesContainerHead from "./MoviesContainerHead"
import MoviesTypes from "./MoviesTypes"
import { loadData } from "../../hooks/loadData"

const MoviesContainer = () => {
    
    // console.log("Movies Container")
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

    const result = movieType ? typeLoading ? <Loading /> : loadData(movies) : isLoading ? <Loading /> : loadData(data)
    
    return (
        <div>
            <div className="row movieCont justify-content-center">
                <MoviesContainerHead movieType={movieType} />
                <MoviesTypes movieType={movieType} typeOfMovies={typeOfMovies} handleMovieType={e => setMovieType(e)} />
                <div className="row justify-content-center" >
                    {
                        !isLoading ? result : <Loading />
                    }
                </div>
                <Navigators />
            </div>
        </div>
    )
}

export default MoviesContainer