import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="error-page">
            <h2>404 Not Found</h2>
            <Link className="btn" to="/">Home</Link>
        </div>
    )
}