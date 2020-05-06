import axios from 'axios';

const baseURL = process.env.BACKEND_URL || 'http://localhost:5000'

const api = axios.create({baseURL});

export default api;