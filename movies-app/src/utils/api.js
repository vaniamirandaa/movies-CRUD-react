
export const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3030/movies');
      const data = await res.json();
      return data;
    } catch (err) {
      console.log('Error fetching data:', err);
      throw err;
    }
  };
  
  export const addMovie = async newMovie => {
    try {
      const res = await fetch('http://localhost:3030/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log('Error adding movie:', err);
      throw err;
    }
  };
  
  export const editMovie = async (movieId, updatedMovie) => {
    try {
      const res = await fetch(`http://localhost:3030/movies/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log('Error updating movie:', err);
      throw err;
    }
  };
  
  export const deleteMovie = async movieId => {
    try {
      await fetch(`http://localhost:3030/movies/${movieId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.log('Error deleting movie:', err);
      throw err;
    }
  };
  