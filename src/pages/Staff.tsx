import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { staff } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, Download, MoreHorizontal, Eye, Edit, Trash2, User, Building2, Briefcase, Calendar, Phone, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const statusConfig = {
  'active': { label: { en: 'Active', mk: 'Активен', sq: 'Aktiv' }, className: 'badge-success' },
  'on-leave': { label: { en: 'On Leave', mk: 'На одмор', sq: 'Në pushim' }, className: 'badge-warning' },
  'off-duty': { label: { en: 'Off Duty', mk: 'Надвор од смена', sq: 'Jashtë turnit' }, className: 'bg-muted text-muted-foreground border-border' },
};

const Staff: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.staff.title}</h1>
          <p className="page-description">{t.staff.subtitle}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t.common.add}
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.common.filter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="active">{t.common.active}</SelectItem>
            <SelectItem value="on-leave">{t.staff.onLeave}</SelectItem>
            <SelectItem value="off-duty">{t.staff.offDuty}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          {t.common.export}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredStaff.length} {t.nav.staff.toLowerCase()}
      </p>

      <div className="bg-gradient-to-br from-card to-card/95 rounded-lg border-2 border-border/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.staff.employeeId}</th>
                <th>{t.common.name}</th>
                <th>{t.staff.department}</th>
                <th>{t.staff.position}</th>
                <th>{t.staff.shift}</th>
                <th>{t.common.status}</th>
                <th className="text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member, index) => {
                const status = statusConfig[member.status];

                return (
                  <tr
                    key={member.id}
                    className="animate-fade-in hover:scale-[1.01] transition-transform duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td>
                      <code className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-muted/80 to-muted/60 text-sm font-semibold border border-border/50 shadow-sm font-mono">{member.employeeId}</code>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-accent" />
                        <span className="font-medium">{(() => {
                          const deptMap: Record<string, keyof typeof t.staff.departments> = {
                            'Operations': 'operations',
                            'Customer Service': 'customerService',
                            'Security': 'security',
                            'Ground Handling': 'groundHandling',
                            'Maintenance': 'maintenance',
                          };
                          return t.staff.departments[deptMap[member.department]] || member.department;
                        })()}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{(() => {
                          const posMap: Record<string, keyof typeof t.staff.positions> = {
                            'Shift Manager': 'shiftManager',
                            'Check-in Agent': 'checkInAgent',
                            'Security Officer': 'securityOfficer',
                            'Ramp Agent': 'rampAgent',
                            'Technician': 'technician',
                          };
                          return t.staff.positions[posMap[member.position]] || member.position;
                        })()}</span>
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-br from-muted/60 to-muted/40 text-xs font-semibold border border-border/50 shadow-sm">
                        {t.staff.shifts[member.shift.toLowerCase() as keyof typeof t.staff.shifts] || member.shift}
                      </span>
                    </td>
                    <td>
                      <Badge variant="outline" className={cn('w-fit shadow-sm flex items-center gap-1', status.className)}>
                        {status.label[language]}
                      </Badge>
                    </td>
                    <td>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded hover:bg-muted">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              {t.common.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              {t.common.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              {t.common.delete}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Staff;
