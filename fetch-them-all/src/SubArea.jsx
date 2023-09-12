import { useEffect, useState } from "react";

export default function SubArea({id}){

    const[subArea,setSubArea] = useState(null)

    useEffect(() => {
        const fetchThemAll = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/location/${id}`)
            const data = await response.json();
            setSubArea(() => data)
        }
        fetchThemAll(id)
    }, [])



    return(
        <>
    
        </>
    )
}