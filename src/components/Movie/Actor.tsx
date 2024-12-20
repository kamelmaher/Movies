import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Movie as MovieType } from "../../Store/MovieSlice"
import Movie from "./Movie"
import { Category } from "../types/Category"
import { useAppSelector } from "../../Store/Store"

const Actor = () => {
    type ActorType = {
        birthday: string
        deathday: string
        gender: number
        name: string
        profile_path: string
        homepage: string
    }
    const [movies, setMovies] = useState<MovieType[]>([])
    const [actor, setActorDetails] = useState<ActorType>({
        name: "",
        profile_path: "",
        gender: 0,
        deathday: "",
        birthday: "",
        homepage: ""
    })
    const { actorId } = useParams()
    const allCategories = useAppSelector(state => state.Category.categories)
    const content = useAppSelector(state => state.Link.content)
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/person/${actorId}/${content}_credits?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
            const sortedMovies = data.cast.sort(
                (a: MovieType, b: MovieType) => b.popularity - a.popularity
            );
            setMovies(sortedMovies)
        })
        axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
            setActorDetails(data)
        })
    }, [content])
    console.log(actor.homepage)
    return (

        <div className="mt-4">
            {
                actor &&
                <div className="actor-page d-flex gap-3 p-2">
                    <div className="img">
                        <img src={`https://image.tmdb.org/t/p/w300${actor?.profile_path}`} alt=""
                            className="img-fluid"
                            style={{ width: "150px", border: "1px solid white" }}
                        />
                    </div>
                    <div className="details">
                        <h3>{actor.name}</h3>
                        {
                            actor.birthday &&
                            <>
                                <p>Birthday: <span className="text-danger">{actor.birthday}</span></p>
                                <p> Age: <span className="text-danger">{2024 - +(actor.birthday.slice(0, actor.birthday.indexOf("-")))}</span></p>
                            </>
                        }
                        {
                            actor.homepage != null &&
                            <a className="btn btn-outline-danger" target="_blank" href={actor.homepage}>Wikipedia</a>
                        }
                    </div>
                </div>
            }
            {
                movies &&
                <div className="movies mt-4">
                    <h4>Actor’s Best {content == "movie" ? "Movies" : "Series"}</h4>
                    <div className="movies-container">
                        <div className="row">
                            {
                                movies.slice(0, 20).map(e => {
                                    const myCategories: Category[] = []
                                    allCategories.map(category => {
                                        e.genre_ids.map(id => {
                                            if (id == category.id) myCategories.push(category)
                                        })
                                    })
                                    return <div className="col-md-3" key={e.id}>
                                        <Movie movie={e} myCategories={myCategories}></Movie>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Actor
