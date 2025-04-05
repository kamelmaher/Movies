import { createContext, ReactNode, useContext } from "react"
import { Category } from "../types/Category";
import { useFetch } from "../hooks/useFetch";
type FetchResult<T> = {
    data: T | null;
    isLoading: boolean;
    error: string | null;
};

type DataContextProviderProps = {
    children: ReactNode
}

type dataContextType = {
    categories: FetchResult<Category[]>
};

const dataContext = createContext<dataContextType>({} as dataContextType);

export const useData = () => {
    const context = useContext(dataContext);
    if (!context) {
        throw new Error("useData must be used inside DataProvider");
    }
    return context;
};

const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const categories = useFetch<Category[]>(`genre/movie/list`, {}, (data) => data.genres)
    return (
        <dataContext.Provider value={{ categories }} >
            {children}
        </dataContext.Provider>
    )
}

export default DataContextProvider
