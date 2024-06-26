import { useState, useEffect } from "react"
import SubArea from "./SubArea"
import Selector from "./Selector"
import "./App.css"
import "./Locations.css"


export default function Locations() {

  const [locations, setLocations] = useState([null])
  const [selectedEnemy, setSelectedEnemy] = useState('pikachu')
  const [enemyData, setEnemyData] = useState(null)
  const [fightClicker, setFightClicker] = useState(false)
  const [usersPokemon, setUsersPokemon] = useState([]);
  const starterPokemon = ['bulbasaur', 'squirtle', 'arceus'];

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/location/`)
      const data = await response.json();
      setLocations(() => data.results)
    }
    fetchLocations()
  }, [])

  useEffect(() => {
    async function fetchPokemon(name) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonObject = await response.json();
      setEnemyData(pokemonObject)
    }
    fetchPokemon(selectedEnemy)
  }, [selectedEnemy])

  const handleLocationClick = (e) => {
    return e.target.id
  }

  const logEnemy = (random) => {
    setSelectedEnemy(random)
  }

  return (
    <>
      <button className="fightStartButton" onClick={() => setFightClicker(!fightClicker)}>{fightClicker ? "Back" : "FIGHT"}</button>
      {fightClicker ? <Selector
        selectedEnemy={selectedEnemy}
        usersPokemon={usersPokemon}
        setUsersPokemon={setUsersPokemon}
        starterPokemon={starterPokemon} /> :
        <div className="locations">
          <h1 className="basic">Choose region - Pick a random pokemon - FIGHT</h1>
          {selectedEnemy === 'pikachu' ? <h2 className="basic">Choose enemy</h2>
            :
            <>
              <h2 className="styleEnemyName">Enemy: {selectedEnemy.toUpperCase()[0] + selectedEnemy.slice(1)}</h2>
              <img className="displayEnemyImage" src={enemyData.sprites.other.dream_world.front_default} />
              <p className="stats">Health: {enemyData.stats[0].base_stat}</p>
              <p className="stats">Attack: {enemyData.stats[1].base_stat}</p>
              <p className="stats">Defense: {enemyData.stats[2].base_stat}</p>
            </>}
          {
            locations.length === 1 ? "Loading..." :
              locations.map((location, index) => (
                <>
                  <li className="locationName" key={index} onClick={(e) => handleLocationClick(e)} id={index} >{(location.name).toUpperCase()}</li>
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