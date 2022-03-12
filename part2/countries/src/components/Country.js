const Country = ({ country, weather, isFetchedWeather }) => {
  if (isFetchedWeather) {
    console.log("country", country);
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((value, i) => (
            <li key={i}>{value}</li>
          ))}
        </ul>
        <img src={country.flags.png} width="150" height="100"></img>
        <h2>Weather in {country.capital[0]}</h2>
        <p>
          Temperature: {weather.main["temp"]}°C{" "}
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            width="50"
            height="50"
          ></img>
        </p>
        <p>Wind: {weather.wind.speed} m/s </p>
      </div>
    );
  } else {
    return <p>Getting data . . .</p>;
  }
};

export default Country;
