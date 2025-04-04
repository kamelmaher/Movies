import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { dataContext } from "../../context/DataContextProvider"
import SearchResults from "./SearchResults"
const Header = () => {
    const { handleSearch } = useContext(dataContext)
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-light header">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-white" to="/">Movies Land</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ position: "relative" }}>
                            <form className="ms-4 search-bar" onSubmit={(e) => {
                                e.preventDefault()
                            }}>
                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder="Search"
                                        onChange={e => {
                                            if (e.target.value == "")
                                                handleSearch("")
                                            else
                                                handleSearch(e.target.value)
                                        }}
                                    />
                                    <label>Search</label>
                                </div>
                            </form>
                            <SearchResults />
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
