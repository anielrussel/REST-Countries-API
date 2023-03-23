import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hero = ({ countries }) => {
  const [query, setQuery] = useState(""); //state that show countries based on entered text in input

  const [selectedRegion, setSelectedRegion] = useState("All"); //state that show countries based on region that selected

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#384350] relative z-[80] pt-[150px] pb-[120px]">
      <div className="md:flex md:justify-between md:items-center md:px-16">
        <div className="bg-white dark:bg-[#2B3945] flex items-center gap-6 max-w-[450px] md:w-[850px] mx-auto md:mx-0 shadow-lg py-4 px-8 rounded-md">
          <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" size="xl" />
          <input
            type={"text"}
            placeholder="Search for a country..."
            className="outline-0 w-full font-Nunito dark:bg-[#2B3945] dark:text-white"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="mt-16 md:mt-0 ml-5 md:ml-0">
          <select
            aria-label="Filter by Region"
            className="font-Nunito font-semibold py-4 pl-4 pr-10 shadow-lg rounded-md outline-none dark:bg-[#2B3945] dark:text-white"
            value={selectedRegion}
            onChange={(event) => setSelectedRegion(event.target.value)}
          >
            <option value="All">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className="md:flex md:flex-wrap md:justify-center md:gap-16 mt-16 md:px-5">
        {countries
          .filter((country) => {
            if (selectedRegion === "All" || country.region === selectedRegion) {
              if (query === "") {
                return true; //if query is empty
              } else if (
                country.name.common.toLowerCase().includes(query.toLowerCase())
              ) {
                return true; //returns filtered array
              }
            }
            return false; //if region doesn't match or query doesn't match
          })
          // .slice(0, 8)
          .sort((a, b) => (a.name.common > b.name.common ? 1 : -1)) //sort by name
          .map((country, name) => (
            <div key={name} className="mt-12 md:mt-0 px-16 md:px-0 md:flex">
              <Link to={`/countries/${country.name.common}`}>
                <div className="bg-white dark:bg-[#2B3945] dark:text-white rounded-lg font-Nunito shadow-lg md:w-[315px] hover:-translate-y-5 ease-out duration-200">
                  <img
                    src={country.flags.png}
                    className="w-full h-[200px] rounded-t-lg"
                    alt={country.name.common}
                  />
                  <div className="px-5 py-8 flex flex-col gap-2">
                    <h1 className="font-bold text-lg pb-4">
                      {country.name.common}
                    </h1>
                    <p className="font-semibold">
                      Population:{" "}
                      <span className="font-normal">
                        {country.population.toLocaleString(navigator.language, {
                          minimumFractionDigits: 0,
                        })}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Region:{" "}
                      <span className="font-normal">{country.region}</span>
                    </p>
                    <p className="font-semibold pb-8">
                      Capital:{" "}
                      <span className="font-normal">{country.capital}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Hero;
