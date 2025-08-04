// PowerGridX - Smart Infrastructure for Africa
// Main Application JavaScript

// Global variables
let map;
let transformerLayer;
let meterLayer;
let faultLayer;
let loadChart;
let trendsChart;

// Ashanti Region Districts Data
const ashantiDistricts = [
    {
        name: "Kumasi Metropolitan",
        type: "Urban",
        population: "2.8M",
        transformers: 89,
        smartMeters: 8247,
        coverage: 94,
        status: "healthy",
        center: [6.6885, -1.6244],
        description: "Commercial and administrative hub of Ashanti Region"
    },
    {
        name: "Obuasi Municipal",
        type: "Urban",
        population: "175K",
        transformers: 34,
        smartMeters: 2156,
        coverage: 87,
        status: "warning",
        center: [6.2027, -1.6708],
        description: "Major mining town with industrial infrastructure"
    },
    {
        name: "Ejisu",
        type: "Peri-Urban",
        population: "143K",
        transformers: 28,
        smartMeters: 1847,
        coverage: 82,
        status: "healthy",
        center: [6.7500, -1.3667],
        description: "Growing peri-urban area with mixed development"
    },
    {
        name: "Asante Akim North",
        type: "Rural",
        population: "198K",
        transformers: 45,
        smartMeters: 1923,
        coverage: 76,
        status: "critical",
        center: [6.8167, -1.0333],
        description: "Rural district with agricultural communities"
    },
    {
        name: "Adansi North",
        type: "Rural",
        population: "98K",
        transformers: 51,
        smartMeters: 1674,
        coverage: 89,
        status: "healthy",
        center: [6.1667, -1.3833],
        description: "Rural mining and farming communities"
    }
];

// Mock transformer data with realistic GPS coordinates
const transformers = [
    // Kumasi Metro
    { id: "KM-001", lat: 6.6885, lng: -1.6244, status: "healthy", load: 78, district: "Kumasi Metropolitan", capacity: "500 kVA" },
    { id: "KM-002", lat: 6.6945, lng: -1.6184, status: "healthy", load: 82, district: "Kumasi Metropolitan", capacity: "315 kVA" },
    { id: "KM-003", lat: 6.6825, lng: -1.6304, status: "warning", load: 91, district: "Kumasi Metropolitan", capacity: "500 kVA" },
    { id: "KM-004", lat: 6.6965, lng: -1.6124, status: "healthy", load: 67, district: "Kumasi Metropolitan", capacity: "315 kVA" },
    { id: "KM-005", lat: 6.7025, lng: -1.6344, status: "healthy", load: 73, district: "Kumasi Metropolitan", capacity: "500 kVA" },
    
    // Obuasi
    { id: "OB-001", lat: 6.2027, lng: -1.6708, status: "critical", load: 97, district: "Obuasi Municipal", capacity: "315 kVA" },
    { id: "OB-002", lat: 6.2087, lng: -1.6648, status: "warning", load: 89, district: "Obuasi Municipal", capacity: "500 kVA" },
    { id: "OB-003", lat: 6.1967, lng: -1.6768, status: "healthy", load: 73, district: "Obuasi Municipal", capacity: "315 kVA" },
    { id: "OB-004", lat: 6.2147, lng: -1.6588, status: "healthy", load: 68, district: "Obuasi Municipal", capacity: "500 kVA" },
    
    // Ejisu
    { id: "EJ-001", lat: 6.7500, lng: -1.3667, status: "healthy", load: 71, district: "Ejisu", capacity: "315 kVA" },
    { id: "EJ-002", lat: 6.7560, lng: -1.3607, status: "healthy", load: 84, district: "Ejisu", capacity: "500 kVA" },
    { id: "EJ-003", lat: 6.7440, lng: -1.3727, status: "warning", load: 88, district: "Ejisu", capacity: "315 kVA" },
    
    // Asante Akim North
    { id: "AN-001", lat: 6.8167, lng: -1.0333, status: "critical", load: 95, district: "Asante Akim North", capacity: "315 kVA" },
    { id: "AN-002", lat: 6.8227, lng: -1.0273, status: "warning", load: 88, district: "Asante Akim North", capacity: "500 kVA" },
    { id: "AN-003", lat: 6.8107, lng: -1.0393, status: "healthy", load: 76, district: "Asante Akim North", capacity: "315 kVA" },
    
    // Adansi North
    { id: "AD-001", lat: 6.1667, lng: -1.3833, status: "healthy", load: 76, district: "Adansi North", capacity: "500 kVA" },
    { id: "AD-002", lat: 6.1727, lng: -1.3773, status: "healthy", load: 69, district: "Adansi North", capacity: "315 kVA" },
    { id: "AD-003", lat: 6.1607, lng: -1.3893, status: "warning", load: 86, district: "Adansi North", capacity: "500 kVA" }
];

