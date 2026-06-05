import { useState } from "react"
import { bulkCreatePlants } from "../api"
import '../styles/AddPlantPage.css'
import { useNavigate, Link } from "react-router-dom"

export default function BulkAddPlantPage() {
    const [formData, setFormData] = useState("")
    const [loading, setLoading] = useState(false)  
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    function handleChange(e) {
        setFormData(e.target.value)
    }

    const commaStringToArray = (str) => {
        if (!str) return []; 
        return str.split(',').map(item => item.trim());
        };

    async function handleSubmit(e) {
        e.preventDefault() 
        try {
            setLoading(true);
            const dataList = commaStringToArray(formData)
            await bulkCreatePlants(dataList)
            navigate("/plants");
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
            setFormData("")
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

    return (<div className="form-container">
        <div className="mini-header">
            <h2>Add multiple <em>pals</em>!</h2>
            <Link className="btn" to="/add">Return to add plant options</Link>
        </div>
        <form> 
            <label htmlFor="bulk-list">List all of your plant names as comma separated values! We’ll create cards you can fill out later.</label>
            <textarea id="bulk-list" name="bulk-list" rows="4" cols="50" value={formData} placeholder="Pothos, Fern, Cactus..." onChange={handleChange}>
            </textarea>
            {renderSubmitButton()}
        </form>
        <div>Note: You'll be able to update plant details after the next update!</div>
    </div>)
}