import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Key, Shield, User, Mail, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const users = [
  { id: '1', name: 'Dragan Kostov', email: 'dragan.kostov@tav.com.mk', role: 'Administrator', lastLogin: '2026-01-13 09:45', status: 'active' },
  { id: '2', name: 'Ana Dimitrova', email: 'ana.dimitrova@tav.com.mk', role: 'Operations Manager', lastLogin: '2026-01-13 08:30', status: 'active' },
  { id: '3', name: 'Marko Nikolovski', email: 'marko.nikolovski@tav.com.mk', role: 'Supervisor', lastLogin: '2026-01-13 08:30', status: 'active' },
  { id: '4', name: 'Elena Trajkovska', email: 'elena.trajkovska@tav.com.mk', role: 'Staff', lastLogin: '2026-01-10 16:45', status: 'inactive' },
  { id: '5', name: 'Bujar Ahmeti', email: 'bujar.ahmeti@tav.com.mk', role: 'Staff', lastLogin: '2026-01-13 07:15', status: 'active' },
  { id: '6', name: 'Vlado Mitrovski', email: 'vlado.mitrovski@tav.com.mk', role: 'Supervisor', lastLogin: '2026-01-13 07:00', status: 'active' },
  { id: '7', name: 'Snezana Trajkovska', email: 'snezana.trajkovska@tav.com.mk', role: 'Staff', lastLogin: '2026-01-13 08:15', status: 'active' },
  { id: '8', name: 'Goran Petrov', email: 'goran.petrov@tav.com.mk', role: 'Supervisor', lastLogin: '2026-01-13 06:30', status: 'active' },
  { id: '9', name: 'Marija Stojanovska', email: 'marija.stojanovska@tav.com.mk', role: 'Staff', lastLogin: '2026-01-13 05:45', status: 'active' },
  { id: '10', name: 'Dejan Ristovski', email: 'dejan.ristovski@tav.com.mk', role: 'Staff', lastLogin: '2026-01-13 07:20', status: 'active' },
  { id: '11', name: 'Ivana Petrovska', email: 'ivana.petrovska@tav.com.mk', role: 'Staff', lastLogin: '2026-01-13 08:00', status: 'active' },
  { id: '12', name: 'Aleksandar Stojanov', email: 'aleksandar.stojanov@tav.com.mk', role: 'Staff', lastLogin: '2026-01-12 22:30', status: 'active' },
  { id: '13', name: 'Tamara Jovanovska', email: 'tamara.jovanovska@tav.com.mk', role: 'Staff', lastLogin: '2026-01-13 09:10', status: 'active' },
  { id: '14', name: 'Nikola Todorov', email: 'nikola.todorov@tav.com.mk', role: 'Staff', lastLogin: '2026-01-13 08:45', status: 'active' },
  { id: '15', name: 'Jovana Milosevska', email: 'jovana.milosevska@tav.com.mk', role: 'Staff', lastLogin: '2026-01-12 18:00', status: 'inactive' },
];

const roleColors: Record<string, string> = {
  'Administrator': 'bg-chart-5/15 text-chart-5 border-chart-5/30',
  'Operations Manager': 'bg-chart-1/15 text-chart-1 border-chart-1/30',
  'Supervisor': 'bg-chart-2/15 text-chart-2 border-chart-2/30',
  'Staff': 'bg-muted text-muted-foreground border-border',
};

const getRoleTranslation = (role: string, t: any): string => {
  const roleMap: Record<string, keyof typeof t.users.roles> = {
    'Administrator': 'administrator',
    'Operations Manager': 'operationsManager',
    'Supervisor': 'supervisor',
    'Staff': 'staff',
  };
  const roleKey = roleMap[role];
  return roleKey ? t.users.roles[roleKey] : role;
};

const Users: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.users.title}</h1>
          <p className="page-description">{t.users.subtitle}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t.users.addUser}
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={t.common.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredUsers.length} {t.users.userCount}
      </p>

      <div className="bg-gradient-to-br from-card to-card/95 rounded-lg border-2 border-border/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.common.name}</th>
                <th>{t.common.email}</th>
                <th>{t.common.role}</th>
                <th>{t.users.lastLogin}</th>
                <th>{t.common.status}</th>
                <th className="text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="animate-fade-in hover:scale-[1.01] transition-transform duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-semibold">{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{user.email}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant="outline" className={cn('w-fit shadow-sm', roleColors[user.role])}>
                      {getRoleTranslation(user.role, t)}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-medium">{user.lastLogin}</span>
                    </div>
                  </td>
                  <td>
                    <Badge
                      variant="outline"
                      className={cn(
                        'w-fit shadow-sm flex items-center gap-1',
                        user.status === 'active' ? 'badge-success' : 'bg-muted text-muted-foreground border-border'
                      )}
                    >
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.common.active}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          {t.common.inactive}
                        </>
                      )}
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
                          <DropdownMenuItem>
                            <Shield className="w-4 h-4 mr-2" />
                            {t.users.permissions}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="w-4 h-4 mr-2" />
                            {t.users.resetPassword}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t.common.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
