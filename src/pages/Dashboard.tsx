import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useRBAC } from '@/contexts/RBACContext';
import StatCard from '@/components/dashboard/StatCard';
import FlightTable from '@/components/dashboard/FlightTable';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import PassengerFlowChart from '@/components/dashboard/PassengerFlowChart';
import FlightStatusChart from '@/components/dashboard/FlightStatusChart';
import {
  Plane,
  Users,
  UserCog,
  Car,
  GraduationCap,
  Stethoscope,
  HardHat,
  Wrench,
  AlertTriangle,
  Clock,
  Calendar,
  TrendingDown,
} from 'lucide-react';
import { flights, recentActivities, dashboardStats, vehicles } from '@/data/mockData';
import { trainings } from '@/data/trainingData';
import { medicalExaminations } from '@/data/medicalExamData';
import { incidents } from '@/data/incidentData';
import { employees } from '@/data/employeeData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExpirationAlert {
  id: string;
  type: 'training' | 'medical' | 'ppe' | 'equipment';
  name: string;
  employeeName?: string;
  expiryDate: string;
  daysUntil: number;
  category: 'expired' | 'tomorrow' | '30days';
}

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { user } = useRBAC();
  
  const isEmployeeRole = user?.role === 'employee';
  const employeeId = user?.employeeId;

  const getDaysUntil = (dateString: string): number => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const expirationAlerts = useMemo((): ExpirationAlert[] => {
    const alerts: ExpirationAlert[] = [];

    trainings.forEach((training) => {
      if (training.expiryDate) {
        const daysUntil = getDaysUntil(training.expiryDate);
        if (daysUntil <= 30) {
          alerts.push({
            id: `training-${training.id}`,
            type: 'training',
            name: training.trainingName,
            employeeName: training.employeeName,
            expiryDate: training.expiryDate,
            daysUntil,
            category: daysUntil < 0 ? 'expired' : daysUntil === 0 ? 'tomorrow' : '30days',
          });
        }
      }
    });

    medicalExaminations.forEach((exam) => {
      const daysUntil = exam.daysUntilExpiry;
      if (daysUntil <= 30) {
        alerts.push({
          id: `medical-${exam.id}`,
          type: 'medical',
          name: exam.examType,
          employeeName: exam.employeeName,
          expiryDate: exam.validUntil,
          daysUntil,
          category: daysUntil < 0 ? 'expired' : daysUntil === 0 ? 'tomorrow' : '30days',
        });
      }
    });

    employees.forEach((employee) => {
      employee.assignedPPE.forEach((ppe) => {
        const daysUntil = ppe.daysUntilExpiry;
        if (daysUntil <= 30) {
          alerts.push({
            id: `ppe-${employee.id}-${ppe.id}`,
            type: 'ppe',
            name: ppe.ppeItem,
            employeeName: employee.fullName,
            expiryDate: ppe.expiryDate,
            daysUntil,
            category: daysUntil < 0 ? 'expired' : daysUntil === 0 ? 'tomorrow' : '30days',
          });
        }
      });
    });

    vehicles.forEach((vehicle) => {
      if (vehicle.inspectionExpiry) {
        const daysUntil = getDaysUntil(vehicle.inspectionExpiry);
        if (daysUntil <= 30) {
          alerts.push({
            id: `equipment-${vehicle.id}-inspection`,
            type: 'equipment',
            name: `${vehicle.type} - Inspection`,
            expiryDate: vehicle.inspectionExpiry,
            daysUntil,
            category: daysUntil < 0 ? 'expired' : daysUntil === 0 ? 'tomorrow' : '30days',
          });
        }
      }
      if (vehicle.insuranceExpiry) {
        const daysUntil = getDaysUntil(vehicle.insuranceExpiry);
        if (daysUntil <= 30) {
          alerts.push({
            id: `equipment-${vehicle.id}-insurance`,
            type: 'equipment',
            name: `${vehicle.type} - Insurance`,
            expiryDate: vehicle.insuranceExpiry,
            daysUntil,
            category: daysUntil < 0 ? 'expired' : daysUntil === 0 ? 'tomorrow' : '30days',
          });
        }
      }
    });

    return alerts.sort((a, b) => a.daysUntil - b.daysUntil);
  }, []);

  const summaryCounters = useMemo(() => {
    const expiredTrainings = trainings.filter(
      (t) => t.expiryDate && getDaysUntil(t.expiryDate) < 0
    ).length;
    const expiringSoonTrainings = trainings.filter(
      (t) => t.expiryDate && getDaysUntil(t.expiryDate) >= 0 && getDaysUntil(t.expiryDate) <= 30
    ).length;

    const expiredMedical = medicalExaminations.filter((e) => e.daysUntilExpiry < 0).length;
    const expiringSoonMedical = medicalExaminations.filter(
      (e) => e.daysUntilExpiry >= 0 && e.daysUntilExpiry <= 30
    ).length;

    const expiredPPE = employees.reduce(
      (sum, emp) => sum + emp.assignedPPE.filter((ppe) => ppe.daysUntilExpiry < 0).length,
      0
    );
    const expiringSoonPPE = employees.reduce(
      (sum, emp) => sum + emp.assignedPPE.filter((ppe) => ppe.daysUntilExpiry >= 0 && ppe.daysUntilExpiry <= 30).length,
      0
    );

    const expiredEquipment = vehicles.filter(
      (v) =>
        (v.inspectionExpiry && getDaysUntil(v.inspectionExpiry) < 0) ||
        (v.insuranceExpiry && getDaysUntil(v.insuranceExpiry) < 0)
    ).length;
    const expiringSoonEquipment = vehicles.filter(
      (v) =>
        (v.inspectionExpiry &&
          getDaysUntil(v.inspectionExpiry) >= 0 &&
          getDaysUntil(v.inspectionExpiry) <= 30) ||
        (v.insuranceExpiry &&
          getDaysUntil(v.insuranceExpiry) >= 0 &&
          getDaysUntil(v.insuranceExpiry) <= 30)
    ).length;

    return {
      trainings: { expired: expiredTrainings, expiringSoon: expiringSoonTrainings },
      medicalExams: { expired: expiredMedical, expiringSoon: expiringSoonMedical },
      ppe: { expired: expiredPPE, expiringSoon: expiringSoonPPE },
      equipment: { expired: expiredEquipment, expiringSoon: expiringSoonEquipment },
      totalExpired: expiredTrainings + expiredMedical + expiredPPE + expiredEquipment,
      totalExpiringSoon: expiringSoonTrainings + expiringSoonMedical + expiringSoonPPE + expiringSoonEquipment,
    };
  }, []);

  const lostWorkStats = useMemo(() => {
    const totalLostHours = incidents.reduce((sum, inc) => sum + inc.lostWorkHours, 0);
    const totalLostDays = incidents.reduce((sum, inc) => sum + inc.lostWorkDays, 0);
    const totalLostHoursFromDays = totalLostDays * 8;
    const totalLostHoursCombined = totalLostHours + totalLostHoursFromDays;

    return {
      totalLostHours,
      totalLostDays,
      totalLostHoursCombined,
    };
  }, []);

  const expiredAlerts = expirationAlerts.filter((a) => a.category === 'expired');
  const tomorrowAlerts = expirationAlerts.filter((a) => a.category === 'tomorrow');
  const thirtyDaysAlerts = expirationAlerts.filter((a) => a.category === '30days');

  const getAlertIcon = (type: ExpirationAlert['type']) => {
    switch (type) {
      case 'training':
        return GraduationCap;
      case 'medical':
        return Stethoscope;
      case 'ppe':
        return HardHat;
      case 'equipment':
        return Wrench;
    }
  };

  const getAlertColor = (category: ExpirationAlert['category']) => {
    switch (category) {
      case 'expired':
        return 'border-red-500 bg-red-50 dark:bg-red-950/20';
      case 'tomorrow':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-950/20';
      case '30days':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'mk' ? 'mk-MK' : language === 'sq' ? 'sq-AL' : 'en-US'
    );
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">{t.dashboard.title}</h1>
        <p className="page-description">{t.dashboard.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t.dashboard.totalFlights}
          value={dashboardStats.totalFlights}
          change={dashboardStats.flightsChange}
          icon={Plane}
        />
        <StatCard
          title={t.dashboard.activePassengers}
          value={dashboardStats.activePassengers.toLocaleString()}
          change={dashboardStats.passengersChange}
          icon={Users}
        />
        <StatCard
          title={t.dashboard.staffOnDuty}
          value={dashboardStats.staffOnDuty}
          change={dashboardStats.staffChange}
          icon={UserCog}
        />
        <StatCard
          title={t.dashboard.vehiclesActive}
          value={dashboardStats.vehiclesActive}
          change={dashboardStats.vehiclesChange}
          icon={Car}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              {t.dashboard.trainings}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.expired}</span>
                <Badge variant="outline" className="badge-danger">
                  {summaryCounters.trainings.expired}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.expiring30Days}</span>
                <Badge variant="outline" className="badge-warning">
                  {summaryCounters.trainings.expiringSoon}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              {t.dashboard.medicalExams}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.expired}</span>
                <Badge variant="outline" className="badge-danger">
                  {summaryCounters.medicalExams.expired}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.expiring30Days}</span>
                <Badge variant="outline" className="badge-warning">
                  {summaryCounters.medicalExams.expiringSoon}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <HardHat className="w-4 h-4" />
              {t.dashboard.ppe}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.expired}</span>
                <Badge variant="outline" className="badge-danger">
                  {summaryCounters.ppe.expired}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.expiring30Days}</span>
                <Badge variant="outline" className="badge-warning">
                  {summaryCounters.ppe.expiringSoon}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              {t.dashboard.equipment}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.expired}</span>
                <Badge variant="outline" className="badge-danger">
                  {summaryCounters.equipment.expired}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.expiring30Days}</span>
                <Badge variant="outline" className="badge-warning">
                  {summaryCounters.equipment.expiringSoon}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {t.dashboard.lostWorkHours}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.totalLostHours}</span>
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  {lostWorkStats.totalLostHoursCombined.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.dashboard.totalLostDays}</span>
                <span className="text-sm font-medium">{lostWorkStats.totalLostDays}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {expirationAlerts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              {t.dashboard.expirationAlerts}
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigate('/reports')}>
              {t.dashboard.viewDetails}
            </Button>
          </div>

          {expiredAlerts.length > 0 && (
            <Card className={getAlertColor('expired')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  {t.dashboard.expired} ({expiredAlerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {expiredAlerts.slice(0, 5).map((alert) => {
                    const Icon = getAlertIcon(alert.type);
                    return (
                      <div key={alert.id} className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-black/20">
                        <div className="flex items-center gap-2 flex-1">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{alert.name}</p>
                            {alert.employeeName && (
                              <p className="text-xs text-muted-foreground truncate">{alert.employeeName}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="badge-danger text-xs">
                            {Math.abs(alert.daysUntil)} {t.common.daysOverdue}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(alert.expiryDate)}</span>
                        </div>
                      </div>
                    );
                  })}
                  {expiredAlerts.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      +{expiredAlerts.length - 5} {t.common.more || 'more'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {tomorrowAlerts.length > 0 && (
            <Card className={getAlertColor('tomorrow')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  {t.dashboard.expiringTomorrow} ({tomorrowAlerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tomorrowAlerts.slice(0, 5).map((alert) => {
                    const Icon = getAlertIcon(alert.type);
                    return (
                      <div key={alert.id} className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-black/20">
                        <div className="flex items-center gap-2 flex-1">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{alert.name}</p>
                            {alert.employeeName && (
                              <p className="text-xs text-muted-foreground truncate">{alert.employeeName}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="badge-warning text-xs">
                            {t.dashboard.expiringTomorrow}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(alert.expiryDate)}</span>
                        </div>
                      </div>
                    );
                  })}
                  {tomorrowAlerts.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      +{tomorrowAlerts.length - 5} {t.common.more || 'more'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {thirtyDaysAlerts.length > 0 && (
            <Card className={getAlertColor('30days')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  {t.dashboard.expiring30Days} ({thirtyDaysAlerts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {thirtyDaysAlerts.slice(0, 5).map((alert) => {
                    const Icon = getAlertIcon(alert.type);
                    return (
                      <div key={alert.id} className="flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-black/20">
                        <div className="flex items-center gap-2 flex-1">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{alert.name}</p>
                            {alert.employeeName && (
                              <p className="text-xs text-muted-foreground truncate">{alert.employeeName}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="badge-warning text-xs">
                            {alert.daysUntil} {t.common.days}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(alert.expiryDate)}</span>
                        </div>
                      </div>
                    );
                  })}
                  {thirtyDaysAlerts.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      +{thirtyDaysAlerts.length - 5} {t.common.more || 'more'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PassengerFlowChart />
        </div>
        <div>
          <FlightStatusChart />
        </div>
      </div>

      {/* Table and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">{t.dashboard.upcomingDepartures}</h3>
            <a
              href="/flights"
              className="text-sm text-primary hover:underline"
            >
              {t.common.view} {t.common.all.toLowerCase()}
            </a>
          </div>
          <FlightTable flights={flights} limit={5} />
        </div>
        <div>
          <ActivityFeed activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
