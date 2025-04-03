import { useNavigate } from "react-router"
import { Actor } from "../../types/Actor"
type MovieCastProps = {
    actors: Actor[]
}
const MovieCast = ({ actors }: MovieCastProps) => {
    const navigate = useNavigate()
    return (
        <div className="actors row mt-3">
            <h5>Cast</h5>
            {
                actors.map((e, i) => {
                    return <div key={i} className="col-sm-6 col-md-4 actor d-flex gap-2 align-items-center mb-3" onClick={() => {
                        navigate(`/actor/${e.id}`)
                    }}>
                        <div className="image">
                            <img src={`https://image.tmdb.org/t/p/w300${e.profile_path}`} alt="" className="img-fluid" />
                        </div>
                        <div className="name">
                            <p className="mb-0 ">{e.name}</p>
                            <p className="mb-0 text-danger">{e.character}</p>
                        </div>
                    </div>
                })
            }

        </div>
    )
}

export default MovieCast
