import './App.css';
import React, { useEffect, useState } from "react"
import Weather from "./components/WeatherData"
import img1 from "./components/weather.jpg"


import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";


export default function App() {


  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("Jalandhar")
  const [city, setCity] = useState("Jalandhar")

  const apiKey = `ac0f4dd188c4497b28f7f420aeb2b31b`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then(data => {
        setApiData(data)
        console.log(data)
      })
  }, [apiUrl])

  const inputHandler = (e) => {
    setGetState(e.target.value)
  }

  const submitHandler = () => {
    setCity(getState)
    console.log(city)
  }



  return (
    <div>
      <img src={img1} className="bg-img" />
    <div className="App">
      
      <div className="container">
        
          <div className='searchbar'>
            <TextField
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              
              size="small"
              variant="outlined"
              color="primary"
              label="Search"
            />
          </div>

          <div className='btn-padding'>
            <Button variant="contained" onClick={submitHandler}>
              Search
            </Button>
          </div>

          <div className="display-box">
            {(typeof apiData.main != 'undefined') ? (
              <Weather weatherData={apiData} />
            ) :
              (
                <div>Loading...</div>
              )}
          </div>
        
      </div>
      <p className="footer">Created by <a href="https://my-portfolio-three-gules.vercel.app/" target="_blank" rel="noreferrer">Harm2N</a></p>

    </div>
    </div>
  );
}