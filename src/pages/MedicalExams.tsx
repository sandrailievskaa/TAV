import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Filter, Download, Eye, Printer, FileText } from 'lucide-react';
import { employeeMedicalExams, medicalExamTypes, employees } from '@/data/ohsData';

const MedicalExams: React.FC = () => {
  const { t, language } = useLanguage();

  const getExamType = (id: string) => medicalExamTypes.find(et => et.id === id);
  const getEmployee = (id: string) => employees.find(e => e.id === id);

  const getStatusBadge = (status: string) => {
    const styles = { 'valid': 'bg-success/15 text-success', 'expiring-soon': 'bg-warning/15 text-warning', 'expired': 'bg-destructive/15 text-destructive' };
    const labels = { 'valid': t.common.valid, 'expiring-soon': t.common.expiringSoon, 'expired': t.common.expired };
    return <Badge variant="outline" className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</Badge>;
  };

  const getResultBadge = (result: string) => {
    const styles = { 'fit': 'bg-success/15 text-success', 'fit-with-restrictions': 'bg-warning/15 text-warning', 'unfit': 'bg-destructive/15 text-destructive', 'pending': 'bg-muted text-muted-foreground' };
    const labels = { 'fit': t.medical.fit, 'fit-with-restrictions': t.medical.fitWithRestrictions, 'unfit': t.medical.unfit, 'pending': t.medical.pending };
    return <Badge variant="outline" className={styles[result as keyof typeof styles]}>{labels[result as keyof typeof labels]}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.medical.title}</h1>
        <p className="page-description">{t.medical.subtitle}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t.common.search} className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />{t.common.filter}</Button>
          <Button variant="outline"><Printer className="w-4 h-4 mr-2" />{t.medical.generateReferrals}</Button>
          <Button><Plus className="w-4 h-4 mr-2" />{t.common.add}</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.common.name}</TableHead>
                <TableHead>{t.medical.examType}</TableHead>
                <TableHead>{t.medical.examDate}</TableHead>
                <TableHead>{t.medical.expiryDate}</TableHead>
                <TableHead>{t.medical.result}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead className="w-[100px]">{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeMedicalExams.map((exam) => {
                const examType = getExamType(exam.examTypeId);
                const employee = getEmployee(exam.employeeId);
                if (!examType || !employee) return null;
                return (
                  <TableRow key={exam.id}>
                    <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                    <TableCell className="font-medium">{examType.name[language]}</TableCell>
                    <TableCell>{exam.examDate}</TableCell>
                    <TableCell>{exam.expiryDate}</TableCell>
                    <TableCell>{getResultBadge(exam.result)}</TableCell>
                    <TableCell>{getStatusBadge(exam.status)}</TableCell>
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

export default MedicalExams;
