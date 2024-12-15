import React, { createContext, useState, useContext, useEffect } from 'react';
import { products } from '../data';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Recommendation algorithm
  const generateRecommendations = (userInteractions) => {
    if (!userInteractions || userInteractions.length === 0) {
      // If no interactions, return random products
      return products
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    }

    // Extract categories and tags from user interactions
    const categoryFrequency = {};
    userInteractions.forEach(item => {
      categoryFrequency[item.category] = 
        (categoryFrequency[item.category] || 0) + 1;
    });

    // Sort categories by frequency
    const topCategories = Object.entries(categoryFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    // Find products in top categories, excluding already interacted products
    const recommendedProducts = products
      .filter(product => 
        topCategories.includes(product.category) && 
        !userInteractions.some(item => item.id === product.id)
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    return recommendedProducts;
  };

  // Update recommendations based on cart and wishlist
  useEffect(() => {
    const interactions = [...cart, ...wishlist];
    const newRecommendations = generateRecommendations(interactions);
    setRecommendations(newRecommendations);
  }, [cart, wishlist]);

  return (
    <RecommendationContext.Provider value={{
      recommendations,
      generateRecommendations
    }}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendation = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
};