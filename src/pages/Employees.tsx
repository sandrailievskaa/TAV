import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRBAC } from '@/contexts/RBACContext';
import { toast } from 'sonner';
import { employees, Employee } from '@/data/employeeData';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Upload,
  FileText,
  Calendar,
  User,
  Briefcase,
  Shield,
  GraduationCap,
  HardHat,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Mail,
  Phone,
} from 'lucide-react';
import { ViewToggle, ViewMode } from '@/components/ui/view-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const statusConfig = {
  active: {
    label: { en: 'Active', mk: 'Активен', sq: 'Aktiv' },
    className: 'badge-success',
  },
  'on-leave': {
    label: { en: 'On Leave', mk: 'На одмор', sq: 'Në pushim' },
    className: 'badge-warning',
  },
  terminated: {
    label: { en: 'Terminated', mk: 'Раскинат', sq: 'I Terminuar' },
    className: 'badge-danger',
  },
  candidate: {
    label: { en: 'Candidate', mk: 'Кандидат', sq: 'Kandidat' },
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
};

const riskLevelConfig = {
  high: {
    label: { en: 'High', mk: 'Висок', sq: 'I Lartë' },
    className: 'badge-danger',
  },
  medium: {
    label: { en: 'Medium', mk: 'Среден', sq: 'Mesatar' },
    className: 'badge-warning',
  },
  low: {
    label: { en: 'Low', mk: 'Низок', sq: 'I Ulët' },
    className: 'badge-success',
  },
};

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

