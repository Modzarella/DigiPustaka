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
      className="flex bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-[400px] h-[220px] hover:-translate-y-1"
      onClick={handleClick}
    >
      {/* Cover */}
      <div className="flex-shrink-0 w-36 h-full">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl border border-gray-200"
        />
      </div>

      {/* Info */}
      <div className="ml-4 flex flex-col justify-between flex-grow overflow-hidden">
        <div>
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-1">{author}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="ml-1 text-gray-800 text-sm font-medium">{rating}</span>
          </div>
          <span className="text-gray-500 text-sm">{year}</span>
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
