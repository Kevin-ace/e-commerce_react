import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useTheme } from '../contexts/ThemeContext';
import { products } from '../data';
import ReviewComponent from '../components/ReviewComponent';
import RecommendationComponent from '../components/RecommendationComponent';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { theme } = useTheme();

  const product = products.find(p => p.id === parseInt(id));
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const [quantity, setQuantity] = useState(1);

  const styles = {
    container: {
      display: 'flex',
      padding: '40px',
      backgroundColor: theme.background,
      color: theme.text,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    },
    imageContainer: {
      flex: 1,
      marginRight: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      maxWidth: '100%',
      maxHeight: '500px',
      objectFit: 'contain',
      borderRadius: '10px',
      boxShadow: `0 10px 20px ${theme.primary}20`
    },
    detailsContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      color: theme.primary,
    },
    price: {
      fontSize: '1.8rem',
      color: theme.primary,
      marginBottom: '20px',
    },
    description: {
      marginBottom: '30px',
      lineHeight: 1.6,
    },
    quantityContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    quantityButton: {
      backgroundColor: theme.secondary,
      color: theme.text,
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      margin: '0 10px',
      cursor: 'pointer',
    },
    actionButtons: {
      display: 'flex',
      gap: '20px',
    },
    cartButton: {
      backgroundColor: theme.primary,
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '15px 25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      cursor: 'pointer',
    },
    wishlistButton: {
      backgroundColor: isInWishlist ? theme.primary : 'transparent',
      color: '#fff',
      border: `2px solid ${theme.primary}`,
      borderRadius: '5px',
      padding: '15px 25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      cursor: 'pointer',
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) {
    return <div style={styles.container}>Product not found</div>;
  }

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <motion.img
            src={product.image}
            alt={product.name}
            style={styles.image}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div style={styles.detailsContainer}>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.price}>${product.price}</p>
          <p style={styles.description}>{product.description}</p>
          
          <div style={styles.quantityContainer}>
            <motion.button
              style={styles.quantityButton}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              -
            </motion.button>
            <span>{quantity}</span>
            <motion.button
              style={styles.quantityButton}
              onClick={() => setQuantity(quantity + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              +
            </motion.button>
          </div>
          
          <div style={styles.actionButtons}>
            <motion.button
              style={styles.cartButton}
              onClick={() => addToCart({ ...product, quantity })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart /> Add to Cart
            </motion.button>
            
            <motion.button
              style={styles.wishlistButton}
              onClick={handleWishlistToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHeart style={{ color: isInWishlist ? '#fff' : theme.primary }} />
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </motion.button>
          </div>
        </div>
      </div>
      
      <ReviewComponent productId={product.id} />
      <RecommendationComponent />
    </div>
  );
};

export default ProductDetailsPage;