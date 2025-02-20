import axios from 'axios';

export const registerUser = (user) => {
  return axios.post('/api/register', user);
};