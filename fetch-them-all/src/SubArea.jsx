import { useEffect, useState } from "react";
import Encounter from "./Encounter";

export default function SubArea({ id, enemy }) {

  const [subArea, setSubArea] = useState(null)
  let [visible, setVisible] = useState(false)
  let [visiblePoke, setVisiblePoke] = useState(false)
  let [localPokemonList, setLocalPokemonList] = useState(null)

  useEffect(() => {

    const fetchSubRegion = async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/location-area/${id}`)
      const data = await response.json();
      setSubArea(data)
      setLocalPokemonList(data.pokemon_encounters)
    }
    fetchSubRegion(id)

  }, [])

  const randomPokemonClicker = () => {
    let random = localPokemonList[Math.floor(Math.random() * localPokemonList.length)].pokemon.name
    enemy(random)
  }

  return (
    <>
      <button onClick={() => { setVisible(!visible) }}>
        {!visible ? "Select region" : "Deselect"}
      </button>
      <button onClick={() => randomPokemonClicker()}>
        Random pokemon
      </button>
      {visible && (
        subArea.names.map((sub) => (<div id={sub.name}>{sub.name.toUpperCase()[0] + sub.name.slice(1)}</div>))
      )
      }
      <button className="pokemonlist" onClick={() => { setVisiblePoke(!visiblePoke) }}>
        {!visiblePoke ? "Pokemons in the region" : "Back"}
      </button>
      {visiblePoke && (
        subArea.pokemon_encounters.map((poke, index) => (<div key={index}
          id={poke.pokemon.name}>
          {poke.pokemon.name} 
        </div>))
      )}
    </>
  )
}