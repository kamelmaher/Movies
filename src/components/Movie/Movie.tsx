import picture from "/example.jpg"
const Movie = () => {
    return (

        <div className="movie">
            <div className="image mb-3" >
                <img src={picture} alt="" className="img-fluid rounded" />
            </div>
            <div className="body">
                <h5>Movie Name</h5>
            </div>
            <div className="hidden">
                <ul className="category d-flex justify-content-center gap-2 p-0">
                </ul>
            </div>
        </div>
    )
}

export default Movie
