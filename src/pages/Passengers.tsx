import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { passengers } from '@/data/mockData';
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
import { Plus, Search, Filter, Download, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const statusConfig = {
  'checked-in': { label: { en: 'Checked In', mk: 'Пријавен', sq: 'I regjistruar' }, className: 'badge-success' },
  'boarded': { label: { en: 'Boarded', mk: 'Укрцан', sq: 'I hipur' }, className: 'bg-accent/15 text-accent border-accent/30' },
  'pending': { label: { en: 'Pending', mk: 'Во тек', sq: 'Në pritje' }, className: 'badge-warning' },
};

const Passengers: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPassengers = passengers.filter((passenger) => {
    const matchesSearch =
      passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.passport.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || passenger.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.passengers.title}</h1>
          <p className="page-description">{t.passengers.subtitle}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t.common.add}
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.common.filter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="checked-in">{t.passengers.checkedIn}</SelectItem>
            <SelectItem value="boarded">{t.passengers.boarded}</SelectItem>
            <SelectItem value="pending">{t.common.pending}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          {t.common.export}
        </Button>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredPassengers.length} {t.nav.passengers.toLowerCase()}
      </p>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.common.name}</th>
                <th>{t.passengers.bookingRef}</th>
                <th>{t.flights.flightNumber}</th>
                <th>{t.passengers.seatNumber}</th>
                <th>{t.passengers.class}</th>
                <th>{t.common.status}</th>
                <th className="text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredPassengers.map((passenger, index) => {
                const status = statusConfig[passenger.status];

                return (
                  <tr
                    key={passenger.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {passenger.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{passenger.name}</p>
                          <p className="text-xs text-muted-foreground">{passenger.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <code className="px-2 py-1 rounded bg-muted text-sm">{passenger.bookingRef}</code>
                    </td>
                    <td className="font-medium">{passenger.flightNumber}</td>
                    <td>
                      <span className="inline-flex items-center justify-center w-10 h-7 rounded bg-muted text-sm font-medium">
                        {passenger.seatNumber}
                      </span>
                    </td>
                    <td>{passenger.class}</td>
                    <td>
                      <Badge variant="outline" className={cn('w-fit', status.className)}>
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

export default Passengers;
