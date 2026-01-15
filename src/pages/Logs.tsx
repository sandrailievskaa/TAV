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
  { id: '9', type: 'data', action: 'Flight Gate Changed', user: 'Marko Nikolovski', details: 'Flight W64521 gate changed from B3 to B5', timestamp: '2026-01-13 09:20:15' },
  { id: '10', type: 'data', action: 'Passenger Boarded', user: 'Ana Dimitrova', details: 'Passenger Maria Stojanovic boarded flight W64521', timestamp: '2026-01-13 09:45:30' },
  { id: '11', type: 'system', action: 'Security Alert', user: 'System', details: 'X-ray scanner maintenance completed at Terminal 1', timestamp: '2026-01-13 08:00:00' },
  { id: '12', type: 'data', action: 'Vehicle Status Updated', user: 'Bujar Ahmeti', details: 'Vehicle VH002 fuel level updated to 62%', timestamp: '2026-01-13 07:30:22' },
  { id: '13', type: 'auth', action: 'Failed Login Attempt', user: 'Unknown', details: 'Failed login attempt from IP 192.168.1.100 - account locked', timestamp: '2026-01-13 06:15:45' },
  { id: '14', type: 'data', action: 'Staff Shift Started', user: 'Marko Nikolovski', details: 'Morning shift started - 12 staff members on duty', timestamp: '2026-01-13 06:00:00' },
  { id: '15', type: 'system', action: 'System Update', user: 'System', details: 'Database optimization completed - performance improved by 15%', timestamp: '2026-01-13 05:30:00' },
  { id: '16', type: 'data', action: 'Flight Delayed', user: 'System', details: 'Flight LH1234 delayed by 45 minutes due to weather', timestamp: '2026-01-13 11:30:00' },
  { id: '17', type: 'data', action: 'Passenger Check-in', user: 'Snezana Trajkovska', details: 'Checked in passenger Sophie Laurent for W64525', timestamp: '2026-01-13 14:20:10' },
  { id: '18', type: 'data', action: 'Vehicle Inspection', user: 'Goran Petrov', details: 'Vehicle VH003 inspection completed - all systems operational', timestamp: '2026-01-13 10:15:33' },
  { id: '19', type: 'auth', action: 'User Logout', user: 'Elena Trajkovska', details: 'User logged out from IP 192.168.1.52', timestamp: '2026-01-13 08:45:20' },
  { id: '20', type: 'data', action: 'Baggage Tagged', user: 'Filip Trajkov', details: 'Baggage tagged for flight TK1003 - 45 items processed', timestamp: '2026-01-13 16:30:45' },
  { id: '21', type: 'system', action: 'Fire Alarm Test', user: 'System', details: 'Monthly fire alarm system test completed - all zones operational', timestamp: '2026-01-13 07:00:00' },
  { id: '22', type: 'data', action: 'Flight Cancelled', user: 'Marko Nikolovski', details: 'Flight FR8825 cancelled due to aircraft technical issue', timestamp: '2026-01-13 07:00:15' },
  { id: '23', type: 'data', action: 'Passenger Security Check', user: 'Stefan Jovanov', details: 'Security screening completed for 156 passengers - no issues', timestamp: '2026-01-13 08:30:00' },
  { id: '24', type: 'data', action: 'Vehicle Refueled', user: 'Bujar Ahmeti', details: 'Vehicle VH001 refueled - fuel level now 85%', timestamp: '2026-01-13 09:00:22' },
  { id: '25', type: 'auth', action: 'Permission Updated', user: 'Dragan Kostov', details: 'Updated permissions for user Ana Dimitrova', timestamp: '2026-01-12 15:30:10' },
  { id: '26', type: 'system', action: 'Network Monitoring', user: 'System', details: 'Network latency check completed - all systems within normal range', timestamp: '2026-01-13 11:00:00' },
  { id: '27', type: 'data', action: 'Gate Assignment', user: 'Tamara Jovanovska', details: 'Gate A14 assigned to flight TK1005', timestamp: '2026-01-13 17:20:15' },
  { id: '28', type: 'data', action: 'Catering Loaded', user: 'Dejan Ristovski', details: 'Catering loaded for flight OS847 - 98 meals', timestamp: '2026-01-13 13:45:30' },
  { id: '29', type: 'system', action: 'Backup Started', user: 'System', details: 'Incremental backup started - estimated completion: 30 minutes', timestamp: '2026-01-13 18:00:00' },
  { id: '30', type: 'data', action: 'Passenger VIP Service', user: 'Ivana Petrovska', details: 'VIP lounge access granted for passenger Klaus Schmidt', timestamp: '2026-01-13 14:50:45' },
  { id: '31', type: 'data', action: 'Aircraft Cleaning', user: 'Marija Stojanovska', details: 'Aircraft cleaning completed for Airbus A320 - flight TK1001', timestamp: '2026-01-13 10:00:00' },
  { id: '32', type: 'auth', action: 'Session Timeout', user: 'System', details: 'User session expired due to inactivity - Marko Nikolovski', timestamp: '2026-01-12 18:30:00' },
  { id: '33', type: 'data', action: 'Baggage Claim', user: 'Filip Trajkov', details: 'Baggage claim processed - 189 items for flight W64521', timestamp: '2026-01-13 11:45:20' },
  { id: '34', type: 'system', action: 'Temperature Alert', user: 'System', details: 'Terminal temperature within normal range - 22°C', timestamp: '2026-01-13 12:00:00' },
  { id: '35', type: 'data', action: 'Flight Status Updated', user: 'Viktor Petrov', details: 'Flight OS851 status updated to Boarding', timestamp: '2026-01-13 17:30:10' },
  { id: '36', type: 'data', action: 'Vehicle Maintenance Completed', user: 'Goran Petrov', details: 'Vehicle VH004 maintenance completed - ready for service', timestamp: '2026-01-12 16:00:00' },
  { id: '37', type: 'auth', action: 'User Login', user: 'Ana Dimitrova', details: 'Successful login from IP 192.168.1.46', timestamp: '2026-01-13 07:15:30' },
  { id: '38', type: 'data', action: 'Passenger Special Assistance', user: 'Jovana Milosevska', details: 'Wheelchair assistance provided for passenger Elena Trajkovska', timestamp: '2026-01-13 13:30:15' },
  { id: '39', type: 'system', action: 'Power System Check', user: 'System', details: 'Backup power system test completed - all generators operational', timestamp: '2026-01-13 05:00:00' },
  { id: '40', type: 'data', action: 'Flight Documents Verified', user: 'Tamara Jovanovska', details: 'Flight documents verified for LH1238 - all clear', timestamp: '2026-01-13 14:00:00' },
  { id: '41', type: 'data', action: 'Vehicle GPS Updated', user: 'System', details: 'GPS tracking updated for all 20 active vehicles', timestamp: '2026-01-13 09:15:00' },
  { id: '42', type: 'auth', action: 'User Created', user: 'Dragan Kostov', details: 'Created new user account: teodora.ristovska@tav.com.mk', timestamp: '2026-01-12 10:20:45' },
  { id: '43', type: 'data', action: 'Passenger Check-in', user: 'Ana Dimitrova', details: 'Checked in passenger James Wilson for W64523', timestamp: '2026-01-13 04:30:20' },
  { id: '44', type: 'system', action: 'Security Camera Check', user: 'System', details: 'Security camera system check completed - all 48 cameras operational', timestamp: '2026-01-13 08:00:00' },
  { id: '45', type: 'data', action: 'Fuel Delivery', user: 'Bujar Ahmeti', details: 'Fuel delivery completed - 15,000 liters received', timestamp: '2026-01-13 06:30:00' },
];

const getTypeConfig = (t: any) => ({
  'auth': { label: t.logs.types.authentication, className: 'bg-chart-5/15 text-chart-5 border-chart-5/30' },
  'data': { label: t.logs.types.dataChange, className: 'bg-chart-2/15 text-chart-2 border-chart-2/30' },
  'system': { label: t.logs.types.system, className: 'bg-chart-1/15 text-chart-1 border-chart-1/30' },
});

const Logs: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const typeConfig = getTypeConfig(t);

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
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.nav.logs}</h1>
          <p className="page-description">{t.logs.subtitle}</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          {t.common.export}
        </Button>
      </div>

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
            <SelectItem value="auth">{t.logs.types.authentication}</SelectItem>
            <SelectItem value="data">{t.logs.types.dataChange}</SelectItem>
            <SelectItem value="system">{t.logs.types.system}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredLogs.length} {t.logs.logEntries}
      </p>

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
