import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flight } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Plane, Clock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface FlightTableProps {
  flights: Flight[];
  limit?: number;
}

const statusConfig = {
  'on-time': {
    label: { en: 'On Time', mk: 'На време', sq: 'Në kohë' },
    icon: CheckCircle2,
    className: 'badge-success',
  },
  'delayed': {
    label: { en: 'Delayed', mk: 'Задоцнет', sq: 'I vonuar' },
    icon: Clock,
    className: 'badge-warning',
  },
  'cancelled': {
    label: { en: 'Cancelled', mk: 'Откажан', sq: 'I anuluar' },
    icon: XCircle,
    className: 'badge-destructive',
  },
  'boarding': {
    label: { en: 'Boarding', mk: 'Укрцување', sq: 'Duke hipur' },
    icon: Plane,
    className: 'bg-accent/15 text-accent border-accent/30',
  },
  'landed': {
    label: { en: 'Landed', mk: 'Слетан', sq: 'Zbritur' },
    icon: CheckCircle2,
    className: 'badge-success',
  },
};

const FlightTable: React.FC<FlightTableProps> = ({ flights, limit }) => {
  const { t, language } = useLanguage();
  const displayFlights = limit ? flights.slice(0, limit) : flights;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t.flights.flightNumber}</th>
              <th>{t.flights.destination}</th>
              <th>{t.flights.departure}</th>
              <th>{t.flights.gate}</th>
              <th>{t.common.status}</th>
            </tr>
          </thead>
          <tbody>
            {displayFlights.map((flight, index) => {
              const status = statusConfig[flight.status];
              const StatusIcon = status.icon;

              return (
                <tr
                  key={flight.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{flight.flightNumber}</span>
                      <span className="text-xs text-muted-foreground">
                        {flight.airline}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-muted-foreground" />
                      <span>{flight.destination}</span>
                    </div>
                  </td>
                  <td className="font-medium">{flight.departure}</td>
                  <td>
                    <span className="inline-flex items-center justify-center w-10 h-7 rounded bg-muted text-sm font-medium">
                      {flight.gate}
                    </span>
                  </td>
                  <td>
                    <Badge
                      variant="outline"
                      className={cn('flex items-center gap-1.5 w-fit', status.className)}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label[language]}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightTable;
