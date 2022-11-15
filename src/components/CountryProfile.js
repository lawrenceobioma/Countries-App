import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/countryprofile.css";
import darkArrow from "../images/dark-pointarrow.png";

function CountryProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const effectRan = useRef(false);

  const [countryId, setCountryId] = useState(location.state.countryId);
  const [nativeName, setNativeName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [population, setPopulation] = useState();
  const [region, setRegion] = useState();
  const [capital, setCapital] = useState();
  const [subRegion, setSubRegion] = useState();
  const [domain, setDomain] = useState();
  const [currencies, setCurrencies] = useState();
  const [languages, setLanguages] = useState("");
  const [borders, setBorders] = useState([]);
  const [countryInfo, setCountryInfo] = useState();

  useEffect(() => {
    //only allowing useEffect to run once
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      fetchData(countryId);
    }

    return () => {
      setBorders([]);
      effectRan.current = true;
    };
  }, [countryId]);

  const toCountry = (val) => {
    //resetting arrays and text string values for specific states
    effectRan.current = false;
    setCountryId(val);
    setLanguages("");
  };

  async function fetchData(country) {
    const countryData = await axios
      .get("https://restcountries.com/v3.1/name/" + country + "?fullText=true")
      .then((res) => {
        //fill out state values
        setCountryInfo(res.data[0]);
        setImageUrl(res.data[0].flags.png);
        setPopulation(res.data[0].population.toLocaleString());
        setRegion(res.data[0].region);
        setSubRegion(res.data[0].subregion);
        setCapital(res.data[0].capital);
        setDomain(res.data[0].tld);
        setCurrencies(Object.values(res.data[0].currencies)[0].name);

        //access the last array in the native names and gets the common name
        setNativeName(
          Object.values(res.data[0].name.nativeName).slice(-1)[0].common
        );

        let lang = Object.values(res.data[0].languages);
        let bordersArr = Object.values(res.data[0].borders);

        lang.map((val, index) => setLanguages((prev) => prev + val + ", "));

        //  find full border names using border acronyms from
        //  current country profile (i.e MEX finds Mexico)
        bordersArr.map(async (val) => {
          const countryBorders = await axios
            .get("https://restcountries.com/v3.1/alpha/" + val)
            .then((res) => {
              setBorders((oldArr) => [...oldArr, res.data[0].name.common]);
            });
        });
      })
      .catch(console.log(""));
  }

  return (
    <>
      <div className="country-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-logo"></span>Back
        </button>
        <div className="country-profile">
          <img className="country-flag" src={imageUrl}></img>
          <div className="country-details-container">
            <h1>{countryId}</h1>
            <div className="country-details">
              <ul className="box1 ">
                <li>
                  <b>Native Name: </b>
                  {nativeName}
                </li>
                <li>
                  <b>Population:</b> {population}
                </li>
                <li>
                  <b>Region:</b> {region}
                </li>
                <li>
                  <b>Sub Region:</b> {subRegion}{" "}
                </li>
                <li>
                  <b>Capital:</b> {capital}
                </li>
              </ul>
              <ul>
                <li>
                  <b>Top Level Domain:</b> {domain}{" "}
                </li>
                <li>
                  <b>Currencies: </b>
                  {currencies}{" "}
                </li>
                <li>
                  <b>Languages:</b> {languages.slice(0, -2)}
                </li>
              </ul>
            </div>

            <div className="country-borders-container">
              <b>Border Countries:</b> &nbsp;&nbsp;
              {borders.map((val, index) => (
                <button
                  onClick={() => {
                    // console.log(val);
                    toCountry(val);
                  }}
                  key={index}
                  className="borders-button"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryProfile;
