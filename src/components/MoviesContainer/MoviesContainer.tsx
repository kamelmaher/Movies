import Navigators from "../Navigators"
import Loading from "../Loading"
import { loadData } from "../../hooks/loadData"
import { useFetch } from "../../hooks/useFetch"
import { MovieType } from "../../types/MovieType"
import MoviesContainerHead from "./MoviesContainerHead"
import MoviesTypes from "./MoviesTypes"
import { useState } from "react"

const MoviesContainer = () => {
    const [selectedType, setSelectedType] = useState("")
    const handleMovieType = (e: string) => setSelectedType(e)
    const movies = useFetch<MovieType[]>(
        selectedType === "" ? `discover/movie` : `movie/${selectedType.split(" ").join("_").toLowerCase()}`
    );
    if (movies.isLoading) return <Loading />
    if (movies.error) return <p className="text-danger text-center">Failed Loading Data</p>

    return (
        <div>
            <div className="row movieCont justify-content-center">
                <MoviesContainerHead movieType={selectedType} />
                <MoviesTypes movieType={selectedType} handleMovieType={handleMovieType} />
                <div className="row justify-content-center mt-3" >
                    {
                        loadData(movies.data)
                    }
                </div>
                <Navigators />
            </div>
        </div>
    )
}

export default MoviesContainer