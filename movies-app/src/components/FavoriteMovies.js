import React from 'react';
import MovieCard from './MovieCard';

const FavoriteMovies = ({ favoriteMovies, onRemoveFavorite, onMovieSelect }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-2 mt-2">Favorite Movie</h2>
      <div className="flex overflow-x-auto">
        <ul className="flex flex-wrap justify-center" style={{ margin: '20px 20px' }}>
          {favoriteMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onMovieSelect}
            // onRemoveFavorite={onRemoveFavorite}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavoriteMovies;
