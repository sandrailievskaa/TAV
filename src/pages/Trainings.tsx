import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import {
  trainings,
  Training,
  TrainingType,
  trainingTypeConfig,
  certificateTemplates,
} from '@/data/trainingData';
import { employees } from '@/data/employeeData';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Checkbox,
} from '@/components/ui/checkbox';
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Calendar,
  FileText,
  Printer,
  Award,
  AlertTriangle,
  CheckCircle2,
  Clock,
  GraduationCap,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const statusConfig = {
  completed: {
    label: { en: 'Completed', mk: 'Завршено', sq: 'Përfunduar' },
    className: 'badge-success',
    icon: CheckCircle2,
  },
  'in-progress': {
    label: { en: 'In Progress', mk: 'Во тек', sq: 'Në Proces' },
    className: 'badge-warning',
    icon: Clock,
  },
  expired: {
    label: { en: 'Expired', mk: 'Истечено', sq: 'Skaduar' },
    className: 'badge-danger',
    icon: AlertTriangle,
  },
};

const Trainings: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [trainingTypeFilter, setTrainingTypeFilter] = useState<TrainingType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in-progress' | 'expired'>('all');
  const [employeeFilter, setEmployeeFilter] = useState<string>('all');
  const [selectedTrainings, setSelectedTrainings] = useState<string[]>([]);
  const [isCertificateDialogOpen, setIsCertificateDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isReadAndSignDialogOpen, setIsReadAndSignDialogOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [reportType, setReportType] = useState<'employee' | 'type' | 'period'>('employee');
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');
  const [alarmDays, setAlarmDays] = useState(30);
  const [signatureConfirmed, setSignatureConfirmed] = useState(false);

  // Calculate status based on expiry date and alarm days
  const getTrainingStatus = (training: Training): 'valid' | 'expiringSoon' | 'expired' => {
    if (!training.expiryDate) return 'valid';
    const daysUntil = training.daysUntilExpiry;
    if (daysUntil === null) return 'valid';
    if (daysUntil < 0) return 'expired';
    if (daysUntil <= alarmDays) return 'expiringSoon';
    return 'valid';
  };

  const filteredTrainings = trainings
    .map((training) => ({
      ...training,
      calculatedStatus: getTrainingStatus(training),
    }))
    .filter((training) => {
      const matchesSearch =
        training.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        training.trainingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        training.trainingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        training.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = trainingTypeFilter === 'all' || training.trainingType === trainingTypeFilter;
      const matchesStatus = statusFilter === 'all' || training.status === statusFilter;
      const matchesEmployee = employeeFilter === 'all' || training.employeeId === employeeFilter;

      return matchesSearch && matchesType && matchesStatus && matchesEmployee;
    });

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(
      language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US'
    );
  };

  const toggleTrainingSelection = (trainingId: string) => {
    setSelectedTrainings((prev) =>
      prev.includes(trainingId) ? prev.filter((id) => id !== trainingId) : [...prev, trainingId]
    );
  };

  const toggleAllTrainings = () => {
    if (selectedTrainings.length === filteredTrainings.length) {
      setSelectedTrainings([]);
    } else {
      setSelectedTrainings(filteredTrainings.map((training) => training.id));
    }
  };

  const handleGenerateCertificate = (training: Training) => {
    setSelectedTraining(training);
    setIsCertificateDialogOpen(true);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const expiringTrainings = filteredTrainings.filter(
    (training) => training.calculatedStatus === 'expiringSoon' || training.calculatedStatus === 'expired'
  );
  const expiredTrainings = filteredTrainings.filter((training) => training.calculatedStatus === 'expired');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.trainings.title}</h1>
          <p className="page-description">{t.trainings.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsTemplateDialogOpen(true)}>
            <FileText className="w-4 h-4 mr-2" />
            {t.trainings.certificateTemplates}
          </Button>
          <Button onClick={() => {
            toast.success(
              language === 'mk' ? 'Закажување обука' : language === 'sq' ? 'Programimi i trajnimit' : 'Schedule Training',
              { description: language === 'mk' ? 'Дијалог за закажување нова обука' : language === 'sq' ? 'Dialog për programimin e trajnimit të ri' : 'Dialog for scheduling new training' }
            );
          }}>
            <Plus className="w-4 h-4 mr-2" />
            {t.trainings.scheduleTraining}
          </Button>
        </div>
      </div>

      {/* Alarm Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {t.trainings.setAlarm}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>{t.trainings.alarmDays}</Label>
            <Input
              type="number"
              value={alarmDays}
              onChange={(e) => setAlarmDays(Number(e.target.value))}
              className="w-32"
              min="1"
              max="365"
            />
            <span className="text-sm text-muted-foreground">
              {t.common.days} {t.common.beforeExpiry}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {expiredTrainings.length > 0 && (
        <Card className="border-red-500 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <p className="font-medium text-red-900 dark:text-red-100">
                {expiredTrainings.length} {t.trainings.expired} {t.trainings.trainingName.toLowerCase()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {expiringTrainings.length > 0 && expiredTrainings.length === 0 && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="font-medium text-yellow-900 dark:text-yellow-100">
                {expiringTrainings.length} {t.trainings.trainingName.toLowerCase()} {t.trainings.expiringSoon.toLowerCase()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
        <Select value={trainingTypeFilter} onValueChange={(value) => setTrainingTypeFilter(value as TrainingType | 'all')}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.trainings.trainingTypeFilter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="internal">{t.trainings.internal}</SelectItem>
            <SelectItem value="external">{t.trainings.external}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t.common.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="completed">{t.trainings.completed}</SelectItem>
            <SelectItem value="in-progress">{t.trainings.inProgress}</SelectItem>
            <SelectItem value="expired">{t.trainings.expired}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t.trainings.employeeFilter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            {employees.map((emp) => (
              <SelectItem key={emp.id} value={emp.employeeId}>
                {emp.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setIsReportDialogOpen(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            {t.trainings.reports}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {filteredTrainings.length} {t.trainings.trainingName.toLowerCase()}
        </p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedTrainings.length === filteredTrainings.length && filteredTrainings.length > 0}
                    onCheckedChange={toggleAllTrainings}
                  />
                </TableHead>
                <TableHead>{t.trainings.trainingId}</TableHead>
                <TableHead>{t.trainings.employee}</TableHead>
                <TableHead>{t.trainings.trainingName}</TableHead>
                <TableHead>{t.trainings.trainingType}</TableHead>
                <TableHead>{t.trainings.completionDate}</TableHead>
                <TableHead>{t.trainings.expiryDate}</TableHead>
                <TableHead>{t.trainings.validityMonths}</TableHead>
                <TableHead>{t.trainings.instructor}</TableHead>
                <TableHead>{t.trainings.status}</TableHead>
                <TableHead>{t.trainings.readAndSign}</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="text-center py-8 text-muted-foreground">
                    {t.common.noResults}
                  </TableCell>
                </TableRow>
              ) : (
                filteredTrainings.map((training) => {
                  const status = statusConfig[training.status];
                  const StatusIcon = status.icon;
                  const trainingTypeLabel = trainingTypeConfig[training.trainingType].label[language];
                  const calculatedStatus = training.calculatedStatus;

                  return (
                    <TableRow key={training.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedTrainings.includes(training.id)}
                          onCheckedChange={() => toggleTrainingSelection(training.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">{training.trainingId}</TableCell>
                      <TableCell className="font-medium">{training.employeeName}</TableCell>
                      <TableCell>{training.trainingName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{trainingTypeLabel}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {formatDate(training.completionDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {formatDate(training.expiryDate)}
                          {training.daysUntilExpiry !== null && (
                            <Badge
                              variant="outline"
                              className={cn(
                                calculatedStatus === 'expiringSoon' && 'badge-warning',
                                calculatedStatus === 'expired' && 'badge-danger'
                              )}
                            >
                              {training.daysUntilExpiry > 0
                                ? `${training.daysUntilExpiry} ${t.common.days}`
                                : `${Math.abs(training.daysUntilExpiry)} ${t.common.daysOverdue}`}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{training.validityMonths} {t.common.months}</TableCell>
                      <TableCell>{training.instructor}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={status.className}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label[language]}
                          </Badge>
                          {calculatedStatus === 'expiringSoon' && (
                            <Badge variant="outline" className="badge-warning text-xs">
                              {t.trainings.expiringSoon}
                            </Badge>
                          )}
                          {calculatedStatus === 'expired' && (
                            <Badge variant="outline" className="badge-danger text-xs">
                              {t.trainings.expired}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {training.requiresReadAndSign ? (
                          training.signedDate ? (
                            <Badge variant="outline" className="badge-success">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {formatDate(training.signedDate)}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="badge-warning">
                              {t.trainings.notSigned}
                            </Badge>
                          )
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {training.requiresReadAndSign && !training.signedDate && (
                              <DropdownMenuItem onClick={() => {
                                setSelectedTraining(training);
                                setIsReadAndSignDialogOpen(true);
                                setSignatureConfirmed(false);
                              }}>
                                <FileText className="w-4 h-4 mr-2" />
                                {t.trainings.signInstructions}
                              </DropdownMenuItem>
                            )}
                            {training.requiresReadAndSign && training.signedDate && (
                              <DropdownMenuItem onClick={() => {
                                setSelectedTraining(training);
                                setIsReadAndSignDialogOpen(true);
                                setSignatureConfirmed(true);
                              }}>
                                <Eye className="w-4 h-4 mr-2" />
                                {t.trainings.viewInstructions}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleGenerateCertificate(training)}>
                              <Award className="w-4 h-4 mr-2" />
                              {t.trainings.generateCertificate}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              {t.common.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              {t.common.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="w-4 h-4 mr-2" />
                              {t.trainings.printCertificate}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Certificate Generation Dialog */}
      <Dialog open={isCertificateDialogOpen} onOpenChange={setIsCertificateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.trainings.generateCertificate}</DialogTitle>
            <DialogDescription>
              {selectedTraining?.employeeName} - {selectedTraining?.trainingName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.trainings.certificateTemplate}</Label>
              <Select defaultValue={certificateTemplates[0]?.id}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t.trainings.selectTemplate} />
                </SelectTrigger>
                <SelectContent>
                  {certificateTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedTraining && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {t.trainings.certificateNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.trainings.employee}</p>
                      <p className="font-medium">{selectedTraining.employeeName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.trainings.trainingName}</p>
                      <p className="font-medium">{selectedTraining.trainingName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.trainings.completionDate}</p>
                      <p>{formatDate(selectedTraining.completionDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.trainings.certificateNumber}</p>
                      <p className="font-mono text-sm">{selectedTraining.certificateNumber || 'N/A'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCertificateDialogOpen(false)}>
                {t.common.cancel}
              </Button>
              <Button onClick={handlePrintCertificate}>
                <Printer className="w-4 h-4 mr-2" />
                {t.trainings.printCertificate}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reports Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.trainings.reports}</DialogTitle>
            <DialogDescription>{t.trainings.reports}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.common.reportType || 'Report Type'}</Label>
              <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">{t.trainings.reportByEmployee}</SelectItem>
                  <SelectItem value="type">{t.trainings.reportByType}</SelectItem>
                  <SelectItem value="period">{t.trainings.reportByPeriod}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {reportType === 'employee' && (
              <div>
                <Label>{t.trainings.employee}</Label>
                <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.common.all}</SelectItem>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.employeeId}>
                        {emp.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {reportType === 'period' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.trainings.startDate}</Label>
                  <Input
                    type="date"
                    value={reportStartDate}
                    onChange={(e) => setReportStartDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>{t.trainings.endDate}</Label>
                  <Input
                    type="date"
                    value={reportEndDate}
                    onChange={(e) => setReportEndDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                {t.common.cancel}
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                {t.common.export}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Read & Sign Instructions Dialog */}
      <Dialog open={isReadAndSignDialogOpen} onOpenChange={setIsReadAndSignDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.trainings.readAndSignInstructions}</DialogTitle>
            <DialogDescription>
              {selectedTraining?.trainingName} - {selectedTraining?.employeeName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedTraining?.instructionsContent ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t.trainings.instructionsContent}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="whitespace-pre-wrap text-sm">{selectedTraining.instructionsContent}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <p>{t.trainings.instructionsContent}:</p>
                  <p className="mt-2 text-sm">
                    {selectedTraining?.trainingName === 'Ramp Safety' && 
                      '1. Always wear high-visibility vest when on the ramp.\n2. Maintain safe distance from aircraft engines.\n3. Follow marshalling signals precisely.\n4. Report any safety hazards immediately.\n5. Complete pre-shift safety briefing.'}
                    {selectedTraining?.trainingName === 'Emergency Procedures' && 
                      '1. Know the location of all emergency exits.\n2. Follow evacuation procedures in case of fire.\n3. Use fire extinguishers only if trained.\n4. Assist passengers during emergencies.\n5. Report incidents to supervisor immediately.'}
                    {selectedTraining?.trainingName === 'Dangerous Goods Handling' && 
                      '1. Identify dangerous goods labels correctly.\n2. Handle according to IATA regulations.\n3. Use appropriate PPE for each type.\n4. Store in designated areas only.\n5. Complete documentation accurately.'}
                  </p>
                </CardContent>
              </Card>
            )}
            {!signatureConfirmed && !selectedTraining?.signedDate && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="read-confirm"
                        checked={signatureConfirmed}
                        onCheckedChange={(checked) => setSignatureConfirmed(checked === true)}
                      />
                      <Label htmlFor="read-confirm" className="text-sm cursor-pointer">
                        {t.trainings.iHaveReadAndUnderstood}
                      </Label>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsReadAndSignDialogOpen(false)}>
                        {t.common.cancel}
                      </Button>
                      <Button 
                        onClick={() => {
                          if (selectedTraining) {
                            // In a real application, this would save the signature
                            alert(t.trainings.signInstructions + ' - ' + selectedTraining.employeeName);
                            setIsReadAndSignDialogOpen(false);
                          }
                        }}
                        disabled={!signatureConfirmed}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {t.trainings.signInstructions}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {selectedTraining?.signedDate && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.trainings.signedDate}</span>
                      <span>{formatDate(selectedTraining.signedDate)}</span>
                    </div>
                    {selectedTraining.signedBy && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t.trainings.signedBy}</span>
                        <span>{selectedTraining.signedBy}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Certificate Templates Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t.trainings.certificateTemplates}</DialogTitle>
            <DialogDescription>{t.trainings.certificateTemplates}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t.trainings.createTemplate}
              </Button>
            </div>
            <div className="space-y-4">
              {certificateTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{template.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          {t.trainings.editTemplate}
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        {t.common.type}: <Badge variant="outline">{template.templateType}</Badge>
                      </span>
                      <span>
                        {t.common.createdAt}: {formatDate(template.createdAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Trainings;

