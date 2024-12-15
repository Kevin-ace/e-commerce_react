import React, { useState } from "react";
import ProductList from "../components/ProductList";  // Import the product listing component
import Cart from "../components/Cart";  // Import the cart component
import SearchFilter from "../components/SearchFilter";  // Import search and filter functionality

const HomePage = () => {
  const [products] = useState([
    { id: 1, name: "Galaxy Watch", price: 299, category: "Electronics" },
    { id: 2, name: "Starship Hoodie", price: 50, category: "Fashion" },
    { id: 3, name: "Moon Lamp", price: 25, category: "Home Decor" },
  ]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? product.category === category : true)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Welcome to the Dashboard</h1>
      
      {/* Search and Filter */}
      <SearchFilter setSearch={setSearch} setCategory={setCategory} />
      
      {/* Product List */}
      <ProductList products={filteredProducts} addToCart={addToCart} />
      
      {/* Cart Component */}
      <Cart cart={cart} />
    </div>
  );
};

export default HomePage;
