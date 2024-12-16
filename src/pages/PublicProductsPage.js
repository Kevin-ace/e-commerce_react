import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaFilter } from 'react-icons/fa';
import { products } from '../data';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';

const PublicProductsPage = () => {
  const { theme } = useTheme();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Unique categories from products
  const categories = ['All', ...new Set(products.map(p => p.category))];

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: theme.background,
      minHeight: '100vh',
      color: theme.text,
      transition: 'background-color 0.3s ease, color 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '2.5rem',
      color: theme.primary
    },
    filterContainer: {
      display: 'flex',
      gap: '15px',
      marginBottom: '20px'
    },
    categoryButton: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    activeCategory: {
      backgroundColor: theme.primary,
      color: '#fff'
    },
    inactiveCategory: {
      backgroundColor: theme.secondary,
      color: theme.text
    },
    priceRangeContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px'
    },
    productCard: {
      backgroundColor: theme.secondary,
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    productImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '15px'
    },
    productTitle: {
      fontSize: '1.2rem',
      marginBottom: '10px'
    },
    productPrice: {
      color: theme.primary,
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    exploreButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.primary,
      color: '#fff',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      gap: '10px'
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    const filtered = category === 'All' 
      ? products 
      : products.filter(p => p.category === category);
    
    const priceFiltered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    setFilteredProducts(priceFiltered);
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
    
    const filtered = selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);
    
    const priceFiltered = filtered.filter(
      p => p.price >= 0 && p.price <= value
    );
    
    setFilteredProducts(priceFiltered);
  };

  return (
    <Layout showNavbar={true}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Explore Products</h1>
          <div style={styles.priceRangeContainer}>
            <FaFilter />
            <label>
              Max Price: ${priceRange[1]}
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange[1]} 
                onChange={handlePriceRangeChange}
              />
            </label>
          </div>
        </div>

        <div style={styles.filterContainer}>
          {categories.map(category => (
            <motion.button
              key={category}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === category 
                  ? styles.activeCategory 
                  : styles.inactiveCategory)
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div style={styles.productGrid}>
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              style={styles.productCard}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 10px 20px ${theme.primary}20` 
              }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                style={styles.productImage} 
              />
              <h3 style={styles.productTitle}>{product.name}</h3>
              <p style={styles.productPrice}>${product.price}</p>
              <motion.button
                style={styles.exploreButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaShoppingCart /> View Details
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PublicProductsPage;