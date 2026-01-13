import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import StatCard from '@/components/dashboard/StatCard';
import FlightTable from '@/components/dashboard/FlightTable';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import PassengerFlowChart from '@/components/dashboard/PassengerFlowChart';
import FlightStatusChart from '@/components/dashboard/FlightStatusChart';
import { Plane, Users, UserCog, Car } from 'lucide-react';
import { flights, recentActivities, dashboardStats } from '@/data/mockData';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">{t.dashboard.title}</h1>
        <p className="page-description">{t.dashboard.subtitle}</p>
      </div>

      {/* Stats Grid */}
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
