import { useState, useEffect } from 'react';
import { KPICard } from './KPICard';
import { PowerSection } from './PowerSection';
import { CoolingSection } from './CoolingSection';
import { AssetSection } from './AssetSection';
import { AlarmsSection } from './AlarmsSection';
import { SustainabilitySection } from './SustainabilitySection';
import { MaintenanceSection } from './MaintenanceSection';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Thermometer, 
  Server, 
  Shield, 
  Database, 
  Battery, 
  TrendingUp, 
  Clock,
  Download,
  Settings,
  RefreshCw,
  Monitor,
  Activity
} from 'lucide-react';

interface DashboardData {
  pue: number;
  totalPower: number;
  avgTemperature: number;
  activeAlarms: number;
  whiteSpaceUsed: number;
  upsLoad: number;
  chillerEfficiency: number;
  mttr: number;
  lastUpdate: string;
}

export const DataCenterDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    pue: 1.42,
    totalPower: 3200,
    avgTemperature: 24.8,
    activeAlarms: 3,
    whiteSpaceUsed: 72,
    upsLoad: 78,
    chillerEfficiency: 0.68,
    mttr: 4.2,
    lastUpdate: new Date().toLocaleTimeString()
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        totalPower: prev.totalPower + (Math.random() - 0.5) * 100,
        avgTemperature: prev.avgTemperature + (Math.random() - 0.5) * 0.2,
        upsLoad: Math.max(60, Math.min(95, prev.upsLoad + (Math.random() - 0.5) * 2)),
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setDashboardData(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
      setIsRefreshing(false);
    }, 1000);
  };

  const exportData = () => {
    console.log('Exporting dashboard data...');
    // Implement export functionality
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-glow flex items-center gap-3">
            <Database className="w-8 h-8 text-primary animate-pulse-slow" />
            Data Center Operations Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring and control • Last updated: {dashboardData.lastUpdate}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2 animate-float">
            <Activity className="w-3 h-3 text-success animate-pulse" />
            Live Monitoring
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportData}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-8 gap-4">
        <KPICard
          title="PUE Efficiency"
          value={dashboardData.pue.toFixed(2)}
          icon={<TrendingUp className="w-5 h-5" />}
          status={dashboardData.pue <= 1.5 ? 'success' : dashboardData.pue <= 1.8 ? 'warning' : 'critical'}
          trend={{ value: 5, isPositive: true }}
          onClick={() => setActiveTab('sustainability')}
        />
        
        <KPICard
          title="Total Power"
          value={dashboardData.totalPower.toFixed(0)}
          unit="kW"
          icon={<Zap className="w-5 h-5" />}
          status={dashboardData.totalPower < 3500 ? 'success' : 'warning'}
          trend={{ value: 3, isPositive: false }}
          onClick={() => setActiveTab('power')}
        />
        
        <KPICard
          title="Avg Temperature"
          value={dashboardData.avgTemperature.toFixed(1)}
          unit="°C"
          icon={<Thermometer className="w-5 h-5" />}
          status={dashboardData.avgTemperature < 25 ? 'success' : dashboardData.avgTemperature < 27 ? 'warning' : 'critical'}
          trend={{ value: 2, isPositive: true }}
          onClick={() => setActiveTab('cooling')}
        />
        
        <KPICard
          title="Active Alarms"
          value={dashboardData.activeAlarms}
          icon={<Shield className="w-5 h-5" />}
          status={dashboardData.activeAlarms === 0 ? 'success' : dashboardData.activeAlarms < 5 ? 'warning' : 'critical'}
          onClick={() => setActiveTab('alarms')}
        />
        
        <KPICard
          title="White Space"
          value={dashboardData.whiteSpaceUsed}
          unit="%"
          icon={<Server className="w-5 h-5" />}
          status={dashboardData.whiteSpaceUsed < 80 ? 'success' : 'warning'}
          trend={{ value: 8, isPositive: false }}
          onClick={() => setActiveTab('assets')}
        />
        
        <KPICard
          title="UPS Load"
          value={dashboardData.upsLoad}
          unit="%"
          icon={<Battery className="w-5 h-5" />}
          status={dashboardData.upsLoad < 85 ? 'success' : dashboardData.upsLoad < 95 ? 'warning' : 'critical'}
          trend={{ value: 4, isPositive: false }}
          onClick={() => setActiveTab('power')}
        />
        
        <KPICard
          title="Chiller Efficiency"
          value={dashboardData.chillerEfficiency.toFixed(2)}
          unit="kW/TR"
          icon={<TrendingUp className="w-5 h-5" />}
          status={dashboardData.chillerEfficiency < 0.7 ? 'success' : 'warning'}
          trend={{ value: 6, isPositive: true }}
          onClick={() => setActiveTab('cooling')}
        />
        
        <KPICard
          title="MTTR"
          value={dashboardData.mttr.toFixed(1)}
          unit="hours"
          icon={<Clock className="w-5 h-5" />}
          status={dashboardData.mttr < 4 ? 'success' : dashboardData.mttr < 6 ? 'warning' : 'critical'}
          trend={{ value: 12, isPositive: true }}
          onClick={() => setActiveTab('maintenance')}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-7 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="gap-2">
            <Monitor className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="power" className="gap-2">
            <Zap className="w-4 h-4" />
            Power
          </TabsTrigger>
          <TabsTrigger value="cooling" className="gap-2">
            <Thermometer className="w-4 h-4" />
            Cooling
          </TabsTrigger>
          <TabsTrigger value="assets" className="gap-2">
            <Server className="w-4 h-4" />
            Assets
          </TabsTrigger>
          <TabsTrigger value="alarms" className="gap-2">
            <Shield className="w-4 h-4" />
            Alarms
          </TabsTrigger>
          <TabsTrigger value="sustainability" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Sustainability
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="gap-2">
            <Settings className="w-4 h-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Power Section */}
            <div className="dashboard-section">
              <h2 className="section-title">
                <Zap className="w-5 h-5 text-power-primary" />
                Power Systems
              </h2>
              <PowerSection />
            </div>

            {/* Cooling Section */}
            <div className="dashboard-section">
              <h2 className="section-title">
                <Thermometer className="w-5 h-5 text-cooling-primary" />
                Cooling & Environment
              </h2>
              <CoolingSection />
            </div>

            {/* Asset Section */}
            <div className="dashboard-section">
              <h2 className="section-title">
                <Server className="w-5 h-5 text-asset-primary" />
                Asset Utilization
              </h2>
              <AssetSection />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="dashboard-section">
              <h2 className="section-title">
                <Shield className="w-5 h-5 text-destructive" />
                Alarms & Incidents
              </h2>
              <AlarmsSection />
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">
                <TrendingUp className="w-5 h-5 text-success" />
                Sustainability
              </h2>
              <SustainabilitySection />
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">
                <Settings className="w-5 h-5 text-warning" />
                Operations & Maintenance
              </h2>
              <MaintenanceSection />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="power" className="mt-6">
          <div className="max-w-4xl">
            <PowerSection />
          </div>
        </TabsContent>

        <TabsContent value="cooling" className="mt-6">
          <div className="max-w-4xl">
            <CoolingSection />
          </div>
        </TabsContent>

        <TabsContent value="assets" className="mt-6">
          <div className="max-w-4xl">
            <AssetSection />
          </div>
        </TabsContent>

        <TabsContent value="alarms" className="mt-6">
          <div className="max-w-4xl">
            <AlarmsSection />
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="mt-6">
          <div className="max-w-4xl">
            <SustainabilitySection />
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <div className="max-w-4xl">
            <MaintenanceSection />
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
};