// Mock alerts data
const alerts = [
    {
        id: "ALT-001",
        type: "critical",
        title: "Transformer Overload",
        description: "OB-001 operating at 97% capacity - immediate attention required",
        location: "Obuasi Municipal",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        status: "active",
        impact: "156 customers affected"
    },
    {
        id: "ALT-002",
        type: "critical",
        title: "Power Line Fault",
        description: "Line disconnection detected in Asante Akim North",
        location: "Asante Akim North",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        status: "active",
        impact: "2,340 customers affected"
    },
    {
        id: "ALT-003",
        type: "warning",
        title: "High Load Warning",
        description: "KM-003 approaching capacity limit at 91%",
        location: "Kumasi Metropolitan",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "active",
        impact: "112 customers at risk"
    },
    {
        id: "ALT-004",
        type: "warning",
        title: "Voltage Fluctuation",
        description: "Irregular voltage patterns detected",
        location: "Obuasi Municipal",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        status: "investigating",
        impact: "567 customers affected"
    },
    {
        id: "ALT-005",
        type: "info",
        title: "Maintenance Scheduled",
        description: "Routine maintenance for AD-002",
        location: "Adansi North",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: "scheduled",
        impact: "89 customers (planned outage)"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 PowerGridX initializing...');
    
    // Hide loading indicator after a short delay
    setTimeout(() => {
        document.getElementById('loading-indicator').style.display = 'none';
    }, 1500);
    
    initializeMap();
    initializeNavigation();
    initializeCharts();
    populateDistricts();
    populateAlerts();
    startRealTimeUpdates();
    
    console.log('✅ PowerGridX initialized successfully');
});

// Initialize the map
function initializeMap() {
    // Center on Ashanti Region
    map = L.map('map').setView([6.6885, -1.6244], 9);
    
    // Add tile layer with custom styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors | PowerGridX',
        maxZoom: 18
    }).addTo(map);
    
    // Initialize layers
    transformerLayer = L.layerGroup().addTo(map);
    meterLayer = L.layerGroup();
    faultLayer = L.layerGroup().addTo(map);
    
    // Add transformers to map
    addTransformersToMap();
    
    // Add district boundaries
    addDistrictBoundaries();
    
    // Setup layer controls
    setupLayerControls();
    
    console.log('🗺️ Map initialized with', transformers.length, 'transformers');
}

// Add transformers to map
function addTransformersToMap() {
    transformers.forEach(transformer => {
        const color = getStatusColor(transformer.status);
        const size = transformer.load > 90 ? 16 : transformer.load > 75 ? 14 : 12;
        
        const icon = L.divIcon({
            className: 'transformer-marker',
            html: `<div style="
                background-color: ${color}; 
                width: ${size}px; 
                height: ${size}px; 
                border-radius: 50%; 
                border: 2px solid white; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                position: relative;
            ">
                ${transformer.load > 90 ? '<div style="position: absolute; top: -2px; right: -2px; width: 6px; height: 6px; background: #FF6B00; border-radius: 50%; animation: pulse-orange 1s infinite;"></div>' : ''}
            </div>`,
            iconSize: [size + 4, size + 4],
            iconAnchor: [(size + 4) / 2, (size + 4) / 2]
        });
        
        const marker = L.marker([transformer.lat, transformer.lng], { icon })
            .bindPopup(createTransformerPopup(transformer))
            .on('click', () => showTransformerDetails(transformer));
        
        transformerLayer.addLayer(marker);
    });
}

