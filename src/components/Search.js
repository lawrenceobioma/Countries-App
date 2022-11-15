import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/dashboard.css";
import CountryProfile from "./CountryProfile";

function Search( {filter}) {
  const [searched, setSearched] = useState("");
  const [toggledd, setToggledd] = useState(false);
  const navigate = useNavigate();

  const lookUp = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  async function fetchData() {
    const countryData = await axios
      .get("https://restcountries.com/v3.1/name/" + searched + "?fullText=true")
      .then((res) => {
        navigate("/country", {
          state: {countryId: searched}
        });
      })
      .catch((err) => console.log("this is an error"));
  }

  return (
    <div className="selection-box">
      <div className="search-box">
        <span className="search-button" onClick={() => fetchData()}></span>
        <input
          type="text"
          className="search-input"
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
          onKeyDown={lookUp}
          placeholder="Search for a country..."
        />
      </div>

      <div className="filter-container">
        <div className="filter-box">
          Filter by Region{" "}
          <span
            className="filter-button"
            onClick={() => setToggledd(!toggledd)}
          ></span>
        </div>
        {toggledd ? (
          <ul className="filter-dropdown">
            <li onClick={() => filter("Africa")}> Africa </li>
            <li onClick={() => filter("Americas")}> America </li>
            <li onClick={() => filter("Asia")}> Asia </li>
            <li onClick={() => filter("Europe")}> Europe </li>
            <li onClick={() => filter("Oceania")}> Oceania </li>
          </ul>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}

export default Search;
