import React from "react";

const SearchMovies = (props) => {
  return (
    <div className="col flex justify-center">
      <div className="flex border-2 rounded">
        <input
          className="w-80 h-8 border-0 p-2 bg-transparent"
          value={props.value}
          onChange={(event) => props.setSearchTerm(event.target.value)}
          placeholder="Search Movies"
        />
      </div>
    </div>
  );
};

export default SearchMovies;
