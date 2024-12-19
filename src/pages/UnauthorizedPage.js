import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

const UnauthorizedPage = () => {
  const { theme } = useTheme();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: theme.background,
      color: theme.text,
      textAlign: 'center',
      padding: '20px',
    },
    icon: {
      fontSize: '5rem',
      color: theme.primary || '#ff4136',
      marginBottom: '20px',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '15px',
    },
    message: {
      maxWidth: '500px',
      marginBottom: '30px',
      color: theme.secondaryText || '#6c757d',
    },
    button: {
      backgroundColor: theme.primary || '#00b3ff',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <Layout showNavbar={true}>
      <div style={styles.container}>
        <FaLock style={styles.icon} />
        <h1 style={styles.title}>Unauthorized Access</h1>
        <p style={styles.message}>
          You do not have permission to access this page. 
          Please contact the administrator if you believe this is an error.
        </p>
        <Link 
          to="/" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = theme.hover || '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = theme.primary || '#00b3ff'}
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;