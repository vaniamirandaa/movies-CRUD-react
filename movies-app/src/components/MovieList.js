

import React, { useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onMovieSelect }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [search, setSearch] = useState("");

  const filterMoviesByGenre = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre === "all" ? null : genre);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const renderMovies = () => {
    let filteredMovies = movies;

    if (selectedGenre) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genres.includes(selectedGenre)
      );
    }

    if (search) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(search)
      );
    }

    if (filteredMovies.length === 0) {
      return <li>No movies available.</li>;
    } else {
      return filteredMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />
      ));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-2 mt-2"> Movie List</h2>
      <div className="flex flex-row justify-center items-center space-x-4 pb-2 pt-2">
        <select
          className="select select-bordered w-full"
          onChange={filterMoviesByGenre}
        >
          <option value="" disabled>
            Select Genre
          </option>
          <option value="all">Show All Genres</option>
          <option value="Action">Action</option>
          <option value="Animated">Animated</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>

        
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded  space-x-4"
        />
      </div>
      <div className="flex overflow-x-auto">
      <ul className="flex flex-wrap justify-center" style={{ margin: '10px 20px'}}>

          {renderMovies()}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
