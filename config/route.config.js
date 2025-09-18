import axios from 'axios';

// const apiBaseURL= 'http://localhost:6567/api/v1'
// const apiBaseURL=`https://utkal-payrole-api-node.onrender.com/api/v1`
const apiBaseURL= `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
// Create an Axios instance with your base URL
const apiClient = axios.create({
  baseURL: apiBaseURL, // Your base API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the Axios instance for use across the app
export {apiClient, apiBaseURL} ;