const Employees: React.FC = () => {
  const { t, language } = useLanguage();
  const { hasPermission, isReadOnly, canViewOwnDataOnly, user } = useRBAC();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const canCreate = hasPermission('employees', 'create');
  const canUpdate = hasPermission('employees', 'update');
  const canDelete = hasPermission('employees', 'delete');
  const canAssignPPE = hasPermission('employees', 'assign-ppe');
  const isReadOnlyMode = isReadOnly('employees');
  const viewOwnOnly = canViewOwnDataOnly('employees');

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;

    if (viewOwnOnly && user?.employeeId) {
      return matchesSearch && matchesStatus && employee.employeeId === user.employeeId;
    }

    return matchesSearch && matchesStatus;
  });

  const openProfile = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsProfileOpen(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US');
  };

  const getDaysUntil = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.employees.title}</h1>
          <p className="page-description">{t.employees.subtitle}</p>
        </div>
        {canCreate && (
          <Button onClick={() => {
            toast.success(
              language === 'mk' ? 'Дијалог за креирање на нов вработен' : language === 'sq' ? 'Dialog për krijimin e punonjësit të ri' : 'Create new employee dialog',
              { description: language === 'mk' ? 'Формата за нов вработен ќе се отвори' : language === 'sq' ? 'Formulari për punonjësin e ri do të hapet' : 'New employee form will open' }
            );
          }}>
            <Plus className="w-4 h-4 mr-2" />
            {t.common.add}
          </Button>
        )}
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.common.filter} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="active">{t.employees.active}</SelectItem>
            <SelectItem value="on-leave">{t.employees.onLeave}</SelectItem>
            <SelectItem value="terminated">{t.employees.terminated}</SelectItem>
            <SelectItem value="candidate">{t.employees.candidate}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => {
          toast.success(
            language === 'mk' ? 'Извоз на податоци' : language === 'sq' ? 'Eksportimi i të dhënave' : 'Export Data',
            { description: language === 'mk' ? 'Податоците се извезуваат во Excel формат' : language === 'sq' ? 'Të dhënat eksportohen në format Excel' : 'Data is being exported to Excel format' }
          );
        }}>
          <Download className="w-4 h-4 mr-2" />
          {t.common.export}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredEmployees.length} {t.employees.title.toLowerCase()}
        </p>
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {viewMode === 'table' ? (
      <div className="bg-gradient-to-br from-card to-card/95 rounded-lg border-2 border-border/50 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.employees.employeeId}</th>
                <th>{t.employees.fullName}</th>
                <th>{t.employees.position}</th>
                <th>{t.employees.department}</th>
                <th>{t.employees.status}</th>
                <th>{t.employees.hireDate}</th>
                <th>{t.common.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    {t.common.noResults}
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => {
                  const status = statusConfig[employee.status];
                  const risk = riskLevelConfig[employee.riskLevel];
                  return (
                    <tr key={employee.id} className="hover:scale-[1.01] transition-transform duration-200">
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-mono text-sm font-semibold">{employee.employeeId}</span>
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold">{employee.fullName}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{employee.position}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-accent" />
                          <span>{employee.department}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={cn(status.className, 'shadow-sm')}>
                            {status.label[language]}
                          </Badge>
                          {employee.status === 'candidate' && (
                            <Badge variant="outline" className={cn('text-xs shadow-sm', risk.className)}>
                              {risk.label[language]} {t.common.risk}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">{formatDate(employee.hireDate)}</span>
                        </div>
                      </td>
                      <td>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openProfile(employee)}>
                              <Eye className="w-4 h-4 mr-2" />
                              {t.employees.viewProfile}
                            </DropdownMenuItem>
                            {canUpdate && (
                              <DropdownMenuItem onClick={() => {
                                toast.info(
                                  language === 'mk' ? 'Уредување на профил' : language === 'sq' ? 'Redaktimi i profilit' : 'Edit Profile',
                                  { description: language === 'mk' ? `Уредување на профилот на ${employee.fullName}` : language === 'sq' ? `Redaktimi i profilit të ${employee.fullName}` : `Editing profile of ${employee.fullName}` }
                                );
                              }}>
                                <Edit className="w-4 h-4 mr-2" />
                                {t.employees.editProfile}
                              </DropdownMenuItem>
                            )}
                            {canAssignPPE && (
                              <DropdownMenuItem>
                                <HardHat className="w-4 h-4 mr-2" />
                                {t.employees.assignedPPE}
                              </DropdownMenuItem>
                            )}
                            {canUpdate && (
                              <DropdownMenuItem onClick={() => {
                                toast.info(
                                  language === 'mk' ? 'Прикачување документ' : language === 'sq' ? 'Ngarkimi i dokumentit' : 'Upload Document',
                                  { description: language === 'mk' ? `Дијалог за прикачување документ за ${employee.fullName}` : language === 'sq' ? `Dialog për ngarkimin e dokumentit për ${employee.fullName}` : `Upload document dialog for ${employee.fullName}` }
                                );
                              }}>
                                <Upload className="w-4 h-4 mr-2" />
                                {t.employees.uploadDocument}
                              </DropdownMenuItem>
                            )}
                            {canDelete && (
                              <DropdownMenuItem className="text-destructive" onClick={() => {
                                toast.error(
                                  language === 'mk' ? 'Бришење на вработен' : language === 'sq' ? 'Fshirja e punonjësit' : 'Delete Employee',
                                  { description: language === 'mk' ? `Потврдете го бришењето на ${employee.fullName}` : language === 'sq' ? `Konfirmoni fshirjen e ${employee.fullName}` : `Confirm deletion of ${employee.fullName}` }
                                );
                              }}>
                                <FileText className="w-4 h-4 mr-2" />
                                {t.common.delete}
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {t.common.noResults}
            </div>
          ) : (
            filteredEmployees.map((employee) => {
              const status = statusConfig[employee.status];
              const risk = riskLevelConfig[employee.riskLevel];
              
              return (
                <Card
                  key={employee.id}
                  className="border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/95 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-md">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{employee.fullName}</CardTitle>
                          <CardDescription className="text-xs mt-1 font-mono">
                            {employee.employeeId}
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
                          <DropdownMenuItem onClick={() => openProfile(employee)}>
                            <Eye className="w-4 h-4 mr-2" />
                            {t.employees.viewProfile}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{employee.position}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-accent" />
                      <span className="text-sm">{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border/50">
                      <Badge className={cn(status.className, 'shadow-sm')}>
                        {status.label[language]}
                      </Badge>
                      {employee.status === 'candidate' && (
                        <Badge variant="outline" className={cn('text-xs shadow-sm', risk.className)}>
                          {risk.label[language]} {t.common.risk}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {t.employees.hireDate}: {formatDate(employee.hireDate)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEmployee?.fullName}</DialogTitle>
            <DialogDescription>
              {selectedEmployee?.employeeId} • {selectedEmployee?.position}
            </DialogDescription>
          </DialogHeader>

          {selectedEmployee && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">{t.common.overview}</TabsTrigger>
                <TabsTrigger value="medical">{t.employees.medicalExams}</TabsTrigger>
                <TabsTrigger value="training">{t.employees.trainings}</TabsTrigger>
                <TabsTrigger value="ppe">{t.employees.assignedPPE}</TabsTrigger>
                <TabsTrigger value="documents">{t.employees.documents}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        {t.common.personalInfo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedEmployee.photo && (
                        <div className="flex justify-center mb-4">
                          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-primary/20">
                            <img 
                              src={selectedEmployee.photo} 
                              alt={selectedEmployee.fullName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.employeeId}</p>
                        <p className="font-mono">{selectedEmployee.employeeId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.fullName}</p>
                        <p>{selectedEmployee.fullName}</p>
                      </div>
                      {selectedEmployee.firstName && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t.employees.firstName}</p>
                          <p>{selectedEmployee.firstName}</p>
                        </div>
                      )}
                      {selectedEmployee.lastName && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t.employees.lastName}</p>
                          <p>{selectedEmployee.lastName}</p>
                        </div>
                      )}
                      {selectedEmployee.fatherName && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t.employees.fatherName}</p>
                          <p>{selectedEmployee.fatherName}</p>
                        </div>
                      )}
                      {selectedEmployee.placeOfBirth && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t.employees.placeOfBirth}</p>
                          <p>{selectedEmployee.placeOfBirth}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.dateOfBirth}</p>
                        <p>{formatDate(selectedEmployee.dateOfBirth)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.nationality}</p>
                        <p>{selectedEmployee.nationality}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.email}</p>
                        <p>{selectedEmployee.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.phone}</p>
                        <p>{selectedEmployee.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.address}</p>
                        <p>{selectedEmployee.address}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        {t.common.workInfo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.position}</p>
                        <p>{selectedEmployee.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.department}</p>
                        <p>{selectedEmployee.department}</p>
                      </div>
                      {selectedEmployee.location && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t.employees.location}</p>
                          <p>{selectedEmployee.location}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">{t.employees.status}</p>
                        <Badge className={statusConfig[selectedEmployee.status].className}>
                          {statusConfig[selectedEmployee.status].label[language]}
                        </Badge>
                      </div>
                      {selectedEmployee.hireDate && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t.employees.hireDate}</p>
                          <p>{formatDate(selectedEmployee.hireDate)}</p>
                        </div>
                      )}
                      {selectedEmployee.supervisor && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t.common.supervisor}</p>
                          <p>{selectedEmployee.supervisor}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">{t.common.riskLevel}</p>
                        <Badge className={riskLevelConfig[selectedEmployee.riskLevel].className}>
                          {riskLevelConfig[selectedEmployee.riskLevel].label[language]}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        {t.employees.qualifications}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedEmployee.qualifications.map((qual, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {selectedEmployee.assignedEquipment.length > 0 && (
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wrench className="w-5 h-5" />
                          {t.employees.assignedEquipment}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedEmployee.assignedEquipment.map((equipment, idx) => (
                            <Badge key={idx} variant="outline">
                              {equipment}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedEmployee.performanceNotes && (
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          {t.employees.performanceNotes}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{selectedEmployee.performanceNotes}</p>
                      </CardContent>
                    </Card>
                  )}

                  {selectedEmployee.notes && (
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          {t.common.notes}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedEmployee.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4">
                {selectedEmployee.medicalExams.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.common.noData}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {selectedEmployee.medicalExams.map((exam) => {
                      const result = resultConfig[exam.result];
                      const ResultIcon = result.icon;
                      const daysUntil = exam.validUntil ? getDaysUntil(exam.validUntil) : null;
                      return (
                        <Card key={exam.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{exam.examType}</CardTitle>
                              <Badge className={result.className}>
                                <ResultIcon className="w-3 h-3 mr-1" />
                                {result.label[language]}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">{t.employees.examDate}</p>
                                <p className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(exam.examDate)}
                                </p>
                              </div>
                              {exam.validUntil && (
                                <div>
                                  <p className="text-sm text-muted-foreground">{t.employees.validUntil}</p>
                                  <p className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(exam.validUntil)}
                                    {daysUntil !== null && (
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          'ml-2',
                                          daysUntil < 30 && 'badge-warning',
                                          daysUntil < 0 && 'badge-danger'
                                        )}
                                      >
                                        {daysUntil > 0
                                          ? `${daysUntil} ${t.common.days}`
                                          : `${Math.abs(daysUntil)} ${t.common.daysOverdue}`}
                                      </Badge>
                                    )}
                                  </p>
                                </div>
                              )}
                              <div>
                                <p className="text-sm text-muted-foreground">{t.common.doctor}</p>
                                <p>{exam.doctor}</p>
                              </div>
                            </div>
                            {exam.notes && (
                              <div>
                                <p className="text-sm text-muted-foreground">{t.common.notes}</p>
                                <p className="text-sm">{exam.notes}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="training" className="space-y-4">
                {selectedEmployee.trainings.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.common.noData}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {selectedEmployee.trainings.map((training) => {
                      const daysUntil = training.expiryDate ? getDaysUntil(training.expiryDate) : null;
                      const isExpired = daysUntil !== null && daysUntil < 0;
                      const isExpiringSoon = daysUntil !== null && daysUntil >= 0 && daysUntil < 30;
                      return (
                        <Card key={training.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{training.trainingName}</CardTitle>
                              <Badge
                                className={cn(
                                  training.status === 'completed' && 'badge-success',
                                  training.status === 'in-progress' && 'badge-warning',
                                  training.status === 'expired' && 'badge-danger'
                                )}
                              >
                                {training.status === 'completed' && t.common.completed}
                                {training.status === 'in-progress' && t.common.inProgress}
                                {training.status === 'expired' && t.common.expired}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">{t.employees.completionDate}</p>
                                <p className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(training.completionDate)}
                                </p>
                              </div>
                              {training.expiryDate && (
                                <div>
                                  <p className="text-sm text-muted-foreground">{t.employees.expiryDate}</p>
                                  <p className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(training.expiryDate)}
                                    {daysUntil !== null && (
                                      <Badge
                                        variant="outline"
                                        className={cn(
                                          'ml-2',
                                          isExpiringSoon && !isExpired && 'badge-warning',
                                          isExpired && 'badge-danger'
                                        )}
                                      >
                                        {daysUntil > 0
                                          ? `${daysUntil} ${t.common.days}`
                                          : `${Math.abs(daysUntil)} ${t.common.daysOverdue}`}
                                      </Badge>
                                    )}
                                  </p>
                                </div>
                              )}
                              {training.certificateNumber && (
                                <div>
                                  <p className="text-sm text-muted-foreground">{t.common.certificateNumber}</p>
                                  <p className="font-mono text-sm">{training.certificateNumber}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-sm text-muted-foreground">{t.common.instructor}</p>
                                <p>{training.instructor}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ppe" className="space-y-4">
                {selectedEmployee.assignedPPE.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.common.noData}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {selectedEmployee.assignedPPE.map((ppe) => (
                      <Card key={ppe.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <HardHat className="w-5 h-5" />
                              {ppe.ppeItem}
                            </CardTitle>
                            <Badge
                              className={cn(
                                ppe.status === 'valid' && 'badge-success',
                                ppe.status === 'expiringSoon' && 'badge-warning',
                                ppe.status === 'expired' && 'badge-danger'
                              )}
                            >
                              {ppe.status === 'valid' && t.common.valid}
                              {ppe.status === 'expiringSoon' && t.common.expiringSoon}
                              {ppe.status === 'expired' && t.common.expired}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.common.type}</p>
                              <p>{ppe.type}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.employees.issueDate}</p>
                              <p className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(ppe.issueDate)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.employees.expiryDate}</p>
                              <p className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(ppe.expiryDate)}
                                {ppe.daysUntilExpiry !== null && (
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      'ml-2',
                                      ppe.daysUntilExpiry > 0 &&
                                        ppe.daysUntilExpiry < 30 &&
                                        'badge-warning',
                                      ppe.daysUntilExpiry < 0 && 'badge-danger'
                                    )}
                                  >
                                    {ppe.daysUntilExpiry > 0
                                      ? `${ppe.daysUntilExpiry} ${t.common.days}`
                                      : `${Math.abs(ppe.daysUntilExpiry)} ${t.common.daysOverdue}`}
                                  </Badge>
                                )}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-4">
                {selectedEmployee.documents.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.common.noData}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {selectedEmployee.documents.map((doc) => (
                      <Card key={doc.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              {doc.documentName}
                            </CardTitle>
                            <Badge variant="outline">
                              {doc.documentType === 'certificate' && t.employees.certificates}
                              {doc.documentType === 'medical-report' && t.employees.medicalReports}
                              {doc.documentType === 'qualification' && t.employees.qualifications}
                              {doc.documentType === 'other' && t.common.other}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.employees.uploadDate}</p>
                              <p className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(doc.uploadDate)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.common.fileSize}</p>
                              <p>{doc.fileSize}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.common.uploadedBy}</p>
                              <p>{doc.uploadedBy}</p>
                            </div>
                          </div>
                          <div className="pt-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              {t.common.download}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;

