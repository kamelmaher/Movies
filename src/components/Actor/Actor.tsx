import { useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import ActorImg from "./ActorImg"
import ActorDetails from "./ActorDetails"
import Related from "../Related"
import Loading from "../Loading"

const Actor = () => {
    const { actorId } = useParams()
    const { actor, isLoading } = useFetch(`person/${actorId}`)
    return (
        <div className="mt-4">
            {
                !isLoading ?
                    <div>
                        <div className="actor-page d-flex gap-3 p-2 flex-wrap justify-content-center">
                            <ActorImg img={actor.profile_path} name={actor.name} />
                            <ActorDetails actor={actor} />
                        </div>
                        <Related url={`person/${actorId}/movie_credits`} />
                    </div> : <Loading />
            }
        </div>
    )
}

export default Actor
