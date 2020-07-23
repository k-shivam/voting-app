import axios from 'axios';
require('dotenv').config();
const host = 'http://localhost:4000/api';


export const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const call = async (method, path, data) => {
  const response = await axios[method](`${host}`, data);
  return response.data;
};

export default { setToken, call };