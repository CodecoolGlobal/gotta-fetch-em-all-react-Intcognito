/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function Encounter(props) {
  const selectedPokemon = props.selectedPokemon;
  const enemyPokemon = props.enemyPokemon;
  const [myHp, setMyHp] = useState(selectedPokemon.stats[0].base_stat);
  const [enemyHp, setEnemyHp] = useState(enemyPokemon.stats[0].base_stat);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [isMatchLost, setIsMatchLost] = useState(false);
  const [isMatchWon, setIsMatchWon] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (myHp < 1) {
        setIsMatchLost(true);
      } else if (enemyHp < 1) {
        setIsMatchWon(true);
        props.onWinning();
      } else {
        battle()
      }
    }, 500)
    return () => {
      clearTimeout(timeoutId);
    }
  }, [myHp, enemyHp])

  function battle() {
    const myAttack = selectedPokemon.stats[1].base_stat;
    const myDefense = selectedPokemon.stats[2].base_stat;
    const enemyAttack = enemyPokemon.stats[1].base_stat;
    const enemyDefense = enemyPokemon.stats[2].base_stat;
    const randomNumber = Math.floor(Math.random() * 39) + 217;
    if (isMyTurn) {
      const myDamage = ((((2 / 5 + 2) * myAttack * 60 / enemyDefense) / 50) + 2) * randomNumber / 255;
      setEnemyHp(enemyHp - myDamage.toFixed());
    } else {
      const enemyDamage = ((((2 / 5 + 2) * enemyAttack * 60 / myDefense) / 50) + 2) * randomNumber / 255;
      setMyHp(myHp - enemyDamage.toFixed());
    }
    setIsMyTurn(!isMyTurn);
  }

  return (
    <div className='fightArea'>
      {!isMatchWon && !isMatchLost ?
        <>
          <h4 id='myHp' className='popup'>HP: {myHp}/{selectedPokemon.stats[0].base_stat}</h4>
          <img id='myPokemon' src={selectedPokemon.sprites.versions['generation-v']['black-white'].animated.back_shiny} />
          <img id='enemyPokemon' src={enemyPokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny} />
          <h4 id='enemyHp' className='popup'>HP: {enemyHp}/{enemyPokemon.stats[0].base_stat}</h4>
        </> :
        isMatchWon ?
          <h2 id='winner' className='popup'>Congratulations, you won !!!<br/>Successfully captured: {enemyPokemon.name.toUpperCase()}</h2>
           :
          // eslint-disable-next-line react/no-unescaped-entities
          <h2 className='popup'>You lost this fight. :(<br></br> But don't worry, try again! ;)</h2>
      }
    </div>
  )
}

export default Encounter