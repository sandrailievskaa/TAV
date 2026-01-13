import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Activity } from '@/data/mockData';
import { Plane, Users, Car, UserCog, Settings, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityFeedProps {
  activities: Activity[];
}

const typeConfig = {
  flight: { icon: Plane, color: 'bg-chart-1/15 text-chart-1' },
  passenger: { icon: Users, color: 'bg-chart-2/15 text-chart-2' },
  vehicle: { icon: Car, color: 'bg-chart-3/15 text-chart-3' },
  staff: { icon: UserCog, color: 'bg-chart-4/15 text-chart-4' },
  system: { icon: Settings, color: 'bg-chart-5/15 text-chart-5' },
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <h3 className="font-semibold mb-4">{t.dashboard.recentActivity}</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 animate-slide-in-left"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className={cn('p-2 rounded-lg flex-shrink-0', config.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {activity.user}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
