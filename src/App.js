import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./css/index.css";
import Dashboard from "./components/Dashboard";
import Market from "./components/Market";
import News from "./components/News";
import Portfolio from "./components/Portfolio";
import Settings from "./components/Settings";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import StockDetails from "./components/StockDetails";
import Login from "./components/Login";

function App() {
  const [navVisible, showNavbar] = React.useState(true);

  return (
    <div className="App">
      <Navbar visible={navVisible} show={showNavbar} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard navVisible={navVisible} />}
        />
        <Route path="/market" element={<Market navVisible={navVisible} />} />
        <Route path="/news" element={<News navVisible={navVisible} />} />
        <Route
          path="/portfolio"
          element={<Portfolio navVisible={navVisible} />}
        />
        <Route
          path="/settings"
          element={<Settings navVisible={navVisible} />}
        />
        <Route path="/sign-out" element={<Logout navVisible={navVisible} />} />
        <Route
          path="/stock"
          element={<StockDetails navVisible={navVisible} />}
        />
      </Routes>
    </div>
  );
}

export default App;
