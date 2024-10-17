import { useEffect, useState } from "react"
import { Movie as MovieType } from "../../Store/MovieSlice"
import Movie from "../Movie/Movie"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { setList, setPage } from "../../Store/LinkSlice"
import { Category } from "../types/Category"

type MoviesContainerProps = {
    movies: MovieType[],
}

const MoviesContainer = ({ movies}: MoviesContainerProps) => {
    const allCategories = useAppSelector(state => state.Category.categories)
    const [filteredData, setFilteredData] = useState<MovieType[]>(movies)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const list = [["Top Rated", "top_rated"], ["Popular", "popular"], ["UpComing", "upcoming"], ["Now Playing", "now_playing"]]
    const linkState = useAppSelector(state => state.Link)

    useEffect(() => {
        setFilteredData(movies)
    }, [movies])
    useEffect(() => {

        // Get selected Movies
        setLoading(true)
        axios.get(`https://api.themoviedb.org/3/${linkState.list == "" ? "discover/" : ""}${linkState.content}${linkState.list != "" ? `/${linkState.list}` : ""}?with_original_language=en&api_key=acecc2235b3b867602d49291bcc21926${linkState.category.id != -1 ? `&with_genres=${linkState.category.id}` : ""}&page=${linkState.page}`).then(({ data }) => {
            setFilteredData(data.results)
            setLoading(false)
        })
    }, [linkState])

    return (
        <div>
            <div className="row movieCont align-items-start">
                <div className="head d-flex justify-content-between align-items-center mb-3">
                    <div className="fw-bold">Latest Movies</div>
                    <div className="btn btn-secondary">Watch More...</div>
                </div>
                <ul className="d-flex gap-3 flex-wrap pe-0">
                    {
                        linkState.content == "movie" ?
                            list.map((e, i) => {
                                return <li className={`btn btn-outline-danger ${linkState.list == e[1] && "active"}`} key={i} onClick={() => {
                                    dispatch(setList(e[1]))
                                }}>{e[0]}</li>
                            }) : list.slice(0, 2).map((e, i) => {
                                return <li className={`btn btn-outline-danger ${linkState.list == e[1] && "active"}`} key={i} onClick={() => {
                                    dispatch(setList(e[1]))
                                }}>{e[0]}</li>
                            })
                    }
                </ul>
                <div className="row justify-content-center">
                    {
                        loading ? <h3 className="text-center">Loading...</h3>
                            :
                            filteredData.length > 0 ?
                                filteredData.map(e => {
                                    const myCategories:Category[] = []
                                    allCategories.map(category => {
                                        e.genre_ids.map(id => {
                                            if(id == category.id) myCategories.push(category)
                                        })
                                    })
                                    return <div key={e.id} className="col-sm-3">
                                        <Movie movie={e} myCategories={myCategories}/>
                                    </div>
                                })
                                : <h1>No {linkState.content == "tv" ? "Series": "Movies"} Under This Category</h1>
                    }
                </div>
                <div>
                    {
                        <nav aria-label="Page navigation example ">
                            <ul className="pagination justify-content-center">
                                <li className="page-item" onClick={() => {
                                    if (linkState.page - 1 <= 0) {
                                        dispatch(setPage(linkState.page))
                                    } else {
                                        dispatch(setPage(linkState.page - 1))
                                    }
                                }}><a className="page-link">Previous</a></li>
                                {
                                    [1, 2, 3, 4, 5].map(e => {
                                        return <li key={e} className={`${linkState.page == e ? "page-item active" : "page-item"}`} onClick={() => {
                                            dispatch(setPage(e))
                                        }}><a className="page-link">{e == 5 ? linkState.page > 5 ? linkState.page : e : e}</a></li>
                                    })
                                }
                                <li className="page-item" onClick={() => {
                                    dispatch(setPage(linkState.page + 1))
                                }}><a className="page-link">Next</a></li>
                            </ul>
                        </nav>
                    }
                </div>
            </div>
        </div>
    )
}

export default MoviesContainer