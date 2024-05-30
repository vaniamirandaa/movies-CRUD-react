import { useState, useEffect } from 'react';

const SearchandFilter = (movies) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await fetch("http://localhost:3031/genres");
      const data = await res.json();
      setGenres(data);
    } catch (err) {
      console.log("Error fetching genres:", err);
    }
  };

  const handleSelectGenre = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSelectedGenres = selectedGenres.every(genre => movie.genres.includes(genre));
    const matchesSearch = movie.title.toLowerCase().includes(search);
    return matchesSelectedGenres && matchesSearch;
  });

  return {
    genres,
    selectedGenres,
    search,
    filteredMovies,
    handleSelectGenre,
    handleSearch,
  };
};

export default SearchandFilter;
