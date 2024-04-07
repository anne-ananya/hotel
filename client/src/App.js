import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/user/Login'; // Adjust the import path accordingly
import './App.css';
import Dashboard from './pages/user/dashboard';
import BookRoom from './pages/user/bookroom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookroom" element={<BookRoom />} />
      </Routes>
    </Router>
  );
}

export default App;

