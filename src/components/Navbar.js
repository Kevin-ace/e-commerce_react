import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>Space-Tech Store</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/" style={styles.link}>Logout</Link>
      </div>
    </nav>
  );
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
    gap: '20px',
  },
  link: {
    color: '#edf2f4',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};

export default Navbar;
