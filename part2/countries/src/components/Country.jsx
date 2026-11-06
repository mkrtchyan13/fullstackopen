import { Weather } from "./Weather";

export const Country = ({ country }) => {
  return (
    <div>
      <h1> {country.name.common}</h1>
      <p> Capital {country.capital ? country.capital[0] : "none"}</p>
      <p> Area {country.area}</p>

      <h2>Languages </h2>
      {country.languages ? (
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      ) : (
        <div>{country.name.common} doesn't have an official language</div>
      )}
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather capital={country.capital} latlang={country.capitalInfo.latlng} />
    </div>
  );
};
