import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  //Better use v2.0 to not have a problem with maps in language
  //https://restcountries.com/v3.1/all - We will try it later again with v3
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  return (
    <div>
      <Filter countries={countries} handleFilter={handleFilter} />
      <Countries countries={countries} country={filter} />
    </div>
  );
}

export default App;
