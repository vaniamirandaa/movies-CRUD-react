import { addMovie, editMovie, deleteMovie } from './api';

export const handleAddMovie = async (newMovie, setMovies, movies, setView) => {
  try {
    const data = await addMovie(newMovie);
    setMovies([...movies, data]);
    setView('list');  
  } catch (err) {
    console.log('Error adding movie:', err);
  }
};

export const handleEditMovie = async (movieId, updatedMovie, setMovies, movies, setSelectedMovie) => {
  try {
    const data = await editMovie(movieId, updatedMovie);
    setMovies(movies.map(movie => (movie.id === movieId ? data : movie)));
    setSelectedMovie(data);
  } catch (err) {
    console.log('Error updating movie:', err);
  }
};

export const handleDeleteMovie = async (movieId, setMovies, movies, setSelectedMovie, setView) => {
  try {
    await deleteMovie(movieId);
    setMovies(movies.filter(movie => movie.id !== movieId));
    setSelectedMovie(null);
    setView('list'); 
  } catch (err) {
    console.log('Error deleting movie:', err);
  }
};
