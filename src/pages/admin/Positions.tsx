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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus, Search, Filter, AlertTriangle, GraduationCap, Stethoscope, Shield } from 'lucide-react';
import { workPositions } from '@/data/adminData';
import { cn } from '@/lib/utils';

const Positions: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredPositions = workPositions.filter((position) => {
    const matchesSearch =
      position.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRisk = riskFilter === 'all' || position.riskLevel === riskFilter;
    const matchesDept = departmentFilter === 'all' || position.department === departmentFilter;
    
    return matchesSearch && matchesRisk && matchesDept;
  });

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'badge-destructive';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-success';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'high':
        return t.admin.positions.high;
      case 'medium':
        return t.admin.positions.medium;
      case 'low':
        return t.admin.positions.low;
      default:
        return risk;
    }
  };

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.admin.positions.title}</h1>
          <p className="page-description">{t.admin.positions.subtitle}</p>
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
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.admin.positions.riskLevel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="high">{t.admin.positions.high}</SelectItem>
            <SelectItem value="medium">{t.admin.positions.medium}</SelectItem>
            <SelectItem value="low">{t.admin.positions.low}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder={t.admin.positions.department} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="Ground Handling">{t.staff.departments.groundHandling}</SelectItem>
            <SelectItem value="Security">{t.staff.departments.security}</SelectItem>
            <SelectItem value="Customer Service">{t.staff.departments.customerService}</SelectItem>
            <SelectItem value="Maintenance">{t.staff.departments.maintenance}</SelectItem>
            <SelectItem value="Operations">{t.staff.departments.operations}</SelectItem>
            <SelectItem value="Fuel Services">Fuel Services</SelectItem>
            <SelectItem value="Fire & Rescue">Fire & Rescue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredPositions.length} {t.admin.positions.position.toLowerCase()}
      </p>

      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {filteredPositions.map((position, index) => (
            <AccordionItem key={position.id} value={position.id} className="bg-card rounded-lg border border-border px-5 mb-3">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-left">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{position.position}</h3>
                        <Badge variant="outline" className={cn('w-fit text-xs', getRiskBadge(position.riskLevel))}>
                          {getRiskLabel(position.riskLevel)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{position.department}</p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <h4 className="font-semibold">{t.admin.positions.risks}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {position.risks.map((risk, idx) => (
                        <Badge key={idx} variant="outline" className="badge-warning">
                          {risk}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold">{t.admin.positions.requiredTrainings}</h4>
                    </div>
                    <div className="space-y-2">
                      {position.requiredTrainings.map((training, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium text-sm">{training.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {t.admin.positions.frequency}: {training.frequency}
                              {training.expiry && ` • ${t.admin.positions.expiry}: ${training.expiry}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="w-4 h-4 text-accent" />
                      <h4 className="font-semibold">{t.admin.positions.requiredMedicalExams}</h4>
                    </div>
                    <div className="space-y-2">
                      {position.requiredMedicalExams.map((exam, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium text-sm">{exam.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {t.admin.positions.frequency}: {exam.frequency}
                              {exam.expiry && ` • ${t.admin.positions.expiry}: ${exam.expiry}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-success" />
                      <h4 className="font-semibold">{t.admin.positions.requiredPPE}</h4>
                    </div>
                    <div className="space-y-2">
                      {position.requiredPPE.map((ppe, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium text-sm">{ppe.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {t.admin.positions.type}: {ppe.type}
                              {ppe.mandatory && (
                                <Badge variant="outline" className="ml-2 badge-success text-xs">
                                  {t.common.active}
                                </Badge>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Positions;