// Add district boundaries
function addDistrictBoundaries() {
    ashantiDistricts.forEach(district => {
        const color = getStatusColor(district.status);
        const radius = district.type === 'Urban' ? 20000 : district.type === 'Peri-Urban' ? 15000 : 25000;
        
        const circle = L.circle(district.center, {
            color: color,
            fillColor: color,
            fillOpacity: 0.1,
            radius: radius,
            weight: 2,
            dashArray: district.type === 'Rural' ? '5, 5' : null
        }).bindPopup(createDistrictPopup(district))
          .on('click', () => showDistrictDetails(district));
        
        // Add district label
        const label = L.marker(district.center, {
            icon: L.divIcon({
                className: 'district-label',
                html: `<div style="
                    background: rgba(0,0,0,0.7); 
                    color: white; 
                    padding: 4px 8px; 
                    border-radius: 4px; 
                    font-size: 12px; 
                    font-weight: bold;
                    border: 1px solid ${color};
                    white-space: nowrap;
                ">${district.name}</div>`,
                iconSize: [0, 0],
                iconAnchor: [0, -10]
            })
        });
        
        map.addLayer(circle);
        map.addLayer(label);
    });
}

// Get status color
function getStatusColor(status) {
    switch(status) {
        case 'healthy': return '#10B981';
        case 'warning': return '#F59E0B';
        case 'critical': return '#EF4444';
        default: return '#6B7280';
    }
}

// Create transformer popup
function createTransformerPopup(transformer) {
    return `
        <div class="p-3 min-w-[200px]">
            <h4 class="font-bold text-gray-800 mb-2">⚡ ${transformer.id}</h4>
            <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-600">Load:</span>
                    <span class="font-semibold" style="color: ${getStatusColor(transformer.status)}">${transformer.load}%</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Capacity:</span>
                    <span class="text-gray-800">${transformer.capacity}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Status:</span>
                    <span style="color: ${getStatusColor(transformer.status)}">${transformer.status}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">District:</span>
                    <span class="text-gray-800">${transformer.district}</span>
                </div>
            </div>
            <button onclick="showTransformerDetails(${JSON.stringify(transformer).replace(/"/g, '&quot;')})" 
                    class="mt-2 w-full bg-orange-600 hover:bg-orange-700 text-white py-1 px-2 rounded text-sm transition-colors">
                View Details
            </button>
        </div>
    `;
}

// Create district popup
function createDistrictPopup(district) {
    return `
        <div class="p-3 min-w-[200px]">
            <h4 class="font-bold text-gray-800 mb-2">🏘️ ${district.name}</h4>
            <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-600">Type:</span>
                    <span class="text-gray-800">${district.type}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Population:</span>
                    <span class="text-gray-800">${district.population}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Transformers:</span>
                    <span class="text-gray-800">${district.transformers}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Coverage:</span>
                    <span style="color: ${getStatusColor(district.status)}">${district.coverage}%</span>
                </div>
            </div>
            <div class="mt-2 text-xs text-gray-600">${district.description}</div>
        </div>
    `;
}

