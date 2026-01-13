import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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

export type UserStatus = 'active' | 'inactive' | 'candidate' | 'archived';

export type Permission = 
  | 'read'
  | 'create'
  | 'update'
  | 'delete'
  | 'export'
  | 'configure'
  | 'assign-ppe'
  | 'read-sign'
  | 'ocr'
  | 'generate-reports'
  | 'full-access';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  employeeId?: string;
  fullName: string;
}

export interface ModulePermissions {
  [module: string]: Permission[];
}

interface RBACContextType {
  user: User | null;
  hasPermission: (module: string, permission: Permission) => boolean;
  hasAnyPermission: (module: string, permissions: Permission[]) => boolean;
  canAccessModule: (module: string) => boolean;
  isReadOnly: (module: string) => boolean;
  canViewOwnDataOnly: (module: string) => boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

const rolePermissions: Record<UserRole, ModulePermissions> = {
  'system-admin': {
    'administrative': ['full-access'],
    'employees': ['full-access'],
    'medical-exams': ['full-access'],
    'trainings': ['full-access'],
    'incidents': ['full-access'],
    'ppe': ['full-access'],
    'equipment': ['full-access'],
    'reports': ['full-access'],
    'dashboard': ['full-access'],
    'users': ['full-access'],
    'settings': ['full-access'],
  },
  'hse-admin': {
    'administrative': ['read'],
    'employees': ['read', 'assign-ppe'],
    'medical-exams': ['read'],
    'trainings': ['read'],
    'incidents': ['full-access'],
    'ppe': ['read'],
    'equipment': ['read'],
    'reports': ['read', 'generate-reports'],
    'dashboard': ['read'],
  },
  'hr-manager': {
    'administrative': ['read'],
    'employees': ['full-access'],
    'medical-exams': ['read'],
    'trainings': ['read'],
    'incidents': [],
    'ppe': [],
    'equipment': [],
    'reports': ['read', 'generate-reports'],
    'dashboard': ['read'],
  },
  'medical-officer': {
    'administrative': [],
    'employees': ['read'],
    'medical-exams': ['full-access', 'ocr'],
    'trainings': [],
    'incidents': [],
    'ppe': [],
    'equipment': [],
    'reports': ['read'],
    'dashboard': ['read'],
  },
  'training-coordinator': {
    'administrative': [],
    'employees': ['read'],
    'medical-exams': [],
    'trainings': ['full-access', 'read-sign'],
    'incidents': [],
    'ppe': [],
    'equipment': [],
    'reports': ['read'],
    'dashboard': ['read'],
  },
  'safety-officer': {
    'administrative': [],
    'employees': ['read'],
    'medical-exams': [],
    'trainings': [],
    'incidents': ['full-access'],
    'ppe': [],
    'equipment': [],
    'reports': ['read', 'generate-reports'],
    'dashboard': ['read'],
  },
  'equipment-manager': {
    'administrative': [],
    'employees': ['read'],
    'medical-exams': [],
    'trainings': [],
    'incidents': [],
    'ppe': ['full-access'],
    'equipment': ['full-access'],
    'reports': ['read'],
    'dashboard': ['read'],
  },
  'management': {
    'administrative': [],
    'employees': ['read'],
    'medical-exams': ['read'],
    'trainings': ['read'],
    'incidents': ['read'],
    'ppe': [],
    'equipment': [],
    'reports': ['read', 'generate-reports'],
    'dashboard': ['read'],
  },
  'employee': {
    'administrative': [],
    'employees': ['read'],
    'medical-exams': ['read'],
    'trainings': ['read', 'read-sign'],
    'incidents': ['create'],
    'ppe': ['read'],
    'equipment': ['read'],
    'reports': [],
    'dashboard': ['read'],
  },
};

export const testUsers: Record<string, User> = {
  'admin.test': {
    id: '1',
    username: 'admin.test',
    role: 'system-admin',
    status: 'active',
    fullName: 'System Administrator',
  },
  'hse.test': {
    id: '2',
    username: 'hse.test',
    role: 'hse-admin',
    status: 'active',
    fullName: 'HSE Administrator',
  },
  'hr.test': {
    id: '3',
    username: 'hr.test',
    role: 'hr-manager',
    status: 'active',
    fullName: 'HR Manager',
  },
  'medic.test': {
    id: '4',
    username: 'medic.test',
    role: 'medical-officer',
    status: 'active',
    fullName: 'Medical Officer',
  },
  'training.test': {
    id: '5',
    username: 'training.test',
    role: 'training-coordinator',
    status: 'active',
    fullName: 'Training Coordinator',
  },
  'safety.test': {
    id: '6',
    username: 'safety.test',
    role: 'safety-officer',
    status: 'active',
    fullName: 'Safety Officer',
  },
  'equipment.test': {
    id: '7',
    username: 'equipment.test',
    role: 'equipment-manager',
    status: 'active',
    fullName: 'Equipment Manager',
  },
  'manager.test': {
    id: '8',
    username: 'manager.test',
    role: 'management',
    status: 'active',
    fullName: 'Management Viewer',
  },
  'employee.test': {
    id: '9',
    username: 'employee.test',
    role: 'employee',
    status: 'active',
    employeeId: 'EMP001',
    fullName: 'Marko Nikolovski',
  },
};

export const RBACProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (isAuthenticated) {
      const username = localStorage.getItem('currentUsername') || '';
      const storedRole = localStorage.getItem('currentUserRole') as UserRole | null;
      
      const user = testUsers[username.toLowerCase()];
      
      if (user) {
        setCurrentUser(user);
      } else if (storedRole) {
        setCurrentUser({
          id: `demo-${username}`,
          username: username || 'demo',
          role: storedRole,
          status: 'active',
          fullName: username || 'Demo User',
        });
      } else {
        setCurrentUser({
          id: `demo-${username}`,
          username: username || 'demo',
          role: 'management',
          status: 'active',
          fullName: username || 'Demo User',
        });
      }
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem('tav-auth') === 'true') {
        const username = localStorage.getItem('currentUsername') || '';
        const storedRole = localStorage.getItem('currentUserRole') as UserRole | null;
        const user = testUsers[username.toLowerCase()];
        
        if (user) {
          setCurrentUser(user);
        } else if (storedRole) {
          setCurrentUser({
            id: `demo-${username}`,
            username: username || 'demo',
            role: storedRole,
            status: 'active',
            fullName: username || 'Demo User',
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const hasPermission = (module: string, permission: Permission): boolean => {
    if (!currentUser || currentUser.status !== 'active') return false;
    if (currentUser.status === 'candidate') {
      return module === 'employees' && permission === 'read';
    }
    if (currentUser.status === 'archived') {
      return permission === 'read';
    }

    const permissions = rolePermissions[currentUser.role]?.[module] || [];
    if (permissions.includes('full-access')) return true;
    return permissions.includes(permission);
  };

  const hasAnyPermission = (module: string, permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(module, permission));
  };

  const canAccessModule = (module: string): boolean => {
    if (!currentUser || currentUser.status === 'inactive') return false;
    if (currentUser.status === 'candidate') {
      return module === 'employees';
    }
    const permissions = rolePermissions[currentUser.role]?.[module] || [];
    return permissions.length > 0;
  };

  const isReadOnly = (module: string): boolean => {
    if (!currentUser) return true;
    const permissions = rolePermissions[currentUser.role]?.[module] || [];
    return !permissions.includes('create') && 
           !permissions.includes('update') && 
           !permissions.includes('delete') &&
           !permissions.includes('full-access');
  };

  const canViewOwnDataOnly = (module: string): boolean => {
    if (!currentUser) return false;
    return currentUser.role === 'employee' && 
           (module === 'employees' || module === 'medical-exams' || module === 'trainings');
  };

  return (
    <RBACContext.Provider
      value={{
        user: currentUser,
        hasPermission,
        hasAnyPermission,
        canAccessModule,
        isReadOnly,
        canViewOwnDataOnly,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = (): RBACContextType => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};

