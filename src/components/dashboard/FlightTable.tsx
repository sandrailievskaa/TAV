import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Flight } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ViewToggle, ViewMode } from '@/components/ui/view-toggle';
import { cn } from '@/lib/utils';
import { Plane, Clock, AlertTriangle, CheckCircle2, XCircle, MapPin, Calendar, Users } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const displayFlights = limit ? flights.slice(0, limit) : flights;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
          {t.dashboard.upcomingDepartures}
        </h3>
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {viewMode === 'table' ? (
        <div className="bg-gradient-to-br from-card to-card/95 rounded-lg border-2 border-border/50 overflow-hidden shadow-lg">
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
                      className="animate-fade-in hover:scale-[1.01] transition-transform duration-200"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                            <Plane className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-semibold text-foreground">{flight.flightNumber}</span>
                            <span className="text-xs text-muted-foreground block">
                              {flight.airline}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span className="font-medium">{flight.destination}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">{flight.departure}</span>
                        </div>
                      </td>
                      <td>
                        <span className="inline-flex items-center justify-center w-12 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-bold text-primary border-2 border-primary/30 shadow-sm">
                          {flight.gate}
                        </span>
                      </td>
                      <td>
                        <Badge
                          variant="outline"
                          className={cn('flex items-center gap-1.5 w-fit shadow-sm', status.className)}
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayFlights.map((flight, index) => {
            const status = statusConfig[flight.status];
            const StatusIcon = status.icon;

            return (
              <Card
                key={flight.id}
                className="border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-md">
                          <Plane className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-foreground">{flight.flightNumber}</h4>
                          <p className="text-xs text-muted-foreground">{flight.airline}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn('flex items-center gap-1 shadow-sm', status.className)}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {status.label[language]}
                      </Badge>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="font-medium">{flight.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">{flight.departure}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-semibold">{flight.arrival}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                            <span className="text-xs font-bold text-primary">Gate {flight.gate}</span>
                          </div>
                          <div className="px-3 py-1.5 rounded-lg bg-muted/50">
                            <span className="text-xs font-medium">{flight.terminal}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3.5 h-3.5" />
                          <span>{flight.passengers}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FlightTable;
