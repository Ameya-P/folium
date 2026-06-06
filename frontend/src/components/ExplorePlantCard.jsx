import { Link } from "react-router-dom"
import '../styles/CollectionPage.css'
import { IMAGE_SERVICE } from "../api"

export default function ExplorePlantCard(props) {
    const imageUrl = props.image_id 
    ? `${IMAGE_SERVICE}/image/${props.image_id}/`
    : "/placeholder.png"

    return (
        <div className="plant-card">
            <img src={imageUrl} alt={props.common_name} />
            <div className="plant-info">
                <h3>{props.common_name}</h3>
                {props.watering_frequency && <p>{`💧: ${props.watering_frequency}`} </p>}
                {props.light_needs && <p>{`☀️: ${props.light_needs}`} </p>}
            </div>
            <Link className="btn" onClick={() => props.setFeaturedPlantIndex(props.index)}> Learn More </Link>
        </div>
    )
}