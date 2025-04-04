import { Actor } from "../../types/Actor"

type ActorDetailsProps = {
    actor: Actor
}
const ActorDetails = ({ actor }: ActorDetailsProps) => {
    return (
        <div className="details text-center text-md-start">
            <h3>{actor.name}</h3>
            {
                actor.birthday &&
                actor.birthday &&
                <>
                    <p>Birthday: <span className="text-danger">{actor.birthday}</span></p>
                    <p> Age: <span className="text-danger">{2024 - +(actor.birthday.slice(0, actor.birthday.indexOf("-")))}</span></p>
                    <p style={{ maxHeight: "180px", overflow: "auto" }}>{actor.biography}</p>
                </>
            }
            {
                actor.homepage != null &&
                <a className="btn btn-outline-danger" target="_blank" href={actor.homepage}>Wikipedia</a>
            }
        </div>
    )
}

export default ActorDetails
