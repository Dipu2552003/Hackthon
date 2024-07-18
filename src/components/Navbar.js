import React from "react";
import {
  FaChartBar,
  FaThLarge,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaRegNewspaper,
  FaShoppingBag,
  FaChartArea,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiWalletLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

const ICON_SIZE = 20;

function Navbar({ visible, show }) {
  // Function to handle logout
  const handleLogout = () => {
    document.cookie =
      "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <>
      <div className="mobile-nav">
        <button
          style={{ color: "black" }}
          className="mobile-nav-btn"
          onClick={() => show(!visible)}
        >
          <FaBars size={24} />
          <i className="fa-thin fa-bell"></i>
        </button>

        <img
          src={require("../image/logo2.png")}
          alt="logo"
          style={{ height: "60px", width: "145px" }}
        ></img>

        <div className="profile_logo">
          <i>
            <PiWalletLight size={24} />
          </i>
          <i>
            <IoMdNotificationsOutline size={24} />
          </i>
          <img
            src={require("../image/ff.png")}
            style={{ height: "60px", width: "80px" }}
            alt="profile"
          ></img>
          <IoIosArrowDown size={15} style={{ marginLeft: "-15px" }} />
        </div>
      </div>

      <nav className={!visible ? "navbar" : ""}>
        <div>
          <div className="links nav-top">
            <NavLink to="/Market" className="nav-link">
              <FaChartBar size={ICON_SIZE} />
              <span>Market </span>
            </NavLink>
            <NavLink to="/News" className="nav-link">
              <FaRegNewspaper size={ICON_SIZE} />
              <span>News</span>
            </NavLink>
            <NavLink to="/Portfolio" className="nav-link">
              <FaShoppingBag size={ICON_SIZE} />
              <span>Portfolio</span>
            </NavLink>
            <a href="http://127.0.0.1:5000/" className="nav-link">
              <FaChartArea size={ICON_SIZE} />
              <span>Predict</span>
            </a>
          </div>
        </div>

        <div className="links">
          <NavLink to="/Settings" className="nav-link">
            <FaCog size={ICON_SIZE} />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/Sign-out" className="nav-link" onClick={handleLogout}>
            <FaSignOutAlt size={ICON_SIZE} />
            <span>Logout</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
