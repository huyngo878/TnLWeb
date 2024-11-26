import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Callback = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log('Authorization code received:', code);

    if (!code) {
      console.error('No authorization code found in URL.');
      alert('Authorization code is missing. Please log in again.');
      navigate('/');
      return;
    }

    // Send the authorization code to the backend
    fetch('https://164.92.101.175/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('User data from backend:', data);

        if (data.error) {
          alert(`Error during login: ${data.error}`);
          navigate('/');
          return;
        }

        // Update user data in context and localStorage
        console.log('Calling updateUser with data:', data); // Add this line
        updateUser(data);

        // Remove the 'code' parameter from the URL
        window.history.replaceState({}, document.title, '/menu');

        // Navigate to the Menu page
        navigate('/menu');
      })
      .catch((err) => {
        console.error('Error communicating with backend:', err);
        alert('Failed to log in. Try again.');
        navigate('/');
      });
  }, [navigate, updateUser]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
      <h1 className="text-2xl">Processing login...</h1>
    </div>
  );
};

export default Callback;
