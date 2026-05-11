/**
 * SERVICE: Centralized API Client (Axios)
 * PATH: src/services/api.ts
 * 
 * DESCRIPTION:
 * This service acts as the gateway for all network requests. By using an 
 * Axios instance, we can globally manage the Base URL, inject Auth tokens, 
 * and intercept errors before they reach the UI components.
 */

import axios from 'axios';

/**
 * 1. INSTANCE CONFIGURATION:
 * We pre-configure the 'api' object so we don't have to repeat the 
 * baseURL or headers in every single file.
 */
const api = axios.create({
  // Pulled from .env.local to separate environment config from logic.
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 2. REQUEST INTERCEPTOR:
 * Think of this as the "Security Stamp." Every time you call api.get() or api.post(), 
 * this logic runs first to see if there is a JWT token to attach.
 */
api.interceptors.request.use(
  (config) => {
    // Check for a token in localStorage (Safe-guarding for SSR with the window check)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // If a session exists, we inject the Bearer token into the Authorization header
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Catch-all for client-side configuration errors
    return Promise.reject(error);
  }
);

/**
 * 3. RESPONSE INTERCEPTOR:
 * This handles "Global Events." If the server returns an error like 401 (Unauthorized), 
 * we can handle the logout logic once here rather than on every single page.
 */
api.interceptors.response.use(
  (response) => {
    // Standard successful response
    return response;
  },
  (error) => {
    /**
     * AUTHENTICATION WATCHER:
     * If the server rejects the token (Expired or Invalid), we can 
     * trigger a redirect or clear the local session data here.
     */
    if (error.response?.status === 401) {
      console.warn('Unauthorized access detected. Redirecting or clearing session...');
      // Future: window.location.href = '/login';
    }

    // Pass the error through so the specific component can display a custom message
    return Promise.reject(error);
  }
);

export default api;