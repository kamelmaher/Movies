type ActorImgProps = {
    img: string,
    name: string
}
const ActorImg = ({ img, name }: ActorImgProps) => {
    return (
        <div className="img" style={{minWidth: "fit-content"}}>
            <img src={`https://image.tmdb.org/t/p/w300${img}`} alt={name}
                className="img-fluid"
                style={{ width: "150px", border: "1px solid white" }}
            />
        </div>
    )
}

export default ActorImg
