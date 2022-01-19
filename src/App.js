import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/movieList";
import MovieListHeader from "./components/movieListHeader";
import MyFavourite from "./components/myFav";
import RemoveFavourite from "./components/removeFav";
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
    saveToLocalStorage(newFavouriteList);
  };

  // save to local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("favourites", JSON.stringify(items));
  };

  // get from local storage
  useEffect(() => {
    const localFavourites = localStorage.getItem("favourites");
    if (localFavourites) {
      setFavourites(JSON.parse(localFavourites));
    }
  }, []);

  // remove favourite movie
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
  };

  return (
    <div>
      <div className="title text-center flex-column py-4">
        <a href="/">
          <MovieListHeader header="Movie" />
        </a>
      </div>
      <div className="list">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="content py-4 xl:grid xl:grid-cols-4 xl:gap-x-4 xl:gap-y-4">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComp={MyFavourite}
        />
      </div>
      <div className="title text-center flex-column py-4">
        <MovieListHeader header="Favourite" />
      </div>
      <div className="content py-4 xl:grid xl:grid-cols-4 xl:gap-x-4 xl:gap-y-4">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComp={RemoveFavourite}
        />
      </div>
    </div>
  );
};

export default App;
