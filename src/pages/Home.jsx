import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div>
            <Link to="/classes">
                <div>Begin your journey</div>
            </Link>
        </div>
    )
}