import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react"
import { Category } from "../types/Category";
import { MovieType } from "../types/MovieType";
import { Root } from "../types/Root";
import { getRealData } from "../hooks/getRealData";
type DataContextProviderProps = {
    children: ReactNode
}
type dataContextType = {
    categories: Category[]
    searchState: SearchState
    handleSearch: (search: string) => void
    closeMenu: () => void
};
export const dataContext = createContext<dataContextType>({} as dataContextType);
type SearchState = {
    isLoading: boolean,
    searchResults: MovieType[],
    showSearchMenu: boolean
}
const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [searchState, setSearchState] = useState<SearchState>({} as SearchState)
    const closeMenu = () => {
        setSearchState(prev => { return { ...prev, showSearchMenu: false } })
    }
    const handleSearch = (search: string) => {
        if (search.length > 0) {
            setSearchState(prev => { return { ...prev, isLoading: true, showSearchMenu: true } })
            axios
                .get(
                    `https://api.themoviedb.org/3/search/movie?api_key=acecc2235b3b867602d49291bcc21926&query=${search}`
                )
                .then(({ data }) => {
                    setSearchState(prev => { return { ...prev, searchResults: data.results.map(((result: Root) => getRealData(result))), isLoading: false } })
                });
        } else closeMenu()

    }
    useEffect(() => {
        const data = localStorage.getItem("categories")
        if (data) {
            const parsedCategories = JSON.parse(data)
            setCategories(parsedCategories)
        } else {
            axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=acecc2235b3b867602d49291bcc21926").then(({ data }) => {
                setCategories(data.genres)
                localStorage.setItem("categories", JSON.stringify(data.genres))
            })
        }
    }, [])

    return (
        <dataContext.Provider value={{ categories, handleSearch, searchState, closeMenu }} >
            {children}
        </dataContext.Provider>
    )
}

export default DataContextProvider
