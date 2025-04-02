import Movie from "../Movie/Movie"


const MoviesContainer = () => {

    return (
        <div>
            <div className="row movieCont align-items-start">
                <div className="head d-flex justify-content-between align-items-center mb-3">
                    <div className="fw-bold">Latest Movies</div>
                    <div className="btn btn-secondary">Watch More...</div>
                </div>
                <ul className="d-flex gap-3 flex-wrap pe-0">

                </ul>
                <div className="row justify-content-center">

                    <div className="col-sm-3">
                        <Movie />
                    </div>
                </div>
                <div>
                    {
                        <nav aria-label="Page navigation example ">
                            <ul className="pagination justify-content-center">
                                <li className="page-item" onClick={() => {
                                }}><a className="page-link">Previous</a></li>
                                <li className="page-item" onClick={() => {
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