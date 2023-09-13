import { useState, useEffect } from 'react';

function Encounter(props) {
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [myPokemon, setMyPokemon] = useState(null);
  const [ourHp, setOurHp] = useState(1);
  const [enemyHp, setEnemyHp] = useState(1);
  const [isOurTurn, setIsOurTurn] = useState(true);

  useEffect(() => {
    async function fetchPokemon(name, side) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonObject = await response.json();
      if (side === "own") {
        setMyPokemon(pokemonObject);
        setOurHp(parseInt(myPokemon.stats[0].base_stat));
      } else if (side === "enemy") {
        setEnemyPokemon(pokemonObject);
        setEnemyHp(parseInt(enemyPokemon.stats[0].base_stat));
      }
    }

    fetchPokemon(props.myPokemon, 'own');
    fetchPokemon(props.enemyPokemon, 'enemy');
  }, [])

  useEffect(() => {
    function randomNumber() {
      return Math.ceil(Math.random() * 38) + 217
    }

    if (myPokemon && enemyPokemon && isOurTurn) {
      const ownAttack = myPokemon.stats[1].base_stat;
      const enemyDefense = enemyPokemon.stats[2].base_stat;
      const damage = ((((2 / 5 + 2) * ownAttack * 60 / enemyDefense) / 50) + 2) * randomNumber() / 255;
      setEnemyHp(enemyHp - damage);
      setIsOurTurn(false);

    } else if (myPokemon && enemyPokemon) {
      const enemyAttack = enemyPokemon.stats[1].base_stat;
      const ownDefense = myPokemon.stats[2].base_stat;
      const damage = ((((2 / 5 + 2) * enemyAttack * 60 / ownDefense) / 50) + 2) * randomNumber() / 255;
      setOurHp(ourHp - damage);
      setIsOurTurn(true);
    }
  }, [ourHp, enemyPokemon, myPokemon])

  return (
    <div className='battleground'>
      {enemyPokemon && myPokemon ?
        <>
          <img src={myPokemon.sprites.back_default} />
          <p>HP: {ourHp}</p>
          <img src={enemyPokemon.sprites.front_default} />
          <p>HP: {enemyHp}</p>
        </>
        :
        'Loading...'
      }
    </div>
  )
}

export default Encounter