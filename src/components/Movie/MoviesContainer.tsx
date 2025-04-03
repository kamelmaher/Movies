import { useContext } from "react"
import Movie from "../Movie/Movie"
import { dataContext } from "../../context/DataContextProvider"
import Navigators from "../Navigators"
import { useFetch } from "../../hooks/useFetch"
import Loading from "../Loading"
import { NavLink } from "react-router-dom"


const MoviesContainer = () => {
    const { data, isLoading } = useFetch("discover/movie")
    const { typeOfMovies, handleChangeType, movietype } = useContext(dataContext)
    return (

        <div>
            <div className="row movieCont justify-content-center">
                <div className="head d-flex justify-content-between align-items-center mb-2">
                    <div className="fw-bold">Latest Movies</div>
                    <div className="btn btn-secondary">Watch More...</div>
                </div>
                {
                    !isLoading ?
                        <>
                            <ul className="d-flex gap-3 flex-wrap pe-0" style={{ maxHeight: " fit-content" }}>
                                {
                                    typeOfMovies.map(item => <button key={item} className={`btn btn${movietype == item ? "" : "-outline"}-danger`} onClick={() => handleChangeType(item)}>{item}</button>)
                                }
                            </ul>
                            <div className="row justify-content-center">
                                {
                                    data.length > 0 &&
                                    data.map(movie => <NavLink key={movie.id} className="col-sm-3" to={`/movie/${movie.id}`}>
                                        <Movie movie={movie} />
                                    </NavLink>)
                                }
                            </div>
                            <Navigators />
                        </>
                        : <Loading />
                }

            </div>
        </div>
    )
}

export default MoviesContainer