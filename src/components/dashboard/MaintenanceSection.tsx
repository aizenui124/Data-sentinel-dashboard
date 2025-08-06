import { ChartCard } from './ChartCard';
import { Wrench, Package, Users, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sparePartsData = [
  { component: 'UPS Batteries', available: 8, minimum: 5, status: 'good' },
  { component: 'Server RAM', available: 25, minimum: 15, status: 'good' },
  { component: 'Hard Drives', available: 12, minimum: 20, status: 'critical' },
  { component: 'Network Cards', available: 6, minimum: 8, status: 'warning' },
  { component: 'Power Supplies', available: 18, minimum: 10, status: 'good' },
  { component: 'Cooling Fans', available: 3, minimum: 6, status: 'critical' }
];

const maintenanceSchedule = [
  {
    id: 'MAINT-001',
    equipment: 'Chiller #1 Annual Service',
    scheduled: '2024-02-15',
    duration: '8 hours',
    technician: 'HVAC Team',
    status: 'scheduled',
    priority: 'high'
  },
  {
    id: 'MAINT-002',
    equipment: 'UPS Battery Replacement',
    scheduled: '2024-02-18',
    duration: '4 hours',
    technician: 'Electrical Team',
    status: 'in-progress',
    priority: 'critical'
  },
  {
    id: 'MAINT-003',
    equipment: 'Generator Weekly Test',
    scheduled: '2024-02-20',
    duration: '2 hours',
    technician: 'John Smith',
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 'MAINT-004',
    equipment: 'Fire Suppression Check',
    scheduled: '2024-02-22',
    duration: '3 hours',
    technician: 'Safety Team',
    status: 'delayed',
    priority: 'high'
  },
  {
    id: 'MAINT-005',
    equipment: 'Network Switch Upgrade',
    scheduled: '2024-02-25',
    duration: '6 hours',
    technician: 'IT Team',
    status: 'completed',
    priority: 'medium'
  }
];

const staffRoster = [
  { shift: 'Day Shift', personnel: 8, role: 'Operations', time: '06:00 - 18:00' },
  { shift: 'Night Shift', personnel: 4, role: 'Operations', time: '18:00 - 06:00' },
  { shift: 'On-Call', personnel: 2, role: 'Emergency', time: '24/7' },
  { shift: 'Maintenance', personnel: 6, role: 'Technical', time: '08:00 - 17:00' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-success bg-success/20';
    case 'in-progress': return 'text-primary bg-primary/20';
    case 'delayed': return 'text-destructive bg-destructive/20';
    case 'scheduled': return 'text-warning bg-warning/20';
    default: return 'text-muted-foreground bg-muted/20';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-destructive';
    case 'high': return 'text-warning';
    case 'medium': return 'text-primary';
    default: return 'text-muted-foreground';
  }
};

const getInventoryColor = (status: string) => {
  switch (status) {
    case 'critical': return '#EF4444';
    case 'warning': return '#F59E0B';
    case 'good': return '#10B981';
    default: return '#6B7280';
  }
};

export const MaintenanceSection = () => {
  return (
    <div className="space-y-6">
      {/* Spare Parts Inventory */}
      <ChartCard 
        title="Spare Parts Inventory"
        onExport={() => console.log('Export inventory')}
        onDrillDown={() => console.log('Drill down inventory')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sparePartsData.map(item => ({ 
              ...item, 
              category: item.component.split(' ')[0],
              fillColor: getInventoryColor(item.status)
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="component"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'available' ? `${value} available` : `${value} minimum`,
                  name === 'available' ? 'Current Stock' : 'Minimum Required'
                ]}
              />
              <Bar 
                dataKey="available" 
                fill="hsl(var(--primary))"
                name="available"
              />
              <Bar 
                dataKey="minimum" 
                fill="hsl(var(--muted))"
                opacity={0.3}
                name="minimum"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success" />
            <span>Good Stock</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-warning" />
            <span>Low Stock</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-destructive" />
            <span>Critical</span>
          </div>
        </div>
      </ChartCard>

      {/* Maintenance Schedule */}
      <ChartCard title="Maintenance Status" actions={false}>
        <div className="space-y-2">
          <div className="grid grid-cols-6 gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border pb-2">
            <span>ID</span>
            <span className="col-span-2">Equipment</span>
            <span>Date</span>
            <span>Team</span>
            <span>Status</span>
          </div>
          {maintenanceSchedule.map((task) => (
            <div 
              key={task.id} 
              className="grid grid-cols-6 gap-2 py-2 text-sm hover:bg-muted/30 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-1">
                <span className="font-mono text-primary text-xs">{task.id.split('-')[1]}</span>
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
              </div>
              <span className="col-span-2 font-medium text-xs truncate">{task.equipment}</span>
              <span className="text-muted-foreground text-xs">{new Date(task.scheduled).toLocaleDateString()}</span>
              <span className="text-muted-foreground text-xs truncate">{task.technician}</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Staff Roster */}
      <ChartCard title="Manpower Roster" actions={false}>
        <div className="grid grid-cols-2 gap-4">
          {staffRoster.map((shift, index) => (
            <div key={index} className="kpi-card">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">{shift.time}</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{shift.shift}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-primary">{shift.personnel}</span>
                  <span className="text-xs text-muted-foreground">staff</span>
                </div>
                <p className="text-xs text-muted-foreground">{shift.role}</p>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Quick Maintenance Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="kpi-card text-center">
          <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted-foreground">Scheduled Tasks</div>
        </div>
        <div className="kpi-card text-center">
          <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
          <div className="text-2xl font-bold text-warning">3</div>
          <div className="text-sm text-muted-foreground">Overdue Tasks</div>
        </div>
        <div className="kpi-card text-center">
          <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
          <div className="text-2xl font-bold text-success">89%</div>
          <div className="text-sm text-muted-foreground">Completion Rate</div>
        </div>
        <div className="kpi-card text-center">
          <Package className="w-8 h-8 text-destructive mx-auto mb-2" />
          <div className="text-2xl font-bold text-destructive">4</div>
          <div className="text-sm text-muted-foreground">Low Stock Items</div>
        </div>
      </div>
    </div>
  );
};