import { useState, useEffect } from "react"
import SubArea from "./SubArea"
import "./App.css"


export default function Locations() {

    const [locations, setLocations] = useState([null])
    const [selectedEnemy,setSelectedEnemy] = useState('pikachu')
    const [enemyData,setEnemyData] = useState(null)


  useEffect(() => {
    const fetchThemAll = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/location/`)
      const data = await response.json();
      setLocations(() => data.results)
    }
    fetchThemAll()
  }, [])


useEffect(()=>{
    async function fetchPokemon(name) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonObject = await response.json();
        setEnemyData(pokemonObject)
    }
    fetchPokemon(selectedEnemy)
},[selectedEnemy])


console.log(selectedEnemy);



    

    const handleLocationClick = (e) => {
        // console.log(e.target.id);
        return e.target.id
    }


    const logEnemy = (random) =>{
        setSelectedEnemy(random)
   
      }



    return (
        <div className="locations">
            <h1>Chosse region - Pick a random pokemon - FIGHT</h1>
            {selectedEnemy === 'pikachu' ? <h2>PIKACHU IS FRIENDLY POKEMON, CHOOSE ANOTHER ONE</h2>  :<img src={enemyData.sprites.front_default} /> }
            <h2>Enemy: {selectedEnemy}</h2>
          
            {
                locations.length === 1 ? "Loading..." :
                    locations.map((location, index) => (
                        <>
                            <li onClick={(e) => handleLocationClick(e)} id={index} >{(location.name).toUpperCase()}</li>
                            <SubArea id={index + 1} enemy={logEnemy} />
                        </>
                    )
                    )
            }

    </div>
  )
}