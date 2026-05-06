import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // CSS específico para la Navbar

function NavBar() {
  return (
    <nav className="navbar">
      <div>
        <Link to="/"><a className="navbar-logo">Berry's Music</a></Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/"><a href="#home">Inicio</a></Link></li>
        <li><Link to="/catalogue"><a href="#catalogue">Catalogue</a></Link></li>
        <li><Link to="/login"><a href="#login" className="login-button">Login</a></Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;