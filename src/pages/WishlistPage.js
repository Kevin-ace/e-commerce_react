import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
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
    wishlistGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    wishlistItem: {
      backgroundColor: theme.secondary,
      borderRadius: '10px',
      padding: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    image: {
      width: '200px',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '15px',
    },
    itemDetails: {
      textAlign: 'center',
      width: '100%',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: '15px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    cartButton: {
      backgroundColor: theme.primary,
      color: '#fff',
      border: 'none',
    },
    removeButton: {
      backgroundColor: theme.primary,
      color: '#fff',
      border: 'none',
    },
    emptyWishlist: {
      textAlign: 'center',
      color: theme.text,
      opacity: 0.6,
      marginTop: '50px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <p style={styles.emptyWishlist}>
          Your wishlist is empty
        </p>
      ) : (
        <div style={styles.wishlistGrid}>
          {wishlist.map((product) => (
            <div 
              key={product.id} 
              style={styles.wishlistItem}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                style={styles.image} 
              />
              <div style={styles.itemDetails}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                
                <div style={styles.actionButtons}>
                  <button
                    onClick={() => addToCart(product)}
                    style={{...styles.button, ...styles.cartButton}}
                  >
                    <FaShoppingCart style={{ marginRight: '5px' }} />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    style={{...styles.button, ...styles.removeButton}}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;