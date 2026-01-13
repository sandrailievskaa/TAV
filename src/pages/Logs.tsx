import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Download, Clock, User, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const logs = [
  { id: '1', type: 'auth', action: 'User Login', user: 'Dragan Kostov', details: 'Successful login from IP 192.168.1.45', timestamp: '2026-01-13 09:45:12' },
  { id: '2', type: 'data', action: 'Flight Updated', user: 'Ana Dimitrova', details: 'Updated status for TK1001: On Time → Boarding', timestamp: '2026-01-13 09:30:05' },
  { id: '3', type: 'system', action: 'Backup Completed', user: 'System', details: 'Automatic daily backup completed successfully', timestamp: '2026-01-13 06:00:00' },
  { id: '4', type: 'data', action: 'Passenger Check-in', user: 'Marko Nikolovski', details: 'Checked in passenger Hans Mueller for LH1234', timestamp: '2026-01-13 08:15:33' },
  { id: '5', type: 'auth', action: 'Password Reset', user: 'Elena Trajkovska', details: 'Password reset requested via email', timestamp: '2026-01-12 16:20:45' },
  { id: '6', type: 'data', action: 'Vehicle Maintenance', user: 'Bujar Ahmeti', details: 'Marked VH004 for scheduled maintenance', timestamp: '2026-01-12 14:30:00' },
  { id: '7', type: 'system', action: 'Report Generated', user: 'System', details: 'Daily operations report generated and sent', timestamp: '2026-01-12 23:00:00' },
  { id: '8', type: 'auth', action: 'User Created', user: 'Dragan Kostov', details: 'Created new user account: stefan.iliev@tav.com.mk', timestamp: '2026-01-12 11:45:22' },
];

const typeConfig = {
  'auth': { label: 'Authentication', className: 'bg-chart-5/15 text-chart-5 border-chart-5/30' },
  'data': { label: 'Data Change', className: 'bg-chart-2/15 text-chart-2 border-chart-2/30' },
  'system': { label: 'System', className: 'bg-chart-1/15 text-chart-1 border-chart-1/30' },
};

const Logs: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.nav.logs}</h1>
          <p className="page-description">View system activity and audit trail</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          {t.common.export}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t.common.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.common.filter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="auth">Authentication</SelectItem>
            <SelectItem value="data">Data Changes</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredLogs.length} log entries
      </p>

      {/* Logs List */}
      <div className="space-y-3">
        {filteredLogs.map((log, index) => {
          const type = typeConfig[log.type as keyof typeof typeConfig];
          
          return (
            <div
              key={log.id}
              className="bg-card rounded-lg border border-border p-4 hover:shadow-sm transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-muted">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{log.action}</span>
                      <Badge variant="outline" className={cn('w-fit text-xs', type.className)}>
                        {type.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5 truncate">
                      {log.details}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground sm:flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{log.user}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Logs;
