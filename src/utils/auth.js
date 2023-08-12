import jwtDecode from 'jwt-decode';
import axios from 'axios';

const TOKEN_KEY = 'token';

function getUser(decode = true) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) return decode ? jwtDecode(token) : token;
  return null;
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function register(email, password) {
  return axios.post('api/users/', { email, password });
}

export { register, getUser, setToken, clearSession };