// Show transformer details in info panel
function showTransformerDetails(transformer) {
    const infoPanel = document.getElementById('info-panel');
    const infoContent = document.getElementById('info-content');
    
    const loadColor = transformer.load > 90 ? '#EF4444' : transformer.load > 75 ? '#F59E0B' : '#10B981';
    
    infoContent.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-white">⚡ Transformer ${transformer.id}</h3>
                <button onclick="hideInfoPanel()" class="text-gray-400 hover:text-white text-xl">×</button>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-700 p-3 rounded border border-gray-600">
                    <div class="text-sm text-gray-400">Load</div>
                    <div class="text-xl font-bold" style="color: ${loadColor}">${transformer.load}%</div>
                </div>
                <div class="bg-gray-700 p-3 rounded border border-gray-600">
                    <div class="text-sm text-gray-400">Status</div>
                    <div class="text-xl font-bold" style="color: ${getStatusColor(transformer.status)}">${transformer.status}</div>
                </div>
            </div>
            
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span class="text-gray-400">🏘️ District:</span>
                    <span class="text-white">${transformer.district}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">⚡ Capacity:</span>
                    <span class="text-white">${transformer.capacity}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">🔌 Voltage:</span>
                    <span class="text-white">11.2 kV</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">🔧 Last Maintenance:</span>
                    <span class="text-white">2 weeks ago</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">📊 Connected Meters:</span>
                    <span class="text-white">${Math.floor(Math.random() * 50) + 30}</span>
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-600">
                <div class="grid grid-cols-2 gap-2">
                    <button class="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition-colors text-sm">
                        📊 Full Report
                    </button>
                    <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-sm">
                        🔧 Schedule Maintenance
                    </button>
                </div>
            </div>
        </div>
    `;
    
    infoPanel.classList.remove('hidden');
}

// Hide info panel
function hideInfoPanel() {
    document.getElementById('info-panel').classList.add('hidden');
}

// Show district details
function showDistrictDetails(district) {
    console.log('Showing district details for:', district.name);
    // Focus on district
    map.setView(district.center, 11);
}

// Setup layer controls
function setupLayerControls() {
    document.getElementById('transformers-layer').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(transformerLayer);
        } else {
            map.removeLayer(transformerLayer);
        }
    });
    
    document.getElementById('meters-layer').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(meterLayer);
            // Add some mock smart meters
            addSmartMeters();
        } else {
            map.removeLayer(meterLayer);
        }
    });
    
    document.getElementById('faults-layer').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(faultLayer);
            addFaultMarkers();
        } else {
            map.removeLayer(faultLayer);
        }
    });
}

// Add smart meters to map
function addSmartMeters() {
    meterLayer.clearLayers();
    
    // Add some mock smart meters around transformers
    transformers.forEach(transformer => {
        for (let i = 0; i < 3; i++) {
            const lat = transformer.lat + (Math.random() - 0.5) * 0.01;
            const lng = transformer.lng + (Math.random() - 0.5) * 0.01;
            
            const meterIcon = L.divIcon({
                className: 'meter-marker',
                html: `<div style="
                    background-color: #3B82F6; 
                    width: 6px; 
                    height: 6px; 
                    border-radius: 50%; 
                    border: 1px solid white;
                "></div>`,
                iconSize: [8, 8],
                iconAnchor: [4, 4]
            });
            
            const marker = L.marker([lat, lng], { icon: meterIcon })
                .bindPopup(`
                    <div class="p-2">
                        <h5 class="font-bold">📊 Smart Meter</h5>
                        <p class="text-sm">Connected to ${transformer.id}</p>
                        <p class="text-sm">Status: Active</p>
                    </div>
                `);
            
            meterLayer.addLayer(marker);
        }
    });
}

