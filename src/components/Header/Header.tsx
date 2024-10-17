import { NavLink, useNavigate } from "react-router-dom"
import HeaderLink from "./HeaderLink"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Store/Store"
import { setContent } from "../../Store/LinkSlice"
import { setSearch } from "../../Store/SearchSlice"

const Header = () => {
    const searchValue = useAppSelector(state => state.Search.search)
    const [search , setSearchValue] = useState("")
    useEffect(() => {
        setSearchValue(searchValue)
    } , [searchValue])
    const links = [["Movies", "movie"], ["Series", "tv"]]
    const [activeLink, setActiveLink] = useState(-1)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light header">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-white" to="/">Movies Land</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                links.map((e, index) => <HeaderLink key={index} text={e[0]} isActive={activeLink == index} handleClick={() => {
                                    setActiveLink(index)
                                    dispatch(setContent(e[1]))
                                    navigate(`/`)
                                }} />)
                            }
                            <div className="ms-4 search-bar">
                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder="Search" value={search} onChange={e => {
                                        dispatch(setSearch(e.target.value))
                                    }} />
                                    <label>Search</label>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
