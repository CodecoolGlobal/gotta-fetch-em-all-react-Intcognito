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

    async function fetchCollection(starterPokemon) {
      for (const pokemon of starterPokemon) {
        const result = await fetchPokémon(pokemon);
        pokemonArray.push(result)
      }
      setUsersPokemon(pokemonArray)
    }

    fetchCollection(starterPokemon)
  }, [])
  
  function displayPokemon(pokemonObject) {
    return (
      <div className="pokemonContainer">
        <img src={pokemonObject.sprites.front_default}/>
        <h3>Name: {pokemonObject.name.toUpperCase()[0] + pokemonObject.name.slice(1)}</h3>
        <p>Health: {pokemonObject.stats[0].base_stat}</p>
        <p>Attack: {pokemonObject.stats[1].base_stat}</p>
        <p>Defense: {pokemonObject.stats[2].base_stat}</p>
      </div>
    )
  }
  
  console.log(usersPokemon[0]);

  return (
    <div>
      <dialog id="dialog" open={true}>
        {usersPokemon.length > 0 ? usersPokemon.map((pokemonObject) => displayPokemon(pokemonObject)) :
        'Loading...'}
      </dialog>
    </div>
  )
}

export default Selector
