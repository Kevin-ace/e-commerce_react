import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const HomePage = () => {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: 'Wireless Mouse', price: '$25', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Mechanical Keyboard', price: '$80', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Gaming Headset', price: '$60', image: 'https://via.placeholder.com/150' },
    { id: 4, name: '4K Monitor', price: '$300', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'VR Headset', price: '$500', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'External SSD (1TB)', price: '$120', image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Smartphone Stand', price: '$15', image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'USB-C Hub', price: '$45', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Products</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.productPrice}>{product.price}</p>
            <button onClick={() => addToCart(product)} style={styles.button}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  productName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: '10px',
  },
  productPrice: {
    fontSize: '1rem',
    color: '#8d99ae',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#ef233c',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#d90429',
  },
};

export default HomePage;
