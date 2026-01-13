import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import {
  medicalExaminations,
  MedicalExamination,
  ExamType,
  examTypeConfig,
} from '@/data/medicalExamData';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  FileCheck,
  Save,
  X,
  Stethoscope,
  User,
  Building2,
} from 'lucide-react';
import { ViewToggle, ViewMode } from '@/components/ui/view-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const resultConfig = {
  passed: {
    label: { en: 'Passed', mk: 'Поминат', sq: 'Kaluar' },
    className: 'badge-success',
    icon: CheckCircle2,
  },
  failed: {
    label: { en: 'Failed', mk: 'Не поминат', sq: 'Dështuar' },
    className: 'badge-danger',
    icon: XCircle,
  },
  pending: {
    label: { en: 'Pending', mk: 'Во тек', sq: 'Në Pritje' },
    className: 'badge-warning',
    icon: Clock,
  },
};

const statusConfig = {
  valid: {
    label: { en: 'Valid', mk: 'Валидно', sq: 'E Vlefshme' },
    className: 'badge-success',
  },
  expiringSoon: {
    label: { en: 'Expiring Soon', mk: 'Наскоро истекува', sq: 'Skadon Së Shpejti' },
    className: 'badge-warning',
  },
  expired: {
    label: { en: 'Expired', mk: 'Истечено', sq: 'Skaduar' },
    className: 'badge-danger',
  },
};

