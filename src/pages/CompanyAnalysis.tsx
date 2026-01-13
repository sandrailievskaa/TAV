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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Filter,
  Download,
  Building,
  MapPin,
  TrendingUp,
  Users,
  Mail,
  Phone,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Demo data for companies
const demoCompanies = [
  {
    id: '1',
    name: 'АД Македонски Телеком',
    sector: 'Телекомуникации',
    location: 'Скопје',
    employees: 2500,
    email: 'info@telekom.mk',
    phone: '+389 2 123 456',
    activityIndex: 95,
    status: 'high-activity',
    lastContact: '2025-01-10',
    segment: 'Enterprise',
  },
  {
    id: '2',
    name: 'АД Кока-Кола Ботелинг Македонија',
    sector: 'Производство',
    location: 'Скопје',
    employees: 450,
    email: 'contact@coca-cola.mk',
    phone: '+389 2 234 567',
    activityIndex: 78,
    status: 'medium-activity',
    lastContact: '2025-01-05',
    segment: 'Mid-Market',
  },
  {
    id: '3',
    name: 'АД ЕВН Македонија',
    sector: 'Енергетика',
    location: 'Скопје',
    employees: 1200,
    email: 'info@evn.mk',
    phone: '+389 2 345 678',
    activityIndex: 82,
    status: 'medium-activity',
    lastContact: '2025-01-08',
    segment: 'Enterprise',
  },
  {
    id: '4',
    name: 'АД Халк Банка',
    sector: 'Банкарство',
    location: 'Скопје',
    employees: 800,
    email: 'info@halkbank.mk',
    phone: '+389 2 456 789',
    activityIndex: 88,
    status: 'high-activity',
    lastContact: '2025-01-12',
    segment: 'Enterprise',
  },
  {
    id: '5',
    name: 'АД Македонска Пошта',
    sector: 'Логистика',
    location: 'Скопје',
    employees: 3200,
    email: 'info@posta.com.mk',
    phone: '+389 2 567 890',
    activityIndex: 65,
    status: 'low-activity',
    lastContact: '2024-12-15',
    segment: 'Enterprise',
  },
  {
    id: '6',
    name: 'АД МТЕЛ',
    sector: 'Телекомуникации',
    location: 'Скопје',
    employees: 1800,
    email: 'info@mtel.mk',
    phone: '+389 2 678 901',
    activityIndex: 72,
    status: 'medium-activity',
    lastContact: '2024-12-20',
    segment: 'Mid-Market',
  },
  {
    id: '7',
    name: 'АД Македонија Тутун',
    sector: 'Производство',
    location: 'Прилеп',
    employees: 950,
    email: 'info@tutun.com.mk',
    phone: '+389 48 123 456',
    activityIndex: 58,
    status: 'low-activity',
    lastContact: '2024-11-28',
    segment: 'Mid-Market',
  },
  {
    id: '8',
    name: 'АД Охридско Езеро',
    sector: 'Туризам',
    location: 'Охрид',
    employees: 320,
    email: 'info@ohridlake.mk',
    phone: '+389 46 234 567',
    activityIndex: 45,
    status: 'low-activity',
    lastContact: '2024-10-15',
    segment: 'SMB',
  },
];

