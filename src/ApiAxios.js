// api.js

import axios from 'axios';

const apiUrl = axios.create({
//   baseURL: "https://voterserver.onrender.com", 
  baseURL: "https://messageapp-c9mf.onrender.com", 
   // Timeout for requests in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set the default content type for requests
    // Add any other common headers you want to include
  },
});

export default apiUrl;
