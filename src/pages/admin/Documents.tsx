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
import { Plus, Search, Filter, FileText, Download, Calendar, User, FileCheck, AlertCircle } from 'lucide-react';
import { documents } from '@/data/adminData';
import { cn } from '@/lib/utils';

const Documents: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'law':
        return 'bg-chart-5/15 text-chart-5 border-chart-5/30';
      case 'procedure':
        return 'bg-chart-1/15 text-chart-1 border-chart-1/30';
      case 'instruction':
        return 'bg-chart-2/15 text-chart-2 border-chart-2/30';
      case 'policy':
        return 'bg-chart-3/15 text-chart-3 border-chart-3/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'law':
        return t.admin.documents.law;
      case 'procedure':
        return t.admin.documents.procedure;
      case 'instruction':
        return t.admin.documents.instruction;
      case 'policy':
        return t.admin.documents.policy;
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'expired':
        return 'badge-destructive';
      case 'draft':
        return 'badge-warning';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return t.admin.documents.active;
      case 'expired':
        return t.admin.documents.expired;
      case 'draft':
        return t.admin.documents.draft;
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.admin.documents.title}</h1>
          <p className="page-description">{t.admin.documents.subtitle}</p>
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
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.admin.documents.type} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="law">{t.admin.documents.law}</SelectItem>
            <SelectItem value="procedure">{t.admin.documents.procedure}</SelectItem>
            <SelectItem value="instruction">{t.admin.documents.instruction}</SelectItem>
            <SelectItem value="policy">{t.admin.documents.policy}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder={t.common.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="active">{t.admin.documents.active}</SelectItem>
            <SelectItem value="expired">{t.admin.documents.expired}</SelectItem>
            <SelectItem value="draft">{t.admin.documents.draft}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredDocuments.length} {t.admin.documents.title.toLowerCase()}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc, index) => (
          <div
            key={doc.id}
            className="bg-card rounded-lg border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all animate-fade-in"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{doc.title}</h3>
                  <p className="text-xs text-muted-foreground">{doc.documentId}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={cn('w-fit text-xs', getTypeBadge(doc.type))}>
                  {getTypeLabel(doc.type)}
                </Badge>
                <Badge variant="outline" className={cn('w-fit text-xs', getStatusBadge(doc.status))}>
                  {getStatusLabel(doc.status)}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.admin.documents.version}</span>
                  <span className="font-medium">{doc.version}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.admin.documents.category}</span>
                  <span>{doc.category}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">
                    {t.admin.documents.effectiveDate}: {doc.effectiveDate}
                  </span>
                </div>
                {doc.expiryDate && (
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs">
                      {t.admin.documents.expiryDate}: {doc.expiryDate}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">{doc.author}</span>
                </div>
                {doc.fileSize && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{doc.fileSize}</span>
                    {doc.pages && <span>{doc.pages} {t.common.all.toLowerCase()}</span>}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {t.admin.documents.lastUpdated}: {doc.lastUpdated}
                </span>
                <Button variant="outline" size="sm">
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  {t.reports.download}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;

