import React, { useEffect, useState } from "react";
import Weather from "./WeatherData";
import axios from "axios";

import { UserAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function Homepage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const { googleSignIn, user } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loading ? null : !user ? (
        <div className="h-screen bg-white flex justify-center items-center">
          <button
            onClick={handleSignIn}
            className="px-4 py-2 rounded-lg border flex gap-2 font-semibold hover:bg-blue-500 hover:text-white "
          >
            <FcGoogle className="text-2xl self-center bg-white rounded-full" />
            Login
          </button>
        </div>
      ) : (
        <div className="max-w-[1024px] mx-auto">
          <div className="h-[80vh] mt-5  bg-slate-200 shadow-md rounded">
            <main className="">
              <section className="pt-[10vh] text-3xl flex gap-5 justify-center font-medium font-mono">
                <h1 className="text-slate-500">Right Now in</h1>
                <input
                  className="max-w-[200px] text-center outline-none bg-slate-200 border-b border-slate-500 font-semibold"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {weatherData && weatherData.weather && (
                  <h1 className="text-slate-500">
                    ,it's {weatherData.weather[0].main}
                  </h1>
                )}
              </section>

              <div className="display-box">
                {typeof weatherData.main != "undefined" ? (
                  <Weather weatherData={weatherData} />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
