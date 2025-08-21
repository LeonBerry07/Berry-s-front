import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

function App() {


  return (
    <div className="App">
      <NavBar />
      <header>
         {/* <h1>Berry's</h1>
         <input type="text" placeholder="Buscar música..." id="search">
         <nav>
             <ul>
                 <li><a href="/">Inicio</a></li>
                 <li><a href="/explore">Explorar</a></li>
                 <li><a href="/cart">Carrito (<span id="cart-count">0</span>)</a></li>
                 <li><a href="/profile">Profile</a></li>
             </ul>
         </nav> */}
         
     </header>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          {/* <Route path="/detail/:id" element={<Detail/>}/> */}
          {/* <Route path="/form" element={<Form platforms={platforms} genres={genres}/>}/> */}
        </Routes>
      </div>

      <footer>
        <p>&copy; 2025 Berry's - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;