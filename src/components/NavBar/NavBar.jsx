import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // CSS específico para la Navbar

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <Link to="/">Berry's Music</Link> */}
        Berry's Music
      </div>
      <ul className="navbar-links">
        <li><Link to="/"><a href="#home">Inicio</a></Link></li>
        <li><a href="#store">Tienda</a></li>
        <li><a href="#about">Acerca</a></li>
        <li><a href="#contact">Contacto</a></li>
        <li><Link to="/login"><a href="#login" className="login-button">Login</a></Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;