import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import MovieDetail from "./components/MovieDetail";
import Login from "./components/Login";
import FavoriteMovies from "./components/FavoriteMovies";
import Navigation from "./components/Navigation";
import { fetchData } from "./utils/api";
import {
  handleAddMovie,
  handleEditMovie,
  handleDeleteMovie,
} from "./utils/handle";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState("list");
  const [loggedIn, setLoggedIn] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setLoggedIn(true);
    }
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteMovies"));
    if (storedFavorites) {
      setFavoriteMovies(storedFavorites);
    }
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await fetchData();
      setMovies(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleMovieSelect = async (movie) => {
    setSelectedMovie(movie);
    setView("detail");
  };

  const handleAdd = async (newMovie) => {
    handleAddMovie(newMovie, setMovies, movies, setView);
  };

  const handleEdit = async (movieId, updatedMovie) => {
    handleEditMovie(movieId, updatedMovie, setMovies, movies, setSelectedMovie);
  };

  const handleDelete = async (movieId) => {
    handleDeleteMovie(movieId, setMovies, movies, setSelectedMovie, setView);
  };

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />; ////<<<<<
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const handleAddFavorite = (movieId) => {
    const movieToAdd = movies.find((movie) => movie.id === movieId);
    const updatedFavorites = [...favoriteMovies, movieToAdd];
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie.id !== movieId
    );
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  const handleFavoriteMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setView("detail");
  };

  return (
    <div>
      <Navigation
        onHomeButtonClick={() => window.location.reload()}
        onFavoriteButtonClick={() => setView("favorite")}
        onAddButtonClick={() => setView("form")}
        onLogout={handleLogout}
      />
      {view === "list" && (
        <>
          <MovieList
            movies={movies}
            onMovieSelect={handleMovieSelect}
            onDeleteMovie={handleDelete}
          />
        </>
      )}
      {view === "detail" && selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onDeleteMovie={handleDelete}
          onEditMovie={handleEdit}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          isFavorite={favoriteMovies.some(
            (movie) => movie.id === selectedMovie.id
          )}
        />
      )}
      {view === "form" && <MovieForm onSubmit={handleAdd} />}
      {view === "favorite" && (
        <FavoriteMovies
          favoriteMovies={favoriteMovies}
          // onRemoveFavorite={handleRemoveFavorite}
          onMovieSelect={handleFavoriteMovieSelect}
        />
      )}
    </div>
  );
};

export default App;
