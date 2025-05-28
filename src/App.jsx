/**
 * Copyright (c) 2024 De Montfort University Kazakhstan
 * All rights reserved.
 * 
 * This software is the confidential and proprietary information of
 * De Montfort University Kazakhstan. You shall not disclose such
 * confidential information and shall use it only in accordance with
 * the terms of the license agreement you entered into with
 * De Montfort University Kazakhstan.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Courses from './pages/Courses';
import Modules from './pages/Modules';
import ModuleDetails from './pages/ModuleDetails';
import ModuleRegistration from './pages/ModuleRegistration';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/Auth.css';
import './styles/Courses.css';
import './styles/Home.css';
import './styles/ModuleDetails.css';
import './styles/Modules.css';
// import './App.css';

function AppContent() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLangChange = (lang) => {
    // Handle language change
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
        onLangChange={handleLangChange} 
      />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/modules/:id" element={<ModuleDetails />} />
            <Route path="/modules/:id/register" element={<ModuleRegistration />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
