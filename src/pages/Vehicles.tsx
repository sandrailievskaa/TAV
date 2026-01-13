import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { vehicles } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, Download, MoreHorizontal, Eye, Edit, Trash2, Fuel, Wrench } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const statusConfig = {
  'active': { label: { en: 'Active', mk: 'Активно', sq: 'Aktiv' }, className: 'badge-success' },
  'maintenance': { label: { en: 'Maintenance', mk: 'Сервис', sq: 'Mirëmbajtje' }, className: 'badge-warning' },
  'idle': { label: { en: 'Idle', mk: 'Неактивно', sq: 'Joaktiv' }, className: 'bg-muted text-muted-foreground border-border' },
};

const Vehicles: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getFuelColor = (level: number) => {
    if (level >= 70) return 'bg-success';
    if (level >= 40) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.vehicles.title}</h1>
          <p className="page-description">{t.vehicles.subtitle}</p>
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
            <SelectItem value="active">{t.common.active}</SelectItem>
            <SelectItem value="maintenance">{t.vehicles.maintenance}</SelectItem>
            <SelectItem value="idle">{t.vehicles.idle}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          {t.common.export}
        </Button>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredVehicles.length} {t.nav.vehicles.toLowerCase()}
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle, index) => {
          const status = statusConfig[vehicle.status];

          return (
            <div
              key={vehicle.id}
              className="bg-card rounded-lg border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <code className="px-2 py-0.5 rounded bg-muted text-sm font-medium">
                      {vehicle.vehicleId}
                    </code>
                    <Badge variant="outline" className={cn('w-fit text-xs', status.className)}>
                      {status.label[language]}
                    </Badge>
                  </div>
                  <h3 className="font-semibold">{(() => {
                    const typeMap: Record<string, keyof typeof t.vehicles.types> = {
                      'Baggage Tractor': 'baggageTractor',
                      'Passenger Bus': 'passengerBus',
                      'Fuel Truck': 'fuelTruck',
                      'Catering Truck': 'cateringTruck',
                      'De-icing Vehicle': 'deicingVehicle',
                    };
                    return t.vehicles.types[typeMap[vehicle.type]] || vehicle.type;
                  })()}</h3>
                </div>
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

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.vehicles.licensePlate}</span>
                  <span className="font-medium">{vehicle.licensePlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.vehicles.location}</span>
                  <span>{(() => {
                    const locMap: Record<string, keyof typeof t.vehicles.locations> = {
                      'Apron A': 'apronA',
                      'Terminal 1': 'terminal1',
                      'Fuel Depot': 'fuelDepot',
                      'Gate B5': 'gateB5',
                      'Hangar 2': 'hangar2',
                    };
                    return t.vehicles.locations[locMap[vehicle.location]] || vehicle.location;
                  })()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.vehicles.assigned}</span>
                  <span>{(() => {
                    const assignMap: Record<string, keyof typeof t.vehicles.assignments> = {
                      'Ground Handling': 'groundHandling',
                      'Passenger Services': 'passengerServices',
                      'Fuel Services': 'fuelServices',
                      'Catering': 'catering',
                      'Winter Operations': 'winterOperations',
                    };
                    return t.vehicles.assignments[assignMap[vehicle.assignedTo]] || vehicle.assignedTo;
                  })()}</span>
                </div>

                {/* Fuel Level */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{t.vehicles.fuelLevel}</span>
                    </div>
                    <span className="font-medium">{vehicle.fuelLevel}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', getFuelColor(vehicle.fuelLevel))}
                      style={{ width: `${vehicle.fuelLevel}%` }}
                    />
                  </div>
                </div>

                {/* Service Info */}
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>{t.vehicles.nextService}: {vehicle.nextService}</span>
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

export default Vehicles;
