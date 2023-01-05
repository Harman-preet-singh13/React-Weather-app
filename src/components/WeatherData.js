import React, { useState } from 'react'
import moment from 'moment';

import Typography from '@mui/material/Typography';

import sunset from './sunset.gif'
import sunrise from './sunrise.gif'


const kelvinFaraenheit = (k) => {
    return (k - 273.17).toFixed(2)
}

const mtokm = (m) => {
    return (m * 3.6).toFixed(2)
}


function Weather({ weatherData }) {


    return (
        <div className='header'>

            <Typography variant="h3" gutterBottom component="div">
                <div className="location-name">
                    {weatherData.name}
                </div>

            </Typography>
            <Typography variant="h4" gutterBottom component="div">
                <div className="date-container">
                    <p className='date-padding1'> {moment().format('h:mm a')}</p>
                    <p className='date-padding2'> {moment().format('dddd')}</p>
                    <p className='date-padding3'>{moment().format('LL')}</p>
                </div>
                <div className="weather-description">
                    <p className='temp-size'>{kelvinFaraenheit(weatherData.main.temp)}&deg;C</p>
                    <div className="description-container">
                        <div className="box1">
                            <img
                                src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                                alt="weather status icon"
                                className="weather-icon"
                            />
                        </div>
                        <div className="box2">
                            <p className="weather-desc">{weatherData.weather[0].description}</p>
                        </div>
                    </div>
                </div>
                <div className="wind-conatiner">
                    <div className="wind-padding">
                        <p className="windspeed">Windspeed: {mtokm(weatherData.wind.speed)} km/h</p>
                    </div>
                </div>
                <div className="sun-container">
                    <div className="sun-rise">
                        <img src={sunrise} className="sun-img" />
                        <p className="sun-font">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')} IST</p>
                    </div>
                    <div className="sun-set">
                        <img src={sunset} className="sun-img" />
                        <p className="sun-font">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')} IST</p>
                    </div>

                </div>
            </Typography>
        </div>
    )
}

//

export default Weather