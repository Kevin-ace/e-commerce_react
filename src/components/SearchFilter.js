import React, { useState } from "react";
import { FaFilter, FaSort } from 'react-icons/fa';

const SearchFilter = ({ 
  setSearch, 
  setCategory, 
  setPriceRange, 
  setSortBy 
}) => {
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState([0, 1000]);
  const [localSortOption, setLocalSortOption] = useState('');

  const categories = [
    'All Categories', 
    'Electronics', 
    'Fashion', 
    'Computers', 
    'Accessories', 
    'Gadgets'
  ];

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.name === 'min';
    
    const newRange = isMin 
      ? [value, localPriceRange[1]] 
      : [localPriceRange[0], value];
    
    setLocalPriceRange(newRange);
    setPriceRange(newRange);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setLocalSortOption(value);
    setSortBy(value);
  };

  const styles = {
    container: {
      backgroundColor: '#16213e',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
      color: '#fff',
    },
    searchRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #00b3ff',
      backgroundColor: 'transparent',
      color: '#fff',
    },
    filterButton: {
      backgroundColor: '#0f3460',
      color: '#fff',
      border: 'none',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    advancedFilters: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginTop: '15px',
    },
    select: {
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #00b3ff',
    },
    priceInputContainer: {
      display: 'flex',
      gap: '10px',
    },
    priceInput: {
      flex: 1,
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #00b3ff',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button 
          onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
          style={styles.filterButton}
        >
          <FaFilter /> Filters
        </button>
      </div>

      {isAdvancedFilterOpen && (
        <div style={styles.advancedFilters}>
          <div>
            <label>Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)}
              style={styles.select}
            >
              {categories.map(cat => (
                <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Sort By</label>
            <select 
              onChange={handleSortChange}
              value={localSortOption}
              style={styles.select}
            >
              <option value="">Select Sort Option</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Price Range</label>
            <div style={styles.priceInputContainer}>
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={localPriceRange[0]}
                onChange={handlePriceChange}
                style={styles.priceInput}
                min="0"
                max="1000"
              />
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={localPriceRange[1]}
                onChange={handlePriceChange}
                style={styles.priceInput}
                min="0"
                max="1000"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
