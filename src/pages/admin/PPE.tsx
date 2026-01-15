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
import { Plus, Search, Filter, Shield, AlertTriangle, CheckCircle2, XCircle, Calendar, User } from 'lucide-react';
import { ppeItems } from '@/data/adminData';
import { cn } from '@/lib/utils';

const PPE: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredPPE = ppeItems.filter((item) => {
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const expiredCount = ppeItems.filter(i => i.status === 'expired').length;
  const expiringSoonCount = ppeItems.filter(i => i.status === 'expiringSoon').length;
  const validCount = ppeItems.filter(i => i.status === 'valid').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'expired':
        return 'badge-destructive';
      case 'expiringSoon':
        return 'badge-warning';
      case 'valid':
        return 'badge-success';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'expired':
        return t.admin.ppe.expired;
      case 'expiringSoon':
        return t.admin.ppe.expiringSoon;
      case 'valid':
        return t.admin.ppe.valid;
      default:
        return status;
    }
  };

  const types = Array.from(new Set(ppeItems.map(i => i.type)));

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.admin.ppe.title}</h1>
          <p className="page-description">{t.admin.ppe.subtitle}</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t.common.add}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-destructive/30 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.admin.ppe.expiredItems}</p>
              <p className="text-2xl font-bold text-destructive">{expiredCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-warning/30 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.admin.ppe.expiringItems}</p>
              <p className="text-2xl font-bold text-warning">{expiringSoonCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-success/30 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.admin.ppe.validItems}</p>
              <p className="text-2xl font-bold text-success">{validCount}</p>
            </div>
          </div>
        </div>
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
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.admin.ppe.type} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder={t.common.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="expired">{t.admin.ppe.expired}</SelectItem>
            <SelectItem value="expiringSoon">{t.admin.ppe.expiringSoon}</SelectItem>
            <SelectItem value="valid">{t.admin.ppe.valid}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredPPE.length} {t.admin.ppe.itemName.toLowerCase()}
      </p>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.admin.ppe.itemId}</th>
                <th>{t.admin.ppe.itemName}</th>
                <th>{t.admin.ppe.type}</th>
                <th>{t.admin.ppe.assignedTo}</th>
                <th>{t.admin.ppe.issueDate}</th>
                <th>{t.admin.ppe.expiryDate}</th>
                <th>{t.admin.ppe.daysUntilExpiry}</th>
                <th>{t.common.status}</th>
              </tr>
            </thead>
            <tbody>
              {filteredPPE.map((item, index) => (
                <tr
                  key={item.id}
                  className={cn(
                    "animate-fade-in",
                    item.status === 'expired' && "bg-destructive/5",
                    item.status === 'expiringSoon' && "bg-warning/5"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td>
                    <code className="px-2 py-1 rounded bg-muted text-sm font-medium">
                      {item.itemId}
                    </code>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{item.itemName}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{item.type}</td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{item.assignedTo}</span>
                    </div>
                  </td>
                  <td className="text-sm">{item.issueDate}</td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <Calendar className={cn(
                        "w-3.5 h-3.5",
                        item.status === 'expired' && "text-destructive",
                        item.status === 'expiringSoon' && "text-warning",
                        item.status === 'valid' && "text-muted-foreground"
                      )} />
                      <span className={cn(
                        item.status === 'expired' && "text-destructive font-medium",
                        item.status === 'expiringSoon' && "text-warning font-medium"
                      )}>
                        {item.expiryDate}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={cn(
                      "font-medium",
                      item.daysUntilExpiry < 0 && "text-destructive",
                      item.daysUntilExpiry >= 0 && item.daysUntilExpiry <= 30 && "text-warning",
                      item.daysUntilExpiry > 30 && "text-success"
                    )}>
                      {item.daysUntilExpiry < 0 
                        ? `${Math.abs(item.daysUntilExpiry)} ${t.admin.ppe.expired.toLowerCase()}`
                        : `${item.daysUntilExpiry} ${t.common.date.toLowerCase()}`
                      }
                    </span>
                  </td>
                  <td>
                    <Badge variant="outline" className={cn('w-fit text-xs', getStatusBadge(item.status))}>
                      {getStatusLabel(item.status)}
                    </Badge>
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

export default PPE;

