import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Key, Shield } from 'lucide-react';
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
  { id: '3', name: 'Marko Nikolovski', email: 'marko.nikolovski@tav.com.mk', role: 'Supervisor', lastLogin: '2026-01-12 14:20', status: 'active' },
  { id: '4', name: 'Elena Trajkovska', email: 'elena.trajkovska@tav.com.mk', role: 'Staff', lastLogin: '2026-01-10 16:45', status: 'inactive' },
  { id: '5', name: 'Bujar Ahmeti', email: 'bujar.ahmeti@tav.com.mk', role: 'Staff', lastLogin: '2026-01-13 07:15', status: 'active' },
];

const roleColors: Record<string, string> = {
  'Administrator': 'bg-chart-5/15 text-chart-5 border-chart-5/30',
  'Operations Manager': 'bg-chart-1/15 text-chart-1 border-chart-1/30',
  'Supervisor': 'bg-chart-2/15 text-chart-2 border-chart-2/30',
  'Staff': 'bg-muted text-muted-foreground border-border',
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
      {/* Page Header */}
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

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={t.common.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredUsers.length} users
      </p>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
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
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{user.email}</td>
                  <td>
                    <Badge variant="outline" className={cn('w-fit', roleColors[user.role])}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="text-sm text-muted-foreground">{user.lastLogin}</td>
                  <td>
                    <Badge
                      variant="outline"
                      className={cn(
                        'w-fit',
                        user.status === 'active' ? 'badge-success' : 'bg-muted text-muted-foreground border-border'
                      )}
                    >
                      {user.status === 'active' ? t.common.active : t.common.inactive}
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
