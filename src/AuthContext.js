import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedIsAuthenticated === 'true') {
      setIsAuthenticated(true);
      setUsername(localStorage.getItem('username'));
      setIsAdmin(localStorage.getItem('isAdmin'));
      setUserEmail(localStorage.getItem('email'));
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('isAdmin', 'false');
  };

  function user(nameAndIsAdmin, email) {
    var array = nameAndIsAdmin.split(',');
    setUsername(array[0]);
    setIsAdmin(array[1]);
    setUserEmail(email);
    localStorage.setItem('username', array[0]);
    localStorage.setItem('isAdmin', array[1]);
    localStorage.setItem('email', email);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userEmail, isAdmin, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}