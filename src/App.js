import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/movieList";
import MovieListHeader from "./components/movieListHeader";
import MyFavourite from "./components/myFav";
import SearchBar from "./components/searchBar";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = async (searchTerm) => {
    const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=43ce8238&`;

    const res = await fetch(url);
    const resJson = await res.json();

    if (resJson.Search) {
      setMovies(resJson.Search);
    }
  };

  useEffect(() => {
    getMovies(searchTerm);
  }, [searchTerm]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };

  return (
    <div className="container">
      <div className="title text-center flex-column py-4">
        <a href="/">
          <MovieListHeader header="Movie" />
        </a>
      </div>
      <div className="list">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="content py-4">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComp={MyFavourite}
        />
      </div>
      <div className="title text-center flex-column py-4">
        <MovieListHeader header="Favourite" />
      </div>
      <div className="content py-4">
        <MovieList
          movies={favourites}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComp={MyFavourite}
        />
      </div>
    </div>
  );
};

export default App;
