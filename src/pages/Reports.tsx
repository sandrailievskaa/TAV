import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileBarChart, Download, Calendar, GraduationCap, Stethoscope, HardHat, AlertTriangle, ClipboardCheck, Clock, FileSpreadsheet, FileText } from 'lucide-react';

const Reports: React.FC = () => {
  const { t, language } = useLanguage();

  const reportTypes = [
    { id: 'training', icon: GraduationCap, title: t.reports.trainingReport, description: language === 'mk' ? 'Извештај за завршени обуки' : language === 'sq' ? 'Raporti i trajnimeve' : 'Training completion report', lastGenerated: '2026-01-12' },
    { id: 'medical', icon: Stethoscope, title: t.reports.medicalReport, description: language === 'mk' ? 'Извештај за лекарски прегледи' : language === 'sq' ? 'Raporti i ekzaminimeve' : 'Medical examinations report', lastGenerated: '2026-01-10' },
    { id: 'ppe', icon: HardHat, title: t.reports.ppeReport, description: language === 'mk' ? 'Извештај за доделена ЛЗС' : language === 'sq' ? 'Raporti i PPE' : 'PPE assignment report', lastGenerated: '2026-01-11' },
    { id: 'incident', icon: AlertTriangle, title: t.reports.incidentReport, description: language === 'mk' ? 'Статистика на инциденти' : language === 'sq' ? 'Statistikat e incidenteve' : 'Incident statistics', lastGenerated: '2026-01-08' },
    { id: 'equipment', icon: ClipboardCheck, title: t.reports.equipmentReport, description: language === 'mk' ? 'Инспекции на опрема' : language === 'sq' ? 'Inspektimet e pajisjeve' : 'Equipment inspections', lastGenerated: '2026-01-05' },
    { id: 'compliance', icon: FileBarChart, title: t.reports.complianceReport, description: language === 'mk' ? 'Преглед на усогласеност' : language === 'sq' ? 'Pasqyra e pajtueshmërisë' : 'Compliance overview', lastGenerated: '2026-01-01' },
  ];

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.reports.title}</h1>
        <p className="page-description">{t.reports.subtitle}</p>
      </div>

      <Card>
        <CardHeader><CardTitle>{t.reports.generate}</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger><SelectValue placeholder={t.reports.reportType} /></SelectTrigger>
              <SelectContent>
                {reportTypes.map((r) => <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="date" className="pl-10" defaultValue="2026-01-01" />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="date" className="pl-10" defaultValue="2026-01-13" />
            </div>
            <Button><FileBarChart className="w-4 h-4 mr-2" />{t.reports.generate}</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary"><report.icon className="w-6 h-6" /></div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /><span>{t.reports.lastGenerated}: {report.lastGenerated}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm"><FileSpreadsheet className="w-4 h-4" /></Button>
                      <Button variant="outline" size="sm"><FileText className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
