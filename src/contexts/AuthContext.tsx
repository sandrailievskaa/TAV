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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getRoleFromUsername = (username: string): UserRole => {
  const trimmedUsername = (username || '').trim().toLowerCase();
  
  const usernameToRole: Record<string, UserRole> = {
    'admin.test': 'system-admin',
    'hse.test': 'hse-admin',
    'hr.test': 'hr-manager',
    'medic.test': 'medical-officer',
    'training.test': 'training-coordinator',
    'safety.test': 'safety-officer',
    'equipment.test': 'equipment-manager',
    'manager.test': 'management',
    'employee.test': 'employee',
  };
  
  return usernameToRole[trimmedUsername] || 'management';
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const auth = localStorage.getItem('tav-auth') === 'true';
    if (auth) {
      const username = localStorage.getItem('currentUsername');
      const role = localStorage.getItem('currentUserRole');
      if (!username || !role) {
        localStorage.removeItem('tav-auth');
        return false;
      }
    }
    return auth;
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const trimmedUsername = (username || '').trim();
      
      if (trimmedUsername.length > 0) {
        const role = getRoleFromUsername(trimmedUsername);
        
        localStorage.setItem('tav-auth', 'true');
        localStorage.setItem('currentUsername', trimmedUsername);
        localStorage.setItem('currentUserRole', role);
        
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
    localStorage.removeItem('tav-auth');
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('currentUserRole');
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

