import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Details = ({ countries }) => {
  const { id } = useParams(); // get the id of the selected country from the URL
  const selectedCountry = countries.filter(
    (country) => country.name.common === id
  )[0]; // filter the countries array to get the selected country

  if (!selectedCountry) {
    return <div>Loading...</div>; // Add a conditional check to handle when the selectedCountry is not yet defined
  }

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#384350] dark:text-white md:h-screen pt-[150px] px-10 md:px-16">
      <Link
        to={"/"}
        className="bg-white dark:bg-[#2B3945] dark:text-white dark:shadow-slate-700 py-2 px-8 shadow-lg shadow-slate-400 rounded-md font-Nunito font-semibold"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} className="pr-2" />
        Back
      </Link>
      <div className="mt-20 md:flex md:justify-between md:items-center">
        <div>
          <img
            src={selectedCountry.flags.png}
            alt={selectedCountry.name.common}
            className="w-full h-[250px] md:w-[700px] md:h-[450px] shadow-lg"
          />
        </div>
        <div className="md:flex md:flex-col pb-8">
          <div className="md:flex md:gap-28">
            <div>
              <div className="flex flex-col gap-2 font-Nunito pt-12">
                <h1 className="font-bold text-2xl pb-5">
                  {selectedCountry.name.common}
                </h1>
                <p className="font-semibold">
                  Native Name:{" "}
                  <span className="font-normal">
                    {selectedCountry.altSpellings[1]}
                  </span>
                </p>
                <p className="font-semibold">
                  Population:{" "}
                  <span className="font-normal">
                    {selectedCountry.population.toLocaleString(
                      navigator.language,
                      {
                        minimumFractionDigits: 0,
                      }
                    )}
                  </span>
                </p>
                <p className="font-semibold">
                  Region:{" "}
                  <span className="font-normal">{selectedCountry.region}</span>
                </p>
                <p className="font-semibold">
                  Sub Region:{" "}
                  <span className="font-normal">
                    {selectedCountry.subregion}
                  </span>
                </p>
                <p className="font-semibold">
                  Capital:{" "}
                  <span className="font-normal">{selectedCountry.capital}</span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-2 font-Nunito pt-12 md:mt-16">
                <p className="font-semibold">
                  Top Level Domain:{" "}
                  <span className="font-normal">{selectedCountry.tld}</span>
                </p>
                <p className="font-semibold">
                  Currencies:{" "}
                  {Object.values(selectedCountry.currencies).map(
                    (currency, index) => (
                      <span key={index} className="font-normal">
                        {currency.name}
                        {index <
                        Object.values(selectedCountry.currencies).length - 1
                          ? ", "
                          : ""}
                      </span>
                    )
                  )}
                </p>

                <p className="font-semibold">
                  Languages:{" "}
                  {Object.values(selectedCountry.languages).map(
                    (language, index) => (
                      <span key={index} className="font-normal">
                        {language}
                        {index <
                        Object.values(selectedCountry.languages).length - 1
                          ? ", "
                          : ""}
                      </span>
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
          {selectedCountry.borders && selectedCountry.borders.length > 0 && (
            <div className="pt-12 font-Nunito md:flex md:items-center md:gap-5">
              <p className="font-semibold text-lg">Border Countries:</p>
              <div className="flex gap-2 justify-between pt-5 md:pt-0">
                {selectedCountry.borders.slice(0, 3).map((border, index) => {
                  const borderCountry = countries.find(
                    (country) => country.cca3 === border
                  );
                  return (
                    <Link
                      key={index}
                      to={`/details/${borderCountry.name.common}`}
                      className="bg-white dark:bg-[#2B3945] shadow-lg rounded-sm py-1 px-8"
                    >
                      {borderCountry.name.common}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
