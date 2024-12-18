import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Loader = ({ fullScreen = true, size = '3rem' }) => {
  const { theme } = useTheme();

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: fullScreen ? '100vh' : '100%',
    backgroundColor: fullScreen ? theme.background : 'transparent',
  };

  const spinnerStyle = {
    fontSize: size,
    color: theme.primary || '#00b3ff', 
    animation: 'spin 1s linear infinite'
  };

  return (
    <div style={loaderStyle}>
      <FaSpinner style={spinnerStyle} />
    </div>
  );
};

export default Loader;