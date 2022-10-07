import React from 'react'

const CountryInformation = ({country}) =>(
    <tr className="marginBottomDiv">
        <td>
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
        </td>
    </tr>
)

export default CountryInformation;