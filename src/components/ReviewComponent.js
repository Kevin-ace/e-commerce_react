import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  // eslint-disable-next-line no-unused-vars
  FaStar, 
  FaTrash 
} from 'react-icons/fa';
import { useReview } from '../contexts/ReviewContext';
import { useAuth } from '../contexts/AuthContext';

const ReviewComponent = ({ productId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { user } = useAuth();
  const { addReview, getProductReviews, deleteReview, calculateAverageRating } = useReview();

  const productReviews = getProductReviews(productId);
  const averageRating = calculateAverageRating(productId);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a review');
      return;
    }
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    addReview(productId, { text: reviewText, rating });
    setReviewText('');
    setRating(0);
  };

  const styles = {
    container: {
      backgroundColor: '#16213e',
      padding: '20px',
      borderRadius: '10px',
      color: '#fff',
    },
    ratingContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    star: {
      color: '#ffc107',
      cursor: 'pointer',
      fontSize: '24px',
      marginRight: '5px',
    },
    reviewInput: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      backgroundColor: '#0f3460',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
    },
    submitButton: {
      backgroundColor: '#00b3ff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    reviewList: {
      marginTop: '20px',
    },
    reviewItem: {
      backgroundColor: '#0f3460',
      padding: '15px',
      marginBottom: '10px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    averageRating: {
      textAlign: 'center',
      fontSize: '1.5rem',
      marginBottom: '15px',
      color: '#00b3ff',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.averageRating}>
        Average Rating: {averageRating} / 5
        <div style={styles.ratingContainer}>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <span key={index}>
                {index <= averageRating ? '★' : '☆'}
              </span>
            );
          })}
        </div>
      </div>

      {user && (
        <form onSubmit={handleSubmitReview}>
          <div style={styles.ratingContainer}>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <motion.span
                  key={index}
                  style={{
                    ...styles.star,
                    color: index <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                  }}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  whileHover={{ scale: 1.2 }}
                >
                  {index <= (hover || rating) ? '★' : '☆'}
                </motion.span>
              );
            })}
          </div>
          <textarea
            style={styles.reviewInput}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            rows={4}
          />
          <button type="submit" style={styles.submitButton}>
            Submit Review
          </button>
        </form>
      )}

      <div style={styles.reviewList}>
        <h3>Customer Reviews</h3>
        {productReviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          productReviews.map((review, index) => (
            <motion.div 
              key={index} 
              style={styles.reviewItem}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div>
                  {[...Array(5)].map((star, starIndex) => (
                    <span key={starIndex} style={{ color: starIndex < review.rating ? '#ffc107' : '#e4e5e9' }}>
                      {starIndex < review.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <strong>{review.username}</strong>
                <p>{review.text}</p>
                <small>{new Date(review.date).toLocaleString()}</small>
              </div>
              {user && user.id === review.userId && (
                <button 
                  onClick={() => deleteReview(productId, index)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#ff4136', 
                    cursor: 'pointer' 
                  }}
                >
                  <FaTrash />
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;