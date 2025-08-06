import { ChartCard } from './ChartCard';
import { Battery, Zap, Fuel, AlertTriangle, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const powerSourceData = [
  { name: 'Grid', value: 65, color: '#3B82F6' },
  { name: 'Solar', value: 25, color: '#10B981' },
  { name: 'DG Backup', value: 10, color: '#F59E0B' }
];

const upsLoadData = [
  { block: 'Block A', load: 78, capacity: 100 },
  { block: 'Block B', load: 85, capacity: 100 },
  { block: 'Block C', load: 72, capacity: 100 },
  { block: 'Block D', load: 90, capacity: 100 }
];

const powerTrendData = [
  { time: '00:00', power: 2.8 },
  { time: '04:00', power: 2.6 },
  { time: '08:00', power: 3.2 },
  { time: '12:00', power: 3.5 },
  { time: '16:00', power: 3.4 },
  { time: '20:00', power: 3.1 }
];

const alerts = [
  { id: 1, type: 'warning', message: 'UPS Block B load above 85%', time: '2 min ago' },
  { id: 2, type: 'info', message: 'DG weekly test scheduled', time: '15 min ago' },
  { id: 3, type: 'critical', message: 'Grid voltage fluctuation detected', time: '1 hour ago' }
];

export const PowerSection = () => {
  return (
    <div className="space-y-6">
      {/* Power Source Distribution */}
      <ChartCard 
        title="Power Source Distribution"
        onExport={() => console.log('Export power sources')}
        onDrillDown={() => console.log('Drill down power sources')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={powerSourceData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {powerSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {powerSourceData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* UPS Load per Block */}
      <ChartCard 
        title="UPS Load per Block"
        onExport={() => console.log('Export UPS data')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={upsLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="block" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="load" 
                fill="hsl(var(--power-primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Power Consumption Trend */}
      <ChartCard 
        title="24h Power Consumption"
        onExport={() => console.log('Export power trend')}
      >
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={powerTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="power" 
                stroke="hsl(var(--power-primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--power-primary))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* DG Fuel Level Gauge */}
      <ChartCard title="DG Fuel Level">
        <div className="flex items-center justify-center py-8">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--power-primary))"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - 0.75)}`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-power-primary">75%</div>
                <div className="text-xs text-muted-foreground">Fuel</div>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Electrical Alerts */}
      <ChartCard title="Electrical Alerts" actions={false}>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className={`mt-1 ${
                alert.type === 'critical' ? 'text-destructive' :
                alert.type === 'warning' ? 'text-warning' : 'text-primary'
              }`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
};