import { useState } from "react"
import { deletePlant } from "../api"
import '../styles/CollectionPage.css'

export default function DeleteModal({id, visible, onDelete, onClose}) {
    const [deleted, setDeleted] = useState(false)     
    const [loading, setLoading] = useState(false)  
    const [error, setError] = useState(null) 
    
    async function handleDelete() {
        try {
            setLoading(true);
            await deletePlant(id);
            setDeleted(true);
            onDelete(id);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    function renderModalTitle() {
        if (loading) {
            return <h3> Loading ... </h3>;
        } else if (error) {
            return <h3> Error </h3>;
        } else if (deleted) {
            return <h3> Deletion Successful </h3>;
        } else {
            return <h3>Are you sure you want to delete your plant?</h3>;
        }
    }

    function renderModalDescription() {
        if (loading) {
            return <p> We're deleting your plant. Thank you for your patience! </p>;
        } else if (error) {
            return <p> {error} </p>;
        } else if (deleted) {
            return <p> Your plant has been deleted. </p>;
        } else {
            return <p>If you do that, all associated data will be lost 
                    and you’ll have to re-add it if you want this plant 
                    to be tracked again.</p>;
        }
    }

    return (
        <>
            {visible ? 
                <div className="delete-modal">
                    <div className="modal-header">
                        {renderModalTitle()}
                        <button onClick={onClose}>X</button>
                    </div>
                    {renderModalDescription()}
                    {!deleted && !error &&
                        <div className="button-group">
                            <button onClick={handleDelete}>Yes</button>
                            <button onClick={onClose}>No</button>
                        </div>
                    }
                    {error && 
                        <button onClick={() => {
                            setError(null)
                            setLoading(false)
                        }}>Try again</button>
                    }   
                </div> 
                : null
            }
        </>
    )
}