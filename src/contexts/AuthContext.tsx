import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole =
  | 'system-admin'
  | 'hse-admin'
  | 'hr-manager'
  | 'medical-officer'
  | 'training-coordinator'
  | 'safety-officer'
  | 'equipment-manager'
  | 'management'
  | 'employee';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
  user: { username: string; role: UserRole } | null;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    username: string;
    role: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('tav-token');
    return !!token;
  });
  
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('tav-token'));
  const [user, setUser] = useState<{ username: string; role: UserRole } | null>(() => {
    const savedUser = localStorage.getItem('tav-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Login error:', error.message);
        return false;
      }

      const data: LoginResponse = await response.json();

      if (data.success && data.token && data.user) {
        const userData = {
          username: data.user.username,
          role: data.user.role as UserRole,
        };

        localStorage.setItem('tav-token', data.token);
        localStorage.setItem('tav-user', JSON.stringify(userData));

        setToken(data.token);
        setUser(userData);
        setIsAuthenticated(true);

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
    setToken(null);
    setUser(null);
    localStorage.removeItem('tav-token');
    localStorage.removeItem('tav-user');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, user }}>
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

