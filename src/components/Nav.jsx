import { Link } from "react-router-dom";

export default function Nav() {
   
    return (
        <div >
            <Link to="/">
                <div>Home</div>
            </Link>
            <Link to="/classes">
                <div>Classes</div>
            </Link>
        </div>
    )
}