import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  LayoutDashboard,
  Plane,
  Users,
  UserCog,
  Car,
  FileBarChart,
  Settings,
  Shield,
  ScrollText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: t.nav.dashboard, path: '/' },
    { icon: Plane, label: t.nav.flights, path: '/flights' },
    { icon: Users, label: t.nav.passengers, path: '/passengers' },
    { icon: UserCog, label: t.nav.staff, path: '/staff' },
    { icon: Car, label: t.nav.vehicles, path: '/vehicles' },
    { icon: FileBarChart, label: t.nav.reports, path: '/reports' },
  ];

  const adminItems = [
    { icon: Shield, label: t.nav.users, path: '/users' },
    { icon: ScrollText, label: t.nav.logs, path: '/logs' },
    { icon: Settings, label: t.nav.settings, path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 z-50 flex flex-col shadow-sidebar',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Plane className="w-5 h-5 text-sidebar-primary-foreground" />
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

      {/* Navigation */}
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

        {/* Divider */}
        <div className="my-4 mx-2 border-t border-sidebar-border" />

        {/* Admin section */}
        {!collapsed && (
          <p className="px-3 mb-2 text-xs font-medium text-sidebar-muted uppercase tracking-wider">
            Admin
          </p>
        )}
        <div className="space-y-1">
          {adminItems.map((item) => (
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

      {/* Footer */}
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
