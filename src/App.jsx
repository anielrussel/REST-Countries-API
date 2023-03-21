import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  const [countries, setCountries] = useState([]); //state array for the fetchdata

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Hero countries={countries} />} />
        <Route
          path="/countries/:id"
          element={<Details countries={countries} />}
        />
      </Routes>
    </div>
  );
}

export default App;
