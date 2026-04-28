import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../../src/API';

const AuthContext = createContext({});
const URL = '/userdata';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const fetchUserData = async () => {
    try {
      const response = await axios.get(URL, { withCredentials: true });
      if (response.data.Status === 'Success') {
        setAuth({ user: response.data.user.name, role: response.data.user.role, userID: response.data.user.userID });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;