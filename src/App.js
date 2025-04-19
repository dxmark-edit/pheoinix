import logo from './logo.svg';
import './App.css';
import FavoriteAnime from "./components/FavoriteAnime";
import AnimeDetails from "./components/AnimeDetails";
import SearchAnime from "./components/SearchAnime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Routes>
          <Route path="/FavoriteAnime" element={<FavoriteAnime />} />
          <Route path="/anime/:id" element={<AnimeDetails />} />
          <Route path="/search" element={<SearchAnime />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
