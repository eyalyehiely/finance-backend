

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_frontend_API_BASE_URL || 'http://localhost:8000/api/',
  // other axios options if needed
});

export default instance;
