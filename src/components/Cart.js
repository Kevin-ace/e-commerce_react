import React from "react";
import { motion } from "framer-motion";

const Cart = ({ cart }) => {
  return (
    <div style={{ position: "absolute", top: "20px", right: "20px" }}>
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 15px rgba(0, 0, 255, 0.7)",
        }}
        style={{
          padding: "15px 30px",
          backgroundColor: "#00b3ff",
          border: "none",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 255, 0.5)",
        }}
      >
        Cart ({cart.length})
      </motion.button>
    </div>
  );
};

export default Cart;
