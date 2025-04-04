import { useContext } from "react"
import { dataContext } from "../../context/DataContextProvider"
import { useNavigate } from "react-router"
import Loading from "../Loading"

const SearchResults = () => {
    const { searchState, closeMenu } = useContext(dataContext)
    const navigate = useNavigate()
    if (!searchState.showSearchMenu) return
    return (
        <div className="search-results" >
            {
                !searchState.isLoading ?
                    searchState.searchResults ?
                        searchState.searchResults.map(movie => <div key={movie.id} className="text-danger d-flex gap-2 align-items-center result" onClick={() => {
                            navigate(`/movie/${movie.id}`)
                            closeMenu()
                        }}>
                            <div style={{ width: "80px", height: "60px" }} >
                                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="img-fluid" />
                            </div>
                            <p className="mb-0">
                                {movie.title}
                            </p>
                        </div>) : <p className="text-danger p-3 mb-0">There is No Movies</p>
                    : <Loading height="50px" />
            }
        </div>
    )
}

export default SearchResults
