import { useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import axios from "axios"

const Actor = () => {
    const { actorId } = useParams()
    const { actor, isLoading } = useFetch(`person/${actorId}`)
    axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => console.log(data))
    return (
        <div className="mt-4">
            {
                !isLoading &&
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
        </div>
    )
}

export default Actor
