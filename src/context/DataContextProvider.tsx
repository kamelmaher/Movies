import { createContext, ReactNode } from "react"
type DataContextProviderProps = {
    children: ReactNode
}
type dataContextType = {
    name: string;
};
export const dataContext = createContext<dataContextType>({ name: "" });

const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const name = "Kamel"
    return (
        <dataContext.Provider value={{ name }} >
            {children}
        </dataContext.Provider>
    )
}

export default DataContextProvider
