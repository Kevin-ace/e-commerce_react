import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, showNavbar = true }) => {
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

export default Layout;