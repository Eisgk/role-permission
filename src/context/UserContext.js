import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // console.log(user);
  
  // useEffect(() => {
  //   const storedUser = sessionStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const login = (userData) => {
    // console.log(userData);
    setUser(userData)
    sessionStorage.setItem('user', JSON.stringify(userData));
  }
  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('user');
  }

  

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
