import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'

const Weather = ({country}) => {
    //console.log(country)
    const [weather, setWeather] = useState([])
    const api = process.env.REACT_APP_API_KEY;


    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api}&query=${country.name}`).then((response) => {
            setWeather(response.data.current);
            // {console.log(response.data)}
        });
      // eslint-disable-next-line
      }, []);

    return(
        <div className="weatherContainer">
        <h1>Weather in {country.name}</h1>
            <p><b>temperature</b> {weather.temperature} º Celsius</p>
            <img src={weather.weather_icons} className="weatherIcon" alt={weather.weather_icons}/>
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather;