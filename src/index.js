import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import './style/font-awesome-4.7.0/css/font-awesome.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './AuthContext';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import TootedPage from './TootedPage';
import OstukorvPage from './OstukorvPage';

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
          <Route path="/ostukorv" element={<OstukorvPage />} />
        </Routes>
      </AuthContextProvider>     
    </BrowserRouter>
  </React.StrictMode>
);