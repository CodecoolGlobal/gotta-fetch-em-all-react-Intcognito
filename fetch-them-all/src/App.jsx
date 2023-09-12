import Selector from './Selector'
import Encounter from './Encounter'
import { useEffect, useState } from 'react'
import './App.css'
import Locations from './Locations'

function App() {

  return (
    <div>
      {/* <Locations/> */}
      {/* <Encounter myPokemon={'pikachu'} enemyPokemon={'charmander'}/> */}
      <Selector/>
    </div>
  )
}

export default App
