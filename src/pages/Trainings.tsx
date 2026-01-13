import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, Download, Eye, Edit, FileText } from 'lucide-react';
import { employeeTrainings, trainingTypes, employees } from '@/data/ohsData';

const Trainings: React.FC = () => {
  const { t, language } = useLanguage();

  const getTrainingType = (id: string) => trainingTypes.find(tt => tt.id === id);
  const getEmployee = (id: string) => employees.find(e => e.id === id);

  const getStatusBadge = (status: string) => {
    const styles = {
      'valid': 'bg-success/15 text-success',
      'expiring-soon': 'bg-warning/15 text-warning',
      'expired': 'bg-destructive/15 text-destructive',
    };
    const labels = {
      'valid': t.common.valid,
      'expiring-soon': t.common.expiringSoon,
      'expired': t.common.expired,
    };
    return <Badge variant="outline" className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.trainings.title}</h1>
        <p className="page-description">{t.trainings.subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t.common.search} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />{t.common.filter}</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />{t.common.export}</Button>
          <Button><Plus className="w-4 h-4 mr-2" />{t.common.add}</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.common.name}</TableHead>
                <TableHead>{t.trainings.trainingName}</TableHead>
                <TableHead>{t.trainings.trainingType}</TableHead>
                <TableHead>{t.trainings.completionDate || 'Completed'}</TableHead>
                <TableHead>{t.trainings.expiryDate}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className="w-[100px]">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeTrainings.map((et) => {
                const training = getTrainingType(et.trainingTypeId);
                const employee = getEmployee(et.employeeId);
                if (!training || !employee) return null;
                return (
                  <TableRow key={et.id}>
                    <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                    <TableCell className="font-medium">{training.name[language]}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{training.type === 'internal' ? t.trainings.internal : t.trainings.external}</Badge>
                    </TableCell>
                    <TableCell>{et.completionDate}</TableCell>
                    <TableCell>{et.expiryDate}</TableCell>
                    <TableCell>{getStatusBadge(et.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><FileText className="w-4 h-4" /></Button>
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

export default Trainings;
