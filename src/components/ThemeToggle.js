import React from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const styles = {
    button: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      borderRadius: '50%',
      transition: 'background-color 0.3s ease',
    },
    icon: {
      color: isDarkMode ? '#00b3ff' : '#ffc107',
      fontSize: '24px',
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      style={styles.button}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? (
        <FaSun style={styles.icon} />
      ) : (
        <FaMoon style={styles.icon} />
      )}
    </motion.button>
  );
};

export default ThemeToggle;