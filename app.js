// Data Center Operations Dashboard - Standalone App
// All dependencies, styles, and functionality in one file

// CSS Styles
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: #ffffff;
    color: #1a1a1a;
    line-height: 1.6;
  }

  .dashboard {
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  }

  .header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .header h1 {
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
  }

  .last-update {
    color: #6b7280;
    font-size: 0.9rem;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .kpi-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .kpi-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .kpi-header {
    display: flex;
    justify-content: between;
    align-items: center;
    margin-bottom: 15px;
  }

  .kpi-icon {
    width: 40px;
    height: 40px;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .kpi-title {
    font-size: 0.9rem;
    color: #6b7280;
    font-weight: 500;
  }

  .kpi-value {
    font-size: 1.8rem;
    font-weight: bold;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .kpi-unit {
    font-size: 0.9rem;
    color: #6b7280;
  }

  .main-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-bottom: 30px;
  }

  .section {
    background: white;
    border-radius: 12px;
    padding: 25px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .section-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .chart-container {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .chart-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #374151;
  }

  .chart-placeholder {
    height: 200px;
    background: linear-gradient(135deg, #ddd6fe, #e0e7ff);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    font-weight: 500;
  }

  .heatmap {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 8px;
    margin: 20px 0;
  }

  .heatmap-cell {
    aspect-ratio: 1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
    transition: transform 0.2s ease;
  }

  .heatmap-cell:hover {
    transform: scale(1.1);
  }

  .temp-normal { background: #10b981; }
  .temp-warm { background: #f59e0b; }
  .temp-hot { background: #ef4444; }
  .temp-critical { background: #dc2626; animation: pulse 2s infinite; }

  .bottom-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }

  .table th,
  .table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  .table th {
    background: #f3f4f6;
    font-weight: 600;
    color: #374151;
  }

  .priority-critical { color: #dc2626; font-weight: 600; }
  .priority-major { color: #f59e0b; font-weight: 600; }
  .priority-minor { color: #10b981; font-weight: 600; }

  .gauge {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
    margin: 20px auto;
  }

  .gauge-bg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(#3b82f6 0deg, #e5e7eb 0deg);
  }

  .gauge-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    font-weight: bold;
  }

  .legend {
    display: flex;
    gap: 15px;
    margin-top: 15px;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
  }

  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
  }

  .status-critical { background: #dc2626; animation: pulse 2s infinite; }
  .status-warning { background: #f59e0b; }
  .status-success { background: #10b981; }
  .status-info { background: #3b82f6; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .rack-layout {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 8px;
    margin: 20px 0;
    background: #f8fafc;
    padding: 20px;
    border-radius: 8px;
  }

  .rack {
    aspect-ratio: 1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    transition: transform 0.2s ease;
    cursor: pointer;
  }

  .rack:hover {
    transform: scale(1.1);
  }

  .rack-normal { background: #10b981; }
  .rack-warning { background: #f59e0b; }
  .rack-critical { background: #ef4444; }
  .rack-empty { background: #e5e7eb; color: #6b7280; }

  .alert-item {
    display: flex;
    align-items: center;
    padding: 12px;
    margin-bottom: 8px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
  }

  .alert-icon {
    margin-right: 10px;
    color: #dc2626;
  }

  .bar-chart, .pie-chart, .line-chart {
    height: 200px;
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    position: relative;
    overflow: hidden;
  }

  .chart-bars {
    display: flex;
    align-items: end;
    justify-content: space-around;
    height: 80%;
    width: 90%;
    gap: 5px;
  }

  .bar {
    background: linear-gradient(to top, #3b82f6, #8b5cf6);
    border-radius: 2px 2px 0 0;
    min-width: 20px;
    transition: all 0.3s ease;
  }

  .bar:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 1200px) {
    .main-grid {
      grid-template-columns: 1fr;
    }
    
    .bottom-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .kpi-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .dashboard {
      padding: 10px;
    }
  }
`;

// Data and State Management
class DashboardData {
  constructor() {
    this.data = {
      pue: 1.42,
      totalPower: 3.2,
      avgTemperature: 24.8,
      activeAlarms: 3,
      whiteSpaceUsed: 72,
      upsLoad: 78,
      chillerEfficiency: 0.68,
      mttr: 4.2,
      lastUpdate: new Date().toLocaleTimeString()
    };

    this.powerData = [
      { name: 'Grid', value: 65, color: '#3b82f6' },
      { name: 'DG', value: 25, color: '#f59e0b' },
      { name: 'Solar', value: 10, color: '#10b981' }
    ];

    this.upsData = [
      { block: 'Block A', load: 75 },
      { block: 'Block B', load: 68 },
      { block: 'Block C', load: 82 },
      { block: 'Block D', load: 71 }
    ];

    this.rackPowerData = [
      { rack: 'R01', power: 4.2, utilization: 85 },
      { rack: 'R02', power: 3.8, utilization: 72 },
      { rack: 'R03', power: 5.1, utilization: 95 },
      { rack: 'R04', power: 3.2, utilization: 64 }
    ];

    this.rackSpaceData = [
      { area: 'Zone A', total: 50, used: 42 },
      { area: 'Zone B', total: 45, used: 38 },
      { area: 'Zone C', total: 60, used: 55 },
      { area: 'Zone D', total: 40, used: 28 }
    ];

    this.sparePartsData = [
      { category: 'Servers', available: 15, required: 20 },
      { category: 'Network', available: 8, required: 10 },
      { category: 'Storage', available: 12, required: 15 },
      { category: 'Power', available: 5, required: 8 }
    ];

    this.activeTickets = [
      { id: 'INC001', priority: 'Critical', title: 'UPS Alarm Block A', assignee: 'John D.', age: '2h' },
      { id: 'INC002', priority: 'Major', title: 'High Temp Zone C', assignee: 'Sarah M.', age: '4h' },
      { id: 'INC003', priority: 'Minor', title: 'Network Port Issue', assignee: 'Mike R.', age: '1d' }
    ];

    this.temperatureZones = this.generateTemperatureZones();
    this.rackLayout = this.generateRackLayout();
  }

  generateTemperatureZones() {
    const zones = [];
    for (let i = 0; i < 48; i++) {
      const temp = 20 + Math.random() * 15;
      let status = 'normal';
      if (temp > 30) status = 'hot';
      else if (temp > 27) status = 'warm';
      if (temp > 32) status = 'critical';
      
      zones.push({
        id: i,
        temperature: Math.round(temp * 10) / 10,
        status: status
      });
    }
    return zones;
  }

  generateRackLayout() {
    const racks = [];
    for (let i = 0; i < 50; i++) {
      const utilization = Math.random() * 100;
      let status = 'normal';
      if (utilization > 90) status = 'critical';
      else if (utilization > 75) status = 'warning';
      else if (utilization < 10) status = 'empty';
      
      racks.push({
        id: `R${String(i + 1).padStart(2, '0')}`,
        utilization: Math.round(utilization),
        status: status
      });
    }
    return racks;
  }

  updateData() {
    this.data.lastUpdate = new Date().toLocaleTimeString();
    // Simulate small variations in data
    this.data.totalPower += (Math.random() - 0.5) * 0.1;
    this.data.avgTemperature += (Math.random() - 0.5) * 0.5;
    this.data.upsLoad += Math.floor((Math.random() - 0.5) * 4);
    
    // Keep values within reasonable bounds
    this.data.upsLoad = Math.max(65, Math.min(85, this.data.upsLoad));
    this.data.avgTemperature = Math.max(22, Math.min(28, this.data.avgTemperature));
    this.data.totalPower = Math.max(2.8, Math.min(3.6, this.data.totalPower));
  }
}

// Dashboard Components
class Dashboard {
  constructor() {
    this.dashboardData = new DashboardData();
    this.init();
    this.startRealTimeUpdates();
  }

  init() {
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create dashboard structure
    this.createDashboard();
  }

  createDashboard() {
    document.body.innerHTML = `
      <div class="dashboard">
        ${this.createHeader()}
        ${this.createKPIGrid()}
        ${this.createMainGrid()}
        ${this.createBottomGrid()}
      </div>
    `;
  }

  createHeader() {
    return `
      <div class="header">
        <h1>Data Center Operations Dashboard</h1>
        <p class="last-update">Last updated: ${this.dashboardData.data.lastUpdate}</p>
      </div>
    `;
  }

  createKPIGrid() {
    const kpis = [
      { title: 'PUE', value: this.dashboardData.data.pue, unit: '', icon: '⚡', color: '#3b82f6' },
      { title: 'Total Power', value: this.dashboardData.data.totalPower.toFixed(1), unit: 'MW', icon: '🔌', color: '#f59e0b' },
      { title: 'Avg Temperature', value: this.dashboardData.data.avgTemperature.toFixed(1), unit: '°C', icon: '🌡️', color: '#10b981' },
      { title: 'Active Alarms', value: this.dashboardData.data.activeAlarms, unit: '', icon: '🚨', color: '#ef4444' },
      { title: 'White Space Used', value: this.dashboardData.data.whiteSpaceUsed, unit: '%', icon: '📦', color: '#8b5cf6' },
      { title: 'UPS Load', value: this.dashboardData.data.upsLoad, unit: '%', icon: '🔋', color: '#06b6d4' },
      { title: 'Chiller Efficiency', value: this.dashboardData.data.chillerEfficiency, unit: 'kW/TR', icon: '❄️', color: '#3b82f6' },
      { title: 'MTTR', value: this.dashboardData.data.mttr, unit: 'hours', icon: '⏱️', color: '#f97316' }
    ];

    return `
      <div class="kpi-grid">
        ${kpis.map(kpi => `
          <div class="kpi-card">
            <div class="kpi-header">
              <div class="kpi-icon" style="background-color: ${kpi.color}20; color: ${kpi.color};">
                ${kpi.icon}
              </div>
            </div>
            <div class="kpi-title">${kpi.title}</div>
            <div style="display: flex; align-items: baseline; gap: 5px;">
              <span class="kpi-value">${kpi.value}</span>
              ${kpi.unit ? `<span class="kpi-unit">${kpi.unit}</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  createMainGrid() {
    return `
      <div class="main-grid">
        ${this.createPowerSection()}
        ${this.createCoolingSection()}
        ${this.createAssetSection()}
      </div>
    `;
  }

  createPowerSection() {
    return `
      <div class="section">
        <h2 class="section-title">⚡ Power Systems</h2>
        
        <div class="chart-container">
          <h3 class="chart-title">Power Source Split</h3>
          <div class="pie-chart">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 10px;">Power Distribution</div>
              <div class="legend">
                ${this.dashboardData.powerData.map(item => `
                  <div class="legend-item">
                    <div class="legend-color" style="background: ${item.color};"></div>
                    <span>${item.name}: ${item.value}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">UPS Load per Block</h3>
          <div class="bar-chart">
            <div class="chart-bars">
              ${this.dashboardData.upsData.map(item => `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                  <div class="bar" style="height: ${item.load}%; width: 30px;" title="${item.block}: ${item.load}%"></div>
                  <span style="font-size: 0.8rem; color: #6b7280;">${item.block}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">DG Fuel Level</h3>
          <div style="display: flex; justify-content: center; align-items: center; height: 120px;">
            <div class="gauge">
              <div class="gauge-bg" style="background: conic-gradient(#10b981 0deg ${85 * 3.6}deg, #e5e7eb ${85 * 3.6}deg 360deg);"></div>
              <div class="gauge-value">85%</div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Electrical Alerts</h3>
          <div class="alert-item">
            <span class="alert-icon">⚠️</span>
            <span>Voltage fluctuation in Block B</span>
          </div>
          <div class="alert-item">
            <span class="alert-icon">🔴</span>
            <span>UPS overload threshold reached</span>
          </div>
        </div>
      </div>
    `;
  }

  createCoolingSection() {
    return `
      <div class="section">
        <h2 class="section-title">❄️ Cooling & Environmental</h2>
        
        <div class="chart-container">
          <h3 class="chart-title">Chiller Load</h3>
          <div class="line-chart">
            <div style="text-align: center;">
              <div style="font-size: 1.1rem; font-weight: 600;">Real-time Load Trends</div>
              <div style="margin-top: 10px; color: #6b7280;">Current Load: 68%</div>
              <div style="margin-top: 5px; color: #6b7280;">Efficiency: 0.68 kW/TR</div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Temperature Heat Map</h3>
          <div style="text-align: center; margin-bottom: 15px; color: #6b7280; font-size: 0.9rem;">
            Data Center Floor Temperature Distribution (°C)
          </div>
          <div class="heatmap">
            ${this.dashboardData.temperatureZones.map(zone => `
              <div class="heatmap-cell temp-${zone.status}" title="Zone ${zone.id}: ${zone.temperature}°C">
                ${zone.temperature}
              </div>
            `).join('')}
          </div>
          <div class="legend">
            <div class="legend-item">
              <div class="legend-color temp-normal"></div>
              <span>Normal (20-27°C)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color temp-warm"></div>
              <span>Warm (27-30°C)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color temp-hot"></div>
              <span>Hot (30-32°C)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color temp-critical"></div>
              <span>Critical (&gt;32°C)</span>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Riser Flow & Temp</h3>
          <div class="line-chart">
            <div style="text-align: center;">
              <div style="font-size: 1.1rem; font-weight: 600;">Water Flow & Temperature</div>
              <div style="margin-top: 10px; color: #6b7280;">Supply: 12.5°C | Return: 18.2°C</div>
              <div style="margin-top: 5px; color: #6b7280;">Flow Rate: 2,450 LPM</div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Leak / Smoke Alerts</h3>
          <div class="alert-item">
            <span class="alert-icon">💧</span>
            <span>Water detected - Chiller Room A</span>
          </div>
          <div class="alert-item">
            <span class="alert-icon">🔥</span>
            <span>Smoke alarm - Server Room C</span>
          </div>
        </div>
      </div>
    `;
  }

  createAssetSection() {
    return `
      <div class="section">
        <h2 class="section-title">🧮 Asset & Capacity</h2>
        
        <div class="chart-container">
          <h3 class="chart-title">Rack Power Usage</h3>
          <div class="bar-chart">
            <div class="chart-bars">
              ${this.dashboardData.rackPowerData.map(item => `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                  <div class="bar" style="height: ${item.utilization}%; width: 30px;" title="${item.rack}: ${item.power}kW (${item.utilization}%)"></div>
                  <span style="font-size: 0.8rem; color: #6b7280;">${item.rack}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Server Count & Utilization</h3>
          <div class="pie-chart">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 10px;">Server Status</div>
              <div class="legend">
                <div class="legend-item">
                  <div class="legend-color" style="background: #10b981;"></div>
                  <span>Active: 485</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #f59e0b;"></div>
                  <span>Idle: 127</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #ef4444;"></div>
                  <span>Maintenance: 23</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #6b7280;"></div>
                  <span>Spare: 65</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Rack Space Utilization</h3>
          <div class="bar-chart">
            <div class="chart-bars">
              ${this.dashboardData.rackSpaceData.map(item => `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                  <div style="position: relative; width: 30px; height: 80%;">
                    <div style="position: absolute; bottom: 0; width: 100%; height: 100%; background: #e5e7eb; border-radius: 2px 2px 0 0;"></div>
                    <div class="bar" style="position: absolute; bottom: 0; width: 100%; height: ${(item.used/item.total)*100}%;"
                      title="${item.area}: ${item.used}/${item.total} racks"></div>
                  </div>
                  <span style="font-size: 0.8rem; color: #6b7280;">${item.area}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div style="margin-top: 10px; font-size: 0.9rem; color: #6b7280; text-align: center;">
            Blue: Used Racks | Gray: Available Space
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">White Space Layout</h3>
          <div style="text-align: center; margin-bottom: 15px; color: #6b7280; font-size: 0.9rem;">
            Data Center Rack Layout and Status
          </div>
          <div class="rack-layout">
            ${this.dashboardData.rackLayout.map(rack => `
              <div class="rack rack-${rack.status}" title="${rack.id}: ${rack.utilization}% utilization">
                ${rack.id}
              </div>
            `).join('')}
          </div>
          <div class="legend">
            <div class="legend-item">
              <div class="legend-color rack-normal"></div>
              <span>Normal</span>
            </div>
            <div class="legend-item">
              <div class="legend-color rack-warning"></div>
              <span>Warning</span>
            </div>
            <div class="legend-item">
              <div class="legend-color rack-critical"></div>
              <span>Critical</span>
            </div>
            <div class="legend-item">
              <div class="legend-color rack-empty"></div>
              <span>Empty</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createBottomGrid() {
    return `
      <div class="bottom-grid">
        ${this.createAlarmsSection()}
        ${this.createSustainabilitySection()}
        ${this.createMaintenanceSection()}
      </div>
    `;
  }

  createAlarmsSection() {
    return `
      <div class="section">
        <h2 class="section-title">🚨 Alarms & Incidents</h2>
        
        <div class="chart-container">
          <h3 class="chart-title">Critical / Major / Minor Incidents</h3>
          <div class="bar-chart">
            <div style="display: flex; justify-content: space-around; align-items: end; height: 80%; padding: 0 20px;">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                <div style="width: 30px; height: 60px; background: #dc2626; border-radius: 2px 2px 0 0;" title="Critical: 3"></div>
                <span style="font-size: 0.8rem; color: #6b7280;">Critical</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                <div style="width: 30px; height: 120px; background: #f59e0b; border-radius: 2px 2px 0 0;" title="Major: 8"></div>
                <span style="font-size: 0.8rem; color: #6b7280;">Major</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                <div style="width: 30px; height: 90px; background: #10b981; border-radius: 2px 2px 0 0;" title="Minor: 15"></div>
                <span style="font-size: 0.8rem; color: #6b7280;">Minor</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Open Tickets</h3>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Priority</th>
                <th>Title</th>
                <th>Assignee</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              ${this.dashboardData.activeTickets.map(ticket => `
                <tr>
                  <td>${ticket.id}</td>
                  <td><span class="priority-${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
                  <td>${ticket.title}</td>
                  <td>${ticket.assignee}</td>
                  <td>${ticket.age}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Incident History</h3>
          <div class="line-chart">
            <div style="text-align: center;">
              <div style="font-size: 1.1rem; font-weight: 600;">7-Day Incident Trend</div>
              <div style="margin-top: 10px; color: #6b7280;">Total incidents this week: 26</div>
              <div style="margin-top: 5px; color: #6b7280;">Average per day: 3.7</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createSustainabilitySection() {
    return `
      <div class="section">
        <h2 class="section-title">♻️ Sustainability & Infrastructure</h2>
        
        <div class="chart-container">
          <h3 class="chart-title">Renewable Energy Use</h3>
          <div class="pie-chart">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 10px;">Energy Sources</div>
              <div class="legend">
                <div class="legend-item">
                  <div class="legend-color" style="background: #10b981;"></div>
                  <span>Solar: 12%</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #3b82f6;"></div>
                  <span>Wind: 8%</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #6b7280;"></div>
                  <span>Grid: 80%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Carbon Emissions Trend</h3>
          <div class="line-chart">
            <div style="text-align: center;">
              <div style="font-size: 1.1rem; font-weight: 600;">Monthly CO₂ Emissions</div>
              <div style="margin-top: 10px; color: #6b7280;">Current month: 245 tons</div>
              <div style="margin-top: 5px; color: #10b981;">↓ 12% from last month</div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Water Usage for Cooling</h3>
          <div class="line-chart">
            <div style="text-align: center;">
              <div style="font-size: 1.1rem; font-weight: 600;">Water Consumption</div>
              <div style="margin-top: 10px; color: #6b7280;">Daily usage: 2,450 liters</div>
              <div style="margin-top: 5px; color: #6b7280;">Monthly total: 73,500 liters</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createMaintenanceSection() {
    return `
      <div class="section">
        <h2 class="section-title">🛠️ Ops & Maintenance</h2>
        
        <div class="chart-container">
          <h3 class="chart-title">Maintenance Status</h3>
          <div style="padding: 20px;">
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 5px;">
                <span>UPS Maintenance</span>
                <span style="color: #10b981;">✓ Completed</span>
              </div>
              <div style="height: 8px; background: #e5e7eb; border-radius: 4px;">
                <div style="height: 100%; width: 100%; background: #10b981; border-radius: 4px;"></div>
              </div>
            </div>
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 5px;">
                <span>Chiller Service</span>
                <span style="color: #f59e0b;">🔄 In Progress</span>
              </div>
              <div style="height: 8px; background: #e5e7eb; border-radius: 4px;">
                <div style="height: 100%; width: 65%; background: #f59e0b; border-radius: 4px;"></div>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 5px;">
                <span>Fire System Check</span>
                <span style="color: #6b7280;">⏳ Scheduled</span>
              </div>
              <div style="height: 8px; background: #e5e7eb; border-radius: 4px;">
                <div style="height: 100%; width: 0%; background: #3b82f6; border-radius: 4px;"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Spare Parts Inventory</h3>
          <div class="bar-chart">
            <div class="chart-bars">
              ${this.dashboardData.sparePartsData.map(item => `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                  <div style="position: relative; width: 30px; height: 80%;">
                    <div style="position: absolute; bottom: 0; width: 100%; height: ${(item.required/25)*100}%; background: #e5e7eb; border-radius: 2px 2px 0 0;"></div>
                    <div class="bar" style="position: absolute; bottom: 0; width: 100%; height: ${(item.available/25)*100}%;"
                      title="${item.category}: ${item.available}/${item.required}"></div>
                  </div>
                  <span style="font-size: 0.8rem; color: #6b7280;">${item.category}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div style="margin-top: 10px; font-size: 0.9rem; color: #6b7280; text-align: center;">
            Blue: Available | Gray: Required
          </div>
        </div>

        <div class="chart-container">
          <h3 class="chart-title">Manpower Roster</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Shift</th>
                <th>Engineers</th>
                <th>Technicians</th>
                <th>Security</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Day (06:00-14:00)</td>
                <td>8</td>
                <td>12</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Evening (14:00-22:00)</td>
                <td>6</td>
                <td>10</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Night (22:00-06:00)</td>
                <td>4</td>
                <td>6</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  startRealTimeUpdates() {
    setInterval(() => {
      this.dashboardData.updateData();
      // Update specific elements without full refresh
      const lastUpdateElement = document.querySelector('.last-update');
      if (lastUpdateElement) {
        lastUpdateElement.textContent = `Last updated: ${this.dashboardData.data.lastUpdate}`;
      }
      
      // Update KPI values
      this.updateKPIValues();
    }, 30000); // Update every 30 seconds
  }

  updateKPIValues() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    if (kpiCards.length >= 8) {
      // Update power value
      const powerValue = kpiCards[1].querySelector('.kpi-value');
      if (powerValue) powerValue.textContent = this.dashboardData.data.totalPower.toFixed(1);
      
      // Update temperature value
      const tempValue = kpiCards[2].querySelector('.kpi-value');
      if (tempValue) tempValue.textContent = this.dashboardData.data.avgTemperature.toFixed(1);
      
      // Update UPS load value
      const upsValue = kpiCards[5].querySelector('.kpi-value');
      if (upsValue) upsValue.textContent = this.dashboardData.data.upsLoad;
    }
  }
}

// Initialize Dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Dashboard();
});

// Export for use in other contexts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Dashboard;
}
