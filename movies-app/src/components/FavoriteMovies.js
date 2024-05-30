import React, { useState } from "react";
import MovieCard from './MovieCard';
import SearchandFilter from './SearchandFilter';

const FavoriteMovies = ({ favoriteMovies, onMovieSelect }) => {
  const {
    genres,
    selectedGenres,
    search,
    filteredMovies,
    handleSelectGenre,
    handleSearch,
  } = SearchandFilter(favoriteMovies);

  
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  const paginate = (movies, currentPage, moviesPerPage) => {
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    return movies.slice(indexOfFirstMovie, indexOfLastMovie);
  };

  const getPageNumbers = (totalMovies, moviesPerPage) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const currentMovies = paginate(filteredMovies, currentPage, moviesPerPage);
  const pageNumbers = getPageNumbers(filteredMovies.length, moviesPerPage);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-2 mt-2">Favorite Movies</h2>
      <div className="flex flex-row justify-center items-center space-x-4 pb-2 pt-2">
        <div>
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={handleSearch}
            style={{ width: '800px' }}
            className="border border-gray-300 rounded-full px-4 py-2"
          />
        </div>

      </div>
      <div className="flex flex-wrap justify-center space-x-2 pb-2 pt-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`px-4 py-2 rounded-full ${selectedGenres.includes(genre.name)
                ? "bg-sky-500 text-white"
                : "bg-gray-200 text-gray-800"
              }`}
            onClick={() => handleSelectGenre(genre.name)}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto" style={{ margin: '15px 20px' }}>
        {currentMovies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          <ul className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: 0, margin: 0 }}>
            {currentMovies.map((movie) => ( // Changed filteredMovies to currentMovies
              <li key={movie.id} style={{ marginTop: '12px' }}>
                <MovieCard movie={movie} onSelect={onMovieSelect} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-center space-x-1 mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            id={number}
            onClick={handlePageClick}
            className={`my-5 px-3 py-1 rounded-full ${currentPage === number ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            {number}
          </button>
        ))}
      </div>

    </div>
  );
};

export default FavoriteMovies;
