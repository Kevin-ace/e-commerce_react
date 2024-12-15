import React, { useState, useEffect } from "react";
import { products } from "../data";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorageUtils";
import ProductList from "../components/ProductList";
import SearchFilter from "../components/SearchFilter";
import Cart from "../components/Cart";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cart, setCart] = useState(getFromLocalStorage("cart"));

  useEffect(() => {
    saveToLocalStorage("cart", cart);
  }, [cart]);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (category ? product.category === category : true)
    );
    setFilteredProducts(filtered);
  }, [search, category]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <SearchFilter setSearch={setSearch} setCategory={setCategory} />
      <ProductList products={filteredProducts} addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default HomePage;
