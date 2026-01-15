import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import FlightTable from '@/components/dashboard/FlightTable';
import { flights } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, Download } from 'lucide-react';

const Flights: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.airline.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || flight.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.flights.title}</h1>
          <p className="page-description">{t.flights.subtitle}</p>
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
            <SelectItem value="on-time">{t.flights.onTime}</SelectItem>
            <SelectItem value="delayed">{t.flights.delayed}</SelectItem>
            <SelectItem value="boarding">{t.flights.boarding}</SelectItem>
            <SelectItem value="cancelled">{t.flights.cancelled}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          {t.common.export}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredFlights.length} {t.nav.flights.toLowerCase()}
      </p>

      <FlightTable flights={filteredFlights} />
    </div>
  );
};

export default Flights;
