import React from 'react'
import { useState } from "react";
import CountryInformation from "./CountryInformation";

const SingleCountry = ({country}) => {
    const [state, setState] = useState(false)

    const handleClick = () =>{
        setState(!state)
    }

    return(
        <>
        <tr> 
            {/* v3 */}
            {/* {country.name.common} */}
            <td>
            {country.name}
            </td>
            <td><button className="btnCountries" onClick={handleClick}>Show more</button></td>
        </tr>
        {state && <CountryInformation country={country}/>}
        </>
    )
}

export default SingleCountry;