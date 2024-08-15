// src/components/NavBar.js
import React from 'react';
import '../App.css'; // Import custom CSS if needed

export default function NavBar({ currentPage, totalTasks, onPageChange }) {
  const tasksPerPage = 9;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  // Handlers for previous and next buttons
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
