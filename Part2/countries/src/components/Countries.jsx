import React from 'react'

const Countries = ({ countries, country }) => {
    let filteredCountry = [];

    // console.log(countries)
    // //console.log(countries[1].name.common)
    // // console.log(country)
    // console.log(filteredCountry)

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
          <div>
              {/* v3 api */}
              {/* {filteredCountry[0].name.common} */}
            <h1>{filteredCountry[0].name}</h1>
            <table>
                <tbody>
                    <tr>
                        <td className="minWidthTd">
                        capital 
                        </td>
                        <td>
                        {filteredCountry[0].capital}
                        </td>
                    </tr>
                    <tr>
                    <td className="minWidthTd">
                    population
                    </td>
                    <td>
                         {filteredCountry[0].population}
                    </td>
                    </tr>
                </tbody>
            </table>
            <h2>languages</h2>
               <ul>
                {/* {console.log(filteredCountry)}
                {console.log(filteredCountry[0].languages)}
                {filteredCountry[0].languages.map(lang => <li>{lang}</li>)} 
                {/* <li>{filteredCountry[0].languages.spa}</li> */}
                {filteredCountry[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
                
              </ul> 
              {/* V3 api*/}
              {/* <img src={filteredCountry[0].flags.png} className="countryFlag" alt={filteredCountry[0].name + " flag"}/> */}
            <img src={filteredCountry[0].flag} className="countryFlag" alt={filteredCountry[0].name + " flag"}/>
          </div>
            )
      } else {
        return (
          <div>
            <ul>
              {filteredCountry.map(country =>
            <li key={country.name}>
                {/* v3 */}
                {/* {country.name.common} */}
                {country.name}
            </li>
             
              )}
            </ul>
          </div>
        )
      }
}


    
  

export default Countries;