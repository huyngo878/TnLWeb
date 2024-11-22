import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const Callback = () => {
  const navigate = useNavigate();

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
    fetch('http://localhost:3001/callback', {
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

        // Save user data in localStorage and navigate to Menu
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/menu');
      })
      .catch((err) => {
        console.error('Error communicating with backend:', err);
        alert('Failed to log in. Try again.');
        navigate('/');
      });
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
      <h1 className="text-2xl">Processing login...</h1>
    </div>
  );
};

export default Callback;
