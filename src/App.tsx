import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Pages
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import NotFoundPage from './components/shared/pages/notFound/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
