import { Link } from "react-router-dom";

export default function Nav() {
   
    return (
        <div className="nav">
            <Link to="/">
                <div>Home</div>
            </Link>
            <Link to="/classes">
                <div>Classes</div>
            </Link>
            <Link to="/races">
                <div>Races</div>
            </Link>
            <Link to="/backgrounds">
                <div>Backgrounds</div>
            </Link>
            <Link to="/alignment">
                <div>Alignment</div>
            </Link>
            <Link to="/ability-scores">
                <div>Ability Scores</div>
            </Link>
        </div>
    )
}