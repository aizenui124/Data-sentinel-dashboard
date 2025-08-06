import { ChartCard } from './ChartCard';
import { Leaf, Droplets, Zap, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const renewableEnergyData = [
  { name: 'Solar', value: 25, color: '#F59E0B' },
  { name: 'Wind', value: 15, color: '#10B981' },
  { name: 'Grid (Renewable)', value: 35, color: '#3B82F6' },
  { name: 'Grid (Non-Renewable)', value: 25, color: '#6B7280' }
];

const carbonEmissionsData = [
  { month: 'Jan', emissions: 1250, target: 1200 },
  { month: 'Feb', emissions: 1180, target: 1150 },
  { month: 'Mar', emissions: 1320, target: 1100 },
  { month: 'Apr', emissions: 1090, target: 1050 },
  { month: 'May', emissions: 1150, target: 1000 },
  { month: 'Jun', emissions: 980, target: 950 }
];

const waterUsageData = [
  { time: '00:00', cooling: 450, total: 520 },
  { time: '04:00', cooling: 420, total: 480 },
  { time: '08:00', cooling: 480, total: 550 },
  { time: '12:00', cooling: 520, total: 600 },
  { time: '16:00', cooling: 500, total: 580 },
  { time: '20:00', cooling: 470, total: 540 }
];

const sustainabilityMetrics = [
  {
    title: 'Carbon Footprint',
    value: '980',
    unit: 'kg CO₂/month',
    icon: <Leaf className="w-5 h-5" />,
    trend: { value: 18, isPositive: true },
    status: 'success'
  },
  {
    title: 'Water Efficiency',
    value: '0.42',
    unit: 'L/kWh',
    icon: <Droplets className="w-5 h-5" />,
    trend: { value: 8, isPositive: true },
    status: 'success'
  },
  {
    title: 'Renewable %',
    value: '75',
    unit: '%',
    icon: <Zap className="w-5 h-5" />,
    trend: { value: 12, isPositive: false },
    status: 'warning'
  },
  {
    title: 'PUE Efficiency',
    value: '1.42',
    unit: '',
    icon: <TrendingDown className="w-5 h-5" />,
    trend: { value: 5, isPositive: true },
    status: 'info'
  }
];

export const SustainabilitySection = () => {
  return (
    <div className="space-y-6">
      {/* Sustainability KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {sustainabilityMetrics.map((metric, index) => (
          <div key={index} className="kpi-card">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${
                metric.status === 'success' ? 'text-success bg-success/10' :
                metric.status === 'warning' ? 'text-warning bg-warning/10' :
                'text-primary bg-primary/10'
              }`}>
                {metric.icon}
              </div>
              {metric.trend && (
                <div className={`flex items-center gap-1 text-xs ${
                  metric.trend.isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  <span className={`transform transition-transform ${
                    metric.trend.isPositive ? 'rotate-0' : 'rotate-180'
                  }`}>
                    ↗
                  </span>
                  <span>{metric.trend.value}%</span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium">{metric.title}</p>
              <div className="flex items-baseline gap-1">
                <span className="data-metric">{metric.value}</span>
                {metric.unit && <span className="text-sm text-muted-foreground">{metric.unit}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Renewable Energy Mix */}
      <ChartCard 
        title="Energy Source Distribution"
        onExport={() => console.log('Export energy mix')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={renewableEnergyData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {renewableEnergyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {renewableEnergyData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="font-medium">{item.value}%</div>
                <div className="text-sm text-muted-foreground">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Carbon Emissions Trend */}
      <ChartCard 
        title="Carbon Emissions vs Target"
        onExport={() => console.log('Export emissions data')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={carbonEmissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  `${value} kg CO₂`,
                  name === 'emissions' ? 'Actual' : 'Target'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="emissions" 
                stroke="#EF4444" 
                strokeWidth={3}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                name="emissions"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Water Usage for Cooling */}
      <ChartCard 
        title="Water Consumption"
        onExport={() => console.log('Export water data')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={waterUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'Liters/hour', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  `${value} L/h`,
                  name === 'cooling' ? 'Cooling System' : 'Total Usage'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="cooling" 
                stackId="1"
                stroke="hsl(var(--cooling-primary))" 
                fill="hsl(var(--cooling-primary))"
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stackId="2"
                stroke="hsl(var(--muted-foreground))" 
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};