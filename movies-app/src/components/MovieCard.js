import React from 'react';

const MovieCard = ({ movie, onSelect, onRemoveFavorite }) => {
  const handleSelect = () => {
    onSelect(movie);
  };

  return (
    <li
      key={movie.id}
      className="flex flex-col items-center border border-gray-300 rounded-md p-4 mr-4 mb-4 transform transition duration-300 ease-in-out hover:scale-105"
      style={{ width: '256px' }}
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className="w-full h-full mb-2 cursor-pointer object-cover"
        style={{ width: '100%', height: '300px' }}
        onClick={handleSelect}
      />
      <p
        className="text-center text-lg font-semibold cursor-pointer"
        style={{ maxWidth: '100%', fontSize: '14px' }}
        onClick={handleSelect}
      >
        {movie.title}
      </p>
      {/* {onRemoveFavorite && (
        <button className="mt-2 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600" onClick={handleRemoveFavorite}>
          Remove
        </button>
      )} */}
    </li>
  );
};

export default MovieCard;
