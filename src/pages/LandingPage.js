import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div style={styles.landingPage}>
      <h1 style={styles.heading}>Welcome to Our Space E-commerce Store!</h1>
      <p style={styles.text}>Explore a wide variety of futuristic products and more.</p>
      <button style={styles.button} onClick={navigateToDashboard}>Enter Store</button>
    </div>
  );
};

const styles = {
  landingPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',
    color: 'Dark',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  button: {
    padding: '15px 30px',
    backgroundColor: '#00b3ff',
    border: 'none',
    color: 'primary',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default LandingPage;
