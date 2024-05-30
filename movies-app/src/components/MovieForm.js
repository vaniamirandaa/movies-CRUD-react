import React, { useState, useEffect } from "react";

const MovieForm = ({ initialData, onSubmit, onCancel, isEditing }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [description, setDescription] = useState("");
  const [cast, setCast] = useState("");
  const [thumbnail, setThumbnail] = useState("");


  useEffect(() => {
    if (isEditing) {
      setTitle(initialData.title);
      setYear(initialData.year);
      setSelectedGenres(initialData.genres);
      setDescription(initialData.description);
      setCast(initialData.cast.join(", "));
      setThumbnail(initialData.thumbnail);
    }
  }, [isEditing, initialData]);

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

  const handleAddGenre = (genre) => {
    if (genre && !selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleRemoveGenre = (genreIndex) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.filter((_, index) => index !== genreIndex)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !title ||
      !year ||
      !selectedGenres.length ||
      !description ||
      !cast ||
      !thumbnail
    ) {
      alert("Please fill in all fields!");
      return;
    }
    const newMovie = {
      title,
      year,
      genres: selectedGenres,
      description,
      cast: cast.split(",").map((actor) => actor.trim()),
      thumbnail,
    };
    onSubmit(newMovie);
    if (!isEditing) {
      setTitle("");
      setYear("");
      setSelectedGenres([]);
      setDescription("");
      setCast("");
      setThumbnail("");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md my-5">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Edit Movie" : "Add Movie"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-semibold mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="year" className="block font-semibold mb-1">
              Year
            </label>
            <input
              id="year"
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="genreDropdown" className="block font-semibold mb-1">
              Select Genre
            </label>
            <select
              id="genreDropdown"
              value=""
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              onChange={(e) => handleAddGenre(e.target.value)}
            >
              <option value="" disabled>
                Choose Genre
              </option>
              {genres
                .filter((genre) => !selectedGenres.includes(genre.name))
                .map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <ul
              id="selectedGenres"
              className="border-gray-300 rounded-md px-2 py-2 flex flex-wrap"
            >
              {selectedGenres.map((genre, index) => (
                <li
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 my-1 mx-2"
                >
                  <span className="mr-2">{genre}</span>
                  <button
                    type="button"
                    className="rounded-md focus:outline-none"
                    onClick={() => handleRemoveGenre(index)}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-2 h-40"
            />
          </div>
          <div>
            <label htmlFor="cast" className="block font-semibold mb-1">
              Casts
            </label>
            <input
              id="cast"
              type="text"
              placeholder="Casts (i.e: Anya Taylor-Joy, Johnny Flynn)"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="thumbnail" className="block font-semibold mb-1">
              Thumbnail (URL)
            </label>
            <input
              id="thumbnail"
              type="text"
              placeholder="Thumbnail (URL)"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn md:btn-md rounded-full hover:bg-cyan-500 hover:text-white px-4 py-4"
            >
              {isEditing ? "Edit" : "Add Movie"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn md:btn-md rounded-full hover:bg-red-500 hover:text-white px-4 py-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
