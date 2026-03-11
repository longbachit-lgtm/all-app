import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_NICK = 'admin';
const ADMIN_PASS = '1234@1234a';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedAuth = localStorage.getItem('is_auth');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === ADMIN_NICK && password === ADMIN_PASS) {
          setIsAuthenticated(true);
          setUser(username);
          localStorage.setItem('is_auth', 'true');
          localStorage.setItem('auth_user', username);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('is_auth');
    localStorage.removeItem('auth_user');
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
