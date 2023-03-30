import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import logo from "img/logo.svg";

const Navbar = () => {
  const { user } = useGlobalContext();
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <img src={logo} alt="Sign2Sign Logo" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">
              {user ? <img src={user.img} className="small" /> : <p>Profile</p>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
