import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPlant, IMAGE_SERVICE } from "../api"
import '../styles/DetailPage.css'

export default function DetailPage() {
    const params = useParams();
    const [plant, setPlant] = useState(null)     
    const [loading, setLoading] = useState(true)  
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
            setLoading(true);
            const result = await getPlant(params.id);
            setPlant(result.plant);
            } catch (e){
                setError(e.message)
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    const imageUrl = plant?.image_id 
        ? `${IMAGE_SERVICE}/image/${plant.image_id}`
        : "/placeholder.png"

    function renderPage() {
        if (loading) {
            return <p> Loading ... </p>;
        } else if (error) {
            return <p> {error} </p>;
        } else {
            return <>
                <h2>{plant.common_name}</h2>
                {plant.botanical_name && <h3><em>{plant.botanical_name}</em></h3>}
                <img src={imageUrl} alt={plant.common_name} />
                <div className="stats">
                    {plant.location && <p>📍{plant.location}</p>}
                    {plant.light_needs && <p>☀️{plant.light_needs}</p>}
                    {plant.watering_frequency && <p>💧{plant.watering_frequency}</p>}
                </div>
                {
                    plant.notes && 
                    <div className="description">
                        {plant.nickname && <h3>{`${plant.nickname}'s Quirks`}</h3>}
                        <p>{plant.notes}</p>
                    </div>
                }
            </>
        }
    }

    return <div className="detail-page">
        {renderPage()}
        <Link className="btn" to="/plants">Return To Your Collection</Link>
    </div>
}