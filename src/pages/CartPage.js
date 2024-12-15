import React from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

const CartPage = () => {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { theme } = useTheme();

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: theme.background,
      minHeight: '100vh',
      color: theme.text,
      transition: 'background-color 0.3s ease, color 0.3s ease'
    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      color: theme.primary,
    },
    cartGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    cartItem: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.secondary,
      padding: '15px',
      borderRadius: '10px',
      transition: 'background-color 0.3s ease'
    },
    image: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginRight: '20px',
    },
    itemDetails: {
      flex: 1,
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    quantityButton: {
      backgroundColor: theme.accent,
      color: theme.text,
      border: 'none',
      borderRadius: '5px',
      padding: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    removeButton: {
      backgroundColor: theme.primary,
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px',
      cursor: 'pointer',
      marginLeft: '10px',
      transition: 'background-color 0.3s ease'
    },
    total: {
      textAlign: 'right',
      marginTop: '20px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: theme.primary,
    },
    clearButton: {
      display: 'block',
      margin: '20px auto',
      padding: '10px 20px',
      backgroundColor: theme.primary,
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>
      
      {cart.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          color: theme.text, 
          opacity: 0.6 
        }}>
          Your cart is empty
        </p>
      ) : (
        <>
          <div style={styles.cartGrid}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={styles.image} 
                />
                <div style={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <div style={styles.quantityControl}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={styles.quantityButton}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={styles.quantityButton}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          
          <div style={styles.total}>
            Total: ${total.toFixed(2)}
          </div>
          
          <button 
            onClick={clearCart}
            style={styles.clearButton}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
