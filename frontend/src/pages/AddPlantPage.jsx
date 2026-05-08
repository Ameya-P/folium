import { useState } from "react"
import '../styles/AddPlantPage.css'
import { Link } from "react-router-dom"

export default function AddPlantPage() {

    return (<div className="add-plant-hub">
        <h2>Fill out your <em>collection</em>!</h2>
        <div className="option-container">
            <Link to="/add/details"> Add one plant at a time (detailed form) </Link>
            <Link to="/add/bulk"> Add multiple plants (simplified form) </Link>
        </div>
    </div>)
}