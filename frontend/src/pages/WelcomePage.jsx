import { Link } from 'react-router-dom'
import '../styles/WelcomePage.css'

export default function WelcomePage() {
    return (
        <div id="welcome-page">
            <img alt="decorative plant illustration"></img>
            <h2>
                A little home for your
                <em>&nbsp;leafy companions.</em>
            </h2>
            <p> Every plant has its own little quirks 
                and it can be overwhelming to manage as your collection grows. 
                We’re here to help you remember them! Keep track of their species, 
                watering needs, light requirements, and more!
            </p>
            <Link to="/add" class="button-link">start your journey</Link>
            
        </div>
    )
}