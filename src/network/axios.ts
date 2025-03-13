import axios from 'axios';
import {AUTH_TOKEN, BASE_URL} from '../../constants';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {Authorization: AUTH_TOKEN},
});
