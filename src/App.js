import './App.css';
import React, { useEffect, useState } from "react"
import Weather from "./components/WeatherData"




import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Container from '@mui/material/Container';

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

    <div className="header">
      <Container fixed>
        <div className="App">
          <div className="searchbar-container">
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
              <Button variant="contained" onClick={submitHandler} className="btn">
                Search
              </Button>
            </div>
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
        <div className='footer-container'>
          <p className="footer">Created by <a href="https://www.harmanpreetsingh.me/" target="_blank" rel="noreferrer">Harm2N</a></p>
        </div>
      </Container >
    </div >




  );
}