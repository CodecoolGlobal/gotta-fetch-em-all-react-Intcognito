import { useState, useEffect } from 'react'
import Encounter from './Encounter'


function Selector(props) {
  const [usersPokemon, setUsersPokemon] = useState([]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isReadyToFight, setIsReadyToFight] = useState(false);
  const starterPokemon = [
    "https://pokeapi.co/api/v2/pokemon/mewtwo",
    "https://pokeapi.co/api/v2/pokemon/charmander",
    "https://pokeapi.co/api/v2/pokemon/bulbasaur"
  ];

  useEffect(() => {
    const pokemonArray = [];

    async function fetchPokemon(url) {
      const response = await fetch(url);
      const pokemonObject = await response.json();
      return pokemonObject
    }

    async function fetchCollection(collectionArray) {
      for (const pokemonUrl of collectionArray) {
        const result = await fetchPokemon(pokemonUrl);
        pokemonArray.push(result)
      }
      setUsersPokemon(pokemonArray)
    }

    async function fetchEnemy(name) {
      const response = await fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setEnemyPokemon(response);
    }

    fetchCollection(starterPokemon);
    fetchEnemy(props.enemyPokemon);
  }, [])

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

  return (
    <>
    { isReadyToFight ? <Encounter selectedPokemon={selectedPokemon} enemyPokemon={enemyPokemon} /> :
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
