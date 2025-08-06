import { ChartCard } from './ChartCard';
import { Thermometer, Wind, Droplets, MapPin, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const chillerLoadData = [
  { time: '00:00', load: 65, efficiency: 0.68 },
  { time: '04:00', load: 58, efficiency: 0.72 },
  { time: '08:00', load: 78, efficiency: 0.65 },
  { time: '12:00', load: 85, efficiency: 0.63 },
  { time: '16:00', load: 82, efficiency: 0.64 },
  { time: '20:00', load: 75, efficiency: 0.67 }
];

const temperatureData = [
  { zone: 'Zone A', temp: 22.5, humidity: 45 },
  { zone: 'Zone B', temp: 24.8, humidity: 52 },
  { zone: 'Zone C', temp: 23.2, humidity: 48 },
  { zone: 'Zone D', temp: 25.1, humidity: 55 },
  { zone: 'Zone E', temp: 23.8, humidity: 50 }
];

const waterFlowData = [
  { time: '00:00', supplyTemp: 7.2, returnTemp: 12.5, flow: 450 },
  { time: '04:00', supplyTemp: 7.0, returnTemp: 12.2, flow: 420 },
  { time: '08:00', supplyTemp: 7.5, returnTemp: 13.1, flow: 480 },
  { time: '12:00', supplyTemp: 7.8, returnTemp: 13.8, flow: 520 },
  { time: '16:00', supplyTemp: 7.6, returnTemp: 13.5, flow: 500 },
  { time: '20:00', supplyTemp: 7.3, returnTemp: 13.0, flow: 470 }
];

const alerts = [
  { id: 1, type: 'warning', location: 'Zone D', message: 'Temperature above threshold', coordinates: { x: 75, y: 60 } },
  { id: 2, type: 'critical', location: 'Chiller #2', message: 'Coolant leak detected', coordinates: { x: 30, y: 20 } },
  { id: 3, type: 'info', location: 'Zone B', message: 'Humidity optimization', coordinates: { x: 45, y: 40 } }
];

const HeatMapVisualization = () => {
  const zones = [
    { id: 'A', x: 20, y: 20, temp: 22.5, status: 'normal' },
    { id: 'B', x: 60, y: 20, temp: 24.8, status: 'warning' },
    { id: 'C', x: 20, y: 60, temp: 23.2, status: 'normal' },
    { id: 'D', x: 60, y: 60, temp: 25.1, status: 'critical' },
    { id: 'E', x: 40, y: 40, temp: 23.8, status: 'normal' }
  ];

  const getZoneColor = (status: string) => {
    switch (status) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#10B981';
    }
  };

  return (
    <div className="relative w-full h-64 bg-muted/20 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cooling-primary/20 to-cooling-secondary/20" />
      
      {/* Zone representations */}
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
        >
          <div 
            className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white font-bold text-sm animate-pulse-slow transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: getZoneColor(zone.status) }}
          >
            {zone.id}
          </div>
          <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
            Zone {zone.id}: {zone.temp}°C
          </div>
        </div>
      ))}

      {/* Alert markers */}
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-bounce-subtle"
          style={{ left: `${alert.coordinates.x}%`, top: `${alert.coordinates.y}%` }}
        >
          <MapPin className={`w-5 h-5 ${
            alert.type === 'critical' ? 'text-destructive' :
            alert.type === 'warning' ? 'text-warning' : 'text-primary'
          }`} />
        </div>
      ))}
    </div>
  );
};

export const CoolingSection = () => {
  return (
    <div className="space-y-6">
      {/* Chiller Load & Efficiency */}
      <ChartCard 
        title="Chiller Performance"
        onExport={() => console.log('Export chiller data')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chillerLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                yAxisId="load"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                yAxisId="efficiency"
                orientation="right"
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
                yAxisId="load"
                type="monotone" 
                dataKey="load" 
                stroke="hsl(var(--cooling-primary))" 
                strokeWidth={3}
                name="Load %"
              />
              <Line 
                yAxisId="efficiency"
                type="monotone" 
                dataKey="efficiency" 
                stroke="hsl(var(--cooling-secondary))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Efficiency (kW/TR)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Temperature Heat Map */}
      <ChartCard 
        title="Data Center Temperature Heat Map"
        onExport={() => console.log('Export heat map')}
        onDrillDown={() => console.log('Drill down heat map')}
      >
        <HeatMapVisualization />
        <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span>Normal (22-24°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span>Warning (24-26°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span>Critical (&gt;26°C)</span>
            </div>
          </div>
          <span>Real-time temperature monitoring across all zones</span>
        </div>
      </ChartCard>

      {/* Water Flow & Temperature */}
      <ChartCard 
        title="Chilled Water System"
        onExport={() => console.log('Export water data')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={waterFlowData}>
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
              <Area 
                type="monotone" 
                dataKey="supplyTemp" 
                stackId="1"
                stroke="hsl(var(--cooling-primary))" 
                fill="hsl(var(--cooling-primary))"
                fillOpacity={0.3}
                name="Supply Temp (°C)"
              />
              <Area 
                type="monotone" 
                dataKey="returnTemp" 
                stackId="2"
                stroke="hsl(var(--cooling-secondary))" 
                fill="hsl(var(--cooling-secondary))"
                fillOpacity={0.3}
                name="Return Temp (°C)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Environmental Alerts */}
      <ChartCard title="Environmental Alerts" actions={false}>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className={`mt-1 ${
                alert.type === 'critical' ? 'text-destructive' :
                alert.type === 'warning' ? 'text-warning' : 'text-primary'
              }`}>
                <Thermometer className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{alert.location}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.type === 'critical' ? 'bg-destructive/20 text-destructive' :
                    alert.type === 'warning' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                  }`}>
                    {alert.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
};