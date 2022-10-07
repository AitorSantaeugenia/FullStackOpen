import React from 'react'
import SingleCountry from "./SingleCountry";
import CountryInformation from "./CountryInformation";

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