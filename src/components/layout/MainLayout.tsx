import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AIAssistant from '../AIAssistant';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <Topbar />
        <main className="p-6 animate-fade-in">{children}</main>
      </div>
      <AIAssistant />
    </div>
  );
};

export default MainLayout;
