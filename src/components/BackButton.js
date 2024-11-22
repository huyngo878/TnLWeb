import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/menu')}
      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg mt-4"
    >
      Back to Menu
    </button>
  );
};

export default BackButton;
