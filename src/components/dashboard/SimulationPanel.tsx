import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Zap, Thermometer, Server, AlertTriangle } from 'lucide-react';
import { ChartCard } from './ChartCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SimulationState {
  powerLoad: number;
  temperature: number;
  serverUtilization: number;
  isRunning: boolean;
  scenario: 'normal' | 'peak-load' | 'cooling-failure' | 'power-outage';
}

const scenarios = {
  'normal': {
    name: 'Normal Operations',
    description: 'Standard operational parameters',
    powerMultiplier: 1,
    tempMultiplier: 1,
    alerts: []
  },
  'peak-load': {
    name: 'Peak Load Scenario',
    description: 'High computational demand',
    powerMultiplier: 1.4,
    tempMultiplier: 1.3,
    alerts: ['High power consumption', 'Elevated temperature']
  },
  'cooling-failure': {
    name: 'Cooling System Failure',
    description: 'Partial cooling system failure',
    powerMultiplier: 1.1,
    tempMultiplier: 1.8,
    alerts: ['Critical: Cooling failure', 'Temperature rising']
  },
  'power-outage': {
    name: 'Power Outage',
    description: 'Grid power failure, running on UPS',
    powerMultiplier: 0.8,
    tempMultiplier: 1.2,
    alerts: ['Power outage detected', 'Running on backup power']
  }
};

export const SimulationPanel = () => {
  const [simulation, setSimulation] = useState<SimulationState>({
    powerLoad: 3200,
    temperature: 24.8,
    serverUtilization: 72,
    isRunning: false,
    scenario: 'normal'
  });

  const [history, setHistory] = useState<Array<{
    time: string;
    power: number;
    temperature: number;
    utilization: number;
  }>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (simulation.isRunning) {
      interval = setInterval(() => {
        setSimulation(prev => {
          const scenario = scenarios[prev.scenario];
          const baseTemp = 24.8;
          const basePower = 3200;
          const baseUtil = 72;

          // Simulate realistic fluctuations
          const tempVariation = (Math.random() - 0.5) * 0.5;
          const powerVariation = (Math.random() - 0.5) * 100;
          const utilVariation = (Math.random() - 0.5) * 5;

          const newTemp = Math.max(15, Math.min(35, 
            baseTemp * scenario.tempMultiplier + tempVariation
          ));
          const newPower = Math.max(1000, Math.min(5000,
            basePower * scenario.powerMultiplier + powerVariation
          ));
          const newUtil = Math.max(0, Math.min(100,
            baseUtil + utilVariation
          ));

          return {
            ...prev,
            temperature: parseFloat(newTemp.toFixed(1)),
            powerLoad: Math.round(newPower),
            serverUtilization: Math.round(newUtil)
          };
        });

        // Update history
        setHistory(prev => {
          const now = new Date().toLocaleTimeString();
          const newEntry = {
            time: now,
            power: simulation.powerLoad,
            temperature: simulation.temperature,
            utilization: simulation.serverUtilization
          };
          return [...prev.slice(-20), newEntry]; // Keep last 20 entries
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulation.isRunning, simulation.scenario]);

  const handleScenarioChange = (scenario: keyof typeof scenarios) => {
    setSimulation(prev => ({ ...prev, scenario }));
  };

  const toggleSimulation = () => {
    setSimulation(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetSimulation = () => {
    setSimulation({
      powerLoad: 3200,
      temperature: 24.8,
      serverUtilization: 72,
      isRunning: false,
      scenario: 'normal'
    });
    setHistory([]);
  };

  const currentScenario = scenarios[simulation.scenario];

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Data Center Simulation
            </h3>
            <p className="text-sm text-muted-foreground">
              Test scenarios and predict system behavior
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={toggleSimulation}
              variant={simulation.isRunning ? "destructive" : "default"}
              size="sm"
              className="gap-2"
            >
              {simulation.isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start
                </>
              )}
            </Button>
            <Button 
              onClick={resetSimulation}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <Button
              key={key}
              variant={simulation.scenario === key ? "default" : "outline"}
              onClick={() => handleScenarioChange(key as keyof typeof scenarios)}
              className="p-4 h-auto flex-col items-start text-left"
            >
              <div className="font-medium text-sm">{scenario.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {scenario.description}
              </div>
            </Button>
          ))}
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-power-primary mr-2" />
              <span className="text-sm font-medium">Power Load</span>
            </div>
            <div className="text-2xl font-bold text-power-primary">
              {simulation.powerLoad}
            </div>
            <div className="text-sm text-muted-foreground">kW</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Thermometer className="w-5 h-5 text-cooling-primary mr-2" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <div className="text-2xl font-bold text-cooling-primary">
              {simulation.temperature}
            </div>
            <div className="text-sm text-muted-foreground">°C</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Server className="w-5 h-5 text-asset-primary mr-2" />
              <span className="text-sm font-medium">Utilization</span>
            </div>
            <div className="text-2xl font-bold text-asset-primary">
              {simulation.serverUtilization}
            </div>
            <div className="text-sm text-muted-foreground">%</div>
          </div>
        </div>

        {/* Alerts */}
        {currentScenario.alerts.length > 0 && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="font-medium text-destructive">Simulation Alerts</span>
            </div>
            <div className="space-y-1">
              {currentScenario.alerts.map((alert, index) => (
                <Badge key={index} variant="destructive" className="mr-2">
                  {alert}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Real-time Chart */}
      {history.length > 0 && (
        <ChartCard title="Simulation History" actions={false}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="power"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="temp"
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
                  yAxisId="power"
                  type="monotone" 
                  dataKey="power" 
                  stroke="hsl(var(--power-primary))" 
                  strokeWidth={2}
                  dot={false}
                  name="Power (kW)"
                />
                <Line 
                  yAxisId="temp"
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="hsl(var(--cooling-primary))" 
                  strokeWidth={2}
                  dot={false}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      )}
    </div>
  );
};