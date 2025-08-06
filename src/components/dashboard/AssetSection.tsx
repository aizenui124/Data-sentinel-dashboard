import { ChartCard } from './ChartCard';
import { Server, HardDrive, Database, Cpu, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const rackPowerData = [
  { rack: 'R01', power: 8.5, capacity: 12, utilization: 71 },
  { rack: 'R02', power: 11.2, capacity: 12, utilization: 93 },
  { rack: 'R03', power: 7.8, capacity: 12, utilization: 65 },
  { rack: 'R04', power: 9.7, capacity: 12, utilization: 81 },
  { rack: 'R05', power: 10.1, capacity: 12, utilization: 84 },
  { rack: 'R06', power: 6.9, capacity: 12, utilization: 58 }
];

const serverUtilizationData = [
  { name: 'Active Servers', value: 324, color: '#10B981' },
  { name: 'Idle Servers', value: 156, color: '#F59E0B' },
  { name: 'Maintenance', value: 24, color: '#EF4444' },
  { name: 'Spare Capacity', value: 96, color: '#6B7280' }
];

const rackSpaceData = [
  { rack: 'Rack 1-10', used: 85, available: 15 },
  { rack: 'Rack 11-20', used: 92, available: 8 },
  { rack: 'Rack 21-30', used: 78, available: 22 },
  { rack: 'Rack 31-40', used: 67, available: 33 },
  { rack: 'Rack 41-50', used: 89, available: 11 }
];

const FloorMapVisualization = () => {
  const racks = [
    // Row 1
    { id: 'R01', x: 15, y: 20, status: 'normal', utilization: 71 },
    { id: 'R02', x: 25, y: 20, status: 'critical', utilization: 93 },
    { id: 'R03', x: 35, y: 20, status: 'normal', utilization: 65 },
    { id: 'R04', x: 45, y: 20, status: 'warning', utilization: 81 },
    { id: 'R05', x: 55, y: 20, status: 'warning', utilization: 84 },
    { id: 'R06', x: 65, y: 20, status: 'normal', utilization: 58 },
    // Row 2
    { id: 'R07', x: 15, y: 40, status: 'normal', utilization: 76 },
    { id: 'R08', x: 25, y: 40, status: 'normal', utilization: 68 },
    { id: 'R09', x: 35, y: 40, status: 'empty', utilization: 0 },
    { id: 'R10', x: 45, y: 40, status: 'normal', utilization: 72 },
    { id: 'R11', x: 55, y: 40, status: 'warning', utilization: 88 },
    { id: 'R12', x: 65, y: 40, status: 'normal', utilization: 64 },
    // Row 3
    { id: 'R13', x: 15, y: 60, status: 'normal', utilization: 79 },
    { id: 'R14', x: 25, y: 60, status: 'empty', utilization: 0 },
    { id: 'R15', x: 35, y: 60, status: 'empty', utilization: 0 },
    { id: 'R16', x: 45, y: 60, status: 'normal', utilization: 74 },
    { id: 'R17', x: 55, y: 60, status: 'normal', utilization: 82 },
    { id: 'R18', x: 65, y: 60, status: 'critical', utilization: 95 }
  ];

  const getRackColor = (status: string) => {
    switch (status) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'normal': return '#10B981';
      case 'empty': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getRackOpacity = (utilization: number) => {
    if (utilization === 0) return 0.3;
    return 0.7 + (utilization / 100) * 0.3;
  };

  return (
    <div className="relative w-full h-80 bg-muted/20 rounded-lg overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-asset-primary/10 to-asset-secondary/10" />
      
      {/* Grid lines for layout reference */}
      <div className="absolute inset-0 opacity-20">
        {[20, 40, 60].map((y) => (
          <div 
            key={y}
            className="absolute w-full border-t border-muted-foreground/30"
            style={{ top: `${y}%` }}
          />
        ))}
      </div>

      {/* Rack representations */}
      {racks.map((rack) => (
        <div
          key={rack.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ left: `${rack.x}%`, top: `${rack.y}%` }}
        >
          <div 
            className="w-8 h-12 rounded border-2 border-white/50 flex items-center justify-center text-white font-bold text-xs transition-all duration-300 group-hover:scale-110 animate-float"
            style={{ 
              backgroundColor: getRackColor(rack.status),
              opacity: getRackOpacity(rack.utilization)
            }}
          >
            {rack.id.slice(-2)}
          </div>
          <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap z-10">
            <div>{rack.id}: {rack.utilization}% utilized</div>
            <div className="text-muted-foreground capitalize">{rack.status}</div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success" />
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-warning" />
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-destructive" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted-foreground" />
            <span>Available</span>
          </div>
        </div>
      </div>

      {/* Utilization indicator */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
        <div>White Space: 28% available</div>
        <div className="text-muted-foreground">72% utilized</div>
      </div>
    </div>
  );
};

export const AssetSection = () => {
  return (
    <div className="space-y-6">
      {/* Rack Power Usage */}
      <ChartCard 
        title="Rack Power Consumption"
        onExport={() => console.log('Export rack power')}
        onDrillDown={() => console.log('Drill down rack power')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rackPowerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="rack" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'Power (kW)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'power' ? `${value} kW` : `${value}%`,
                  name === 'power' ? 'Power Consumption' : 'Utilization'
                ]}
              />
              <Bar 
                dataKey="power" 
                fill="hsl(var(--asset-primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-asset-primary">65.2 kW</div>
            <div className="text-muted-foreground">Total Power</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">11.2 kW</div>
            <div className="text-muted-foreground">Peak Rack</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">6.9 kW</div>
            <div className="text-muted-foreground">Min Usage</div>
          </div>
        </div>
      </ChartCard>

      {/* Server Count & Utilization */}
      <ChartCard 
        title="Server Infrastructure"
        onExport={() => console.log('Export server data')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serverUtilizationData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {serverUtilizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value} servers`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {serverUtilizationData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="font-medium">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Rack Space Usage */}
      <ChartCard 
        title="Rack Space Utilization"
        onExport={() => console.log('Export space data')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rackSpaceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="rack"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'Space %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="used" 
                stackId="space"
                fill="hsl(var(--asset-primary))"
                name="Racks Placed %"
              />
              <Bar 
                dataKey="available" 
                stackId="space"
                fill="hsl(var(--muted))"
                name="Available Space %"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-muted-foreground">Shows rack vs space ratio per area</span>
          <span className="font-medium">Total capacity optimization</span>
        </div>
      </ChartCard>

      {/* White Space Layout (Floor Map) */}
      <ChartCard 
        title="Data Center Floor Layout"
        onExport={() => console.log('Export floor map')}
        onDrillDown={() => console.log('Drill down floor map')}
      >
        <FloorMapVisualization />
      </ChartCard>
    </div>
  );
};