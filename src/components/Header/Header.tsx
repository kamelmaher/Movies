import { NavLink } from "react-router-dom"
import HeaderLink from "./HeaderLink"
import { useState } from "react"
import { useAppDispatch } from "../../Store/Store"
import { changeContent } from "../../Store/ContentSlice"

const Header = () => {
    const links = [["Movies" , "movie"] ,  ["Series" , "tv"]]
    const [activeLink , setActiveLink] = useState(-1)
    const dispatch = useAppDispatch()
    return (
        <div>
            <nav className="navbar navbar-expand-md bg-light header">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-white" to="/">Movies Land</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                links.map((e , index) => <HeaderLink key={index} text={e[0]} isActive={activeLink == index} handleClick={() => {
                                    setActiveLink(index)
                                    dispatch(changeContent(e[1]))
                                }} />)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
