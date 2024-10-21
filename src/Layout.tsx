import { Outlet } from "react-router"
import Header from "./components/Header/Header"
import { useEffect } from "react"
import axios from "axios"
import { setCategories } from "./Store/CategorySlice"
import { useAppDispatch, useAppSelector } from "./Store/Store"
import { setContent } from "./Store/LinkSlice"

const Layout = () => {
    const content = useAppSelector(state => state.Link.content)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const data = localStorage.getItem("content")
        if(data) {
            dispatch(setContent(JSON.parse(data)))
        }
        
        // Fetch All Categories
        axios.get(`https://api.themoviedb.org/3/genre/${content}/list?api_key=acecc2235b3b867602d49291bcc21926`).then(({ data }) => {
            dispatch(setCategories(data.genres))
        })

    } , [])
    return (
        <div className="container">
            <Header />
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Layout
