import { useState, useEffect } from 'react';


function Selector(props) {
  const [usersPokemon, setUsersPokemon] = useState([]);
  const starterPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl"
  ];

  useEffect(() => {
    const pokemonArray = [];

    async function fetchPokémon(url) {
      const response = await fetch(url);
      const pokemonObject = await response.json();
      return pokemonObject
    }

    async function fetchCollection(collectionArray) {
      for (const pokemonUrl of collectionArray) {
        const result = await fetchPokémon(pokemonUrl);
        pokemonArray.push(result)
      }
      setUsersPokemon(pokemonArray)
    }

    fetchCollection(starterPokemon)
  }, [])

  function displayPokemon(pokemonObject, index) {
    return (
      <li className="pokemonContainer" key={index}>
        <img src={pokemonObject.sprites.front_default} />
        <h3>{pokemonObject.name.toUpperCase()[0] + pokemonObject.name.slice(1)}</h3>
        <p>Health: {pokemonObject.stats[0].base_stat}</p>
        <p>Attack: {pokemonObject.stats[1].base_stat}</p>
        <p>Defense: {pokemonObject.stats[2].base_stat}</p>
      </li>
    )
  }

  return (
    <div>
      <dialog id="dialog" open={true}>
        <ul id="pokemonList">
          {usersPokemon.length > 0 ?
          usersPokemon.map((pokemonObject, index) => displayPokemon(pokemonObject, index)) :
          'Loading...'}
        </ul>
      </dialog>
    </div>
  )
}

export default Selector
