import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Country({ country }) {
  const [imageUrl, setImageUrl] = useState();
  const [population, setPopulation] = useState();
  const [region, setRegion] = useState();
  const [capital, setCapital] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const countryData = await axios.get(
      "https://restcountries.com/v3.1/name/" + country + "?fullText=true"
    );

    setImageUrl(countryData.data[0].flags.png);
    setPopulation(countryData.data[0].population.toLocaleString());
    setRegion(countryData.data[0].region);
    setCapital(countryData.data[0].capital);
  }

  return (
    <div
      onClick={() =>
        navigate("/country", {
          state: { countryId: country },
        })
      }
      className="country-box"
    >
      <div className="country-flag">
        <img src={imageUrl}></img>
      </div>

      <div className="country-details">
        <p className="country-title">{country}</p>
        <div className="country-info">
          <p>
            <b>Population:</b> <span>{population}</span>
          </p>
          <p>
            <b>Region:</b> <span>{region}</span>
          </p>
          <p>
            <b>Capital:</b> <span>{capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Country;
