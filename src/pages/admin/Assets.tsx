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
import { Plus, Search, Filter, Package, MapPin, Calendar, DollarSign, Wrench } from 'lucide-react';
import { assets } from '@/data/adminData';
import { cn } from '@/lib/utils';

const Assets: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return 'badge-success';
      case 'maintenance':
        return 'badge-warning';
      case 'retired':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'operational':
        return t.admin.assets.operational;
      case 'maintenance':
        return t.admin.assets.maintenance;
      case 'retired':
        return t.admin.assets.retired;
      default:
        return status;
    }
  };

  const categories = Array.from(new Set(assets.map(a => a.category)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.admin.assets.title}</h1>
          <p className="page-description">{t.admin.assets.subtitle}</p>
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
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.admin.assets.category} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder={t.common.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="operational">{t.admin.assets.operational}</SelectItem>
            <SelectItem value="maintenance">{t.admin.assets.maintenance}</SelectItem>
            <SelectItem value="retired">{t.admin.assets.retired}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredAssets.length} {t.admin.assets.assetName.toLowerCase()}
      </p>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.admin.assets.assetId}</th>
                <th>{t.admin.assets.assetName}</th>
                <th>{t.admin.assets.category}</th>
                <th>{t.admin.assets.location}</th>
                <th>{t.common.status}</th>
                <th>{t.admin.assets.value}</th>
                <th>{t.admin.assets.maintenanceDue}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr
                  key={asset.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td>
                    <code className="px-2 py-1 rounded bg-muted text-sm font-medium">
                      {asset.assetId}
                    </code>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{asset.assetName}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{asset.category}</td>
                  <td>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{asset.location}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant="outline" className={cn('w-fit text-xs', getStatusBadge(asset.status))}>
                      {getStatusLabel(asset.status)}
                    </Badge>
                  </td>
                  <td className="font-medium">€{asset.value.toLocaleString()}</td>
                  <td>
                    {asset.maintenanceDue ? (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{asset.maintenanceDue}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
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

export default Assets;

