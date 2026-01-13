import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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
import { Plus, Search, Filter, Building2, Plane, Wrench, MapPin, Users, DoorOpen, Layers } from 'lucide-react';
import { organizationStructures } from '@/data/adminData';
import { cn } from '@/lib/utils';

const Organization: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredStructures = organizationStructures.filter((structure) => {
    const matchesSearch =
      structure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      structure.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      structure.manager.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || structure.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || structure.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'terminal':
        return Building2;
      case 'hangar':
        return Plane;
      case 'facility':
        return Wrench;
      default:
        return Building2;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return 'badge-success';
      case 'maintenance':
        return 'badge-warning';
      case 'closed':
        return 'badge-destructive';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.admin.organization.title}</h1>
          <p className="page-description">{t.admin.organization.subtitle}</p>
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
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.common.filter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="terminal">{t.admin.organization.terminal}</SelectItem>
            <SelectItem value="hangar">{t.admin.organization.hangar}</SelectItem>
            <SelectItem value="facility">{t.admin.organization.facility}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder={t.common.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="operational">{t.common.active}</SelectItem>
            <SelectItem value="maintenance">{t.vehicles.maintenance}</SelectItem>
            <SelectItem value="closed">{t.common.inactive}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredStructures.length} {t.admin.organization.facility.toLowerCase()}
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStructures.map((structure, index) => {
          const Icon = getTypeIcon(structure.type);
          
          return (
            <div
              key={structure.id}
              className="bg-card rounded-lg border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{structure.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{structure.type}</p>
                  </div>
                </div>
                <Badge variant="outline" className={cn('w-fit text-xs', getStatusBadge(structure.status))}>
                  {structure.status === 'operational' ? t.common.active : 
                   structure.status === 'maintenance' ? t.vehicles.maintenance : 
                   t.common.inactive}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{structure.location}</span>
                </div>
                
                {structure.capacity && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{t.admin.organization.capacity}: {structure.capacity.toLocaleString()}</span>
                  </div>
                )}

                {structure.gates && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DoorOpen className="w-4 h-4" />
                    <span>{t.admin.organization.gates}: {structure.gates}</span>
                  </div>
                )}

                {structure.floors && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="w-4 h-4" />
                    <span>{t.admin.organization.floors}: {structure.floors}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">{t.admin.organization.manager}</p>
                  <p className="font-medium">{structure.manager}</p>
                </div>

                {structure.description && (
                  <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                    {structure.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Organization;

