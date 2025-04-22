import { createContext, useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user in local storage
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
      setIsLoading(false); // No need to fetch if user is in local storage
    } else {
      const fetchUser = async () => {
        try {
          const res = await axiosInstance.get('/auth/me');
          setAuthUser(res.data);
          localStorage.setItem('authUser', JSON.stringify(res.data)); // Store in local storage
        } catch (err) {
          if (err.response?.status !== 401) {
            
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchUser();
    }
  }, []);

  // Keep localStorage in sync with authUser
  useEffect(() => {
    if (authUser) {
      localStorage.setItem('authUser', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
