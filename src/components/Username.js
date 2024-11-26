import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Username = () => {
  const { user } = useContext(UserContext); // Access user context
  const [weapon1, setWeapon1] = useState('Fist'); // Default primary weapon
  const [weapon2, setWeapon2] = useState('Fist'); // Default secondary weapon
  const [gearScore, setGearScore] = useState(0); // Default gear score
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const navigate = useNavigate();

  // Fetch user data when component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://164.92.101.175:3001/users/${user.username}`);
        const data = await response.json();

        // Set state with user data from the backend
        setWeapon1(data.primary_weapon || 'Fist');
        setWeapon2(data.secondary_weapon || 'Fist');
        setGearScore(data.gear_score || 0);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user?.username) {
      fetchUserData(); // Fetch data when username is available
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://164.92.101.175:3001/users/${user.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primary_weapon: weapon1,
          secondary_weapon: weapon2,
          gear_score: gearScore,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setIsEditing(false); // Close the edit mode
        console.log('Data saved successfully:', data);
      } else {
        console.error('Error saving data:', data);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  const handleLogout = () => {
    // Clear user data and authorization codes
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-900 text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            {user?.avatar && (
              <img
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt="Profile"
                className="w-24 h-24 rounded-full mr-4"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-sage">{user?.username || 'Guest'}</h1>
              <p className="text-gray-400">Discord ID: {user?.id || 'N/A'}</p>
            </div>
          </div>

          <div className="text-left">
            <h2 className="text-xl font-semibold text-sage mb-4">Stats</h2>

            {/* Weapon Classes */}
            <div className="mb-4">
              <p className="font-semibold">Primary Weapon:</p>
              {isEditing ? (
                <select
                  value={weapon1}
                  onChange={(e) => setWeapon1(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white mt-1"
                >
                  <option value="Bow">Bow</option>
                  <option value="Crossbow">Crossbow</option>
                  <option value="Greatsword">Greatsword</option>
                  <option value="Sword and Shield">Sword and Shield</option>
                  <option value="Wand">Wand</option>
                  <option value="Dagger">Dagger</option>
                  <option value="Staff">Staff</option>
                </select>
              ) : (
                <p className="text-gray-300 mt-1">{weapon1}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="font-semibold">Secondary Weapon:</p>
              {isEditing ? (
                <select
                  value={weapon2}
                  onChange={(e) => setWeapon2(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white mt-1"
                >
                  <option value="Bow">Bow</option>
                  <option value="Crossbow">Crossbow</option>
                  <option value="Greatsword">Greatsword</option>
                  <option value="Sword and Shield">Sword and Shield</option>
                  <option value="Wand">Wand</option>
                  <option value="Dagger">Dagger</option>
                  <option value="Staff">Staff</option>
                </select>
              ) : (
                <p className="text-gray-300 mt-1">{weapon2}</p>
              )}
            </div>

            {/* Gear Score */}
            <div className="mb-4">
              <p className="font-semibold">Gear Score:</p>
              {isEditing ? (
                <input
                  type="number"
                  value={gearScore}
                  onChange={(e) => setGearScore(e.target.value)}
                  className="w-full p-2 rounded bg-gray-700 text-white mt-1"
                />
              ) : (
                <p className="text-gray-300 mt-1">{gearScore}</p>
              )}
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="mt-4 bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600"
            >
              {isEditing ? 'Save' : 'Edit Info'}
            </button>
          </div>

          {/* Sign Out Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Username;
