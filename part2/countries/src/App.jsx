import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import { Filter } from "./components/Filter";
import { Country } from "./components/Country";
const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  useEffect(() => {
    countriesService.getAll().then((countires) => setCountries(countires));
  }, []);

  if (countries === null) {
    return <div>Loading countries...</div>;
  }
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  const numberOfCountries = filteredCountries.length;
  return (
    <div>
      <Filter value={filter} handleChange={handleFilterChange} />
      {numberOfCountries === 0 && <div>No matches</div>}
      {numberOfCountries > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {numberOfCountries === 1 && <Country country={filteredCountries[0]} />}
      {numberOfCountries > 1 &&
        numberOfCountries <= 10 &&
        filteredCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setSelectedCountry(country)}> Show</button>
          </p>
        ))}
      {selectedCountry && <Country country={selectedCountry} />}
    </div>
  );
};

export default App;
