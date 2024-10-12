import { useEffect, useState } from "react"
import { Movie as MovieType } from "../../Store/MovieSlice"
import Movie from "../Movie/Movie"
import { Category } from "../types/Category"
import axios from "axios"
import { useAppSelector } from "../../Store/Store"

type MoviesContainerProps = {
    data: MovieType[]
    categories: Category[]
    id: number
}

const MoviesContainer = ({ data, categories, id }: MoviesContainerProps) => {
    const content = useAppSelector(state => state.Content.content)
    const [filteredData, setFilteredData] = useState<MovieType[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setFilteredData(data)
        if (id != -1) {
            setLoading(true)
            axios.get(`https://api.themoviedb.org/3/discover/${content}?with_original_language=en&api_key=acecc2235b3b867602d49291bcc21926&with_genres=${id}`).then(({ data }) => {
                setFilteredData(data.results)
                setLoading(false)
            }).catch(err => {
                return <h3>{err}</h3>
            })
        }
    }, [id , content])
    return (
        <div className="row">
            <div className="head d-flex justify-content-between align-items-center mb-3">
                <div className="fw-bold">Latest Movies</div>
                <div className="btn btn-secondary">Watch More...</div>
            </div>
            {
                loading ? <h3>Loading...</h3>
                    :
                    filteredData.length > 0 ?
                        filteredData.map(e => {
                            return <div key={e.id} className="col-sm-3">
                                <Movie movie={e} category={categories} />
                            </div>
                        })
                        : <h1>No Movies Under This Category</h1>
            }
        </div>
    )
}

export default MoviesContainer
