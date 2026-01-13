import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('tav-auth') === 'true';
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const trimmedUsername = (username || '').trim();
      const trimmedPassword = (password || '').trim();
      
      if (trimmedUsername.length > 0 && trimmedPassword.length > 0) {
        setIsAuthenticated(true);
        localStorage.setItem('tav-auth', 'true');
        localStorage.setItem('currentUsername', trimmedUsername);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('tav-auth');
    localStorage.removeItem('currentUsername');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

