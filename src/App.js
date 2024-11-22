import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Form from './components/Form';
import Schedule from './components/Schedule';
import Rules from './components/Rules';
import Username from './components/Username';
import Info from './components/Info';
import Support from './components/Support';
import Admin from './components/Admin'; // Import your Admin component

// Callback Component
const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Send the code to your backend server
      fetch('http://localhost:3001/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('User data:', data);
          // Save user data to localStorage if needed
          localStorage.setItem('user', JSON.stringify(data));
          // Redirect to the menu hub
          navigate('/menu');
        })
        .catch((err) => {
          console.error('Error during authentication:', err);
        });
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/form" element={<Form />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/username" element={<Username />} />
        <Route path="/info" element={<Info />} />
        <Route path="/support" element={<Support />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
