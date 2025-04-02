import { Outlet } from "react-router"
import Header from "./components/Header/Header"

const Layout = () => {
    return (
        <div className="container">
            <Header />
            <Outlet></Outlet>
        </div>
    )
}

export default Layout
