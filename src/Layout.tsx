import { Outlet } from "react-router"
import Header from "./components/Header/Header"

const Layout = () => {
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
