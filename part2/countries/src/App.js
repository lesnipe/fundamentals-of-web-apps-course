import { useState, useEffect } from "react";
import axios from "axios";
import CountryNames from "./components/CountryNames";
import Country from "./components/Country";
import SearchCountry from "./components/SearchCountry";

function App() {
  const [newInput, setNewInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);
  const [isFetchedCountries, setIsFetchedCountries] = useState(false);
  const [isFetchedWeather, setIsFetchedWeather] = useState(false);
  const [weather, setWeather] = useState({});
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Fetch Countries data from API
  const getCountriesData = () => {
    console.log("Getting countries data...");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("Fetched countries data OK", response.data);
      setCountries(response.data);
      setIsFetchedCountries(true);
    });
  };
  useEffect(getCountriesData, []);

  // Fetch Weather data from API
  const getWeatherData = () => {
    if (foundCountries.length === 1) {
      const country = foundCountries[0];
      console.log("Getting weather data ...");
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${API_KEY}`
        )
        .then((response) => {
          console.log("Fetched wheather data OK", response.data);
          setWeather(response.data);
          setIsFetchedWeather(true);
        });
    }
  };
  useEffect(getWeatherData, [foundCountries]);

  // Handle search input
  const handleInput = (e) => {
    const value = e.target.value;
    const toAdd = [];
    countries.forEach((country) => {
      if (country.name.common.toLowerCase().includes(value.toLowerCase()))
        toAdd.push(country);
    });
    setFoundCountries(toAdd);
    setNewInput(value);
  };

  return (
    <div>
      {isFetchedCountries ? (
        <SearchCountry value={newInput} onChange={handleInput} />
      ) : (
        <p>Getting data . . .</p>
      )}
      {[0, 250].includes(
        foundCountries.length
      ) ? null : foundCountries.length !== 1 ? (
        <CountryNames
          foundCountries={foundCountries}
          setNewInput={setNewInput}
          setFoundCountries={setFoundCountries}
        />
      ) : (
        <Country
          country={foundCountries[0]}
          weather={weather}
          API_KEY={API_KEY}
          isFetchedWeather={isFetchedWeather}
        />
      )}
    </div>
  );
}

export default App;
