import { Link } from "react-router-dom";
import img from "../assets/d20.png"

export default function Nav() {
   
    return (   
        <div className="bg-primary flex text-2xl justify-around m-2 rounded-sm items-center">       
        <img src={img} width={50} height={50} />        
            <Link to="/">
                <div className="h-full hover:bg-secondary rounded-md p-1 hover:border-2 hover:border-red-600">CHARACTER</div>
            </Link>
            <Link to="/races">
                <div className="h-full hover:bg-secondary rounded-md p-1 hover:border-2 hover:border-red-600">Races</div>
            </Link>
            <Link to="/classes">
                <div className="h-full hover:bg-secondary rounded-md p-1 hover:border-2 hover:border-red-600">Classes</div>
            </Link>
            <Link to="/ability-scores">
                <div className="h-full hover:bg-secondary rounded-md p-1 hover:border-2 hover:border-red-600">Ability Scores</div>
            </Link>
            <Link to="/alignment">
                <div className="h-full hover:bg-secondary rounded-md p-1 hover:border-2 hover:border-red-600">Alignment</div>
            </Link>           
            <Link to="/backgrounds">
                <div className="h-full hover:bg-secondary rounded-md p-1 hover:border-2 hover:border-red-600">Backgrounds</div>
            </Link>
            
            
        </div>    
    )
}