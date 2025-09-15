import axios from 'axios';
import {createContext, useState, useEffect} from 'react'
export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartSize, setCartSize] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/users/me", {
        withCredentials: true,
      });
      setUser(res.data.data);
      console.log(user)
    } catch (error) {
      setUser(null)
      console.log(error)
    }
    finally{
      setLoading(false)
    }
    };
    checkAuth();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser , loading, setLoading, cartSize, setCartSize  }}>
      {children}
    </authContext.Provider>
  );
};
