import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary',
}) => {
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');
  const isNeutral = change === '0';

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label">{title}</p>
          <p className="stat-value mt-1">{value}</p>
        </div>
        <div
          className={cn(
            'p-2.5 rounded-xl transition-colors',
            'bg-primary/10 group-hover:bg-primary/15',
            iconColor
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1.5 mt-3">
          <TrendIcon
            className={cn(
              'w-4 h-4',
              isPositive && 'text-success',
              isNegative && 'text-destructive',
              isNeutral && 'text-muted-foreground'
            )}
          />
          <span
            className={cn(
              'text-sm font-medium',
              isPositive && 'text-success',
              isNegative && 'text-destructive',
              isNeutral && 'text-muted-foreground'
            )}
          >
            {change}
          </span>
          <span className="text-sm text-muted-foreground">vs yesterday</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
