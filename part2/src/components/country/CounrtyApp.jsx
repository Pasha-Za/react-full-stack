import React, { useState, useEffect } from "react";
import CountryItem from "./CountryItem";
import CountryWrapper from "./CountryWrapper";
import axios from 'axios';

const CounrtyApp = () => {
    const [countries, setCountries] = useState([]);
    const [searchedCountry, setSearchedCountry] = useState("");
    const [countryInfo, setCountryInfo] = useState({});

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then(response => {
          setCountries(response.data);
        });
    }, [])

    const showContryData = code => () => {
      const result = countries.filter(country => country.alpha2Code.includes(code));
      setCountryInfo({ ...countryInfo, ...result[0] });
    };

    const handleCountrySearch = (event) => {
        event.preventDefault();

        setSearchedCountry(event.target.value);
    }

    const filterCounrties = (countries, query) => {        
        return countries.filter(country =>
          country.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    const matchedCountries = searchedCountry
      ? filterCounrties(countries, searchedCountry)
      : [];

    const countryList =
      matchedCountries.length >= 10 ? (
        <p>To many matches</p>
      ) : matchedCountries.length === 1 ? (
        <CountryItem
          data={matchedCountries[0]}
          showRegion={true}
        />
      ) : (
        <CountryWrapper
          countries={matchedCountries}
          showDetailsFor={countryInfo}
          showContryData={showContryData}
        />
      );

    return (
      <div className="country-app">
        <p>type a country name:</p>
        <input
          type="text"
          value={searchedCountry}
          onChange={handleCountrySearch}
        />

        <div>{countryList}</div>
      </div>
    );
}
 
export default CounrtyApp;