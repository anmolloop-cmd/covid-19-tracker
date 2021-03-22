import {Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import React from 'react';
import './App.css';
import react,{ useState, useEffect } from "react";
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import {sortData} from './utl';
import LineGraph from './LineGraph'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData,setTableData]=useState([]);


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          const sortedData=sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData(countries);
  }, []);
  const OnCountryChange = async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url=countryCode==='worldwide'?'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response =>response.json())
    .then(data=>{
      setCountry(countryCode);
      setCountryInfo(data);
    });
  };


  return (
    <div className="app">
      <div className="app_left">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select
            variant="outlined"
            onClick={OnCountryChange}
            value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
      </div>
      <div className="app_stats">
          <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      </div>
      <Map/>
      </div>
      <div>
        <Card  className="app_right">
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3>WorldWide new cases</h3>
              <LineGraph/>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
