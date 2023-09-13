import { useEffect, useState } from "react";

export default function SubArea({ id }) {

  const [subArea, setSubArea] = useState(null)
  let [visible, setVisible] = useState(false)
  let [visiblePoke, setVisiblePoke] = useState(false)

  useEffect(() => {
    const fetchSubRegion = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/location-area/${id}`)
      const data = await response.json();
      setSubArea(data)

    }
    fetchSubRegion(id)
  }, [])


  console.log(subArea);


  return (
    <>
      <button onClick={() => { setVisible(!visible) }}>
        {!visible ? "Subregions" : "Back"}
      </button>
      {visible && (
        subArea.names.map((sub) => (<div id={sub.name}>{sub.name}</div>))
      )
      }
      <button onClick={() => { setVisiblePoke(!visiblePoke) }}>
        {!visiblePoke ? "Pokemons" : "Back"}
      </button>
      {visiblePoke && (
        subArea.pokemon_encounters.map((poke) => (<div id={poke.pokemon.name}>{poke.pokemon.name}</div>))
      )}
    </>
  )
}