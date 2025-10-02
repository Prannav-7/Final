// src/api.js
import axios from 'axios';

// Determine the base URL based on environment
const getBaseURL = () => {
  // Check if we're in production (on Vercel or other hosting)
  if (process.env.NODE_ENV === 'production') {
    // Use the Render server URL for production
    return process.env.REACT_APP_API_URL || 'https://electro-store-server-8n0d.onrender.com/api';
  }
  // Use localhost for development
  return process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 second timeout
  retry: 5, // Increased retry attempts for better reliability
  retryDelay: 2000, // Increased base retry delay for database connection issues
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('API Request Interceptor: Retrieved token:', token ? `${token.substring(0, 20)}...` : 'null');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request Interceptor: Added Authorization header');
    }
    console.log('API Request: ' + config.method?.toUpperCase() + ' ' + config.url);
    return config;
  },
  (error) => {
    console.log('API Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Retry logic for failed requests
const retryRequest = async (error) => {
  const config = error.config;
  
  // Don't retry if we've already retried enough times
  if (!config || !config.retry || config.__retryCount >= config.retry) {
    return Promise.reject(error);
  }
  
  // Initialize retry count if not exists
  config.__retryCount = config.__retryCount || 0;
  config.__retryCount += 1;
  
  console.log(`API Retry attempt ${config.__retryCount} for ${config.method?.toUpperCase()} ${config.url}`);
  
  // Wait before retrying
  await new Promise(resolve => setTimeout(resolve, config.retryDelay * config.__retryCount));
  
  // Create new axios instance to avoid interceptor loops
  return axios(config);
};

// Add response interceptor to handle auth errors and retries
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.method?.toUpperCase(), response.config.url);
    return response;
  },
  async (error) => {
    console.log('API Response Error:', error.response?.status, error.config?.method?.toUpperCase(), error.config?.url);
    console.log('API Response Error Details:', error.response?.data);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      console.log('API: 401 error detected');
      
      // Check if it's a token-related error
      const errorMessage = error.response?.data?.message || '';
      if (errorMessage.includes('Token is not valid') || errorMessage.includes('No token')) {
        console.log('API: Invalid token detected, clearing token');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Don't reload page, let the auth context handle this
        console.log('API: Token cleared, authentication context will handle the state update');
      } else {
        console.log('API: 401 error but may not be token-related:', errorMessage);
      }
    }
    
    // Handle service unavailable errors with retry
    if (error.response?.status === 503 || error.code === 'ECONNABORTED' || !error.response) {
      console.log('API: Service unavailable or timeout, attempting retry...');
      try {
        return await retryRequest(error);
      } catch (retryError) {
        console.log('API: All retry attempts failed');
        return Promise.reject(retryError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
