import React from 'react';

const CLIENT_ID = "1307716735603966064";
const REDIRECT_URI = "http://164.92.101.175/callback"; // Change this to your redirect URI

const Login = () => {
  const handleLogin = () => {
    const DISCORD_AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code&scope=identify`;
    window.location.href = DISCORD_AUTH_URL;
  };

  return (
    <div className="h-screen bg-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-6">
          Throne and Liberty Guild Manager
        </h1>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
          onClick={handleLogin}
        >
          Login Via Discord
        </button>
      </div>
    </div>
  );
};

export default Login;
