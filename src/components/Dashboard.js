import React, { useEffect, useState } from "react";
import Country from "./Country";
import Search from "./Search";
import axios from "axios";
import test from "../images/peru.svg";
import test1 from "../images/cn.svg";
import "../styles/dashboard.css";

function Dashboard() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState();
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => {
          // res.data.map(names => console.log(names))
          setCountries(res.data);
          setFilteredList(res.data);
        });
    };

    fetchData();
  }, []);

  const filterList = (region) => {
    setFilteredList(countries);

    setFilteredList((names) =>
      names.filter((country) => country.region === region)
    );
    console.log(countries);
  };

  return (
    <div className="dash-container">
      <Search filter={filterList} />
      <div className="countries-flex-container">
        <div className="countries-container">
          {filteredList.map((names) => (
            <Country key={names.name.common} country={names.name.common} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
