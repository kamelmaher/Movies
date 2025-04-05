/** @format */
import axios from "axios";
import { useEffect, useState } from "react";
type Selector = <T>(data: any) => T;
type params = {
  query?: string;
};
export const useFetch = <T>(
  url: string,
  params?: params,
  selector?: Selector
) => {
  const [data, setData] = useState<T>({} as T);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    if (params?.query && params.query == "") return;
    axios
      .get(
        `https://api.themoviedb.org/3/${url}?api_key=acecc2235b3b867602d49291bcc21926`,
        {
          params: params,
        }
      )
      .then(({ data }) => {
        const selected = selector ? selector(data) : data.results;
        setData(selected);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [url, params?.query]);
  return {
    data,
    isLoading,
    error,
  };
};
