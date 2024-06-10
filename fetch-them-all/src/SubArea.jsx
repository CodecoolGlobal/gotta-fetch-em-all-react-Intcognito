/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css"
import "./Subarea.css"


export default function SubArea({ id, enemy }) {
  const [localPokemonList, setLocalPokemonList] = useState(null)
  const [subArea, setSubArea] = useState(null)
  let [visible, setVisible] = useState(false)
  let [visiblePoke, setVisiblePoke] = useState(false)
  
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
      <button className="randomButtonStyle" onClick={() => randomPokemonClicker()}>
        Random pokemon
      </button>



      <button onClick={() => { setVisible(!visible) }}>
        {!visible ? "Subregions" : "Back"}
      </button>
      {visible && (
        subArea.names.map((sub, index) => (
          <div className='regions' id={sub.name} key={index}>{sub.name.toUpperCase()[0] + sub.name.slice(1)}</div>
        ))
      )
      }
      <button className="pokemonlist" onClick={() => { setVisiblePoke(!visiblePoke) }}>
        {!visiblePoke ? "Pokemons in the region" : "Back"}
      </button>
      {visiblePoke && (
        subArea.pokemon_encounters.map((poke, index) => (<div className='regions' key={index}
          id={poke.pokemon.name}>
          {poke.pokemon.name}
        </div>))
      )}
    </>
  )
}