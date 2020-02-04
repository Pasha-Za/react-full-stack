import React from 'react';

const CountryItem = ({ data, showRegion }) => {

  const region = showRegion ? <p>Region: {data.region} </p> : "";

  const langs = data.languages.map(lang => (
    <li key={lang.iso639_1}>{lang.name}</li>
  ));
  return (
    <div className="country-panel">
      <h3>{data.name}</h3>
      <img src={data.flag} alt="" />
      <h4>Languages:</h4>
      <ul>{langs}</ul>
      {region}
    </div>
  );
};
 
export default CountryItem;