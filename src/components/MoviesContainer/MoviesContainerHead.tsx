type MoviesContainerHeadProps = {
    movieType: string
}
const MoviesContainerHead = ({ movieType }: MoviesContainerHeadProps) => {
    return (
        <div className="head d-flex justify-content-between align-items-center mb-2">
            <div className="fw-bold">{movieType ? movieType : "Latest"} Movies</div>
            <div className="btn btn-secondary">Watch More...</div>
        </div>
    )
}

export default MoviesContainerHead