// Add fault markers
function addFaultMarkers() {
    faultLayer.clearLayers();
    
    // Add fault markers for critical transformers
    const criticalTransformers = transformers.filter(t => t.status === 'critical');
    
    criticalTransformers.forEach(transformer => {
        const faultIcon = L.divIcon({
            className: 'fault-marker',
            html: `<div style="
                background-color: #EF4444; 
                width: 20px; 
                height: 20px; 
                border-radius: 50%; 
                border: 2px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
                animation: pulse-orange 1s infinite;
            ">!</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        const marker = L.marker([transformer.lat, transformer.lng], { icon: faultIcon })
            .bindPopup(`
                <div class="p-2">
                    <h5 class="font-bold text-red-600">🚨 Critical Alert</h5>
                    <p class="text-sm">Transformer ${transformer.id}</p>
                    <p class="text-sm">Load: ${transformer.load}%</p>
                    <p class="text-sm text-red-600">Immediate attention required</p>
                </div>
            `);
        
        faultLayer.addLayer(marker);
    });
}

// Initialize navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const panels = document.querySelectorAll('.panel');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPanel = this.id.replace('nav-', '') + '-panel';

            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show target panel
            panels.forEach(panel => {
                panel.classList.remove('active');
                panel.classList.add('hidden');
            });

            const panel = document.getElementById(targetPanel);
            if (panel) {
                panel.classList.remove('hidden');
                panel.classList.add('active');
            }

            console.log('📱 Switched to panel:', targetPanel);
        });
    });
}

// Initialize charts
function initializeCharts() {
    initializeLoadChart();
    initializeTrendsChart();
}

// Initialize load chart
function initializeLoadChart() {
    const ctx = document.getElementById('loadChart');
    if (!ctx) return;

    loadChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Grid Load (MW)',
                data: [],
                borderColor: '#FF6B00',
                backgroundColor: 'rgba(255, 107, 0, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#FF6B00',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(156, 163, 175, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(156, 163, 175, 0.1)'
                    }
                }
            }
        }
    });

    // Initialize with some data
    updateLoadChart();
}

// Initialize trends chart
function initializeTrendsChart() {
    const ctx = document.getElementById('trendsChart');
    if (!ctx) return;

    trendsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Efficiency %',
                data: [87, 89, 85, 91, 88, 86, 90],
                backgroundColor: '#10B981',
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(156, 163, 175, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(156, 163, 175, 0.1)'
                    },
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Update load chart with real-time data
function updateLoadChart() {
    if (!loadChart) return;

    const now = new Date();
    const timeLabel = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    // Generate realistic load data (1000-1500 MW range)
    const baseLoad = 1200;
    const timeOfDay = now.getHours();
    const peakFactor = timeOfDay >= 18 && timeOfDay <= 22 ? 1.3 :
                      timeOfDay >= 6 && timeOfDay <= 9 ? 1.2 :
                      timeOfDay >= 12 && timeOfDay <= 14 ? 1.1 : 0.9;

    const variation = Math.sin(Date.now() / 60000) * 100; // Sine wave variation
    const noise = (Math.random() - 0.5) * 50; // Random noise
    const currentLoad = Math.round(baseLoad * peakFactor + variation + noise);

    // Update current load display
    document.getElementById('current-load').textContent = `${currentLoad.toLocaleString()} MW`;

    // Add to chart
    loadChart.data.labels.push(timeLabel);
    loadChart.data.datasets[0].data.push(currentLoad);

    // Keep only last 20 data points
    if (loadChart.data.labels.length > 20) {
        loadChart.data.labels.shift();
        loadChart.data.datasets[0].data.shift();
    }

    loadChart.update('none');
}

// Populate districts list
function populateDistricts() {
    const districtsList = document.getElementById('districts-list');
    if (!districtsList) return;

    districtsList.innerHTML = ashantiDistricts.map(district => {
        const statusIcon = district.status === 'healthy' ? '🟢' :
                          district.status === 'warning' ? '🟡' : '🔴';

        return `
            <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer border border-gray-600"
                 onclick="focusOnDistrict('${district.name}')">
                <div class="flex-1">
                    <div class="font-semibold text-white">${district.name}</div>
                    <div class="text-sm text-gray-400">${district.type} • ${district.population}</div>
                    <div class="text-xs text-gray-500 mt-1">${district.transformers} transformers • ${district.smartMeters} meters</div>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="text-center">
                        <div class="text-sm font-bold" style="color: ${getStatusColor(district.status)}">${district.coverage}%</div>
                        <div class="text-xs text-gray-400">coverage</div>
                    </div>
                    <div class="text-lg">${statusIcon}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Focus on district
function focusOnDistrict(districtName) {
    const district = ashantiDistricts.find(d => d.name === districtName);
    if (district) {
        map.setView(district.center, 11);
        console.log('🎯 Focused on district:', districtName);
    }
}

// Populate alerts
function populateAlerts() {
    const alertsList = document.getElementById('alerts-list');
    if (!alertsList) return;

    alertsList.innerHTML = alerts.map(alert => {
        const alertIcon = alert.type === 'critical' ? '🚨' :
                         alert.type === 'warning' ? '⚠️' : 'ℹ️';

        return `
            <div class="p-3 border-l-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer"
                 style="border-left-color: ${getAlertColor(alert.type)}">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <span class="text-lg">${alertIcon}</span>
                            <div class="font-semibold text-white">${alert.title}</div>
                        </div>
                        <div class="text-sm text-gray-300 mb-2">${alert.description}</div>
                        <div class="text-xs text-gray-400 space-y-1">
                            <div>📍 ${alert.location}</div>
                            <div>👥 ${alert.impact}</div>
                            <div>🕐 ${formatTimeAgo(alert.timestamp)}</div>
                        </div>
                    </div>
                    <div class="ml-2">
                        <span class="px-2 py-1 text-xs rounded-full font-medium"
                              style="background-color: ${getAlertColor(alert.type)}20; color: ${getAlertColor(alert.type)}">
                            ${alert.type}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Get alert color
function getAlertColor(type) {
    switch(type) {
        case 'critical': return '#EF4444';
        case 'warning': return '#F59E0B';
        case 'info': return '#3B82F6';
        default: return '#6B7280';
    }
}

// Format time ago
function formatTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}h ago`;
    } else {
        return `${minutes}m ago`;
    }
}

// Start real-time updates
function startRealTimeUpdates() {
    // Update load chart every 5 seconds
    setInterval(updateLoadChart, 5000);

    // Update activity feed every 30 seconds
    setInterval(updateActivityFeed, 30000);

    // Update metrics every minute
    setInterval(updateMetrics, 60000);

    // Update transformer loads every 2 minutes
    setInterval(updateTransformerLoads, 120000);

    console.log('⏰ Real-time updates started');
}

// Update activity feed
function updateActivityFeed() {
    const activityFeed = document.getElementById('activity-feed');
    if (!activityFeed) return;

    const activities = [
        "🔧 Transformer KM-002 load normalized to 78%",
        "📊 Smart meter batch update completed (247 devices)",
        "⚡ Voltage stabilized in Obuasi sector",
        "🛠️ Maintenance scheduled for AD-001 next week",
        "📡 New smart meters deployed in Ejisu district",
        "🔋 Grid efficiency improved to 87.5%",
        "🚨 Alert resolved: KM-003 load reduced to 85%",
        "📈 Peak demand forecast updated for tomorrow",
        "🔌 Power quality monitoring enhanced",
        "🛡️ Security scan completed - all systems secure"
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const timeStamp = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    const activityItem = document.createElement('div');
    activityItem.className = 'p-2 bg-gray-700 rounded text-xs slide-in border border-gray-600';
    activityItem.innerHTML = `
        <div class="text-white font-medium">${randomActivity}</div>
        <div class="text-gray-400 mt-1">🕐 ${timeStamp}</div>
    `;

    activityFeed.insertBefore(activityItem, activityFeed.firstChild);

    // Keep only last 10 activities
    while (activityFeed.children.length > 10) {
        activityFeed.removeChild(activityFeed.lastChild);
    }
}

// Update metrics
function updateMetrics() {
    // Simulate small changes in metrics
    const totalTransformers = document.getElementById('total-transformers');
    const activeNodes = document.getElementById('active-nodes');
    const smartMeters = document.getElementById('smart-meters');
    const coveragePercent = document.getElementById('coverage-percent');

    if (totalTransformers) {
        const current = parseInt(totalTransformers.textContent);
        const change = Math.floor(Math.random() * 3) - 1;
        totalTransformers.textContent = Math.max(240, current + change);
    }

    if (activeNodes) {
        const current = parseInt(activeNodes.textContent);
        const change = Math.floor(Math.random() * 5) - 2;
        activeNodes.textContent = Math.max(230, Math.min(247, current + change));
    }

    if (smartMeters) {
        const current = parseInt(smartMeters.textContent.replace(',', ''));
        const change = Math.floor(Math.random() * 20) - 10;
        smartMeters.textContent = (current + change).toLocaleString();
    }

    if (coveragePercent) {
        const current = parseInt(coveragePercent.textContent);
        const change = Math.floor(Math.random() * 3) - 1;
        const newValue = Math.max(85, Math.min(95, current + change));
        coveragePercent.textContent = newValue + '%';
    }
}

// Update transformer loads
function updateTransformerLoads() {
    transformers.forEach(transformer => {
        // Simulate load changes
        const change = (Math.random() - 0.5) * 10;
        transformer.load = Math.max(50, Math.min(100, transformer.load + change));

        // Update status based on load
        if (transformer.load >= 95) {
            transformer.status = 'critical';
        } else if (transformer.load >= 85) {
            transformer.status = 'warning';
        } else {
            transformer.status = 'healthy';
        }
    });

    // Refresh map markers
    transformerLayer.clearLayers();
    addTransformersToMap();

    // Refresh fault layer
    if (map.hasLayer(faultLayer)) {
        faultLayer.clearLayers();
        addFaultMarkers();
    }
}

// Export functions for global access
window.hideInfoPanel = hideInfoPanel;
window.focusOnDistrict = focusOnDistrict;
window.showTransformerDetails = showTransformerDetails;
