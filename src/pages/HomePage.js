import React, { useState, useMemo, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import SearchFilter from "../components/SearchFilter";
import ProductList from "../components/ProductList";
import RecommendationComponent from "../components/RecommendationComponent";
import { products as initialProducts } from "../data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Layout from '../components/Layout';

const HomePage = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("");

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory = !category || product.category === category;
        const matchesPriceRange =
          product.price >= priceRange[0] && product.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesPriceRange;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [search, category, priceRange, sortBy]);

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: theme.background,
      minHeight: "100vh",
      color: theme.text,
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    heroSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "40px",
    },
    heroText: {
      flex: 1,
      paddingRight: "40px",
    },
    heroTitle: {
      fontSize: "3rem",
      color: theme.primary,
      marginBottom: "20px",
    },
    heroDescription: {
      fontSize: "1.2rem",
      marginBottom: "30px",
      lineHeight: 1.6,
    },
    exploreButton: {
      backgroundColor: theme.primary,
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "5px",
      border: "none",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    productCard: {
      backgroundColor: theme.secondary,
      borderRadius: "10px",
      padding: "20px",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
    },
    productImage: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "15px",
    },
    title: {
      textAlign: "center",
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#2b2d42",
      marginBottom: "30px",
    },
  };

  return (
    <Layout showNavbar={true}>
      <div style={styles.container}>
        <section style={styles.heroSection}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>Space-Tech Store</h1>
            <p style={styles.heroDescription}>
              Discover cutting-edge technology that pushes the boundaries of
              innovation. From advanced electronics to futuristic gadgets, explore
              our curated collection of tech marvels that will transform your
              digital experience.
            </p>
            <motion.button
              style={styles.exploreButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
            >
              Explore Products
            </motion.button>
          </div>
          <motion.img
            src="https://via.placeholder.com/150" // Replace with your hero image
            alt="Space Tech Hero"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: "50%", borderRadius: "10px" }}
          />
        </section>

        <h1 style={styles.title}>Our Products</h1>
        <SearchFilter
          setSearch={setSearch}
          setCategory={setCategory}
          setPriceRange={setPriceRange}
          setSortBy={setSortBy}
        />
        <ProductList products={filteredProducts} addToCart={addToCart} />
        <RecommendationComponent />
      </div>
    </Layout>
  );
};

export default HomePage;
