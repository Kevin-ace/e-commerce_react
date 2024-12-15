import React, { useState, useMemo, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import SearchFilter from '../components/SearchFilter';
import ProductList from '../components/ProductList';
import { products as initialProducts } from '../data';

const HomePage = () => {
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || product.category === category;
      const matchesPriceRange = 
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPriceRange;
    }).sort((a, b) => {
      switch(sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [search, category, priceRange, sortBy]);

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
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Products</h1>
      <SearchFilter 
        setSearch={setSearch}
        setCategory={setCategory}
        setPriceRange={setPriceRange}
        setSortBy={setSortBy}
      />
      <ProductList 
        products={filteredProducts} 
        addToCart={addToCart} 
      />
    </div>
  );
};

export default HomePage;
