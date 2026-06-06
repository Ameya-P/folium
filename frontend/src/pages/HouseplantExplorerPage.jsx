import { useState } from "react";
import '../styles/HouseplantExplorerPage.css'
import { getHouseplants, getRandomNumber, IMAGE_SERVICE } from "../api"
import ExplorePlantCard from "../components/ExplorePlantCard"

export const CATEGORY = Object.freeze({
  TROPICAL: "Tropical",
  SUCCULENTS: "Succulents",
  CACTI: "Cacti",
  FERNS: "Ferns",
  PALMS: "Palms",
  CARNIVOROUS: "Carnivorous",
  FLOWERING: "Flowering",
  EDIBLES: "Edibles",
  ALL: "",
});

export default function HouseplantExplorerPage() {
    const initialFormState = {
        category: CATEGORY.ALL,
        size: 20,
    }
    const [formData, setFormData] = useState(initialFormState)
    const [plants, setPlants] = useState([])
    const [featuredPlantIndex, setFeaturedPlantIndex] = useState(0)
    const [loading, setLoading] = useState(false)  
    const [error, setError] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        })
    }

    async function handleSubmit(e) {
        e.preventDefault() 
        try {
            setLoading(true);
            if (!formData.category){
                formData.category = null
            }
            const resultsArray = await getHouseplants(formData.category, formData.size)
            if (resultsArray.length === 0) {
                throw new Error("No plants found for this category")
            }

            setPlants(resultsArray);
            const resultsNumber = await getRandomNumber(0, resultsArray.length - 1)
            setFeaturedPlantIndex(resultsNumber.numList[0])
            setHasSearched(true)
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
            setFormData(initialFormState)
        }
    }

    function renderSubmitButton() {
        if (loading) {
            return <button disabled> Loading ... </button>;
        } else if (error) {
            return <button onClick={handleSubmit}> Try Again? </button>;
        } else {
            return <button onClick={handleSubmit}> Submit </button>;
        }
    }

    const featuredPlant = plants.length > 0 ? plants[featuredPlantIndex] : null
    const imageUrl = featuredPlant?.image_id && featuredPlant.image_id !== "placeholder"
    ? `${IMAGE_SERVICE}/image/${featuredPlant.image_id}`
    : "/placeholder.png"

    function renderPlants() {
        if (!hasSearched) {
            return <p>Get to know all the house plants out there!</p>
        } else if (loading) {
            return <button disabled> Loading ... </button>;
        } else if (error) {
            return <button onClick={handleSubmit}> {error} </button>;
        } else {
            return (
                <div id="collection-container">
                    {plants.map((plant, index) => (
                        <ExplorePlantCard key={plant._id} {...plant} index={index} setFeaturedPlantIndex={setFeaturedPlantIndex}></ExplorePlantCard>))}
                </div>
                )
        }
    }

    return (
        <div className="houseplant-explorer-page">
            <div className="form-container">
                <h2>Meet a new <em>plant pal</em>!</h2>
                <form>
                    <label htmlFor="category">Houseplant category</label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange}>
                        <option value={CATEGORY.ALL}>All plants</option>
                        <option value={CATEGORY.TROPICAL}>{CATEGORY.TROPICAL}</option>
                        <option value={CATEGORY.SUCCULENTS}>{CATEGORY.SUCCULENTS}</option>
                        <option value={CATEGORY.CACTI}>{CATEGORY.CACTI}</option>
                        <option value={CATEGORY.FERNS}>{CATEGORY.FERNS}</option>
                        <option value={CATEGORY.PALMS}>{CATEGORY.PALMS}</option>
                        <option value={CATEGORY.CARNIVOROUS}>{CATEGORY.CARNIVOROUS}</option>
                        <option value={CATEGORY.FLOWERING}>{CATEGORY.FLOWERING}</option>
                        <option value={CATEGORY.EDIBLES}>{CATEGORY.EDIBLES}</option>
                    </select>
                    <label htmlFor="size">Quantity</label>
                    <input type="number" id="size" name="size" min="1" value={formData.size} onChange={handleChange}></input>
                    {renderSubmitButton()}
                </form>
            </div>
            <hr></hr>
            {hasSearched && featuredPlant && 
                <div className="detailed-view"> 
                <h2>{featuredPlant.common_name}</h2>
                 <h3><em>{featuredPlant.botanical_name}</em></h3>
                <img src={imageUrl} alt={featuredPlant.common_name} />
                <div className="stats">
                    <p>☀️{featuredPlant.light_needs}</p>
                    <p>💧{featuredPlant.watering_frequency}</p>
                </div>
                <div className="description">
                        <p>{featuredPlant.description}</p>
                    </div>
                </div>
            }
            <hr></hr>
            {renderPlants()}
        </div>
    )
}