import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import logo from '../logo.png';  // Import the logo

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      backgroundColor: theme.secondary,
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s ease",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none",
    },
    logo: {
      width: '50px',  // Adjust size as needed
      height: '50px',
      objectFit: 'contain'
    },
    storeName: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: theme.primary,
      textDecoration: 'none'
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    link: {
      display: "flex",
      alignItems: "center",
      color: theme.text,
      textDecoration: "none",
      gap: "8px",
      transition: "color 0.3s ease",
    },
    linkHover: {
      ":hover": {
        color: theme.primary,
      },
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: theme.text,
    },
    logoutButton: {
      background: "none",
      border: "none",
      color: theme.text,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "color 0.3s ease",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logoContainer}>
        <img 
          src={logo} 
          alt="Space-Tech Store Logo" 
          style={styles.logo} 
        />
        <span style={styles.storeName}>Space-Tech Store</span>
      </Link>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>
          <FaHome /> Home
        </Link>
        <Link to="/wishlist" style={styles.link}>
          <FaHeart /> Wishlist
        </Link>
        <CartButton />
        <ThemeToggle />
      </div>

      <div style={styles.userSection}>
        {user ? (
          <>
            <div style={styles.userInfo}>
              <FaUser />
              {user.username}
            </div>
            <button onClick={logout} style={styles.logoutButton}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>
            <FaUser /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
