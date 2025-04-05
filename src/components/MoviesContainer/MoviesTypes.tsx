type MoviesTypesProps = {
    movieType: string,
    handleMovieType: (e: string) => void
}
const MoviesTypes = ({ movieType, handleMovieType }: MoviesTypesProps) => {
    const typeOfMovies = ["Now Playing", "Popular", "Top Rated", "UpComing"]
    return (
        <ul className="d-flex gap-3 flex-wrap pe-0" style={{ maxHeight: " fit-content" }}>
            {
                typeOfMovies.map(item => <button
                    key={item}
                    className={`btn btn${movieType == item ? "" : "-outline"}-danger`}
                    onClick={() => handleMovieType(item)}
                >{item}</button>)
            }
        </ul>
    )
}

export default MoviesTypes
