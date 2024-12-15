import React from "react";
import { motion } from "framer-motion";
import { useWishlist } from "../contexts/WishlistContext";
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();
  const { theme } = useTheme();
  
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        border: `1px solid ${theme.borderColor}`,
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: theme.cardBackground,
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        cursor: 'pointer',
        color: theme.text,
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
      onClick={handleProductClick}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover', 
          borderRadius: '10px',
          marginBottom: '10px'
        }} 
      />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      
      {quantity > 0 && (
        <p style={{ 
          color: theme.primary, 
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          In Cart: {quantity} (Total: ${(product.price * quantity).toFixed(2)})
        </p>
      )}
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '10px',
        marginTop: '10px'
      }}>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: "10px 20px",
            backgroundColor: theme.primary,
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s ease",
            gap: '10px'
          }}
          whileHover={{
            backgroundColor: theme.secondary,
            boxShadow: `0 0 15px ${theme.primary}`,
          }}
        >
          <FaShoppingCart /> Add to Cart
        </motion.button>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleWishlistToggle(e);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: "10px 15px",
            backgroundColor: isInWishlist ? theme.primary : "transparent",
            border: `1px solid ${theme.primary}`,
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s ease",
          }}
          whileHover={{
            backgroundColor: theme.primary,
            scale: 1.05
          }}
        >
          {isInWishlist ? <FaHeart /> : <FaRegHeart />}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
