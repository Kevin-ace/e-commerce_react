import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Space-Tech Store</h1>
      <p style={styles.subtitle}>Your one-stop shop for the latest tech gadgets!</p>
      <Link to="/dashboard" style={styles.button}>
        Explore Products
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #2b2d42, #8d99ae)',
    color: '#edf2f4',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#ef233c',
    color: '#fff',
    padding: '15px 30px',
    borderRadius: '30px',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  buttonHover: {
    transform: 'scale(1.05)',
  },
};

export default LandingPage;
