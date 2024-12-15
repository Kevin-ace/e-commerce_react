import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});
  const { user } = useAuth();

  // Load reviews from localStorage on initial load
  useEffect(() => {
    const savedReviews = localStorage.getItem('product_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('product_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId, review) => {
    if (!user) {
      throw new Error('You must be logged in to leave a review');
    }

    const newReview = {
      ...review,
      userId: user.id,
      username: user.username,
      date: new Date().toISOString()
    };

    setReviews(prevReviews => ({
      ...prevReviews,
      [productId]: [...(prevReviews[productId] || []), newReview]
    }));
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const calculateAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / productReviews.length).toFixed(1);
  };

  const deleteReview = (productId, reviewIndex) => {
    setReviews(prevReviews => {
      const updatedProductReviews = [...prevReviews[productId]];
      updatedProductReviews.splice(reviewIndex, 1);
      
      return {
        ...prevReviews,
        [productId]: updatedProductReviews
      };
    });
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      getProductReviews,
      calculateAverageRating,
      deleteReview
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};