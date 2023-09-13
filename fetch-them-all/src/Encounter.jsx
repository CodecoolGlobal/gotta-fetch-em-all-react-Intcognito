import { useState, useEffect } from 'react';

function Encounter(props) {
  const [myHp, setMyHp] = useState(null);
  const [enemyHp, setEnemyHp] = useState(null);
  const selectedPokemon = props.selectedPokemon;
  const enemyPokemon = props.enemyPokemon;
  
  useEffect(() => {
    setMyHp(selectedPokemon.stats[0].base_stat);
    setEnemyHp(enemyPokemon.stats[0].base_stat);
  }, [])

  function battle() {
    const myAttack = selectedPokemon.stats[1].base_stat;
    const myDefense = selectedPokemon.stats[2].base_stat;
    const enemyAttack = enemyPokemon.stats[1].base_stat;
    const enemyDefense = enemyPokemon.stats[2].base_stat;
    const randomNumber = Math.floor(Math.random() * 39) + 217;

    let myDamage = ((((2/5+2)*myAttack*60/enemyDefense)/50)+2)*randomNumber/255;
    setEnemyHp(enemyHp - myDamage.toFixed());
    let enemyDamage = ((((2/5+2)*enemyAttack*60/myDefense)/50)+2)*randomNumber/255;
    setMyHp(myHp - enemyDamage.toFixed());
  }
  
  console.log(selectedPokemon);
  return (
    <div>
        <button onClick={battle}>Attack !</button>
        <h4>HP: {myHp}/{selectedPokemon.stats[0].base_stat}</h4>
        <img src={selectedPokemon.sprites.back_default} />
        <h4>HP: {enemyHp}/{enemyPokemon.stats[0].base_stat}</h4>
        <img src={enemyPokemon.sprites.front_default} />
    </div>
  )
}

export default Encounter