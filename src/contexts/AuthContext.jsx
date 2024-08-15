import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.get(`http://localhost:3000/users?username=${username}`);
      const users = response.data;
console.log(users)
      if (users.length > 0) {
        if (users[0].password === password) {
          const { password, ...userData } = users[0];
          setUser(userData);
          navigate('/home');
          return true;
        } else {
          return false; 
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      const existingUserResponse = await axios.get(`http://localhost:3000/users?username=${username}`);
      if (existingUserResponse.data.length > 0) {
        return false;
      }

      const response = await axios.post('http://localhost:3000/users', {
        username: username,
        password: password
      });

      if (response.status === 201) {
        const { password, ...userData } = response.data;
        setUser(userData);
        navigate('/home');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
