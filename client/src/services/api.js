import axios from 'axios';
require('dotenv').config();
const port = process.env.PORT || 5000
const host = `http://localhost:${port}/api`;
const url = '/'

export const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const call = async (method, path, data) => {
    const response = await axios[method](`${url}`, data);
//  const response = await axios[method](`${host}/${path}`, data);
  return response.data;
};

export default { setToken, call };