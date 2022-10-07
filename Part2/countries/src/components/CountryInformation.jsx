import React from 'react'
import Weather from "./../components/Weather"

const CountryInformation = ({country}) =>(
    <div>
        <div className="marginBottomDiv">

            {/* v3 api */}
            {/* {filteredCountry[0].name.common} */}  
            <div>
            <h1>{country.name}</h1>
            </div>
            <div>
                <div className="divContainerCapital">
                    <div className="divContainerCapitalChild">
                    capital 
                    </div>
                    <div>
                    {country.capital}
                    </div>
                </div>
                <div className="divContainerCapital">
                <div className="divContainerCapitalChild">
                population
                </div>
                <div>
                    {country.population}
                </div>
                </div>
            </div>
            <div>
            <h2>Languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul> 
            </div>
                {/* V3 api*/}
                {/* <img src={filteredCountry[0].flags.png} className="countryFlag" alt={filteredCountry[0].name + " flag"}/> */}
            <div>
                <img src={country.flag} className="countryFlag" alt={country.name + " flag"}/>
            </div>
        </div>
    <Weather country={country}/>
    </div>
    
)

export default CountryInformation;