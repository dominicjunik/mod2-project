import { useEffect } from 'react';
import './App.css'
import axios from 'axios';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Class from './components/Class';
import Races from './pages/Races';
import Race from './components/Race';
import Backgrounds from './pages/Backgrounds';
import Alignment from './pages/Alignment';
import AbilityScores from './pages/AbilityScores';


function App() {

 useEffect(()=>{
  // testApi()
  testApi2()
 },[])


async function testApi(){
  // In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS imports with require() use the following approach:
  // const axios = require('axios').default;
  // axios.<method> will now provide autocomplete and parameter typings
  // why doesnt this line below work? 

  // const axios = require('axios').default;
  let key = import.meta.env.VITE_API_KEY

  const options = {
    method: 'GET',
    url: 'https://rpg-items.p.rapidapi.com/item', 
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'rpg-items.p.rapidapi.com'
    }
  };
 
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}


async function testApi2(){

  const url = 'https://www.dnd5eapi.co/api/'
  try{
    const response = await axios.get(url)
    console.log(response.data)
  }
  catch{
    console.error(error)
  }
}

////////////
// store the character object in a state    //
////////////

  return (    
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/classes" element={<Classes/>}/>
          <Route path="/classes/:symbol" element={<Class />} />
          <Route path="/races" element={<Races/>}/>
          <Route path="/races/:symbol" element={<Race/>}/>
          <Route path="/backgrounds" element={<Backgrounds/>}/>
          <Route path="/alignment" element={<Alignment />}/>
          <Route path="/ability-scores" element={<AbilityScores/>}/>
        </Routes>       
      </div>
     
  )
}

export default App
