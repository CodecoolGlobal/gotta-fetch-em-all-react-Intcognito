/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Encounter from './Encounter'


function Selector({ usersPokemon, selectedEnemy, setUsersPokemon, starterPokemon}) {
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isReadyToFight, setIsReadyToFight] = useState(false);

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

    fetchEnemy(selectedEnemy);

    if (usersPokemon.length < 3) {
      fetchCollection(starterPokemon);
    }
  }, [])

  function sendToBattle(pokemonObject) {
    setSelectedPokemon(pokemonObject);
    setIsReadyToFight(true);
  }

  function handleWinning() {
    for (const pokemonObject of usersPokemon) {
      if (pokemonObject.name === enemyPokemon.name) {
        return
      }
    }
    const newPokemonArray = [...usersPokemon];
    newPokemonArray.push(enemyPokemon);
    setUsersPokemon(newPokemonArray);
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

  return (
    <>
      {isReadyToFight ?
        <Encounter selectedPokemon={selectedPokemon} enemyPokemon={enemyPokemon} onWinning={handleWinning} /> :
        <div className='selectorPage'>
          <div id="dialog">
            <h1 className='h1'>Choose your fighter:</h1>
            <ul id="pokemonList">
              {usersPokemon.length > 0 ?
                usersPokemon.map((pokemonObject, index) => displayPokemon(pokemonObject, index)) :
                'Loading...'}
            </ul>
          </div>
          <h1 className='h1'>VS</h1>
          {enemyPokemon && <img className="enemySprite" src={enemyPokemon.sprites.other['official-artwork']['front_shiny']} />}
        </div>
      }
    </>
  )
}

export default Selector
