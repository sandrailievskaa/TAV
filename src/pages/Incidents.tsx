import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  incidents,
  WorkplaceIncident,
  IncidentType,
  calculateAFR,
  calculateASR,
  severityConfig,
  statusConfig as incidentStatusConfig,
  typeConfig,
} from '@/data/incidentData';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Upload,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Paperclip,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const Incidents: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<IncidentType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [selectedIncident, setSelectedIncident] = useState<WorkplaceIncident | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isAFRDialogOpen, setIsAFRDialogOpen] = useState(false);
  const [afrPeriod, setAfrPeriod] = useState('2025');
  const [afrTotalHours, setAfrTotalHours] = useState('200000');
  const [reportType, setReportType] = useState<'period' | 'employee' | 'severity'>('period');
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.incidentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || incident.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || incident.severity === severityFilter;

    return matchesSearch && matchesType && matchesStatus && matchesSeverity;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US'
    );
  };

  const openIncidentDetail = (incident: WorkplaceIncident) => {
    setSelectedIncident(incident);
    setIsDetailDialogOpen(true);
  };

  // Calculate AFR and ASR
  const injuries = filteredIncidents.filter((inc) => inc.type === 'injury');
  const totalLostDays = filteredIncidents.reduce((sum, inc) => sum + inc.lostWorkDays, 0);
  const totalLostHours = filteredIncidents.reduce((sum, inc) => sum + inc.lostWorkHours, 0);
  const totalHours = Number(afrTotalHours) || 200000;
  const afr = calculateAFR(injuries.length, totalHours);
  const asr = calculateASR(totalLostDays, totalHours);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.incidents.title}</h1>
          <p className="page-description">{t.incidents.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAFRDialogOpen(true)}>
            <Calculator className="w-4 h-4 mr-2" />
            {t.incidents.afr} / {t.incidents.asr}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t.common.add}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => {
                toast.info(
                  language === 'mk' ? 'Регистрација на повреда' : language === 'sq' ? 'Regjistrimi i lëndimit' : 'Register Injury',
                  { description: language === 'mk' ? 'Дијалог за регистрација на нова повреда' : language === 'sq' ? 'Dialog për regjistrimin e lëndimit të ri' : 'Dialog for registering new injury' }
                );
              }}>{t.incidents.addInjury}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                toast.info(
                  language === 'mk' ? 'Регистрација на инцидент' : language === 'sq' ? 'Regjistrimi i incidentit' : 'Register Incident',
                  { description: language === 'mk' ? 'Дијалог за регистрација на нов инцидент' : language === 'sq' ? 'Dialog për regjistrimin e incidentit të ri' : 'Dialog for registering new incident' }
                );
              }}>{t.incidents.addIncident}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                toast.info(
                  language === 'mk' ? 'Регистрација на Near Miss' : language === 'sq' ? 'Regjistrimi i Near Miss' : 'Register Near Miss',
                  { description: language === 'mk' ? 'Дијалог за регистрација на нов Near Miss' : language === 'sq' ? 'Dialog për regjistrimin e Near Miss të ri' : 'Dialog for registering new near miss' }
                );
              }}>{t.incidents.addNearMiss}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.incidents.totalInjuries}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{injuries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.incidents.totalLostDays}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLostDays}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.incidents.afr}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{afr.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.incidents.asr}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{asr.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

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
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as IncidentType | 'all')}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder={t.incidents.type} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="injury">{t.incidents.injury}</SelectItem>
            <SelectItem value="incident">{t.incidents.incident}</SelectItem>
            <SelectItem value="near-miss">{t.incidents.nearMiss}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t.common.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="reported">{t.incidents.reported}</SelectItem>
            <SelectItem value="under-investigation">{t.incidents.underInvestigation}</SelectItem>
            <SelectItem value="resolved">{t.incidents.resolved}</SelectItem>
            <SelectItem value="closed">{t.incidents.closed}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t.incidents.severity} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.common.all}</SelectItem>
            <SelectItem value="minor">{t.incidents.minor}</SelectItem>
            <SelectItem value="moderate">{t.incidents.moderate}</SelectItem>
            <SelectItem value="serious">{t.incidents.serious}</SelectItem>
            <SelectItem value="critical">{t.incidents.critical}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsReportDialogOpen(true)}
        >
          <FileText className="w-4 h-4 mr-2" />
          {t.incidents.reports}
        </Button>
        <p className="text-sm text-muted-foreground">
          {filteredIncidents.length} {t.incidents.incident.toLowerCase()}
        </p>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.incidents.incidentId}</TableHead>
                <TableHead>{t.incidents.type}</TableHead>
                <TableHead>{t.incidents.date}</TableHead>
                <TableHead>{t.incidents.employee}</TableHead>
                <TableHead>{t.incidents.location}</TableHead>
                <TableHead>{t.incidents.severity}</TableHead>
                <TableHead>{t.incidents.status}</TableHead>
                <TableHead>{t.incidents.lostWorkDays}</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    {t.common.noResults}
                  </TableCell>
                </TableRow>
              ) : (
                filteredIncidents.map((incident) => {
                  const severity = severityConfig[incident.severity];
                  const status = incidentStatusConfig[incident.status];
                  const type = typeConfig[incident.type];

                  return (
                    <TableRow key={incident.id}>
                      <TableCell className="font-mono text-sm">{incident.incidentId}</TableCell>
                      <TableCell>
                        <Badge className={type.className}>{type.label[language]}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {formatDate(incident.date)} {incident.time}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{incident.employeeName}</TableCell>
                      <TableCell>{incident.location}</TableCell>
                      <TableCell>
                        <Badge className={severity.className}>{severity.label[language]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.className}>{status.label[language]}</Badge>
                      </TableCell>
                      <TableCell>
                        {incident.lostWorkDays > 0 ? (
                          <span className="font-medium text-red-600 dark:text-red-400">
                            {incident.lostWorkDays} {t.common.days}
                          </span>
                        ) : (
                          '-'
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
                            <DropdownMenuItem onClick={() => openIncidentDetail(incident)}>
                              <Eye className="w-4 h-4 mr-2" />
                              {t.incidents.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              {t.incidents.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="w-4 h-4 mr-2" />
                              {t.incidents.delete}
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

      {/* Incident Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedIncident?.incidentId}</DialogTitle>
            <DialogDescription>
              {selectedIncident?.employeeName} • {selectedIncident?.location}
            </DialogDescription>
          </DialogHeader>

          {selectedIncident && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">{t.common.overview}</TabsTrigger>
                <TabsTrigger value="analysis">{t.incidents.rootCauseAnalysis}</TabsTrigger>
                <TabsTrigger value="actions">{t.incidents.correctiveActions}</TabsTrigger>
                <TabsTrigger value="budget">{t.incidents.budgetImpact}</TabsTrigger>
                <TabsTrigger value="attachments">{t.incidents.attachments}</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.incidents.incident}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.type}</p>
                        <Badge className={typeConfig[selectedIncident.type].className}>
                          {typeConfig[selectedIncident.type].label[language]}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.date}</p>
                        <p>{formatDate(selectedIncident.date)} {selectedIncident.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.location}</p>
                        <p>{selectedIncident.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.employee}</p>
                        <p>{selectedIncident.employeeName} ({selectedIncident.employeeId})</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.common.department}</p>
                        <p>{selectedIncident.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.reportedBy}</p>
                        <p>{selectedIncident.reportedBy} ({selectedIncident.reportedByPosition})</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t.common.details}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.severity}</p>
                        <Badge className={severityConfig[selectedIncident.severity].className}>
                          {severityConfig[selectedIncident.severity].label[language]}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.status}</p>
                        <Badge className={incidentStatusConfig[selectedIncident.status].className}>
                          {incidentStatusConfig[selectedIncident.status].label[language]}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.medicalTreatment || 'Treatment'}</p>
                        <p>{selectedIncident.treatmentType.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.lostWorkDays}</p>
                        <p>{selectedIncident.lostWorkDays} {t.common.days}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.incidents.lostWorkHours}</p>
                        <p>{selectedIncident.lostWorkHours} {t.common.hours}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>{t.incidents.description}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedIncident.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Root Cause Analysis Tab */}
              <TabsContent value="analysis" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.incidents.rootCause}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedIncident.rootCause}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{t.incidents.contributingFactors}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedIncident.contributingFactors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 mt-0.5 text-warning flex-shrink-0" />
                          <span className="text-sm">{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Corrective Actions Tab */}
              <TabsContent value="actions" className="space-y-4">
                {selectedIncident.correctiveActions.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.common.noData}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {selectedIncident.correctiveActions.map((action) => (
                      <Card key={action.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{action.action}</CardTitle>
                            <Badge
                              className={cn(
                                action.status === 'completed' && 'badge-success',
                                action.status === 'pending' && 'badge-warning'
                              )}
                            >
                              {action.status === 'completed' ? t.incidents.completed : t.incidents.pending}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.incidents.responsible}</p>
                              <p>{action.responsible}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.incidents.dueDate}</p>
                              <p className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(action.dueDate)}
                              </p>
                            </div>
                            {action.completedDate && (
                              <div>
                                <p className="text-sm text-muted-foreground">{t.common.completed}</p>
                                <p className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(action.completedDate)}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Budget Impact Tab */}
              <TabsContent value="budget" className="space-y-4">
                {selectedIncident.budgetImpact ? (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calculator className="w-5 h-5" />
                          {t.incidents.budgetImpactReport}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <span className="text-sm text-muted-foreground">{t.incidents.medicalCosts}</span>
                              <span className="font-medium">€{selectedIncident.budgetImpact.medicalCosts.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <span className="text-sm text-muted-foreground">{t.incidents.equipmentDamage}</span>
                              <span className="font-medium">€{selectedIncident.budgetImpact.equipmentDamage.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <span className="text-sm text-muted-foreground">{t.incidents.investigationCosts}</span>
                              <span className="font-medium">€{selectedIncident.budgetImpact.investigationCosts.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <span className="text-sm text-muted-foreground">{t.incidents.correctiveActionCosts}</span>
                              <span className="font-medium">€{selectedIncident.budgetImpact.correctiveActionCosts.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <span className="text-sm text-muted-foreground">{t.incidents.lostProductivity}</span>
                              <span className="font-medium">€{selectedIncident.budgetImpact.lostProductivity.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="pt-4 border-t border-border">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                              <span className="text-lg font-semibold">{t.incidents.totalCost}</span>
                              <span className="text-2xl font-bold text-primary">€{selectedIncident.budgetImpact.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.common.noData}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Attachments Tab */}
              <TabsContent value="attachments" className="space-y-4">
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    {t.incidents.uploadAttachment}
                  </Button>
                </div>
                {selectedIncident.attachments.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.common.noData}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {selectedIncident.attachments.map((attachment) => (
                      <Card key={attachment.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Paperclip className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{attachment.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {attachment.type} • {attachment.fileSize} • {formatDate(attachment.uploadDate)}
                                </p>
                              </div>
                            </div>
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

      {/* AFR/ASR Calculation Dialog */}
      <Dialog open={isAFRDialogOpen} onOpenChange={setIsAFRDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.incidents.accidentFrequencyRate} / {t.incidents.accidentSeverityRate}</DialogTitle>
            <DialogDescription>{t.incidents.calculate}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.incidents.period}</Label>
              <Input
                value={afrPeriod}
                onChange={(e) => setAfrPeriod(e.target.value)}
                placeholder="2025"
                className="mt-1"
              />
            </div>
            <div>
              <Label>{t.incidents.totalHours}</Label>
              <Input
                type="number"
                value={afrTotalHours}
                onChange={(e) => setAfrTotalHours(e.target.value)}
                placeholder="200000"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">{t.incidents.afr}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{afr.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ({injuries.length} {t.incidents.injury.toLowerCase()} × 1,000,000) / {totalHours.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">{t.incidents.asr}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{asr.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    ({totalLostDays} {t.common.days} × 1,000,000) / {totalHours.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsAFRDialogOpen(false)}>
                {t.common.close}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reports Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.incidents.reports}</DialogTitle>
            <DialogDescription>{t.incidents.reports}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.common.reportType || 'Report Type'}</Label>
              <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="period">{t.incidents.reportByPeriod}</SelectItem>
                  <SelectItem value="employee">{t.incidents.reportByEmployee}</SelectItem>
                  <SelectItem value="severity">{t.incidents.reportBySeverity}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {reportType === 'period' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.incidents.startDate}</Label>
                  <Input
                    type="date"
                    value={reportStartDate}
                    onChange={(e) => setReportStartDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>{t.incidents.endDate}</Label>
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
    </div>
  );
};

export default Incidents;

