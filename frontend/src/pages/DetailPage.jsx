import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPlant } from "../api"

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

    function renderPage() {
        if (loading) {
            return <p> Loading ... </p>;
        } else if (error) {
            return <p> {error} </p>;
        } else {
            return <>
                <h2>{plant.common_name}</h2>
                {plant.botanical_name && <h3><em>{plant.botanical_name}</em></h3>}
                <img alt="plant image"></img>
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
        <Link to="/plants">Return To Your Collection</Link>
    </div>
}