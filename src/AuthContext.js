import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    const userName = localStorage.getItem('username');
    const userEmail = localStorage.getItem('email');
    if (storedIsAuthenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
  };

  function user(name, email) {
    setUsername(name);
    setUserEmail(email);
    localStorage.setItem('username', name);
    localStorage.setItem('email', email);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userEmail, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}