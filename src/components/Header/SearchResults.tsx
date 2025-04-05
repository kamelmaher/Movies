import { useNavigate } from "react-router"
import Loading from "../Loading"
import { useFetch } from "../../hooks/useFetch"
import { MovieType } from "../../types/MovieType"
type SearchResults = {
    searchVal: string,
    setSearch: (e: string) => void
}
const SearchResults = ({ searchVal, setSearch }: SearchResults) => {
    const navigate = useNavigate()
    const results = useFetch<MovieType[]>(`search/movie`, { query: searchVal })

    if (results.isLoading) return <div className="search-results">
        <Loading height="70px" />
    </div>

    if (results.error) return <p className="text-danger">Error</p>
    if (searchVal == "") return
    return (
        <div className="search-results">
            {
                results.data.length > 0 ?
                    results.data.map(movie => <div key={movie.id} className="text-danger d-flex gap-2 align-items-center result" onClick={() => {
                        navigate(`/movie/${movie.id}`)
                        setSearch("")
                    }}>
                        <div style={{ width: "80px", height: "60px" }} >
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="img-fluid" />
                        </div>
                        <p className="mb-0">
                            {movie.title}
                        </p>
                    </div>) : <p className="text-danger mb-0 p-3 text-center">No Results</p>
            }
        </div>
    )
}

export default SearchResults
