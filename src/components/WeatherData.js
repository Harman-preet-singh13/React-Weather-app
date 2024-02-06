import React, {useState} from "react";

import clearSky from "./gifs/icons8-sun.gif";
import cloudySky from "./gifs/foggy.gif";
import rain from "./gifs/icons8-rainfall.gif";
import snow from "./gifs/icons8-light-snow.gif";
import { TiWeatherWindy } from "react-icons/ti";
import { IoWaterOutline } from "react-icons/io5";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTemperatureLow } from "react-icons/fa";
import { FaTemperatureEmpty } from "react-icons/fa6";

function Weather({ weatherData }) {

    const [unit, setUnit] = useState("C");


  const kelvinToCelsius = (k) => {
    return (k - 273.17).toFixed(2);
  };

  const kelvinToFahrenheit = (k) => {
    return ((k - 273.17)*1.8 + 32).toFixed(2);
  }

  const mtokm = (m) => {
    return (m * 3.6).toFixed(2);
  };

  const temperature = unit === "C" ? kelvinToCelsius(weatherData.main.temp) : kelvinToFahrenheit(weatherData.main.temp);
  const maxTemp = unit === "C" ? kelvinToCelsius(weatherData.main.temp_max) : kelvinToFahrenheit(weatherData.main.temp_max);
  const minTemp = unit === "C" ? kelvinToCelsius(weatherData.main.temp_min) : kelvinToFahrenheit(weatherData.main.temp_min);
  const feelsLike = unit === "C" ? kelvinToCelsius(weatherData.main.feels_like) : kelvinToFahrenheit(weatherData.main.feels_like);

  const weatherMain = weatherData?.weather[0]?.main || "";

  const getWeatherGif = (weather) => {
    switch (weather.toLowerCase()) {
      case "clear":
        return clearSky;
      case "clouds":
        return cloudySky;
      case "rain":
        return rain;
      case "snow":
        return snow;
      default:
        return `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    }
  };


  return (
    <>
      <div className="mt-10 flex justify-evenly">
        <div className=" self-center">
          <img
            src={getWeatherGif(weatherMain)}
            className=""
            alt="weather-gif"
          />
        </div>
        <div className="self-center">
          <h2 className="">{temperature}&deg;{unit}</h2>
        </div>
        <div>
          <p className="flex gap-1">
            <TiWeatherWindy className="text-2xl" />{" "}
            {mtokm(weatherData.wind.speed)} km/h
          </p>
          <p className="flex gap-1">
            <IoWaterOutline className="text-2xl" /> {weatherData.main.humidity}{" "}
            %
          </p>
        </div>
      </div>

      <div className="my-5 text-slate-500 mx-[150px] border-1 border-slate-600 rounded">
        <p className="flex gap-3 my-2 mx-2 border-b-2 border-slate-300">
          Sunrise
          <FiSunrise className="text-2xl" />:{" "}
          <span className="text-slate-800">
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
              "en-IN"
            )}{" "}
            IST
          </span>
        </p>
        <p className="flex gap-3 my-2 mx-2 border-b-2 border-slate-300">
          Sunset
          <FiSunset className="text-2xl" />:{" "}
          <span className="text-slate-800">
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
              "en-IN"
            )}{" "}
            IST
          </span>
        </p>
        <p className="flex gap-3 my-2 mx-2 border-b-2 border-slate-300">
          Max-Temp
          <FaTemperatureHigh className="text-2xl" />:{" "}
          <span className="text-slate-800">
            {" "}
            {maxTemp}&deg;{unit}
          </span>
        </p>
        <p className="flex gap-3 my-2 mx-2 border-b-2 border-slate-300">
          Min-Temp
          <FaTemperatureLow className="text-2xl" />:{" "}
          <span className="text-slate-800">
            {" "}
            {minTemp}&deg;{unit}
          </span>
        </p>
        <p className="flex gap-3 my-2 mx-2 ">
          Feels Like
          <FaTemperatureEmpty className="text-2xl" />:{" "}
          <span className="text-slate-800">
            {" "}
            {feelsLike}&deg;{unit}
          </span>
        </p>
      </div>

      <div className="mt-10 text-center">
        <button onClick={() => setUnit("F")} className="hover:font-semibold">&deg;F</button>
        {" | "}
        <button onClick={() => setUnit("C")} className="hover:font-semibold">&deg;C</button>
      </div>
    </>
  );
}

export default Weather;
