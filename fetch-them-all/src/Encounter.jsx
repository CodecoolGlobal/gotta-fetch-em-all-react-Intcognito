import { useState, useEffect } from 'react';

function Encounter(props) {
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [ownPokemon, setOwnPokemon] = useState(null);
  const [isOurTurn, setIsOurTurn] = useState(true);

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

  if (enemyPokemon && ownPokemon) {

    const ownPokemonStats = {
      health: ownPokemon.stats[0].base_stat,
      attack: ownPokemon.stats[1].base_stat,
      defense: ownPokemon.stats[2].base_stat
    }

    const enemyPokemonStats = {
      health: enemyPokemon.stats[0].base_stat,
      attack: enemyPokemon.stats[1].base_stat,
      defense: enemyPokemon.stats[2].base_stat
    }
    console.log(ownPokemonStats);
    console.log(enemyPokemonStats);
  }

  function handleBattle() {
    ((((2 / 5 + 2) * A * 60 / D) / 50) + 2) * Z / 255
  }

  return (
    <div>
      {enemyPokemon && ownPokemon ?
        <>
          <img src={ownPokemon.sprites.back_default} />
          <img src={enemyPokemon.sprites.front_default} />
          <button onClick={handleBattle}>Fight !</button>
        </>
        :
        'Loading...'
      }
    </div>
  )
}

export default Encounter