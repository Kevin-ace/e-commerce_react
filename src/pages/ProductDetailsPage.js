import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { products } from '../data';
import { FaShoppingCart, FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));
  
  // Check if product is in wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      padding: '40px',
      backgroundColor: '#1a1a2e',
      minHeight: 'calc(100vh - 80px)',
      color: '#fff',
    },
    imageContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '40px',
    },
    image: {
      maxWidth: '500px',
      width: '100%',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    },
    details: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      color: '#00b3ff',
    },
    price: {
      fontSize: '2rem',
      color: '#00b3ff',
      marginBottom: '20px',
    },
    description: {
      marginBottom: '30px',
      lineHeight: '1.6',
      color: '#e0e0e0',
    },
    actionButtons: {
      display: 'flex',
      gap: '20px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '15px 30px',
      borderRadius: '10px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    cartButton: {
      backgroundColor: '#00b3ff',
      color: '#fff',
      border: 'none',
    },
    wishlistButton: {
      backgroundColor: isInWishlist ? '#ff4136' : 'transparent',
      color: '#fff',
      border: '2px solid #ff4136',
    },
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      backgroundColor: 'transparent',
      color: '#fff',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
    }
  };

  if (!product) {
    return <div style={styles.container}>Product not found</div>;
  }

  return (
    <div style={styles.container}>
      <button 
        onClick={() => navigate(-1)} 
        style={styles.backButton}
      >
        <FaArrowLeft />
      </button>
      <div style={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={styles.image} 
        />
      </div>
      <div style={styles.details}>
        <h1 style={styles.title}>{product.name}</h1>
        <p style={styles.price}>${product.price}</p>
        <p style={styles.description}>
          Detailed product description would go here. This is a placeholder 
          description to showcase the layout and design of the product details page.
          You can customize this with more specific information about each product.
        </p>
        <div style={styles.actionButtons}>
          <button 
            onClick={() => addToCart(product)}
            style={{...styles.button, ...styles.cartButton}}
          >
            <FaShoppingCart style={{ marginRight: '10px' }} /> 
            Add to Cart
          </button>
          <button 
            onClick={handleWishlistToggle}
            style={{...styles.button, ...styles.wishlistButton}}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            <span style={{ marginLeft: '10px' }}>
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;