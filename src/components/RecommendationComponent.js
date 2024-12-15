import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useRecommendation } from '../contexts/RecommendationContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const RecommendationComponent = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { recommendations } = useRecommendation();
  const { theme } = useTheme();

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: theme.secondary,
      borderRadius: '10px',
      marginTop: '30px',
    },
    title: {
      textAlign: 'center',
      color: theme.primary,
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
    },
    productCard: {
      backgroundColor: theme.background,
      borderRadius: '10px',
      padding: '15px',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      color: theme.text,
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '10px',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
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
    wishlistButton: {
      backgroundColor: 'transparent',
      color: theme.primary,
      border: `1px solid ${theme.primary}`,
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Recommended for You</h2>
      
      {recommendations.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          color: theme.text, 
          opacity: 0.6 
        }}>
          No recommendations available
        </p>
      ) : (
        <div style={styles.grid}>
          {recommendations.map((product) => (
            <motion.div
              key={product.id}
              style={styles.productCard}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 10px 20px ${theme.primary}20` 
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                style={styles.image} 
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              
              <div style={styles.actionButtons}>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  style={{...styles.button, ...styles.cartButton}}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaShoppingCart style={{ marginRight: '5px' }} />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product);
                  }}
                  style={{...styles.button, ...styles.wishlistButton}}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaHeart style={{ marginRight: '5px' }} />
                  Wishlist
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationComponent;