import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';  // Import the LandingPage component
import HomePage from './pages/HomePage';        // Your existing page for the dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Route for the Dashboard */}
        <Route path="/dashboard" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
