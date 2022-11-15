import React, { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CountryProfile from "./components/CountryProfile";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");

  const toogleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div className="App" id={theme}>
      <ThemeContext.Provider value={{ theme, toogleTheme }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="country" element={<CountryProfile />}></Route>
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
