/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { MovieType } from "../types/MovieType";
import { getUrl } from "./getUrl";
import { getRealData } from "./getRealData";
import { Root } from "../types/Root";
import { Actor } from "../types/Actor";

export const useFetch = (url: string) => {
  const fullUrl = getUrl(url);
  const [data, setData] = useState<MovieType[]>([]);
  const [trending, setTrending] = useState<MovieType[]>([]);
  const [movieDetails, setMovieDetails] = useState<MovieType>({} as MovieType);
  const [actors, setActors] = useState<Actor[]>([]);
  const [actor, setActor] = useState<Actor>({} as Actor);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [related, setRelated] = useState<MovieType[]>([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(fullUrl)
      .then(({ data }) => {
        if (url.match(/^movie\/\d+$/)) {
          setMovieDetails(getRealData(data));
          axios.get(getUrl(`${url}/credits`)).then(({ data }) => {
            data.cast.map((actor: Actor) => {
              setActors((prev) => [
                ...prev,
                {
                  cast_id: actor.cast_id,
                  character: actor.character,
                  gender: actor.gender,
                  id: actor.id,
                  name: actor.name,
                  profile_path: actor.profile_path,
                  homepage: actor.homepage,
                },
              ]);
            });
          });
        } else if (url.match(/person\/\d+/)) {
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
        }
        if (url == "trending/movie/week") {
          console.log("Trending");
          data.results.map((result: Root) => {
            setTrending((prev) => [...prev, getRealData(result)]);
          });
        } else if (url == "discover/movie") {
          console.log("Discover");
          data.results.map((result: Root) => {
            setData((prev) => [...prev, getRealData(result)]);
          });
        } else if (url.match(/person\/\d+\/movie_credits/)) {
          console.log("Related To Actor");
          data.cast.map((result: Root) => {
            setRelated((prev) => [...prev, getRealData(result)]);
          });
        } else if (url.match(/movie\/\d+\/similar/)) {
          console.log("Similar");
          data.results.map((result: Root) => {
            setRelated((prev) => [...prev, getRealData(result)]);
          });
        }
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
    actors,
    actor,
    related,
  };
};
