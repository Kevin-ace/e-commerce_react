import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const CartButton = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      style={styles.button}
      onClick={() => navigate('/cart')} // Navigate to cart page
    >
      🛒 {cart.length}
    </div>
  );
};

const styles = {
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#2b2d42',
    color: '#edf2f4',
    padding: '10px 20px',
    borderRadius: '50px',
    fontSize: '1rem',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default CartButton;
