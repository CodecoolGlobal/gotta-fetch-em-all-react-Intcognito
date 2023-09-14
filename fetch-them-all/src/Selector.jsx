import { useState, useEffect } from 'react'
import Encounter from './Encounter'


function Selector(props) {
  const [usersPokemon, setUsersPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isReadyToFight, setIsReadyToFight] = useState(false);
  const [starterPokemon, setStarterPokemon] = useState(['mewtwo', 'squirtle', 'psyduck']);

  useEffect(() => {
    const pokemonArray = [];

    async function fetchPokemon(name) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonObject = await response.json();
      return pokemonObject
    }

    async function fetchCollection(collectionList) {
      for (const pokemonName of collectionList) {
        const result = await fetchPokemon(pokemonName);
        pokemonArray.push(result)
      }
      setUsersPokemon(pokemonArray)
    }
    
    async function fetchEnemy(name) {
      const response = await fetchPokemon(name);
      setEnemyPokemon(response);
    }

    fetchCollection(starterPokemon);
    fetchEnemy(props.enemyPokemon);
  }, [starterPokemon])

  function sendToBattle(pokemonObject) {
    setSelectedPokemon(pokemonObject);
    setIsReadyToFight(true);
  }

  function displayPokemon(pokemonObject, index) {
    return (
      <li className="pokemonContainer" key={index} onClick={() => { sendToBattle(pokemonObject) }}>
        <img src={pokemonObject.sprites.front_default} />
        <h3>{pokemonObject.name.toUpperCase()[0] + pokemonObject.name.slice(1)}</h3>
        <p>Health: {pokemonObject.stats[0].base_stat}</p>
        <p>Attack: {pokemonObject.stats[1].base_stat}</p>
        <p>Defense: {pokemonObject.stats[2].base_stat}</p>
      </li>
    )
  }
  
  function addNewPokemon(name) {
    console.log(starterPokemon);
    console.log(name);
    if(!starterPokemon.includes(name)){
      let newStarterPokemon = [...starterPokemon]
      setStarterPokemon([...newStarterPokemon,name])
    }
  }




  return (
    <>
      {isReadyToFight ?
        <Encounter selectedPokemon={selectedPokemon} enemyPokemon={enemyPokemon} reward={addNewPokemon} /> :
        <div className='selectorPage'>
          <div id="dialog">
            <h1>Choose your fighter:</h1>
            <ul id="pokemonList">
              {usersPokemon.length > 0 ?
                usersPokemon.map((pokemonObject, index) => displayPokemon(pokemonObject, index)) :
                'Loading...'}
            </ul>
          </div>
          <h1>VS</h1>
          {enemyPokemon && <img className="enemySprite" src={enemyPokemon.sprites.other['official-artwork']['front_shiny']} />}
        </div>
      }
    </>
  )
}

export default Selector
