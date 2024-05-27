import React from 'react';

const Navigation = ({ onHomeButtonClick, onFavoriteButtonClick, onAddButtonClick, onLogout }) => {
  return (
    <div className="bg-purple-200 flex justify-end items-center h-95 p-4">
      <div className="text-sm breadcrumbs text-black-500">
        <ul className="flex space-x-4">
          <li>
            <button className="font-bold" onClick={onHomeButtonClick}>
              Home
            </button>
          </li>
          <li>
            <button className="font-bold" onClick={onFavoriteButtonClick}>
              Favorite Movies
            </button>
          </li>
          <li>
            <button className="font-bold" onClick={onAddButtonClick}>
              Add Movie
            </button>
          </li>
          <li>
            <button className="font-bold" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
