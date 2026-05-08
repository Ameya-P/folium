import { Link } from "react-router-dom"
import '../styles/CollectionPage.css'

export default function PlantCard(props) {

    function handleDelete(id) {
        props.setSelectedPlant(id);
        props.setShowModal(true);
    }

    return (
        <div className="plant-card">
            <button onClick={() => handleDelete(props.id)}>X</button>
            <img alt="depicts plant user uploaded"></img>
            <div className="plant-info">
                <h3>{props.common_name}</h3>
                {props.location && <p>{`📍: ${props.location}`} </p>}
                {props.watering_frequency && <p>{`💧: ${props.watering_frequency}`} </p>}
                {props.light_needs && <p>{`☀️: ${props.light_needs}`} </p>}
            </div>
            <Link to={`/plants/${props.id}`}> View Details </Link>
        </div>
    )
}