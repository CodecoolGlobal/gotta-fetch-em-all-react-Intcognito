import { useState, useEffect } from "react"
import SubArea from "./SubArea"


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
        console.log(e.target.id);
        setVisible(!visible)
        return e.target.id
    }



    return (
        <div>
            {
                locations.length === 1 ? "Loading..." :
                    locations.map((location, index) => (
                        <>
                            <li onClick={(e) => handleLocationClick(e)} id={index} >{(location.name).toUpperCase()}</li>
                            <SubArea id={index + 1} />
                        </>
                    )
                    )
            }

        </div>
    )
}