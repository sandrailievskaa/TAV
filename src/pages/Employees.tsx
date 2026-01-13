import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, Download, MoreHorizontal, Eye, Edit, Mail, Phone } from 'lucide-react';
import { employees, workPositions } from '@/data/ohsData';
import { cn } from '@/lib/utils';

const Employees: React.FC = () => {
  const { t, language } = useLanguage();

  const getPosition = (positionId: string) => {
    return workPositions.find(p => p.id === positionId);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      'employed': 'bg-success/15 text-success border-success/30',
      'candidate': 'bg-warning/15 text-warning border-warning/30',
      'on-leave': 'bg-primary/15 text-primary border-primary/30',
      'terminated': 'bg-destructive/15 text-destructive border-destructive/30',
    };
    const labels = {
      'employed': t.employees.employed,
      'candidate': t.employees.candidate,
      'on-leave': t.employees.onLeave,
      'terminated': t.employees.terminated,
    };
    return (
      <Badge variant="outline" className={styles[status as keyof typeof styles]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.employees.title}</h1>
        <p className="page-description">{t.employees.subtitle}</p>
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
                <TableHead>{t.employees.employeeId}</TableHead>
                <TableHead>{t.employees.fullName}</TableHead>
                <TableHead>{t.employees.position}</TableHead>
                <TableHead>{t.employees.department}</TableHead>
                <TableHead>{t.common.email}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className="w-[100px]">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => {
                const position = getPosition(emp.positionId);
                return (
                  <TableRow key={emp.id}>
                    <TableCell className="font-medium">{emp.employeeId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                          {emp.firstName[0]}{emp.lastName[0]}
                        </div>
                        <span>{emp.firstName} {emp.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{position?.name[language] || '-'}</TableCell>
                    <TableCell>{emp.department[language]}</TableCell>
                    <TableCell className="text-muted-foreground">{emp.email}</TableCell>
                    <TableCell>{getStatusBadge(emp.status)}</TableCell>
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

export default Employees;