const MedicalExams: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [examTypeFilter, setExamTypeFilter] = useState<ExamType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'valid' | 'expiringSoon' | 'expired'>('all');
  const [employeeFilter, setEmployeeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isOCRDialogOpen, setIsOCRDialogOpen] = useState(false);
  const [ocrData, setOcrData] = useState<any>(null);
  const [ocrFile, setOcrFile] = useState<File | null>(null);
  const [ocrPreview, setOcrPreview] = useState<any>(null);
  const [reportType, setReportType] = useState<'employee' | 'type' | 'period'>('employee');
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');
  const [referralStatus, setReferralStatus] = useState<'pending' | 'generated' | 'printed' | 'sent' | 'completed'>('pending');
  const [reportStatus, setReportStatus] = useState<'pending' | 'generated' | 'sent' | 'viewed'>('pending');

  const filteredExams = medicalExaminations.filter((exam) => {
    const matchesSearch =
      exam.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.examId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = examTypeFilter === 'all' || exam.examType === examTypeFilter;
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    const matchesEmployee = employeeFilter === 'all' || exam.employeeId === employeeFilter;

    return matchesSearch && matchesType && matchesStatus && matchesEmployee;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US'
    );
  };

  const toggleExamSelection = (examId: string) => {
    setSelectedExams((prev) =>
      prev.includes(examId) ? prev.filter((id) => id !== examId) : [...prev, examId]
    );
  };

  const toggleAllExams = () => {
    if (selectedExams.length === filteredExams.length) {
      setSelectedExams([]);
    } else {
      setSelectedExams(filteredExams.map((exam) => exam.id));
    }
  };

  const handleGenerateReferral = () => {
    if (selectedExams.length === 0) {
      alert(t.common.selectAtLeastOne || 'Please select at least one examination');
      return;
    }
    setIsReferralDialogOpen(true);
  };

  const handlePrintReferral = () => {
    window.print();
  };

  const handleOCRUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOcrFile(file);
      setTimeout(() => {
        const mockOcrData = {
          employeeName: 'Marko Nikolovski',
          examType: 'periodic',
          examDate: '2025-08-15',
          doctor: 'Dr. Petar Stojanov',
          result: 'passed',
          validityMonths: 12,
        };
        setOcrData(mockOcrData);
        setOcrPreview(mockOcrData);
        setIsOCRDialogOpen(true);
      }, 1500);
    }
  };

  const handleOCRSave = () => {
    toast.success(
      language === 'mk' ? 'OCR обработка завршена' : language === 'sq' ? 'Përpunimi OCR i përfunduar' : 'OCR Processing Complete',
      { description: t.medicalExams.recognitionComplete }
    );
    setIsOCRDialogOpen(false);
    setOcrFile(null);
    setOcrData(null);
    setOcrPreview(null);
  };

  const handleOCRCorrection = (field: string, value: string) => {
    setOcrPreview((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const expiringExams = filteredExams.filter((exam) => exam.status === 'expiringSoon' || exam.status === 'expired');
  const expiredExams = filteredExams.filter((exam) => exam.status === 'expired');

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.medicalExams.title}</h1>
          <p className="page-description">{t.medicalExams.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            setIsOCRDialogOpen(true);
            setOcrFile(null);
            setOcrData(null);
            setOcrPreview(null);
          }}>
            <Upload className="w-4 h-4 mr-2" />
            {t.medicalExams.ocr}
          </Button>
          <Button onClick={() => {
            toast.success(
              language === 'mk' ? 'Закажување преглед' : language === 'sq' ? 'Programimi i ekzaminimit' : 'Schedule Exam',
              { description: language === 'mk' ? 'Дијалог за закажување нов медицински преглед' : language === 'sq' ? 'Dialog për programimin e ekzaminimit të ri mjekësor' : 'Dialog for scheduling new medical exam' }
            );
          }}>
            <Plus className="w-4 h-4 mr-2" />
            {t.medicalExams.scheduleExam}
          </Button>
        </div>
      </div>

      {expiredExams.length > 0 && (
        <Card className="border-red-500 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <p className="font-medium text-red-900 dark:text-red-100">
                {expiredExams.length} {t.medicalExams.expired} {t.medicalExams.examType.toLowerCase()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {expiringExams.length > 0 && expiredExams.length === 0 && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="font-medium text-yellow-900 dark:text-yellow-100">
                {expiringExams.length} {t.medicalExams.examType.toLowerCase()} {t.medicalExams.expiringSoon.toLowerCase()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
        <Select value={examTypeFilter} onValueChange={(value) => setExamTypeFilter(value as ExamType | 'all')}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.medicalExams.examTypeFilter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="pre-employment">{t.medicalExams.preEmployment}</SelectItem>
            <SelectItem value="systematic">{t.medicalExams.systematic}</SelectItem>
            <SelectItem value="periodic">{t.medicalExams.periodic}</SelectItem>
            <SelectItem value="targeted">{t.medicalExams.targeted}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t.common.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="valid">{t.medicalExams.valid}</SelectItem>
            <SelectItem value="expiringSoon">{t.medicalExams.expiringSoon}</SelectItem>
            <SelectItem value="expired">{t.medicalExams.expired}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t.medicalExams.employeeFilter} />
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleGenerateReferral}
            disabled={selectedExams.length === 0}
          >
            <Users className="w-4 h-4 mr-2" />
            {t.medicalExams.groupReferral}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsReportDialogOpen(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            {t.medicalExams.reports}
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {filteredExams.length} {t.medicalExams.examType.toLowerCase()}
          </p>
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </div>

      {viewMode === 'table' ? (
      <div className="bg-gradient-to-br from-card to-card/95 rounded-lg border-2 border-border/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedExams.length === filteredExams.length && filteredExams.length > 0}
                    onCheckedChange={toggleAllExams}
                  />
                </TableHead>
                <TableHead>{t.medicalExams.examId}</TableHead>
                <TableHead>{t.medicalExams.employee}</TableHead>
                <TableHead>{t.medicalExams.examType}</TableHead>
                <TableHead>{t.medicalExams.examDate}</TableHead>
                <TableHead>{t.medicalExams.validUntil}</TableHead>
                <TableHead>{t.medicalExams.validityMonths}</TableHead>
                <TableHead>{t.medicalExams.doctor}</TableHead>
                <TableHead>{t.medicalExams.result}</TableHead>
                <TableHead>{t.medicalExams.status}</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                    {t.common.noResults}
                  </TableCell>
                </TableRow>
              ) : (
                filteredExams.map((exam) => {
                  const result = resultConfig[exam.result];
                  const status = statusConfig[exam.status];
                  const ResultIcon = result.icon;
                  const examTypeLabel = examTypeConfig[exam.examType].label[language];

                  return (
                    <TableRow key={exam.id} className="hover:scale-[1.01] transition-transform duration-200">
                      <TableCell>
                        <Checkbox
                          checked={selectedExams.includes(exam.id)}
                          onCheckedChange={() => toggleExamSelection(exam.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500/10 to-teal-500/10">
                            <Stethoscope className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <span className="font-mono text-sm font-semibold">{exam.examId}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">{exam.employeeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="shadow-sm">{examTypeLabel}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{formatDate(exam.examDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span className="font-semibold">{formatDate(exam.validUntil)}</span>
                          {exam.daysUntilExpiry < 30 && (
                            <Badge
                              variant="outline"
                              className={cn(
                                'shadow-sm',
                                exam.daysUntilExpiry < 0 ? 'badge-danger' : 'badge-warning'
                              )}
                            >
                              {exam.daysUntilExpiry > 0
                                ? `${exam.daysUntilExpiry} ${t.common.days}`
                                : `${Math.abs(exam.daysUntilExpiry)} ${t.common.daysOverdue}`}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{exam.validityMonths} {t.common.months}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span>{exam.doctor}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(result.className, 'shadow-sm flex items-center gap-1 w-fit')}>
                          <ResultIcon className="w-3.5 h-3.5" />
                          {result.label[language]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(status.className, 'shadow-sm')}>{status.label[language]}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
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
                              {t.medicalExams.printReferral}
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {t.common.noResults}
            </div>
          ) : (
            filteredExams.map((exam) => {
              const result = resultConfig[exam.result];
              const status = statusConfig[exam.status];
              const type = examTypeConfig[exam.examType];
              const ResultIcon = result.icon;

              return (
                <Card
                  key={exam.id}
                  className="border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 shadow-md">
                          <Stethoscope className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-mono">{exam.examId}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {type.label[language]}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            {t.common.view}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{exam.employeeName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-accent" />
                      <span className="text-sm">{exam.department}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border/50">
                      <Badge className={cn(result.className, 'shadow-sm')}>
                        <ResultIcon className="w-3 h-3 mr-1" />
                        {result.label[language]}
                      </Badge>
                      <Badge className={cn(status.className, 'shadow-sm')}>
                        {status.label[language]}
                      </Badge>
                    </div>
                    <div className="pt-2 border-t border-border/50 space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(exam.examDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{t.medicalExams.validUntil}: {formatDate(exam.validUntil)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      <Dialog open={isReferralDialogOpen} onOpenChange={setIsReferralDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.medicalExams.groupReferral}</DialogTitle>
            <DialogDescription>
              {t.medicalExams.selectEmployees} ({selectedExams.length} {t.common.selected || 'selected'})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.medicalExams.referralDate}</Label>
              <Input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="mt-1"
              />
            </div>
            <div>
              <Label>{t.medicalExams.examType}</Label>
              <Select defaultValue="periodic">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-employment">{t.medicalExams.preEmployment}</SelectItem>
                  <SelectItem value="systematic">{t.medicalExams.systematic}</SelectItem>
                  <SelectItem value="periodic">{t.medicalExams.periodic}</SelectItem>
                  <SelectItem value="targeted">{t.medicalExams.targeted}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="max-h-60 overflow-y-auto border rounded-lg p-4">
              <p className="text-sm font-medium mb-2">{t.medicalExams.selectEmployees}:</p>
              <div className="space-y-2">
                {selectedExams.map((examId) => {
                  const exam = medicalExaminations.find((e) => e.id === examId);
                  return exam ? (
                    <div key={examId} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{exam.employeeName} ({exam.employeeId})</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsReferralDialogOpen(false)}>
                {t.common.cancel}
              </Button>
              <Button onClick={handlePrintReferral}>
                <Printer className="w-4 h-4 mr-2" />
                {t.medicalExams.printReferral}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.medicalExams.reports}</DialogTitle>
            <DialogDescription>{t.medicalExams.reports}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{language === 'mk' ? 'Тип на извештај' : language === 'sq' ? 'Lloji i raportit' : 'Report Type'}</Label>
              <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">{t.medicalExams.reportByEmployee}</SelectItem>
                  <SelectItem value="type">{t.medicalExams.reportByType}</SelectItem>
                  <SelectItem value="period">{t.medicalExams.reportByPeriod}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {reportType === 'employee' && (
              <div>
                <Label>{t.medicalExams.employee}</Label>
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
                  <Label>{t.medicalExams.startDate}</Label>
                  <Input
                    type="date"
                    value={reportStartDate}
                    onChange={(e) => setReportStartDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>{t.medicalExams.endDate}</Label>
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

      <Dialog open={isOCRDialogOpen} onOpenChange={setIsOCRDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t.medicalExams.ocr}</DialogTitle>
            <DialogDescription>{t.medicalExams.uploadDocument}</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList>
              <TabsTrigger value="upload">{t.medicalExams.uploadDocument}</TabsTrigger>
              {ocrPreview && <TabsTrigger value="preview">{t.medicalExams.previewData}</TabsTrigger>}
              {ocrPreview && <TabsTrigger value="correction">{t.medicalExams.manualCorrection}</TabsTrigger>}
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <Label htmlFor="ocr-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>{t.medicalExams.uploadDocument}</span>
                  </Button>
                </Label>
                <Input
                  id="ocr-upload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleOCRUpload}
                  className="hidden"
                />
                {ocrFile && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{ocrFile.name}</p>
                    <p className="text-sm text-muted-foreground">{t.medicalExams.processing}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {ocrPreview && (
              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.medicalExams.recognizedFields}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t.medicalExams.employeeName}</Label>
                        <Input value={ocrPreview.employeeName} readOnly />
                      </div>
                      <div>
                        <Label>{t.medicalExams.examType}</Label>
                        <Input value={ocrPreview.examType} readOnly />
                      </div>
                      <div>
                        <Label>{t.medicalExams.examDate}</Label>
                        <Input value={ocrPreview.examDate} readOnly />
                      </div>
                      <div>
                        <Label>{t.medicalExams.doctor}</Label>
                        <Input value={ocrPreview.doctor} readOnly />
                      </div>
                      <div>
                        <Label>{t.medicalExams.result}</Label>
                        <Input value={ocrPreview.result} readOnly />
                      </div>
                      <div>
                        <Label>{t.medicalExams.validityMonths}</Label>
                        <Input value={ocrPreview.validityMonths} readOnly />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={() => setIsOCRDialogOpen(false)}>
                        {t.medicalExams.correctData}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {ocrPreview && (
              <TabsContent value="correction" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.medicalExams.manualCorrection}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t.medicalExams.employeeName}</Label>
                        <Input
                          value={ocrPreview.employeeName}
                          onChange={(e) => handleOCRCorrection('employeeName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>{t.medicalExams.examType}</Label>
                        <Select
                          value={ocrPreview.examType}
                          onValueChange={(value) => handleOCRCorrection('examType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pre-employment">{t.medicalExams.preEmployment}</SelectItem>
                            <SelectItem value="systematic">{t.medicalExams.systematic}</SelectItem>
                            <SelectItem value="periodic">{t.medicalExams.periodic}</SelectItem>
                            <SelectItem value="targeted">{t.medicalExams.targeted}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>{t.medicalExams.examDate}</Label>
                        <Input
                          type="date"
                          value={ocrPreview.examDate}
                          onChange={(e) => handleOCRCorrection('examDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>{t.medicalExams.doctor}</Label>
                        <Input
                          value={ocrPreview.doctor}
                          onChange={(e) => handleOCRCorrection('doctor', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>{t.medicalExams.result}</Label>
                        <Select
                          value={ocrPreview.result}
                          onValueChange={(value) => handleOCRCorrection('result', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="passed">{t.medicalExams.passed}</SelectItem>
                            <SelectItem value="failed">{t.medicalExams.failed}</SelectItem>
                            <SelectItem value="pending">{t.medicalExams.pending}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>{t.medicalExams.validityMonths}</Label>
                        <Input
                          type="number"
                          value={ocrPreview.validityMonths}
                          onChange={(e) => handleOCRCorrection('validityMonths', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsOCRDialogOpen(false)}>
                        <X className="w-4 h-4 mr-2" />
                        {t.common.cancel}
                      </Button>
                      <Button onClick={handleOCRSave}>
                        <Save className="w-4 h-4 mr-2" />
                        {t.medicalExams.save}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedicalExams;

