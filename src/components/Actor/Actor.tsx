import { useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"
import ActorImg from "./ActorImg"
import ActorDetails from "./ActorDetails"
import Related from "../Related"
import Loading from "../Loading"
import { Actor as ActorType } from "../../types/Actor"

const Actor = () => {
    const { actorId } = useParams()
    const actor = useFetch<ActorType>(`person/${actorId}`, {}, (data) => data)
    if (actor.isLoading) return <Loading />
    if (actor.error) return <h1>Error</h1>
    return (
        <div className="mt-4">
            <div>
                <div className="actor-page d-flex gap-3 p-2 flex-wrap justify-content-center">
                    <ActorImg img={actor.data.profile_path} name={actor.data.name} />
                    <ActorDetails actor={actor.data} />
                </div>
                <Related url={`person/${actorId}/movie_credits`} />
            </div>
        </div>
    )
}

export default Actor
