import React from "react";

const MovieList = (props) => {
  const FavouriteComp = props.favouriteComp;
  return (
    <>
      {props.movies.map((movie) => (
        <div className="card">
          <div className="py-2">
            <div className="flex justify-center">
              <div className="image-container">
                <img src={movie.Poster} alt="Movie Thumbnail" />
                <div className="overlay flex justify-center items-center">
                  <div onClick={() => props.handleFavouritesClick(movie)}>
                    <FavouriteComp />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex text-center flex-col">
              <p className="pt-2 text-lg">{movie.Title}</p>
              <p className="pb-2">
                {movie.Year} || {movie.Type}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default MovieList;
