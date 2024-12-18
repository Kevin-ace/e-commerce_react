import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing auth on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user profile
      authService.getUserProfile()
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
          setError(null);
        })
        .catch((error) => {
          // Token is invalid
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setError(error.response?.data?.message || 'Authentication failed');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(email, password);
      
      // Store token
      localStorage.setItem('token', response.data.token);
      
      // Fetch user profile
      const userProfile = await authService.getUserProfile();
      setUser(userProfile.data);
      setIsAuthenticated(true);
      return userProfile.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      
      // Store token
      localStorage.setItem('token', response.data.token);
      
      // Fetch user profile
      const userProfile = await authService.getUserProfile();
      setUser(userProfile.data);
      setIsAuthenticated(true);
      return userProfile.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading,
      error,
      login, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;