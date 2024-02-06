import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./components/WeatherData";
import axios from "axios";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Jalandhar");

  const apiKey = `ac0f4dd188c4497b28f7f420aeb2b31b`;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl]);


  if (!weatherData){
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="h-[90vh] flex justify-center items-center ">
        <main className="bg-slate-200 rounded py-20">
          <section className="px-10 flex gap-2 justify-center text-2xl font-medium font-mono">
            <h1 className="text-slate-500">Right Now in</h1>
            <input
              className="max-w-[200px] text-center outline-none bg-slate-200 border-b border-slate-500 font-semibold"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {weatherData && weatherData.weather && (
              <h1 className="text-slate-500">,it's {weatherData.weather[0].main}</h1>
            )}
          </section>

          <div className="display-box">
            {(typeof weatherData.main != 'undefined') ? (
              
              <Weather weatherData={weatherData} />
            ) :
              (
                <div>Loading...</div>
              )}
          </div>

        </main>
      </div>
    </div>
  );
}
