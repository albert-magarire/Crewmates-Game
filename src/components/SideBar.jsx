import { Link, Outlet } from "react-router-dom";
import "./sidebar.css"

const SideBar = () => {
    return(
        <div className="home-page">
            <div className="side-bar">
                <Link to={"/"}>Home</Link>
                <Link to={"/creation"}>Enlist a Crewmate</Link>
                <Link to={"/gallery"}>Crew Gallery</Link>
            </div>
            <Outlet/>
        </div>
    )
}

export default SideBar