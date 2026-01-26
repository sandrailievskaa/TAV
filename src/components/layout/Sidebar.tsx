import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRBAC } from '@/contexts/RBACContext';
import {
  LayoutDashboard,
  Shield,
  UserCog,
  ClipboardList,
  Stethoscope,
  GraduationCap,
  AlertTriangle,
  FileBarChart,
  Settings,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  Building2,
  Briefcase,
  Package,
  HardHat,
  FileText,
  Building,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const { canAccessModule } = useRBAC();

  const allNavItems = [
    { icon: LayoutDashboard, label: t.nav.dashboard, path: '/', module: 'dashboard' },
    { icon: UserCog, label: t.nav.staff, path: '/staff', module: 'staff' },
    { icon: ClipboardList, label: t.nav.employees, path: '/employees', module: 'employees' },
    { icon: Stethoscope, label: t.nav.medicalExams, path: '/medical-exams', module: 'medical-exams' },
    { icon: GraduationCap, label: t.nav.trainings, path: '/trainings', module: 'trainings' },
    { icon: AlertTriangle, label: t.nav.incidents, path: '/incidents', module: 'incidents' },
    { icon: FileBarChart, label: t.nav.reports, path: '/reports', module: 'reports' },
    { icon: Building, label: t.nav.companyAnalysis, path: '/company-analysis', module: 'company-analysis' },
  ];

  const adminItems = [
    { icon: Shield, label: t.nav.users, path: '/users', module: 'users' },
    { icon: ScrollText, label: t.nav.logs, path: '/logs', module: 'logs' },
    { icon: Settings, label: t.nav.settings, path: '/settings', module: 'settings' },
  ];

  const administrativeItems = [
    { icon: Building2, label: t.nav.organization, path: '/admin/organization', module: 'administrative' },
    { icon: Briefcase, label: t.nav.positions, path: '/admin/positions', module: 'administrative' },
    { icon: Package, label: t.nav.assets, path: '/admin/assets', module: 'equipment' },
    { icon: HardHat, label: t.nav.ppe, path: '/admin/ppe', module: 'ppe' },
    { icon: FileText, label: t.nav.documents, path: '/admin/documents', module: 'administrative' },
  ];

  const navItems = allNavItems.filter(item => {
    if (item.module === 'staff') {
      return true;
    }
    if (item.module === 'company-analysis') {
      return true;
    }
    return canAccessModule(item.module);
  });

  const filteredAdminItems = adminItems.filter(item => canAccessModule(item.module));
  const filteredAdministrativeItems = administrativeItems.filter(item => canAccessModule(item.module));

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-50 flex flex-col shadow-sidebar',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">TAV System</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            'p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors',
            collapsed && 'mx-auto'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'nav-item',
                isActive(item.path) && 'active'
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </div>

        <div className="my-4 mx-2 border-t border-sidebar-border" />

        {!collapsed && (
          <p className="px-3 mb-2 text-xs font-medium text-sidebar-muted uppercase tracking-wider">
            Admin
          </p>
        )}
        <div className="space-y-1">
          {filteredAdminItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'nav-item',
                isActive(item.path) && 'active'
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </div>

        <div className="my-4 mx-2 border-t border-sidebar-border" />

        {!collapsed && (
          <p className="px-3 mb-2 text-xs font-medium text-sidebar-muted uppercase tracking-wider">
            {t.nav.admin}
          </p>
        )}
        <div className="space-y-1">
          {filteredAdministrativeItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'nav-item',
                isActive(item.path) && 'active'
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-muted text-center">
            © 2026 TAV Macedonia
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
