import { useState, useEffect } from "react"


export default function Locations() {

    const [locations, setLocations] = useState([null])

    useEffect(() => {
        const fetchThemAll = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/location/`)
            const data = await response.json();
            setLocations(() => data.results)
        }
        fetchThemAll()
    }, [])


    const handleLocationClick = (e) => {
        console.log(e.target);
    }

    return (
        <div>
            {
                locations.length === 1 ? "Loading..." :
                locations.map((location, index) => (
                    <>
                    <li onClick={handleLocationClick} key={index} id={index} >{location.name}</li>
                    </>
            )
                )
            }

        </div>
    )
}