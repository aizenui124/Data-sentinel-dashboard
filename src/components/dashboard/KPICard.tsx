import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: 'success' | 'warning' | 'critical' | 'info';
  className?: string;
  onClick?: () => void;
}

export const KPICard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  trend, 
  status = 'info',
  className,
  onClick 
}: KPICardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-success/30 bg-success/10';
      case 'warning':
        return 'border-warning/30 bg-warning/10';
      case 'critical':
        return 'border-destructive/30 bg-destructive/10 pulse-glow';
      default:
        return 'border-primary/30 bg-primary/10';
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-primary';
    }
  };

  return (
    <div 
      className={cn(
        'kpi-card interactive-element',
        getStatusColor(status),
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn('p-2 rounded-lg', getIconColor(status), 'bg-current/10')}>
          <div className={cn('w-5 h-5', getIconColor(status))}>
            {icon}
          </div>
        </div>
        {status === 'critical' && (
          <div className="status-indicator status-critical" />
        )}
        {status === 'warning' && (
          <div className="status-indicator status-warning" />
        )}
        {status === 'success' && (
          <div className="status-indicator status-success" />
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="data-metric">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        
        {trend && (
          <div className={cn(
            'flex items-center gap-1 text-xs',
            trend.isPositive ? 'text-success' : 'text-destructive'
          )}>
            <span className={cn(
              'transform transition-transform',
              trend.isPositive ? 'rotate-0' : 'rotate-180'
            )}>
              ↗
            </span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};