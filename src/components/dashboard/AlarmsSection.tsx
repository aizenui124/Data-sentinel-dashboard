import { ChartCard } from './ChartCard';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const incidentData = [
  { month: 'Jan', critical: 2, major: 5, minor: 12 },
  { month: 'Feb', critical: 1, major: 8, minor: 15 },
  { month: 'Mar', critical: 3, major: 6, minor: 18 },
  { month: 'Apr', critical: 0, major: 4, minor: 14 },
  { month: 'May', critical: 1, major: 7, minor: 16 },
  { month: 'Jun', critical: 2, major: 3, minor: 11 }
];

const trendData = [
  { date: '2024-01-01', incidents: 8 },
  { date: '2024-01-02', incidents: 12 },
  { date: '2024-01-03', incidents: 6 },
  { date: '2024-01-04', incidents: 15 },
  { date: '2024-01-05', incidents: 9 },
  { date: '2024-01-06', incidents: 4 },
  { date: '2024-01-07', incidents: 7 }
];

const activeTickets = [
  { id: 'INC-001', priority: 'critical', title: 'UPS failure in Block A', assignee: 'John Doe', age: '2h 15m' },
  { id: 'INC-002', priority: 'major', title: 'Cooling system low pressure', assignee: 'Jane Smith', age: '4h 30m' },
  { id: 'INC-003', priority: 'minor', title: 'LED indicator malfunction', assignee: 'Mike Johnson', age: '1d 2h' },
  { id: 'INC-004', priority: 'major', title: 'Generator fuel level warning', assignee: 'Sarah Wilson', age: '6h 45m' },
  { id: 'INC-005', priority: 'minor', title: 'Server rack temperature alert', assignee: 'Tom Brown', age: '3h 20m' }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-destructive bg-destructive/20';
    case 'major': return 'text-warning bg-warning/20';
    case 'minor': return 'text-blue-500 bg-blue-500/20';
    default: return 'text-muted-foreground bg-muted/20';
  }
};

export const AlarmsSection = () => {
  return (
    <div className="space-y-6">
      {/* Incident Statistics */}
      <ChartCard 
        title="Incident Trends by Severity"
        onExport={() => console.log('Export incident data')}
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incidentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="month" 
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
              <Bar dataKey="critical" stackId="incidents" fill="#EF4444" name="Critical" />
              <Bar dataKey="major" stackId="incidents" fill="#F59E0B" name="Major" />
              <Bar dataKey="minor" stackId="incidents" fill="#3B82F6" name="Minor" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* 7-Day Incident Trend */}
      <ChartCard 
        title="7-Day Incident History"
        onExport={() => console.log('Export trend data')}
      >
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => new Date(value).getDate().toString()}
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
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Active Tickets Table */}
      <ChartCard title="Open Tickets" actions={false}>
        <div className="space-y-2">
          <div className="grid grid-cols-6 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border pb-2">
            <span>Ticket ID</span>
            <span>Priority</span>
            <span className="col-span-2">Title</span>
            <span>Assignee</span>
            <span>Age</span>
          </div>
          {activeTickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="grid grid-cols-6 gap-4 py-3 text-sm hover:bg-muted/30 rounded-lg transition-colors cursor-pointer"
            >
              <span className="font-mono text-primary">{ticket.id}</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
              <span className="col-span-2 font-medium">{ticket.title}</span>
              <span className="text-muted-foreground">{ticket.assignee}</span>
              <span className="text-muted-foreground">{ticket.age}</span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="kpi-card text-center">
          <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
          <div className="text-2xl font-bold text-destructive">3</div>
          <div className="text-sm text-muted-foreground">Active Alarms</div>
        </div>
        <div className="kpi-card text-center">
          <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
          <div className="text-2xl font-bold text-warning">4.2h</div>
          <div className="text-sm text-muted-foreground">Avg MTTR</div>
        </div>
        <div className="kpi-card text-center">
          <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
          <div className="text-2xl font-bold text-success">28</div>
          <div className="text-sm text-muted-foreground">Resolved Today</div>
        </div>
        <div className="kpi-card text-center">
          <XCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <div className="text-2xl font-bold">99.7%</div>
          <div className="text-sm text-muted-foreground">SLA Compliance</div>
        </div>
      </div>
    </div>
  );
};