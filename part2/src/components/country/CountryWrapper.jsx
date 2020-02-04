import React from 'react';
import CountryItem from './CountryItem';

const CountryWrapper = ({ countries, showDetailsFor, showContryData }) => {
  const basicInfo = countries.map(country => (
    <div key={country.numericCode}>
      {country.name}{" "}
      <button onClick={showContryData(country.alpha2Code)}>show</button>
      {showDetailsFor.name === country.name && (
        <CountryItem data={showDetailsFor} />
      )}
    </div>
  ));
  return <>{basicInfo}</>;
};
 
export default CountryWrapper;