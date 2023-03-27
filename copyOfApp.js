import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./Login";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import netflix_intro from "./netflix_intro.gif";
import darkmode from "./drkmd.png";
import Cookies from "js-cookie";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [isWhite, setIsWhite] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = Cookies.get("searchHistory");
    if (history) {
      const parsedHistory = JSON.parse(history);
      setSearchHistory(parsedHistory.slice(-3));
    }
  }, []);

  useEffect(() => {
    searchMovies("spider man");
  }, []);

  const handleColorChange = () => {
    setIsWhite(!isWhite);
  };

  const backgroundColor = isWhite ? "#212426" : "white";

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);

    const newHistory = [...searchHistory, title];
    setSearchHistory(newHistory.slice(-3));
    Cookies.set("searchHistory", JSON.stringify(newHistory.slice(-3)), {
      expires: 365,
    });
  };

  const handleRemoveCookie = () => {
    Cookies.remove('myCookie');
    setSearchHistory([]);
  }

  return (
    <div className="app">

      <div className="heading">

        <img
          className="darkMode"
          src={darkmode}
          alt="dark mode"
          onClick={handleColorChange}
        />

        <style>{`body { background-color: ${backgroundColor}; }`}</style>

        <div className="removeCookies">
          <button className = "buttonRemCookies" onClick={handleRemoveCookie}>Remove Cookie</button>
        </div>

      </div>

      <div className="line"></div>

      <div className="name">

        <h1>NETFLIX CLONE</h1>

        <div className="overlay">

          <img
            className="netflix_intro"
            src={netflix_intro}
            alt="netflix_intro"
          />

        </div>

      </div>
      

        <div className="search">

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />

          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}          
          />

          <div className = "searchCookies">

            {searchHistory.map((query) => (
              <div key={query}>{query}</div>
            ))}

          </div>

        </div>

        
        

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
    
  );
};

export default App;
