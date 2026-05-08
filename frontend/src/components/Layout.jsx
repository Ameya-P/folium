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
                <NavLink to="/">Home</NavLink>
                <NavLink to="/add">Add Plants</NavLink>
                <NavLink to="/plants">View Collection</NavLink>
                </nav>
                <div id="outlet-container">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};