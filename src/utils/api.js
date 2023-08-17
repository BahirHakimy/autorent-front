import axios from 'axios';
import { clearSession, getUser } from './auth';
import toast from 'react-hot-toast';

const authFetch = (token) => {
  const instance = axios.create({
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    baseURL: 'http://127.0.0.1:8000/api/',
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        toast.error('Network Error, Please check your connection');
        return Promise.reject({
          response: {
            data: { detail: "'Network Error, Please check your connection'" },
          },
        });
      }
      if (error.response.status === 401) {
        if (getUser(false)) {
          toast(error.response.data?.detail || error.response.message);
          clearSession();
        }
        window.location.replace('/');
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export { authFetch as axios };
