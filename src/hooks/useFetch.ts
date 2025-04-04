/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { MovieType } from "../types/MovieType";
import { getUrl } from "./getUrl";
import { getRealData } from "./getRealData";
import { Root } from "../types/Root";
import { Actor } from "../types/Actor";
type MovieDetailsType = {
  movie: MovieType;
  cast: Actor[];
};
export const useFetch = (url: string) => {
  const isMovieDetails = url.match(/^movie\/\d+$/);
  const isActorDetails = url.match(/person\/\d+/);
  const isTrending = url === "trending/movie/week";
  const isDiscover = url === "discover/movie";
  const isRelatedMovies = url.match(/movie\/\d+\/similar/);
  const isActorMovies = url.match(/person\/\d+\/movie_credits/);
  const fullUrl = getUrl(url);
  const [data, setData] = useState<MovieType[]>([]);
  const [trending, setTrending] = useState<MovieType[]>([]);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType>({
    movie: {} as MovieType,
    cast: [],
  });
  const [actor, setActor] = useState<Actor>({} as Actor);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [related, setRelated] = useState<MovieType[]>([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(fullUrl)
      .then(({ data }) => {
        if (isMovieDetails) {
          setMovieDetails((prev) => {
            return { ...prev, movie: getRealData(data) };
          });
          axios.get(getUrl(`${url}/credits`)).then(({ data: actors }) => {
            setMovieDetails((prev) => {
              return {
                ...prev,
                cast: actors.cast.map((actor: Actor) => actor),
              };
            });
          });
        } else if (isActorDetails)
          setActor({
            cast_id: data.cast_id,
            character: data.character,
            gender: data.gender,
            id: data.id,
            name: data.name,
            profile_path: data.profile_path,
            biography: data.biography,
            birthday: data.birthday,
            place_of_birth: data.place_of_birth,
          });
        if (isTrending)
          setTrending(data.results.map((result: Root) => getRealData(result)));
        else if (isDiscover)
          setData(data.results.map((result: Root) => getRealData(result)));
        else if (isActorMovies)
          setRelated(data.cast.map((result: Root) => getRealData(result)));
        else if (isRelatedMovies)
          setRelated(data.results.map((result: Root) => result));
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [fullUrl]);
  return {
    data,
    trending,
    isLoading,
    error,
    movieDetails,
    actor,
    related,
  };
};
