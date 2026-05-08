import { useState, useEffect } from "react"
import { getPlants } from "../api"
import PlantCard from "../components/PlantCard"
import DeleteModal from "../components/DeleteModal"
import { Link } from "react-router-dom"
import '../styles/CollectionPage.css'

export default function CollectionPage() {
    const [plants, setPlants] = useState([])     
    const [loading, setLoading] = useState(false)  
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedPlant, setSelectedPlant] = useState(null)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
            setLoading(true);
            const result = await getPlants();
            setPlants(result.plants);
            } catch (e){
                setError(e.message)
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    // remove delete plant from list
    function handleDelete(id) {
        setPlants(plants.filter(plant => plant.id !== id));
    }

    function renderCollection() {
        if (loading) {
            return <p> Loading ... </p>;
        } else if (error) {
            return <p> {error} </p>;
        } else if (plants.length === 0) {
            return <div> 
                <p>There are no plants in your collection.</p>
                <Link to="/add">Add some new plant friends!</Link></div>;
        } else {
            return <div id="collection-container">
                {plants.map((plant) => (
                    <PlantCard key={plant.id} {...plant} setSelectedPlant={setSelectedPlant} setShowModal={setShowModal}></PlantCard>))}
            </div>
        }
    }

    return (
        <div id="collection-page">
            <DeleteModal id={selectedPlant} visible={showModal} onDelete={handleDelete} onClose={() => setShowModal(false)} />
            <h2>
                {"{"}User’s{"}"} 
                <em>&nbsp;garden</em>
            </h2>
            {renderCollection()}
        </div>
    )
}