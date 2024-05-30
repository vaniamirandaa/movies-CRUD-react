import React from "react";

const Pagination = ({ currentPage, totalPages, onPageClick }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-1 mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          id={number}
          onClick={onPageClick}
          className={`my-5 px-3 py-1 rounded-full ${
            currentPage === number ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
