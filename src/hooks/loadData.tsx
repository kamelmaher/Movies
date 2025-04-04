import { NavLink } from "react-router-dom";
import Movie from "../components/Movie/Movie";
import { MovieType } from "../types/MovieType";

export const loadData = (data: MovieType[]) =>
    data.map(movie => <NavLink key={movie.id} className="col-6 col-sm-3" to={`/movie/${movie.id}`}>
        <Movie movie={movie} />
    </NavLink>)
