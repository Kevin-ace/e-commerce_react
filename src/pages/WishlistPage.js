import React, { useContext } from 'react';
import { WishlistContext } from '../contexts/WishlistContext';
import { CartContext } from '../contexts/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const styles = {
    container: { 
      padding: '20px', 
      backgroundColor: '#1a1a2e', 
      minHeight: '100vh', 
      color: '#fff' 
    },
    title: { 
      textAlign: 'center', 
      marginBottom: '30px' 
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: '#16213e',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      position: 'relative',
    },
    image: {
      width: '100%',
      borderRadius: '10px',
      marginBottom: '15px',
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
    },
    button: {
      backgroundColor: '#0f3460',
      color: '#fff',
      border: 'none',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your wishlist is empty.</p>
      ) : (
        <div style={styles.grid}>
          {wishlist.map((product) => (
            <div key={product.id} style={styles.card}>
              <img 
                src={product.image || 'https://via.placeholder.com/150'} 
                alt={product.name} 
                style={styles.image} 
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <div style={styles.actions}>
                <button 
                  onClick={() => removeFromWishlist(product.id)} 
                  style={styles.button}
                >
                  <FaTrash /> Remove
                </button>
                <button 
                  onClick={() => handleMoveToCart(product)} 
                  style={styles.button}
                >
                  <FaShoppingCart /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;