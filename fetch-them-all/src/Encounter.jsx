import { useState, useEffect } from 'react';

function Encounter(props) {
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [ownPokemon, setOwnPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon(name, side) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonObject = await response.json();
      if (side === "own") {
        setOwnPokemon(pokemonObject);
      } else if (side === "enemy") {
        setEnemyPokemon(pokemonObject);
      }
    }

    fetchPokemon(props.myPokemon, 'own');
    fetchPokemon(props.enemyPokemon, 'enemy');

  }, [])

  return (
    <div>
      {enemyPokemon && ownPokemon ?
      <>
        <img src={ownPokemon.sprites.back_default} />
        <img src={enemyPokemon.sprites.front_default} />
      </>
         :
        'Loading...'
      }
    </div>
  )
}

export default Encounter