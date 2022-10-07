import React from 'react'
import { useState } from "react";


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

const CountryInformation = ({country}) =>(
    <div className="marginBottomDiv">
        {/* v3 api */}
        {/* {filteredCountry[0].name.common} */}  
        <h1>{country.name}</h1>
        <table>
            <tbody>
                <tr>
                    <td className="minWidthTd">
                    capital 
                    </td>
                    <td>
                    {country.capital}
                    </td>
                </tr>
                <tr>
                <td className="minWidthTd">
                population
                </td>
                <td>
                    {country.population}
                </td>
                </tr>
            </tbody>
        </table>
        <h2>languages</h2>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul> 
        {/* V3 api*/}
        {/* <img src={filteredCountry[0].flags.png} className="countryFlag" alt={filteredCountry[0].name + " flag"}/> */}
        <img src={country.flag} className="countryFlag" alt={country.name + " flag"}/>
    </div>
)

const Countries = ({ countries, country }) => {
    let filteredCountry = [];

    if (country.length > 0) {
        filteredCountry = countries.filter(filter => 
            //V3 api
            // filter.name.official.toLowerCase().includes(country.toLowerCase()))
            filter.name.toLowerCase().includes(country.toLowerCase()))
      } else {
        filteredCountry = countries
      }
    
      if (filteredCountry.length > 10) {
        return 'Too many matches, specify another filter'
    
      } else if (filteredCountry.length === 1) {
        return (
           <CountryInformation country={filteredCountry[0]}/>
            )
      } else {
        return (
          <div>
            <table>
                <tbody>
              {filteredCountry.map(country =>
                <SingleCountry country={country} />             
              )}
              </tbody>
            </table>
           
          </div>
        )
      }
}


    
  

export default Countries;