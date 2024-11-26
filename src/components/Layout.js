import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Add a console log to inspect the user object
  console.log('Layout.js user:', user);

  // Check if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const API_URL = 'http://164.92.101.175:3001';
        const response = await fetch(`${API_URL}/check-admin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id }),
        });

        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const handleGoBack = () => {
    navigate('/menu');
  };

  return (
    <div className="flex flex-col h-screen bg-gray4 text-white">
      {/* Navigation Bar */}
      <header className="bg-gray3 p-4">
        <nav className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {user && user.username && (
              <Link to="/username" className="flex items-center gap-2 hover:underline">
                {user.avatar ? (
                  <img
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user.username}</span>
              </Link>
            )}
          </div>

           {/* Center Section: Links */}
        <div className="flex gap-8">
        <Link to="/schedule" className="hover:underline text-white">Schedule</Link>
        <Link to="/form" className="hover:underline text-white">Form</Link>
        <Link to="/rules" className="hover:underline text-white">Rules</Link>
        <Link to="/info" className="hover:underline text-white">Info</Link>

        {/* Admin Button: Visible only for admins */}
        {isAdmin && (
          <Link to="/admin" className="hover:underline text-gray5 font-bold">
            Admin
          </Link>
        )}
      </div>

      {/* Right Section: Back to Menu Button */}
      <button
        onClick={handleGoBack}
        className="bg-gray5 text-white px-4 py-2 rounded-lg hover:bg-gray6"
      >
        Back to Menu
      </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray3 p-4 text-center text-gray6">
        Made by korgie
      </footer>
    </div>
  );
};

export default Layout;
