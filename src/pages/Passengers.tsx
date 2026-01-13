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
import { Plus, Search, Filter, Download, MoreHorizontal, Eye, Edit, Trash2, User, Plane, Calendar, Mail, Phone } from 'lucide-react';
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
      <div className="bg-gradient-to-br from-card to-card/95 rounded-lg border-2 border-border/50 overflow-hidden shadow-lg">
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
                    className="animate-fade-in hover:scale-[1.01] transition-transform duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{passenger.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {passenger.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <code className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-muted/80 to-muted/60 text-sm font-semibold border border-border/50 shadow-sm">{passenger.bookingRef}</code>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{passenger.flightNumber}</span>
                      </div>
                    </td>
                    <td>
                      <span className="inline-flex items-center justify-center w-12 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-bold text-primary border-2 border-primary/30 shadow-sm">
                        {passenger.seatNumber}
                      </span>
                    </td>
                    <td>
                      <span className="font-medium">{t.data.classes[passenger.class.toLowerCase() as keyof typeof t.data.classes] || passenger.class}</span>
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

export default Passengers;
