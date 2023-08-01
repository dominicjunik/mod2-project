import { Link } from "react-router-dom";
import img from "../assets/d20.png"

export default function Nav() {
   
    return (   
        <div className="bg-primary flex text-2xl justify-around m-2 rounded-md items-center shadow-pop-out p-1 text-white">       
        <img className="shadow-stone rounded-full" src={img} width={50} height={50} />        
            <Link to="/">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-orange-100 focus:ring-4">CHARACTER</div>
            </Link>
            <Link to="/races">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-orange-100 focus:ring-4">Races</div>
            </Link>
            <Link to="/classes">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-orange-100 focus:ring-4">Classes</div>
            </Link>
            <Link to="/ability-scores">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-orange-100 focus:ring-4">Ability Scores</div>
            </Link>
            <Link to="/alignment">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-orange-100 focus:ring-4">Alignment</div>
            </Link>           
            <Link to="/backgrounds">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-orange-100 focus:ring-4">Backgrounds</div>
            </Link>
            
            
        </div>    
    )
}