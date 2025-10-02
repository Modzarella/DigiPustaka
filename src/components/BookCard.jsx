import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ id, title, author, year, rating, coverUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="mb-3">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 mb-2">{author}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-gray-700">{rating}</span>
          </div>
          <span className="text-gray-500">{year}</span>
        </div>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  coverUrl: PropTypes.string.isRequired
};

export default BookCard;