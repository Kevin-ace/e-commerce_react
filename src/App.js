import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage"; // Import the LandingPage component
import HomePage from "./pages/HomePage"; // Your existing page for the dashboard
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import CartButton from './components/CartButton';
import CartPage from './pages/CartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} /> {/* Cart page */}
        </Routes>
        <CartButton />
      </Router>
    </CartProvider>
  );
}

export default App;
