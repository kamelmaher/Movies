const MovieDetails = () => {
    return (
        <div>
            {
                <>
                    <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start mt-5">
                        <div className="movie-img mb-3">
                            <div className="imgage text-center">
                                {/* <img src={`https://image.tmdb.org/t/p/w300${movie!.poster_path}`} alt="Image Of The Movie" className="rounded img-fluid img-details" /> */}
                            </div>
                        </div>
                        <div className="movie-details text-center text-sm-start">
                            <div>
                                <h1>"Movie"</h1>
                                <p className="movie-desc mt-3 p-1 rounded">test</p>
                                <div className="details row">
                                    <div className="movie-detail col-md-6">
                                        <p>Categoreis: <span className="text-danger">
                                        </span></p>
                                    </div>
                                    <div className="movie-detail col-md-6">
                                        <p>Rating: <span className="text-danger"></span></p>
                                    </div>
                                    <div className="movie-detail col-md-6">
                                        <p>Language: <span className="text-danger"></span></p>
                                    </div>
                                    <div className="movie-detail col-md-6">
                                        <p>Realease Date: <span className="text-danger"></span></p>
                                    </div>
                                    <div className="movie-detail col-md-6">
                                        <p>Country: <span className="text-danger"></span></p>
                                    </div>
                                </div>

                                <h5>Cast</h5>
                                {/* <div className="actors row mt-3">
                                    {
                                        actors.map((e, i) => {
                                            return <div key={i} className="col-sm-6 col-md-4 actor d-flex gap-2 align-items-center mb-3" onClick={() => {
                                                navigate(`/movie/actors/${e.id}`)
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
                                } */}
                            </div>
                        </div>
                    </div>

                    {/* Seasons  */}

                    {/* {
                        content == "tv" &&
                        <div className="seasons mt-3">
                            <h3>Seasons</h3>
                            <div className="d-flex gap-3 flex-wrap justify-content-around">
                                {
                                    seasons.map(e => {
                                        return <div key={e.id}>
                                            <img src={`https://image.tmdb.org/t/p/w200${e.poster_path}`} alt="" className="img-fluid" onClick={() => {
                                                navigate(`/serie/${movieId}/seasons/${e.season_number}`)
                                            }} />
                                            <h5 className="text-center">{e.name}</h5>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    } */}

                    {/* Related Movies */}

                    {/* <div className="related mt-4">
                        <div className="row mt-3">
                            {
                                related.map(e => {
                                    const myCategories: Category[] = []
                                    allCategories.map(category => {
                                        e.genre_ids.map(id => {
                                            if (id == category.id) myCategories.push(category)
                                        })
                                    })
                                    return <div key={e.id} className="col-md-3" onClick={() => {
                                        setLoading(true)
                                    }}>
                                        <Movie movie={e} myCategories={myCategories}></Movie>
                                    </div>
                                })
                            }
                        </div>
                    </div> */}
                </>
            }
        </div>
    )
}

export default MovieDetails