import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './AuthContext';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import TootedPage from './TootedPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tooted" element={<TootedPage />} />
        </Routes>
      </AuthContextProvider>     
    </BrowserRouter>
  </React.StrictMode>
);