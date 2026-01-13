import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, Download, Eye, Edit, HardHat } from 'lucide-react';
import { employeePPE, ppeTypes, employees } from '@/data/ohsData';

const Equipment: React.FC = () => {
  const { t, language } = useLanguage();

  const getPPEType = (id: string) => ppeTypes.find(p => p.id === id);
  const getEmployee = (id: string) => employees.find(e => e.id === id);

  const getStatusBadge = (status: string) => {
    const styles = { 'assigned': 'bg-success/15 text-success', 'returned': 'bg-muted text-muted-foreground', 'expired': 'bg-destructive/15 text-destructive', 'expiring-soon': 'bg-warning/15 text-warning' };
    const labels = { 'assigned': t.common.active, 'returned': language === 'mk' ? 'Вратено' : language === 'sq' ? 'Kthyer' : 'Returned', 'expired': t.common.expired, 'expiring-soon': t.common.expiringSoon };
    return <Badge variant="outline" className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</Badge>;
  };

  const getConditionBadge = (condition: string) => {
    const styles = { 'good': 'bg-success/15 text-success', 'fair': 'bg-warning/15 text-warning', 'poor': 'bg-destructive/15 text-destructive', 'damaged': 'bg-destructive/15 text-destructive', 'discarded': 'bg-muted text-muted-foreground' };
    const labels = { 'good': t.equipment.good, 'fair': t.equipment.fair, 'poor': t.equipment.poor, 'damaged': t.equipment.damaged, 'discarded': t.equipment.discarded };
    return <Badge variant="outline" className={styles[condition as keyof typeof styles]}>{labels[condition as keyof typeof labels]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.equipment.title}</h1>
        <p className="page-description">{t.equipment.subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t.common.search} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />{t.common.filter}</Button>
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />{t.common.export}</Button>
          <Button><HardHat className="w-4 h-4 mr-2" />{t.equipment.assignPPE}</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.equipment.serialNumber}</TableHead>
                <TableHead>{t.equipment.itemName}</TableHead>
                <TableHead>{t.equipment.assignedTo}</TableHead>
                <TableHead>{t.equipment.assignmentDate}</TableHead>
                <TableHead>{t.equipment.expiryDate}</TableHead>
                <TableHead>{t.equipment.condition}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className="w-[100px]">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeePPE.map((ppe) => {
                const ppeType = getPPEType(ppe.ppeTypeId);
                const employee = getEmployee(ppe.employeeId);
                if (!ppeType || !employee) return null;
                return (
                  <TableRow key={ppe.id}>
                    <TableCell className="font-medium">{ppe.serialNumber}</TableCell>
                    <TableCell>{ppeType.name[language]}</TableCell>
                    <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                    <TableCell>{ppe.assignmentDate}</TableCell>
                    <TableCell>{ppe.expiryDate}</TableCell>
                    <TableCell>{getConditionBadge(ppe.condition)}</TableCell>
                    <TableCell>{getStatusBadge(ppe.status)}</TableCell>
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

export default Equipment;
