import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // change url address if Android or android emulator.
});

export default api;
