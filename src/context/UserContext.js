import React, { createContext, useState, useEffect } from 'react';

// Create context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const updateUser = (newUser) => {
    console.log('updateUser called with:', newUser); // Add this line
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Optional: Log when the user state changes
  useEffect(() => {
    console.log('User state updated:', user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
