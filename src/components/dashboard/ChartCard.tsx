import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, RefreshCw } from 'lucide-react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: boolean;
  onExport?: () => void;
  onDrillDown?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  lastUpdate?: string;
}

export const ChartCard = ({ 
  title, 
  children, 
  className,
  actions = true,
  onExport,
  onDrillDown,
  onRefresh,
  isLoading = false,
  lastUpdate
}: ChartCardProps) => {
  return (
    <div className={cn('chart-container', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-title">
          {title}
          {isLoading && (
            <RefreshCw className="w-4 h-4 animate-spin text-primary" />
          )}
        </h3>
        
        {actions && (
          <div className="flex items-center gap-2">
            {onRefresh && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                className="hover:bg-primary/10 text-muted-foreground hover:text-primary"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
            {onExport && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onExport}
                className="hover:bg-primary/10 text-muted-foreground hover:text-primary"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
            {onDrillDown && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDrillDown}
                className="hover:bg-primary/10 text-muted-foreground hover:text-primary"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        {children}
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="animate-pulse-slow">
              <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            </div>
          </div>
        )}
      </div>

      {lastUpdate && (
        <p className="text-xs text-muted-foreground mt-2">
          Last updated: {lastUpdate}
        </p>
      )}
    </div>
  );
};