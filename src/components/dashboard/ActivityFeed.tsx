import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Activity } from '@/data/mockData';
import { Plane, Users, Car, UserCog, Settings, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityFeedProps {
  activities: Activity[];
}

const typeConfig = {
  flight: { 
    icon: Plane, 
    color: 'bg-gradient-to-br from-blue-500/20 via-blue-400/15 to-indigo-500/20 text-blue-600 dark:text-blue-400 border-blue-300/30 dark:border-blue-700/30',
    bgGradient: 'from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20'
  },
  passenger: { 
    icon: Users, 
    color: 'bg-gradient-to-br from-cyan-500/20 via-teal-400/15 to-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-300/30 dark:border-cyan-700/30',
    bgGradient: 'from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20'
  },
  vehicle: { 
    icon: Car, 
    color: 'bg-gradient-to-br from-emerald-500/20 via-green-400/15 to-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-300/30 dark:border-emerald-700/30',
    bgGradient: 'from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20'
  },
  staff: { 
    icon: UserCog, 
    color: 'bg-gradient-to-br from-amber-500/20 via-orange-400/15 to-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-300/30 dark:border-amber-700/30',
    bgGradient: 'from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20'
  },
  system: { 
    icon: Settings, 
    color: 'bg-gradient-to-br from-purple-500/20 via-violet-400/15 to-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-300/30 dark:border-purple-700/30',
    bgGradient: 'from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20'
  },
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-card to-card/95 rounded-lg border-2 border-border/50 p-5 shadow-lg">
      <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-border/50">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 shadow-sm">
          <Clock className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-bold text-lg bg-gradient-to-br from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
          {t.dashboard.recentActivity}
        </h3>
      </div>
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-md animate-slide-in-left',
                `bg-gradient-to-r ${config.bgGradient} border-border/30 hover:border-border/60`
              )}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className={cn('p-2.5 rounded-lg flex-shrink-0 border-2 shadow-sm', config.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-relaxed">{activity.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{activity.timestamp}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-muted-foreground">
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
