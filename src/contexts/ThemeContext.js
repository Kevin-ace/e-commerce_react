import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true; // Default to dark mode
  });

  const themes = {
    dark: {
      background: '#1a1a2e',
      text: '#fff',
      primary: '#00b3ff',
      secondary: '#16213e',
      accent: '#0f3460',
      cardBackground: '#16213e',
      borderColor: '#0f3460'
    },
    light: {
      background: '#f4f4f4',
      text: '#333',
      primary: '#007bff',
      secondary: '#e9ecef',
      accent: '#ced4da',
      cardBackground: '#fff',
      borderColor: '#dee2e6'
    }
  };

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      theme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};