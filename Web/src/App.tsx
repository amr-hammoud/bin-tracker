import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth';
import UsersPage from './pages/users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />}/>
        <Route path='/users' element={<UsersPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
