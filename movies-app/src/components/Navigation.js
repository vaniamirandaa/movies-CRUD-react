import React, { useState } from "react";
const Navigation = ({
  onHomeButtonClick,
  onFavoriteButtonClick,
  onAddButtonClick,
  onLogout,
}) => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const navigationButton = () => {
    setOpenNavigation(!openNavigation);
  };

  return (
    <div>
      <button
        className="p-2 m-2 rounded-md focus:outline-none"
        onClick={navigationButton}
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
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-sky-500 w-64 z-50 transform ${openNavigation ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button
            className="rounded-md focus:outline-none"
            onClick={navigationButton}
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
          </button>
          <ul className="flex flex-col space-y-4 mt-4 text-white">
            <li>
              <button className="font-bold" onClick={onHomeButtonClick}>
                Home
              </button>
            </li>
            <li>
              <button className="font-bold" onClick={onAddButtonClick}>
                Add New Movie
              </button>
            </li>
            <li>
              <button className="font-bold" onClick={onFavoriteButtonClick}>
                Favorite Movies
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
      {openNavigation && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={navigationButton}
        ></div>
      )}
    </div>
  );
};

export default Navigation;

