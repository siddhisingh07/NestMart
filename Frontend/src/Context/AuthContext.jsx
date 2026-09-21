import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { base_url } from '../constant';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartSize, setCartSize] = useState(0);

  const fetchCartSize = async () => {
    try {
      const res = await axios.get(`${base_url}/cart/`, {
        withCredentials: true,
      });
      if (res.data?.data?.items) {
        setCartSize(res.data.data.items.length);
      }
    } catch (error) {
      setCartSize(0);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${base_url}/users/me`, {
        withCredentials: true,
      });
      const userData = res.data?.data;
      if (userData) {
        const normalizedUser = {
          ...userData,
          id: userData.id || userData._id,
          _id: userData._id || userData.id,
        };
        setUser(normalizedUser);
        await fetchCartSize();
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        cartSize,
        setCartSize,
        fetchCartSize,
        checkAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

