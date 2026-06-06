import { useState } from "react"
import { createPlant, uploadImage } from "../api"
import '../styles/AddPlantPage.css'
import { useNavigate, Link } from "react-router-dom"

export default function DetailedAddPlantPage() {
    const initialFormState = {
        common_name: "",
        nickname: "",
        location: "",
        light_needs: null,
        watering_frequency: null,
        botanical_name: "",
        notes: ""
    }
    const [formData, setFormData] = useState(initialFormState)
    const [loading, setLoading] = useState(false)  
    const [error, setError] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const navigate = useNavigate()

    function handleFileChange(e) {
        setImageFile(e.target.files[0])
    }

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

            let image_id = null
            if (imageFile) {
                image_id = await uploadImage(imageFile)
            }

            await createPlant({...formData, image_id})
            setFormData(initialFormState)
            navigate("/plants");
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
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
            <h2>Add a new <em>plant pal</em>!</h2>
            <Link className="btn" to="/add">Return to add plant options</Link>
        </div>
        <form>
            <label htmlFor="common_name">Common name</label>
            <input type="text" id="common_name" name="common_name" onChange={handleChange}/>

            <label htmlFor="botanical_name">Botanical name</label>
            <input type="text" id="botanical_name" name="botanical_name" onChange={handleChange}/>

            <label htmlFor="nickname">Nickname</label>
            <input type="text" id="nickname" name="nickname" onChange={handleChange}/>

            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" onChange={handleChange}/>

            <p>Light needs</p>
            <div className="light-needs-container">
                <label>
                <input 
                    type="radio" 
                    name="light_needs" 
                    value="bright direct light"
                    checked={formData.light_needs === "bright direct light"} 
                    onChange={handleChange} /> bright direct light
                </label>

                <label>
                    <input 
                        type="radio" 
                        name="light_needs" 
                        value="bright indirect light"
                        checked={formData.light_needs === "bright indirect light"} 
                        onChange={handleChange} /> bright indirect light
                </label>

                <label>
                    <input 
                        type="radio" 
                        name="light_needs" 
                        value="medium indirect light"
                        checked={formData.light_needs === "medium indirect light"} 
                        onChange={handleChange} /> medium indirect light
                </label>

                <label>
                    <input 
                        type="radio" 
                        name="light_needs" 
                        value="low light"
                        checked={formData.light_needs === "low light"} 
                        onChange={handleChange} /> low light
                </label>
            </div>

            <p>Watering needs</p>
            <div className="watering-needs-container">
                <label>
                    <input 
                        type="radio" 
                        name="watering_frequency" 
                        value="drought tolerant"
                        checked={formData.watering_frequency === "drought tolerant"} 
                        onChange={handleChange} /> drought tolerant
                </label>

                <label>
                    <input 
                        type="radio" 
                        name="watering_frequency" 
                        value="low to moderate"
                        checked={formData.watering_frequency === "low to moderate"} 
                        onChange={handleChange} /> low to moderate
                </label>

                <label>
                    <input 
                        type="radio" 
                        name="watering_frequency" 
                        value="keep moist"
                        checked={formData.watering_frequency === "keep moist"} 
                        onChange={handleChange} /> keep moist
                </label>

                <label>
                    <input 
                        type="radio" 
                        name="watering_frequency" 
                        value="keep wet"
                        checked={formData.watering_frequency === "keep wet"} 
                        onChange={handleChange} /> keep wet
                </label>
            </div>

            <label htmlFor="image">Plant photo (optional)</label>
            <input 
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
            />

            <label htmlFor="notes">Notes</label>
            <textarea 
                id="notes" 
                name="notes" 
                rows="4" 
                cols="50" 
                onChange={handleChange}
                placeholder="Note anything you want to remember about your plant!"
            >
            </textarea>
            {renderSubmitButton()}
        </form>
    </div>)
}