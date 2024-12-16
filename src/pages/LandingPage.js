import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #2b2d42, #8d99ae)',
      color: '#edf2f4',
      fontFamily: 'Arial, sans-serif',
    },
    content: {
      textAlign: 'center',
      marginTop: '-50px',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#edf2f4',
    },
    subtitle: {
      fontSize: '1.3rem',
      fontStyle: 'italic',
      color: '#d0d3d4',
      marginBottom: '30px',
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
    },
    button: {
      textDecoration: 'none',
      padding: '10px 25px',
      borderRadius: '20px',
      fontSize: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
      transition: 'background 0.3s, transform 0.2s',
      cursor: 'pointer',
      border: 'none',
    },
    exploreButton: {
      backgroundColor: '#fff',
      color: '#2b2d42',
      border: '2px solid #2b2d42',
    },
    signInButton: {
      backgroundColor: '#8d99ae',
      color: '#2b2d42',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>
          Welcome to <strong>Space-Tech Store</strong>
        </h1>
        <p style={styles.subtitle}>
          <em>Your one-stop shop for the latest tech gadgets!</em>
        </p>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button
            onClick={() => navigate('/explore')}
            style={{ ...styles.button, ...styles.exploreButton }}
          >
            Explore
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{ ...styles.button, ...styles.signInButton }}
          >
            SIGN-IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
