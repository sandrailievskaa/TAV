import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { flightStatusDistribution } from '@/data/mockData';

const FlightStatusChart: React.FC = () => {
  const { t, language } = useLanguage();

  const statusLabels: Record<string, string> = {
    'On Time': t.flights.onTime,
    'Delayed': t.flights.delayed,
    'Cancelled': t.flights.cancelled,
    'Boarding': t.flights.boarding,
  };

  const localizedData = flightStatusDistribution.map(item => ({
    ...item,
    name: statusLabels[item.name] || item.name,
  }));

  return (
    <div className="bg-card rounded-lg border border-border p-5">
      <h3 className="font-semibold mb-4">{t.dashboard.operationsOverview}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={localizedData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {flightStatusDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconSize={10}
              iconType="circle"
              formatter={(value) => (
                <span style={{ color: 'hsl(var(--foreground))', fontSize: '13px' }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FlightStatusChart;
