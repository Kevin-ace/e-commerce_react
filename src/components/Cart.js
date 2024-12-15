import React from "react";

const Cart = ({ cart }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <p key={item.id}>{item.name} - ${item.price}</p>
      ))}
    </div>
  );
};

export default Cart;
