import React from 'react'
import { useState } from "react";
import CountryInformation from "./CountryInformation";

const SingleCountry = ({country}) => {
    const [state, setState] = useState(false)

    const handleClick = () =>{
        setState(!state)
    }

    return(
        <div className="singleCountryContainer">
            {/* v3 */}
            {/* {country.name.common} */}
            <div className="singleCountryContainerButton">
                <div className="divCityTitle">
                    <span >
                    {country.name}
                    </span>
                </div>

                <div>
                <span><button className="btnCountries" onClick={handleClick}>Show more</button></span><br></br>
                    {/* {state && <CountryInformation country={country}/>} */}
                </div>
            </div>
            {state && <CountryInformation country={country}/>}
        </div>
    )
}

export default SingleCountry;