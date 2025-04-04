import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react"
import { Category } from "../types/Category";
type DataContextProviderProps = {
    children: ReactNode
}
type dataContextType = {
    categories: Category[]
};
export const dataContext = createContext<dataContextType>({} as dataContextType);
const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const [categories, setCategories] = useState<Category[]>([])

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
        <dataContext.Provider value={{ categories, }} >
            {children}
        </dataContext.Provider>
    )
}

export default DataContextProvider