const CompanyAnalysis: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [segmentFilter, setSegmentFilter] = useState('all');

  const filteredCompanies = demoCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
    const matchesLocation = locationFilter === 'all' || company.location === locationFilter;
    const matchesSegment = segmentFilter === 'all' || company.segment === segmentFilter;

    return matchesSearch && matchesSector && matchesLocation && matchesSegment;
  });

  const getActivityBadge = (index: number) => {
    if (index >= 80) return { label: 'Висока активност', className: 'badge-success' };
    if (index >= 60) return { label: 'Средна активност', className: 'badge-warning' };
    return { label: 'Ниска активност', className: 'badge-danger' };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US'
    );
  };

  const sectors = Array.from(new Set(demoCompanies.map(c => c.sector)));
  const locations = Array.from(new Set(demoCompanies.map(c => c.location)));
  const segments = Array.from(new Set(demoCompanies.map(c => c.segment)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <Badge variant="outline" className="badge-warning">ДЕМО</Badge>
          </div>
          <h1 className="page-title">
            {language === 'mk' 
              ? 'Интелигентен систем за анализа на компании'
              : language === 'sq'
              ? 'Sistemi inteligjent për analizën e kompanive'
              : 'Intelligent Company Analysis System'}
          </h1>
          <p className="page-description">
            {language === 'mk'
              ? 'Демонстрациски модул за анализа и сегментација на македонски компании базиран на отворени податоци'
              : language === 'sq'
              ? 'Modul demonstrativ për analizën dhe segmentimin e kompanive maqedonase bazuar në të dhëna të hapura'
              : 'Demo module for analysis and segmentation of Macedonian companies based on open data'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t.common.export}
          </Button>
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            {language === 'mk' ? 'AI Анализа' : language === 'sq' ? 'Analiza AI' : 'AI Analysis'}
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium">
                {language === 'mk'
                  ? 'Демонстрациски модул'
                  : language === 'sq'
                  ? 'Modul demonstrativ'
                  : 'Demo Module'}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === 'mk'
                  ? 'Овој модул е демонстрација на како платформата може да се прошири со AI-водени бизнис модули. Може подоцна да се реупотреби или интегрира (на пр. Laravel-базирана имплементација).'
                  : language === 'sq'
                  ? 'Ky modul është një demonstrim se si platforma mund të zgjerohet me module biznesi të drejtuara nga AI. Mund të ripërdoret ose të integrohet më vonë (p.sh. implementim i bazuar në Laravel).'
                  : 'This module is a demonstration of how the platform can be extended with AI-driven business modules. Can be reused or integrated later (e.g. Laravel-based implementation).'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Building className="w-4 h-4" />
              {language === 'mk' ? 'Вкупно компании' : language === 'sq' ? 'Kompani Totale' : 'Total Companies'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoCompanies.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {language === 'mk' ? 'Просечен индекс' : language === 'sq' ? 'Indeksi Mesatar' : 'Average Index'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(demoCompanies.reduce((sum, c) => sum + c.activityIndex, 0) / demoCompanies.length)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              {language === 'mk' ? 'Вкупно вработени' : language === 'sq' ? 'Punonjës Total' : 'Total Employees'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {demoCompanies.reduce((sum, c) => sum + c.employees, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {language === 'mk' ? 'Локации' : language === 'sq' ? 'Vendndodhje' : 'Locations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
          </CardContent>
        </Card>
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
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={language === 'mk' ? 'Сектор' : language === 'sq' ? 'Sektor' : 'Sector'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={language === 'mk' ? 'Локација' : language === 'sq' ? 'Vendndodhja' : 'Location'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={segmentFilter} onValueChange={setSegmentFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={language === 'mk' ? 'Сегмент' : language === 'sq' ? 'Segment' : 'Segment'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            {segments.map((segment) => (
              <SelectItem key={segment} value={segment}>{segment}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredCompanies.length} {language === 'mk' ? 'компании' : language === 'sq' ? 'kompani' : 'companies'}
      </p>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'mk' ? 'Име на компанија' : language === 'sq' ? 'Emri i Kompanisë' : 'Company Name'}</TableHead>
                <TableHead>{language === 'mk' ? 'Сектор' : language === 'sq' ? 'Sektor' : 'Sector'}</TableHead>
                <TableHead>{language === 'mk' ? 'Локација' : language === 'sq' ? 'Vendndodhja' : 'Location'}</TableHead>
                <TableHead>{language === 'mk' ? 'Вработени' : language === 'sq' ? 'Punonjës' : 'Employees'}</TableHead>
                <TableHead>{language === 'mk' ? 'Индекс на активност' : language === 'sq' ? 'Indeksi i Aktivitetit' : 'Activity Index'}</TableHead>
                <TableHead>{language === 'mk' ? 'Сегмент' : language === 'sq' ? 'Segment' : 'Segment'}</TableHead>
                <TableHead>{language === 'mk' ? 'Последен контакт' : language === 'sq' ? 'Kontakti i Fundit' : 'Last Contact'}</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {t.common.noResults}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((company) => {
                  const activity = getActivityBadge(company.activityIndex);
                  return (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.sector}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          {company.location}
                        </div>
                      </TableCell>
                      <TableCell>{company.employees.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={activity.className}>
                            {activity.label}
                          </Badge>
                          <span className="text-sm text-muted-foreground">({company.activityIndex})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{company.segment}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(company.lastContact)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalysis;

