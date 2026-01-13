import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for the prototype
const demoUser: User = {
  id: 'user-1',
  name: 'Драган Костов',
  email: 'd.kostov@tav.mk',
  role: 'Administrator',
  initials: 'ДК',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user was previously logged in
    const stored = localStorage.getItem('tav-ohs-user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, accept any credentials
    setUser(demoUser);
    localStorage.setItem('tav-ohs-user', JSON.stringify(demoUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('tav-ohs-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
