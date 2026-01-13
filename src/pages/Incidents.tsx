import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, Download, Eye, Edit, AlertTriangle } from 'lucide-react';
import { incidents, locations, employees } from '@/data/ohsData';

const Incidents: React.FC = () => {
  const { t, language } = useLanguage();

  const getLocation = (id: string) => locations.find(l => l.id === id);

  const getTypeBadge = (type: string) => {
    const styles = { 'injury': 'bg-destructive/15 text-destructive', 'near-miss': 'bg-warning/15 text-warning', 'property-damage': 'bg-primary/15 text-primary', 'environmental': 'bg-accent/15 text-accent-foreground' };
    const labels = { 'injury': t.incidents.injury, 'near-miss': t.incidents.nearMiss, 'property-damage': t.incidents.propertyDamage, 'environmental': t.incidents.environmentalIncident };
    return <Badge variant="outline" className={styles[type as keyof typeof styles]}>{labels[type as keyof typeof labels]}</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    const styles = { 'minor': 'bg-success/15 text-success', 'moderate': 'bg-warning/15 text-warning', 'serious': 'bg-destructive/15 text-destructive', 'critical': 'bg-destructive text-destructive-foreground' };
    const labels = { 'minor': t.incidents.minor, 'moderate': t.incidents.moderate, 'serious': t.incidents.serious, 'critical': t.incidents.critical };
    return <Badge variant="outline" className={styles[severity as keyof typeof styles]}>{labels[severity as keyof typeof labels]}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const styles = { 'open': 'bg-warning/15 text-warning', 'investigating': 'bg-primary/15 text-primary', 'resolved': 'bg-success/15 text-success', 'closed': 'bg-muted text-muted-foreground' };
    const labels = { 'open': t.statuses.open, 'investigating': t.statuses.investigating, 'resolved': t.statuses.resolved, 'closed': t.statuses.closed };
    return <Badge variant="outline" className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.incidents.title}</h1>
        <p className="page-description">{t.incidents.subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t.common.search} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />{t.common.filter}</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />{t.common.export}</Button>
          <Button><AlertTriangle className="w-4 h-4 mr-2" />{t.incidents.reportIncident}</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{t.incidents.incidentType}</TableHead>
                <TableHead>{t.incidents.incidentDate}</TableHead>
                <TableHead>{t.incidents.location}</TableHead>
                <TableHead>{t.incidents.severity}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className="w-[100px]">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((inc) => {
                const location = getLocation(inc.locationId);
                return (
                  <TableRow key={inc.id}>
                    <TableCell className="font-medium">INC-{inc.id.split('-')[1]}</TableCell>
                    <TableCell>{getTypeBadge(inc.type)}</TableCell>
                    <TableCell>{inc.date}</TableCell>
                    <TableCell>{location?.name[language] || '-'}</TableCell>
                    <TableCell>{getSeverityBadge(inc.severity)}</TableCell>
                    <TableCell>{getStatusBadge(inc.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Incidents;
