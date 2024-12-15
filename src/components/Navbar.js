import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#2b2d42',
      padding: '10px 20px',
      color: '#edf2f4',
    },
    title: {
      fontSize: '1.5rem',
      margin: 0,
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    link: {
      color: '#edf2f4',
      textDecoration: 'none',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    logoutButton: {
      background: 'none',
      border: 'none',
      color: '#edf2f4',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    }
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.title}>Space-Tech Store</Link>
      
      {isAuthenticated ? (
        <div style={styles.links}>
          <Link to="/dashboard" style={styles.link}>
            <FaShoppingCart /> Products
          </Link>
          <Link to="/wishlist" style={styles.link}>
            <FaHeart /> Wishlist
          </Link>
          
          <div style={styles.userProfile}>
            <img 
              src={user.avatar} 
              alt="User Avatar" 
              style={styles.avatar} 
            />
            <span>{user.username}</span>
            
            <button 
              onClick={handleLogout} 
              style={styles.logoutButton}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.links}>
          <Link to="/login" style={styles.link}>
            <FaUser /> Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
