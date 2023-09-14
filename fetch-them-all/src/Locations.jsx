import { useState, useEffect } from "react"
import SubArea from "./SubArea"
import "./App.css"
import Selector from "./Selector"


export default function Locations() {

  const [locations, setLocations] = useState([null])
  const [selectedEnemy, setSelectedEnemy] = useState('pikachu')
  const [enemyData, setEnemyData] = useState(null)
  const [fightClicker,setFightClicker] = useState(false)


  useEffect(() => {
    const fetchThemAll = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/location/`)
      const data = await response.json();
      setLocations(() => data.results)
    }
    fetchThemAll()
  }, [])


  useEffect(() => {
    async function fetchPokemon(name) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonObject = await response.json();
      setEnemyData(pokemonObject)
    }
    fetchPokemon(selectedEnemy)
  }, [selectedEnemy])


  console.log(selectedEnemy);
  console.log(enemyData);




  const handleLocationClick = (e) => {
    // console.log(e.target.id);
    return e.target.id
  }


  const logEnemy = (random) => {
    setSelectedEnemy(random)

  }



  return (
    <>
      <button onClick={()=>setFightClicker(!fightClicker)}>{fightClicker ? "Back" : "FIGHT" }</button>
      {fightClicker ? <Selector enemyPokemon={selectedEnemy} /> :
        <div className="locations">
          <h1>Choose region - Pick a random pokemon - FIGHT</h1>
          {selectedEnemy === 'pikachu' ? <h2>PIKACHU IS FRIENDLY POKEMON, CHOOSE ANOTHER ONE</h2>
            : 
            <div className="enemyContainer">
            <img src={enemyData.sprites.other.dream_world.front_default} />
            <p>Health: {enemyData.stats[0].base_stat}</p>
            <p>Attack: {enemyData.stats[1].base_stat}</p>
            <p>Defense: {enemyData.stats[2].base_stat}</p>
            </div>
            }
          <h2>Enemy: {selectedEnemy.toUpperCase()[0] + selectedEnemy.slice(1)}</h2>

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
      }
    </>
  )
}