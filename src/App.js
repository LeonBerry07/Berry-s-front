// import logo from './logo.svg';
// import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div>
        {/* <Routes> */}
          {/* <Route path="/" element={<LandingPage/>}/> */}
        {/* </Routes> */}
      </div>
      </header>
    </div>
  );
}

export default App;

{/* <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<Cards games={games} onSearch={onSearch} genres={genres} getGenres={getGenres}/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/form" element={<Form platforms={platforms} genres={genres}/>}/>
        </Routes>
      </div>
    </div> */}
