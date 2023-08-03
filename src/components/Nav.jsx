import { Link } from "react-router-dom";
import img from "../assets/d20.png"

export default function Nav() {
   
    return (   
        <div className="bg-primary flex text-2xl justify-around m-2 rounded-md items-center shadow-pop-out p-1 text-orange-100">       
        <img className="shadow-stone rounded-full" src={img} width={50} height={50} />        
            <Link to="/">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-white focus:ring-4 hover:bg-secondary transform active:scale-95 transition-transform">CHARACTER</div>
            </Link>
            <Link to="/races">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-white focus:ring-4 hover:bg-secondary transform active:scale-95 transition-transform">Races</div>
            </Link>
            <Link to="/classes">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-white focus:ring-4 hover:bg-secondary transform active:scale-95 transition-transform">Classes</div>
            </Link>
            <Link to="/ability-scores">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-white focus:ring-4 hover:bg-secondary transform active:scale-95 transition-transform">Ability Scores</div>
            </Link>
            <Link to="/alignment">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-white focus:ring-4 hover:bg-secondary transform active:scale-95 transition-transform">Alignment</div>
            </Link>           
            <Link to="/backgrounds">
                <div className="h-full hover:shadow-stone rounded-md p-1 hover:box-border hover:text-white focus:ring-4 hover:bg-secondary transform active:scale-95 transition-transform">Backgrounds</div>
            </Link>
            
            
        </div>    
    )
}