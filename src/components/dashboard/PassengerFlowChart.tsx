import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { passengerFlowData } from '@/data/mockData';

const PassengerFlowChart: React.FC = () => {
  const { t, language } = useLanguage();

  const legendLabels = {
    arrivals: { en: 'Arrivals', mk: 'Пристигнувања', sq: 'Arritjet' },
    departures: { en: 'Departures', mk: 'Заминувања', sq: 'Nisjet' },
  };

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <h3 className="font-semibold mb-4">{t.dashboard.passengerFlow}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={passengerFlowData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorArrivals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDepartures" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend
              formatter={(value: string) =>
                legendLabels[value as keyof typeof legendLabels]?.[language] || value
              }
            />
            <Area
              type="monotone"
              dataKey="arrivals"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorArrivals)"
            />
            <Area
              type="monotone"
              dataKey="departures"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDepartures)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PassengerFlowChart;
