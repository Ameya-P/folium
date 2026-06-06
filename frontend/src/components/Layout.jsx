import "../styles/Layout.css"
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div id="layout">
            <header>
              <h1>Folium</h1>
              <em>Your garden's memory, rooted in one place.</em>
            </header>
            <div id="content">
                <nav>
                <NavLink to="/" className="btn green">Home</NavLink>
                <NavLink to="/add" className="btn green">Add Plants</NavLink>
                <NavLink to="/plants" className="btn green">View Collection</NavLink>
                <NavLink to="/explore" className="btn green">Explore New Plants</NavLink>
                </nav>
                <div id="outlet-container">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};