import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trainings } from '@/data/trainingData';
import { medicalExaminations } from '@/data/medicalExamData';
import { incidents } from '@/data/incidentData';
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
  FileBarChart,
  Download,
  Calendar,
  Filter,
  Printer,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Stethoscope,
  HardHat,
  Wrench,
  AlertTriangle,
  Grid3x3,
  List,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

type ReportType = 'training' | 'medical' | 'ppe' | 'equipment' | 'incidents';
type ViewMode = 'list' | 'cards';

const Reports: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ReportType>('training');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US'
    );
  };

  // Filter trainings
  const filteredTrainings = trainings.filter((training) => {
    const matchesDate = (!startDate || training.completionDate >= startDate) &&
                       (!endDate || training.completionDate <= endDate);
    const matchesEmployee = employeeFilter === 'all' || training.employeeId === employeeFilter;
    const matchesDepartment = departmentFilter === 'all' || training.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || training.status === statusFilter;
    const matchesType = typeFilter === 'all' || training.trainingType === typeFilter;
    
    return matchesDate && matchesEmployee && matchesDepartment && matchesStatus && matchesType;
  });

  // Filter medical exams
  const filteredMedicalExams = medicalExaminations.filter((exam) => {
    const matchesDate = (!startDate || exam.examDate >= startDate) &&
                       (!endDate || exam.examDate <= endDate);
    const matchesEmployee = employeeFilter === 'all' || exam.employeeId === employeeFilter;
    const matchesDepartment = departmentFilter === 'all' || exam.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    const matchesType = typeFilter === 'all' || exam.examType === typeFilter;
    
    return matchesDate && matchesEmployee && matchesDepartment && matchesStatus && matchesType;
  });

  // Filter incidents
  const filteredIncidents = incidents.filter((incident) => {
    const matchesDate = (!startDate || incident.date >= startDate) &&
                       (!endDate || incident.date <= endDate);
    const matchesEmployee = employeeFilter === 'all' || incident.employeeId === employeeFilter;
    const matchesDepartment = departmentFilter === 'all' || incident.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesType = typeFilter === 'all' || incident.type === typeFilter;
    
    return matchesDate && matchesEmployee && matchesDepartment && matchesStatus && matchesType;
  });

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const toggleAllItems = () => {
    const allIds = activeTab === 'training' 
      ? filteredTrainings.map(t => t.id)
      : activeTab === 'medical'
      ? filteredMedicalExams.map(e => e.id)
      : filteredIncidents.map(i => i.id);
    
    if (selectedItems.length === allIds.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allIds);
    }
  };

  const handleExportExcel = () => {
    // In a real application, this would generate an Excel file
    alert(t.reports.exportToExcel + ' - ' + selectedItems.length + ' items');
  };

  const handleExportPDF = () => {
    // In a real application, this would generate a PDF file
    alert(t.reports.exportToPDF + ' - ' + selectedItems.length + ' items');
  };

  const handlePrint = () => {
    window.print();
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setEmployeeFilter('all');
    setDepartmentFilter('all');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'training':
        return filteredTrainings;
      case 'medical':
        return filteredMedicalExams;
      case 'incidents':
        return filteredIncidents;
      default:
        return [];
    }
  };

  const getUniqueDepartments = () => {
    const data = getCurrentData();
    const depts = new Set(data.map((item: any) => item.department));
    return Array.from(depts);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">{t.reports.title}</h1>
          <p className="page-description">{t.reports.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'cards' : 'list')}>
            {viewMode === 'list' ? <Grid3x3 className="w-4 h-4 mr-2" /> : <List className="w-4 h-4 mr-2" />}
            {viewMode === 'list' ? t.reports.cards : t.reports.list}
          </Button>
          {selectedItems.length > 0 && (
            <>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                {t.reports.printSelected} ({selectedItems.length})
              </Button>
              <Button variant="outline" onClick={handleExportExcel}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                {t.reports.exportToExcel}
              </Button>
              <Button variant="outline" onClick={handleExportPDF}>
                <FileText className="w-4 h-4 mr-2" />
                {t.reports.exportToPDF}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              {t.reports.filters}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              {t.reports.clearFilters}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <Label>{t.reports.startDate}</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>{t.reports.endDate}</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>{t.reports.employee}</Label>
              <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.reports.allEmployees}</SelectItem>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.employeeId}>
                      {emp.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t.reports.department}</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.reports.allDepartments}</SelectItem>
                  {getUniqueDepartments().map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t.reports.status}</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.reports.allStatuses}</SelectItem>
                  {activeTab === 'training' && (
                    <>
                      <SelectItem value="completed">{t.trainings.completed}</SelectItem>
                      <SelectItem value="in-progress">{t.trainings.inProgress}</SelectItem>
                      <SelectItem value="expired">{t.trainings.expired}</SelectItem>
                    </>
                  )}
                  {activeTab === 'medical' && (
                    <>
                      <SelectItem value="valid">{t.medicalExams.valid}</SelectItem>
                      <SelectItem value="expiringSoon">{t.medicalExams.expiringSoon}</SelectItem>
                      <SelectItem value="expired">{t.medicalExams.expired}</SelectItem>
                    </>
                  )}
                  {activeTab === 'incidents' && (
                    <>
                      <SelectItem value="reported">{t.incidents.reported}</SelectItem>
                      <SelectItem value="under-investigation">{t.incidents.underInvestigation}</SelectItem>
                      <SelectItem value="resolved">{t.incidents.resolved}</SelectItem>
                      <SelectItem value="closed">{t.incidents.closed}</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t.reports.type}</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.reports.allTypes}</SelectItem>
                  {activeTab === 'training' && (
                    <>
                      <SelectItem value="internal">{t.trainings.internal}</SelectItem>
                      <SelectItem value="external">{t.trainings.external}</SelectItem>
                    </>
                  )}
                  {activeTab === 'medical' && (
                    <>
                      <SelectItem value="pre-employment">{t.medicalExams.preEmployment}</SelectItem>
                      <SelectItem value="systematic">{t.medicalExams.systematic}</SelectItem>
                      <SelectItem value="periodic">{t.medicalExams.periodic}</SelectItem>
                      <SelectItem value="targeted">{t.medicalExams.targeted}</SelectItem>
                    </>
                  )}
                  {activeTab === 'incidents' && (
                    <>
                      <SelectItem value="injury">{t.incidents.injury}</SelectItem>
                      <SelectItem value="incident">{t.incidents.incident}</SelectItem>
                      <SelectItem value="near-miss">{t.incidents.nearMiss}</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value as ReportType);
        setSelectedItems([]);
      }}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="training">
            <GraduationCap className="w-4 h-4 mr-2" />
            {t.reports.trainingReports}
          </TabsTrigger>
          <TabsTrigger value="medical">
            <Stethoscope className="w-4 h-4 mr-2" />
            {t.reports.medicalExamReports}
          </TabsTrigger>
          <TabsTrigger value="ppe">
            <HardHat className="w-4 h-4 mr-2" />
            {t.reports.ppeReports}
          </TabsTrigger>
          <TabsTrigger value="equipment">
            <Wrench className="w-4 h-4 mr-2" />
            {t.reports.equipmentInspections}
          </TabsTrigger>
          <TabsTrigger value="incidents">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {t.reports.injuryIncidentCards}
          </TabsTrigger>
        </TabsList>

        {/* Training Reports */}
        <TabsContent value="training" className="space-y-4">
          {viewMode === 'list' ? (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedItems.length === filteredTrainings.length && filteredTrainings.length > 0}
                          onCheckedChange={toggleAllItems}
                        />
                      </TableHead>
                      <TableHead>{t.trainings.trainingId}</TableHead>
                      <TableHead>{t.trainings.employee}</TableHead>
                      <TableHead>{t.trainings.trainingName}</TableHead>
                      <TableHead>{t.trainings.completionDate}</TableHead>
                      <TableHead>{t.trainings.expiryDate}</TableHead>
                      <TableHead>{t.trainings.status}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrainings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          {t.reports.noData}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTrainings.map((training) => (
                        <TableRow key={training.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedItems.includes(training.id)}
                              onCheckedChange={() => toggleItemSelection(training.id)}
                            />
                          </TableCell>
                          <TableCell className="font-mono text-sm">{training.trainingId}</TableCell>
                          <TableCell>{training.employeeName}</TableCell>
                          <TableCell>{training.trainingName}</TableCell>
                          <TableCell>{formatDate(training.completionDate)}</TableCell>
                          <TableCell>{formatDate(training.expiryDate)}</TableCell>
                          <TableCell>
                            <Badge className={training.status === 'completed' ? 'badge-success' : training.status === 'expired' ? 'badge-danger' : 'badge-warning'}>
                              {training.status === 'completed' ? t.trainings.completed : training.status === 'expired' ? t.trainings.expired : t.trainings.inProgress}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrainings.map((training) => (
                <Card key={training.id} className={cn(selectedItems.includes(training.id) && 'ring-2 ring-primary')}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{training.trainingName}</CardTitle>
                        <CardDescription>{training.employeeName}</CardDescription>
                      </div>
                      <Checkbox
                        checked={selectedItems.includes(training.id)}
                        onCheckedChange={() => toggleItemSelection(training.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t.trainings.completionDate}</span>
                      <span>{formatDate(training.completionDate)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t.trainings.expiryDate}</span>
                      <span>{formatDate(training.expiryDate)}</span>
                    </div>
                    <Badge className={training.status === 'completed' ? 'badge-success' : training.status === 'expired' ? 'badge-danger' : 'badge-warning'}>
                      {training.status === 'completed' ? t.trainings.completed : training.status === 'expired' ? t.trainings.expired : t.trainings.inProgress}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Medical Exam Reports */}
        <TabsContent value="medical" className="space-y-4">
          {viewMode === 'list' ? (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedItems.length === filteredMedicalExams.length && filteredMedicalExams.length > 0}
                          onCheckedChange={toggleAllItems}
                        />
                      </TableHead>
                      <TableHead>{t.medicalExams.examId}</TableHead>
                      <TableHead>{t.medicalExams.employee}</TableHead>
                      <TableHead>{t.medicalExams.examType}</TableHead>
                      <TableHead>{t.medicalExams.examDate}</TableHead>
                      <TableHead>{t.medicalExams.validUntil}</TableHead>
                      <TableHead>{t.medicalExams.status}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicalExams.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          {t.reports.noData}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMedicalExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedItems.includes(exam.id)}
                              onCheckedChange={() => toggleItemSelection(exam.id)}
                            />
                          </TableCell>
                          <TableCell className="font-mono text-sm">{exam.examId}</TableCell>
                          <TableCell>{exam.employeeName}</TableCell>
                          <TableCell>{exam.examType}</TableCell>
                          <TableCell>{formatDate(exam.examDate)}</TableCell>
                          <TableCell>{formatDate(exam.validUntil)}</TableCell>
                          <TableCell>
                            <Badge className={exam.status === 'valid' ? 'badge-success' : exam.status === 'expired' ? 'badge-danger' : 'badge-warning'}>
                              {exam.status === 'valid' ? t.medicalExams.valid : exam.status === 'expired' ? t.medicalExams.expired : t.medicalExams.expiringSoon}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedicalExams.map((exam) => (
                <Card key={exam.id} className={cn(selectedItems.includes(exam.id) && 'ring-2 ring-primary')}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{exam.examType}</CardTitle>
                        <CardDescription>{exam.employeeName}</CardDescription>
                      </div>
                      <Checkbox
                        checked={selectedItems.includes(exam.id)}
                        onCheckedChange={() => toggleItemSelection(exam.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t.medicalExams.examDate}</span>
                      <span>{formatDate(exam.examDate)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t.medicalExams.validUntil}</span>
                      <span>{formatDate(exam.validUntil)}</span>
                    </div>
                    <Badge className={exam.status === 'valid' ? 'badge-success' : exam.status === 'expired' ? 'badge-danger' : 'badge-warning'}>
                      {exam.status === 'valid' ? t.medicalExams.valid : exam.status === 'expired' ? t.medicalExams.expired : t.medicalExams.expiringSoon}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* PPE Reports - Placeholder */}
        <TabsContent value="ppe" className="space-y-4">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {t.reports.noData}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Equipment Inspections - Placeholder */}
        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              {t.reports.noData}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Injury & Incident Cards */}
        <TabsContent value="incidents" className="space-y-4">
          {viewMode === 'list' ? (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedItems.length === filteredIncidents.length && filteredIncidents.length > 0}
                          onCheckedChange={toggleAllItems}
                        />
                      </TableHead>
                      <TableHead>{t.incidents.incidentId}</TableHead>
                      <TableHead>{t.incidents.type}</TableHead>
                      <TableHead>{t.incidents.date}</TableHead>
                      <TableHead>{t.incidents.employee}</TableHead>
                      <TableHead>{t.incidents.severity}</TableHead>
                      <TableHead>{t.incidents.status}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          {t.reports.noData}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredIncidents.map((incident) => (
                        <TableRow key={incident.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedItems.includes(incident.id)}
                              onCheckedChange={() => toggleItemSelection(incident.id)}
                            />
                          </TableCell>
                          <TableCell className="font-mono text-sm">{incident.incidentId}</TableCell>
                          <TableCell>
                            <Badge className={incident.type === 'injury' ? 'badge-danger' : incident.type === 'incident' ? 'badge-warning' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'}>
                              {incident.type === 'injury' ? t.incidents.injury : incident.type === 'incident' ? t.incidents.incident : t.incidents.nearMiss}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(incident.date)}</TableCell>
                          <TableCell>{incident.employeeName}</TableCell>
                          <TableCell>
                            <Badge className={incident.severity === 'critical' || incident.severity === 'serious' ? 'badge-danger' : incident.severity === 'moderate' ? 'badge-warning' : 'badge-success'}>
                              {incident.severity === 'critical' ? t.incidents.critical : incident.severity === 'serious' ? t.incidents.serious : incident.severity === 'moderate' ? t.incidents.moderate : t.incidents.minor}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={incident.status === 'resolved' || incident.status === 'closed' ? 'badge-success' : 'badge-warning'}>
                              {incident.status === 'reported' ? t.incidents.reported : incident.status === 'under-investigation' ? t.incidents.underInvestigation : incident.status === 'resolved' ? t.incidents.resolved : t.incidents.closed}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIncidents.map((incident) => (
                <Card key={incident.id} className={cn(selectedItems.includes(incident.id) && 'ring-2 ring-primary')}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{incident.incidentId}</CardTitle>
                        <CardDescription>{incident.employeeName}</CardDescription>
                      </div>
                      <Checkbox
                        checked={selectedItems.includes(incident.id)}
                        onCheckedChange={() => toggleItemSelection(incident.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={incident.type === 'injury' ? 'badge-danger' : incident.type === 'incident' ? 'badge-warning' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'}>
                        {incident.type === 'injury' ? t.incidents.injury : incident.type === 'incident' ? t.incidents.incident : t.incidents.nearMiss}
                      </Badge>
                      <Badge className={incident.severity === 'critical' || incident.severity === 'serious' ? 'badge-danger' : incident.severity === 'moderate' ? 'badge-warning' : 'badge-success'}>
                        {incident.severity === 'critical' ? t.incidents.critical : incident.severity === 'serious' ? t.incidents.serious : incident.severity === 'moderate' ? t.incidents.moderate : t.incidents.minor}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t.incidents.date}</span>
                      <span>{formatDate(incident.date)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t.incidents.location}</span>
                      <span className="text-right">{incident.location}</span>
                    </div>
                    <Badge className={incident.status === 'resolved' || incident.status === 'closed' ? 'badge-success' : 'badge-warning'}>
                      {incident.status === 'reported' ? t.incidents.reported : incident.status === 'under-investigation' ? t.incidents.underInvestigation : incident.status === 'resolved' ? t.incidents.resolved : t.incidents.closed}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
