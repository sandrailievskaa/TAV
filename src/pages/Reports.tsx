import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileBarChart, Download, Calendar, TrendingUp, Users, Plane, Car, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const reportTypes = [
  {
    id: 'flight-ops',
    icon: Plane,
    title: { en: 'Flight Operations', mk: 'Оперaции со летови', sq: 'Operacionet e fluturimeve' },
    description: { en: 'Daily flight schedules, delays, and cancellations', mk: 'Дневни распореди, доцнења и откажувања', sq: 'Oraret ditore, vonesat dhe anulimet' },
    lastGenerated: '2026-01-12 14:30',
  },
  {
    id: 'passenger-stats',
    icon: Users,
    title: { en: 'Passenger Statistics', mk: 'Статистика за патници', sq: 'Statistikat e pasagjerëve' },
    description: { en: 'Passenger flow analysis and demographics', mk: 'Анализа на проток и демографија', sq: 'Analiza e fluksit dhe demografike' },
    lastGenerated: '2026-01-12 09:00',
  },
  {
    id: 'vehicle-util',
    icon: Car,
    title: { en: 'Vehicle Utilization', mk: 'Искористеност на возила', sq: 'Përdorimi i automjeteve' },
    description: { en: 'Ground equipment usage and maintenance schedules', mk: 'Користење на опрема и распореди за сервис', sq: 'Përdorimi i pajisjeve dhe mirëmbajtja' },
    lastGenerated: '2026-01-11 16:45',
  },
  {
    id: 'performance',
    icon: TrendingUp,
    title: { en: 'Performance Metrics', mk: 'Метрики за перформанси', sq: 'Metrikat e performancës' },
    description: { en: 'KPIs and operational efficiency analysis', mk: 'КПИ и анализа на оперативна ефикасност', sq: 'KPI dhe analiza e efikasitetit' },
    lastGenerated: '2026-01-10 11:20',
  },
];

const Reports: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t.reports.title}</h1>
        <p className="page-description">{t.reports.subtitle}</p>
      </div>

      {/* Generate Report Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">{t.reports.generate}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={t.reports.reportType} />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.title[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-10"
              defaultValue="2026-01-01"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-10"
              defaultValue="2026-01-13"
            />
          </div>
          <Button>
            <FileBarChart className="w-4 h-4 mr-2" />
            {t.reports.generate}
          </Button>
        </div>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report, index) => {
            const Icon = report.icon;
            
            return (
              <div
                key={report.id}
                className="bg-card rounded-lg border border-border p-5 hover:shadow-md hover:border-primary/20 transition-all animate-fade-in group"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{report.title[language]}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {report.description[language]}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Last generated: {report.lastGenerated}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1.5" />
                        {t.reports.download}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Scheduled Reports</h2>
          <Button variant="outline" size="sm">Configure</Button>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Daily Operations Summary', schedule: 'Daily at 23:00', status: 'active' },
            { name: 'Weekly Passenger Analysis', schedule: 'Every Monday at 08:00', status: 'active' },
            { name: 'Monthly Performance Report', schedule: 'First day of month', status: 'active' },
          ].map((scheduled, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div>
                <p className="font-medium">{scheduled.name}</p>
                <p className="text-sm text-muted-foreground">{scheduled.schedule}</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-success/15 text-success text-xs font-medium">
                Active
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
