import React, { useState, useEffect } from "react";

const MovieForm = ({ initialData, onSubmit, onCancel, isEditing }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState("");
  const [description, setDescription] = useState("");
  const [cast, setCast] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (isEditing) {
      setTitle(initialData.title);
      setYear(initialData.year);
      setGenres(initialData.genres.join(", "));
      setDescription(initialData.description);
      setCast(initialData.cast.join(", "));
      setThumbnail(initialData.thumbnail);
    }
  }, [isEditing, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !year || !genres || !description || !cast || !thumbnail) {
      alert("Please fill in all fields!");
      return;
    }
    const newMovie = {
      title,
      year,
      genres: genres.split(",").map((genre) => genre.trim()),
      description,
      cast: cast.split(",").map((actor) => actor.trim()),
      thumbnail,
    };
    if (isEditing) {
      onSubmit(newMovie);
    } else {
      onSubmit(newMovie);
      setTitle("");
      setYear("");
      setGenres("");
      setDescription("");
      setCast("");
      setThumbnail("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
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
              type="text"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="genres" className="block font-semibold mb-1">
              Genres
            </label>
            <input
              id="genres"
              type="text"
              placeholder="Genres (i.e: Comedy, Romance)"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
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
              className="btn md:btn-md rounded-full hover:bg-blue-500 px-4 py-2 border-black"
            >
              {isEditing ? "Edit" : "Add Movie"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn md:btn-md rounded-full hover:bg-red-500 px-4 py-2 border-black"
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
