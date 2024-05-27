import React, { useState } from "react";
import MovieForm from "./MovieForm";

const MovieDetail = ({
  movie,
  onDeleteMovie,
  onEditMovie,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateMovie = (updatedMovie) => {
    onEditMovie(movie.id, updatedMovie);
    setIsEditing(false);
  };

  const handleFavoriteButton = () => {
    if (isFavorite) {
      onRemoveFavorite(movie.id);
    } else {
      onAddFavorite(movie.id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {movie ? (
        <div>
          {isEditing ? (
            <MovieForm
              initialData={movie}
              onSubmit={handleUpdateMovie}
              onCancel={handleCancelEdit}
              isEditing={true}
            />
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
              <p className="text-xl text-gray-500 mb-4">{movie.year}</p>
              <p className="text-gray-700 mb-4">{movie.description}</p>
              <p className="mb-2">
                <span className="font-semibold">Cast:</span> {movie.cast.join(", ")}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Genres:</span> {movie.genres.join(", ")}
              </p>
              <img
                src={movie.thumbnail}
                alt="Movie Thumbnail"
                className="object-cover rounded-lg mb-6"
                style={{ width: "300px", height: "450px" }}
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={handleEdit}
                    className="btn md:btn-md rounded-full hover:bg-blue-500 px-4 py-2 border-black"
                    >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteMovie(movie.id)}
                    className="btn md:btn-md rounded-full hover:bg-red-500 px-4 py-2 border-black"
                    >
                    Delete
                  </button>
                </div>
                <button
                  onClick={handleFavoriteButton}
                  className={`btn flex items-center space-x-2 ${
                    isFavorite
                      ? "text-red-500 bg-transparent border-red-500 hover:bg-red-200 rounded-full"
                      : "border-black hover:bg-gray-200 rounded-full"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      isFavorite ? "text-red-500 fill-current" : "fill-transparent stroke-current"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>No movie selected</div>
      )}
    </div>
  );
};

export default MovieDetail;
