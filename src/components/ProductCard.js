import React from "react";
import { motion } from "framer-motion";
import { useWishlist } from "../contexts/WishlistContext";
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item.id === product.id);

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
        border: "1px solid #fff",
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        cursor: 'pointer'
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
      <h3 style={{ color: "#fff" }}>{product.name}</h3>
      <p style={{ color: "#fff" }}>Price: ${product.price}</p>
      <p style={{ color: "#fff" }}>Category: {product.category}</p>
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
            backgroundColor: "#00b3ff",
            border: "none",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s ease",
            gap: '10px'
          }}
          whileHover={{
            backgroundColor: "#005f6b",
            boxShadow: "0 0 15px rgba(0, 0, 255, 0.5)",
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
            backgroundColor: isInWishlist ? "#ff4136" : "transparent",
            border: "1px solid #ff4136",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s ease",
          }}
          whileHover={{
            backgroundColor: "#ff4136",
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
