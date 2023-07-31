import { Link } from "react-router-dom";
import img from "../assets/d20.png"

export default function Nav() {
   
    return (   
        <div className="nav">       
        <img src={img} width={50} height={50} />        
            <Link to="/">
                <div>Home</div>
            </Link>
            <Link to="/races">
                <div>Races</div>
            </Link>
            <Link to="/classes">
                <div>Classes</div>
            </Link>
            <Link to="/ability-scores">
                <div>Ability Scores</div>
            </Link>
            <Link to="/alignment">
                <div>Alignment</div>
            </Link>           
            <Link to="/backgrounds">
                <div>Backgrounds</div>
            </Link>
            
            
        </div>    
    )
}