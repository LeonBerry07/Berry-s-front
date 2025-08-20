import React from "react";
import "./NavBar.css"; // CSS específico para la Navbar

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Berry's Music
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Inicio</a></li>
        <li><a href="#store">Tienda</a></li>
        <li><a href="#about">Acerca</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;