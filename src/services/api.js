import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 10000 // 10 seconds timeout
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    console.log(`Attempting request to: ${config.url}`);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    console.log('Successful API Response:', response.data);
    return response;
  },
  (error) => {
    // Detailed error logging
    console.error('API Error Details:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });

    // Handle specific error scenarios
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out. Check server availability.');
    }

    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Unable to connect to the server. Please check:',
        '1. Backend server is running',
        '2. Correct API URL is configured',
        '3. No firewall blocking the connection'
      );
    }

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          console.error('Bad Request:', data.message || 'Invalid input');
          break;
        case 401:
          console.error('Unauthorized:', data.message || 'Please log in');
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden:', data.message || 'You do not have permission');
          break;
        case 500:
          console.error('Server Error:', data.message || 'Please try again later');
          break;
        default:
          console.error('Unhandled Error:', data.message || error.message);
      }
    }

    return Promise.reject(error);
  }
);

// Authentication Services
export const authService = {
  login: (email, password) => {
    console.log('Attempting login with:', { email }); // Debugging log
    return api.post('/auth/login', { email, password });
  },
  register: (userData) => {
    console.log('Attempting registration with:', userData); // Debugging log
    return api.post('/auth/register', userData);
  },
  getUserProfile: () => api.get('/auth/user'),
};

// Product Services
export const productService = {
  getAllProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
};

// Cart Services
export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
};

export default api;