import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product, addToCart }) => {
  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        border: "1px solid #fff",
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
      }}
    >
      <h3 style={{ color: "#fff" }}>{product.name}</h3>
      <p style={{ color: "#fff" }}>Price: ${product.price}</p>
      <p style={{ color: "#fff" }}>Category: {product.category}</p>
      <motion.button
        onClick={() => addToCart(product)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#00b3ff",
          border: "none",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "all 0.3s ease",
        }}
        whileHover={{
          backgroundColor: "#005f6b",
          boxShadow: "0 0 15px rgba(0, 0, 255, 0.5)",
        }}
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
