import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react"
import { Category } from "../types/Category";
type DataContextProviderProps = {
    children: ReactNode
}
type dataContextType = {
    movietype: string
    typeOfMovies: string[]
    handleChangeType: (e: string) => void,
    categories: Category[]
};
export const dataContext = createContext<dataContextType>({} as dataContextType);
const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const typeOfMovies = ["Top Rated", "Popular", "Up Coming", "Now Playing"]
    const [movietype, setMovieType] = useState("")
    const [categories, setCategories] = useState<Category[]>([])
    const handleChangeType = (e: string) => setMovieType(e)
    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=acecc2235b3b867602d49291bcc21926").then(({ data }) => setCategories(data.genres))
    }, [])
    return (
        <dataContext.Provider value={{ typeOfMovies, movietype, handleChangeType, categories }} >
            {children}
        </dataContext.Provider>
    )
}

export default DataContextProvider
