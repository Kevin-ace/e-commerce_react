import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div style={styles.container}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button onClick={() => removeFromCart(item.id)} style={styles.button}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px' },
  card: { display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '20px' },
  image: { width: '100px', borderRadius: '10px' },
  button: { padding: '5px 10px', backgroundColor: '#ff6b6b', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default CartPage;
