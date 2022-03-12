const CountryNames = ({
  foundCountries,
  setNewInput,
  setFoundCountries
}) => {
  const handleShowCountry = (country) => {
    setFoundCountries([country]);
    setNewInput(country.name.common);
  };

  return (
    <div>
      {foundCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : foundCountries.length > 1 ? (
        foundCountries.map((country) => {
          return (
            <div key={country.name.common}>
              <p>{country.name.common}</p>
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </div>
          );
        })
      ) : null}
    </div>
  );
};

export default CountryNames;
