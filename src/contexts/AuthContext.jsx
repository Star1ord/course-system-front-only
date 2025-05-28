import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    first_name: "Togzhan",
    surname: "Yermekbayeva",
    email: "example@dmuk.edu.kz",
    user_type: "student"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set mock token in localStorage
    localStorage.setItem('userData', JSON.stringify({
      user: {
        id: 1,
        first_name: "Aliya",
        surname: "Yermakhan",
        email: "aliya@dmuk.edu.kz",
        user_type: "student"
      },
      token: "mock-jwt-token"
    }));
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;
      localStorage.setItem('userData', JSON.stringify({ user, token }));
      setUser(user);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { user, token } = response.data;
      localStorage.setItem('userData', JSON.stringify({ user, token }));
      setUser(user);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: true // Always true for the mock version
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
