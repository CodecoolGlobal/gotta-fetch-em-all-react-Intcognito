import { useState, useEffect } from 'react';


function Selector(props) {
  const [usersPokemon, setUsersPokemon] = useState([]);
  const starterPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur"
  ];

  useEffect(() => {
    async function fetchPokémon(url) {
      const response = await fetch(url);
      const pokemon = await response.json();

      setUsersPokemon([...usersPokemon, pokemon])
    }

    fetchPokémon(starterPokemon[0]);
  }, [])

  return (
    <div>
      {usersPokemon.length > 0 ? usersPokemon[0].name : 'Loading...'}
    </div>
  )
}

export default Selector
