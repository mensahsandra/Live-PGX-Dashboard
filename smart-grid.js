// Smart Grid Management JavaScript for PowerGridX
let map;
let transformerLayer;
let smartMeterLayer;
let powerLineLayer;
let alertLayer;
let baseStationLayer;
let currentInfoPanel = null;

// Ashanti Region districts data
const ashantiDistricts = {
    'kumasi': {
        name: 'Kumasi Metropolitan',
        center: [6.6885, -1.6244],
        zoom: 11,
        population: '2.8M',
        type: 'Urban',
        transformers: 24,
        smartMeters: 8047,
        coverage: 94,
        status: 'active'
    },
    'obuasi': {
        name: 'Obuasi Municipal',
        center: [6.2027, -1.6708],
        zoom: 11,
        population: '175K',
        type: 'Urban',
        transformers: 18,
        smartMeters: 2350,
        coverage: 87,
        status: 'active'
    },
    'ejisu': {
        name: 'Ejisu',
        center: [6.7500, -1.3667],
        zoom: 11,
        population: '143K',
        type: 'Peri-Urban',
        transformers: 15,
        smartMeters: 1890,
        coverage: 92,
        status: 'active'
    },
    'asante-akim-north': {
        name: 'Asante Akim North',
        center: [6.8167, -1.0833],
        zoom: 11,
        population: '98K',
        type: 'Rural',
        transformers: 12,
        smartMeters: 1456,
        coverage: 78,
        status: 'warning'
    },
    'bosomtwe': {
        name: 'Bosomtwe',
        center: [6.5000, -1.4167],
        zoom: 11,
        population: '89K',
        type: 'Rural',
        transformers: 8,
        smartMeters: 1058,
        coverage: 65,
        status: 'critical'
    }
};

// Ashanti Region transformer data
const transformerData = [
    // CRITICAL ALERT - High Load Risk Transformer
    {
        id: 'T-14',
        name: 'Abuakwa Tanoso Transformer',
        lat: 6.7200,
        lng: -1.5800,
        status: 'critical',
        capacity: '1500 kVA',
        load: 94,
        efficiency: 78,
        district: 'Kumasi Metropolitan',
        districtKey: 'kumasi',
        type: 'Urban',
        healthScore: 35,
        temperature: 78,
        alerts: ['High Load Risk', 'Temperature Warning', 'Maintenance Due'],
        priority: 'CRITICAL'
    },
    // Kumasi Metropolitan
    {
        id: 'TR-KMA-001',
        name: 'Kumasi Central Transformer',
        lat: 6.6885,
        lng: -1.6244,
        status: 'active',
        capacity: '1000 kVA',
        load: 85,
        efficiency: 94,
        district: 'Kumasi Metropolitan',
        districtKey: 'kumasi',
        type: 'Urban'
    },
    {
        id: 'TR-KMA-002',
        name: 'Adum Commercial Transformer',
        lat: 6.6950,
        lng: -1.6200,
        status: 'maintenance',
        capacity: '750 kVA',
        load: 78,
        efficiency: 92,
        district: 'Kumasi Metropolitan',
        districtKey: 'kumasi',
        type: 'Commercial',
        healthScore: 65,
        temperature: 68,
        alerts: ['Scheduled Maintenance'],
        priority: 'MEDIUM'
    },
    {
        id: 'TR-KMA-003',
        name: 'KNUST Campus Transformer',
        lat: 6.6745,
        lng: -1.5716,
        status: 'active',
        capacity: '500 kVA',
        load: 72,
        efficiency: 89,
        district: 'Kumasi Metropolitan',
        districtKey: 'kumasi',
        type: 'Educational',
        healthScore: 88,
        temperature: 62,
        alerts: [],
        priority: 'NORMAL'
    },
    // Obuasi Municipal
    {
        id: 'TR-OBU-001',
        name: 'Obuasi Main Transformer',
        lat: 6.2027,
        lng: -1.6708,
        status: 'active',
        capacity: '800 kVA',
        load: 82,
        efficiency: 87,
        district: 'Obuasi Municipal',
        districtKey: 'obuasi',
        type: 'Urban'
    },
    {
        id: 'TR-OBU-002',
        name: 'Mining Area Transformer',
        lat: 6.1950,
        lng: -1.6650,
        status: 'maintenance',
        capacity: '600 kVA',
        load: 0,
        efficiency: 0,
        district: 'Obuasi Municipal',
        districtKey: 'obuasi',
        type: 'Industrial'
    },
    // Ejisu
    {
        id: 'TR-EJI-001',
        name: 'Ejisu Town Transformer',
        lat: 6.7500,
        lng: -1.3667,
        status: 'active',
        capacity: '400 kVA',
        load: 75,
        efficiency: 92,
        district: 'Ejisu',
        districtKey: 'ejisu',
        type: 'Peri-Urban'
    },
    {
        id: 'TR-EJI-002',
        name: 'Bonwire Transformer',
        lat: 6.7800,
        lng: -1.3500,
        status: 'active',
        capacity: '300 kVA',
        load: 68,
        efficiency: 88,
        district: 'Ejisu',
        districtKey: 'ejisu',
        type: 'Rural'
    },
    // Asante Akim North
    {
        id: 'TR-AAN-001',
        name: 'Agogo Main Transformer',
        lat: 6.8167,
        lng: -1.0833,
        status: 'active',
        capacity: '350 kVA',
        load: 65,
        efficiency: 78,
        district: 'Asante Akim North',
        districtKey: 'asante-akim-north',
        type: 'Rural'
    },
    {
        id: 'TR-AAN-002',
        name: 'Konongo Transformer',
        lat: 6.6167,
        lng: -1.2167,
        status: 'fault',
        capacity: '250 kVA',
        load: 0,
        efficiency: 0,
        district: 'Asante Akim North',
        districtKey: 'asante-akim-north',
        type: 'Rural'
    },
    // Bosomtwe
    {
        id: 'TR-BOS-001',
        name: 'Kuntanase Transformer',
        lat: 6.5000,
        lng: -1.4167,
        status: 'active',
        capacity: '200 kVA',
        load: 58,
        efficiency: 65,
        district: 'Bosomtwe',
        districtKey: 'bosomtwe',
        type: 'Rural'
    },
    {
        id: 'TR-BOS-002',
        name: 'Abono Transformer',
        lat: 6.4800,
        lng: -1.4000,
        status: 'offline',
        capacity: '150 kVA',
        load: 0,
        efficiency: 0,
        district: 'Bosomtwe',
        districtKey: 'bosomtwe',
        type: 'Rural'
    }
];

// LoRaWAN Base Station data for Ashanti Region
const baseStationData = [
    {
        id: 'BS-KMA-001',
        name: 'Kumasi Central Base Station',
        lat: 6.6885,
        lng: -1.6244,
        status: 'active',
        type: 'LoRaWAN Gateway',
        coverage: '5km radius',
        connectedDevices: 45,
        signalStrength: 95,
        district: 'Kumasi Metropolitan',
        districtKey: 'kumasi-metropolitan',
        telecomTower: 'MTN Tower KMA-01'
    },
    {
        id: 'BS-OBU-001',
        name: 'Obuasi Mining Base Station',
        lat: 6.2027,
        lng: -1.6708,
        status: 'active',
        type: 'LoRaWAN Gateway',
        coverage: '8km radius',
        connectedDevices: 32,
        signalStrength: 88,
        district: 'Obuasi Municipal',
        districtKey: 'obuasi',
        telecomTower: 'Vodafone Tower OBU-02'
    },
    {
        id: 'BS-EJI-001',
        name: 'Ejisu Base Station',
        lat: 6.7500,
        lng: -1.3667,
        status: 'active',
        type: 'LoRaWAN Gateway',
        coverage: '6km radius',
        connectedDevices: 28,
        signalStrength: 92,
        district: 'Ejisu',
        districtKey: 'ejisu',
        telecomTower: 'AirtelTigo Tower EJI-01'
    },
    {
        id: 'BS-AAN-001',
        name: 'Asante Akim North Base Station',
        lat: 6.8167,
        lng: -1.0833,
        status: 'maintenance',
        type: 'LoRaWAN Gateway',
        coverage: '7km radius',
        connectedDevices: 18,
        signalStrength: 75,
        district: 'Asante Akim North',
        districtKey: 'asante-akim-north',
        telecomTower: 'MTN Tower AAN-03'
    },
    {
        id: 'BS-BOS-001',
        name: 'Bosomtwe Base Station',
        lat: 6.5000,
        lng: -1.4167,
        status: 'offline',
        type: 'LoRaWAN Gateway',
        coverage: '5km radius',
        connectedDevices: 0,
        signalStrength: 0,
        district: 'Bosomtwe',
        districtKey: 'bosomtwe',
        telecomTower: 'Vodafone Tower BOS-01'
    }
];

// Smart meter data for Ashanti region
const smartMeterData = [
    // Kumasi Metropolitan smart meters
    { id: 'SM-001', lat: 6.6900, lng: -1.6250, status: 'active', consumption: 245, district: 'Kumasi Metropolitan', transformerId: 'TR-KMA-001' },
    { id: 'SM-002', lat: 6.6850, lng: -1.6200, status: 'active', consumption: 189, district: 'Kumasi Metropolitan', transformerId: 'TR-KMA-001' },
    { id: 'SM-003', lat: 6.6920, lng: -1.6180, status: 'active', consumption: 312, district: 'Kumasi Metropolitan', transformerId: 'TR-KMA-002' },
    { id: 'SM-004', lat: 6.6980, lng: -1.6220, status: 'active', consumption: 156, district: 'Kumasi Metropolitan', transformerId: 'TR-KMA-002' },
    { id: 'SM-005', lat: 6.7180, lng: -1.5820, status: 'active', consumption: 278, district: 'Kumasi Metropolitan', transformerId: 'T-14' },
    { id: 'SM-006', lat: 6.7220, lng: -1.5780, status: 'active', consumption: 198, district: 'Kumasi Metropolitan', transformerId: 'T-14' },
    { id: 'SM-007', lat: 6.6760, lng: -1.5700, status: 'active', consumption: 234, district: 'Kumasi Metropolitan', transformerId: 'TR-KMA-003' },
    { id: 'SM-008', lat: 6.6730, lng: -1.5730, status: 'active', consumption: 167, district: 'Kumasi Metropolitan', transformerId: 'TR-KMA-003' },

    // Obuasi smart meters
    { id: 'SM-009', lat: 6.2050, lng: -1.6720, status: 'active', consumption: 145, district: 'Obuasi Municipal', transformerId: 'TR-OBU-001' },
    { id: 'SM-010', lat: 6.2000, lng: -1.6690, status: 'active', consumption: 203, district: 'Obuasi Municipal', transformerId: 'TR-OBU-001' },
    { id: 'SM-011', lat: 6.2080, lng: -1.6750, status: 'active', consumption: 189, district: 'Obuasi Municipal', transformerId: 'TR-OBU-002' },
    { id: 'SM-012', lat: 6.2120, lng: -1.6680, status: 'active', consumption: 267, district: 'Obuasi Municipal', transformerId: 'TR-OBU-002' }
];

// Power line connections data
const powerLineConnections = [
    // Base station to transformer connections (purple dashed lines)
    { from: { lat: 6.6885, lng: -1.6244 }, to: { lat: 6.6950, lng: -1.6200 }, type: 'base-to-transformer', color: '#8b5cf6' },
    { from: { lat: 6.6885, lng: -1.6244 }, to: { lat: 6.7200, lng: -1.5800 }, type: 'base-to-transformer', color: '#8b5cf6' },
    { from: { lat: 6.6885, lng: -1.6244 }, to: { lat: 6.6745, lng: -1.5716 }, type: 'base-to-transformer', color: '#8b5cf6' },

    // Transformer to smart meter connections (blue dashed lines)
    { from: { lat: 6.6885, lng: -1.6244 }, to: { lat: 6.6900, lng: -1.6250 }, type: 'transformer-to-meter', color: '#3b82f6' },
    { from: { lat: 6.6885, lng: -1.6244 }, to: { lat: 6.6850, lng: -1.6200 }, type: 'transformer-to-meter', color: '#3b82f6' },
    { from: { lat: 6.6950, lng: -1.6200 }, to: { lat: 6.6920, lng: -1.6180 }, type: 'transformer-to-meter', color: '#3b82f6' },
    { from: { lat: 6.6950, lng: -1.6200 }, to: { lat: 6.6980, lng: -1.6220 }, type: 'transformer-to-meter', color: '#3b82f6' },
    { from: { lat: 6.7200, lng: -1.5800 }, to: { lat: 6.7180, lng: -1.5820 }, type: 'transformer-to-meter', color: '#3b82f6' },
    { from: { lat: 6.7200, lng: -1.5800 }, to: { lat: 6.7220, lng: -1.5780 }, type: 'transformer-to-meter', color: '#3b82f6' },
    { from: { lat: 6.6745, lng: -1.5716 }, to: { lat: 6.6760, lng: -1.5700 }, type: 'transformer-to-meter', color: '#3b82f6' },
    { from: { lat: 6.6745, lng: -1.5716 }, to: { lat: 6.6730, lng: -1.5730 }, type: 'transformer-to-meter', color: '#3b82f6' }
];

// Dispatch Request Functions
function dispatchRequest(lat, lng, type, message) {
    // Store dispatch request data in sessionStorage for the dispatch page
    const dispatchData = {
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        type: type,
        message: message,
        timestamp: new Date().toISOString(),
        priority: type === 'critical' ? 'high' : type === 'maintenance' ? 'medium' : 'low'
    };

    sessionStorage.setItem('pendingDispatchRequest', JSON.stringify(dispatchData));

    // Redirect to dispatch request page
    window.location.href = 'dispatch.html';
}

function createDispatchModal(lat, lng, type, message) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Dispatch Request</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                    <input type="text" value="${type.toUpperCase()}" readonly
                           class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" value="Lat: ${lat}, Lng: ${lng}" readonly
                           class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea readonly class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 h-20">${message}</textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Assign Personnel</label>
                    <select id="personnel-select" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Select qualified personnel...</option>
                        <option value="john-doe">John Doe - Senior Technician (Available)</option>
                        <option value="jane-smith">Jane Smith - Electrical Engineer (Available)</option>
                        <option value="mike-johnson">Mike Johnson - Maintenance Specialist (Available)</option>
                        <option value="sarah-wilson">Sarah Wilson - Field Technician (Available)</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                    <select id="priority-select" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="high" ${type === 'critical' ? 'selected' : ''}>High Priority</option>
                        <option value="medium" ${type === 'maintenance' ? 'selected' : ''}>Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea id="dispatch-notes" placeholder="Enter any additional instructions or notes..."
                              class="w-full px-3 py-2 border border-gray-300 rounded-md h-20"></textarea>
                </div>
            </div>

            <div class="flex space-x-3 mt-6">
                <button onclick="submitDispatchRequest('${lat}', '${lng}', '${type}', '${message}')"
                        class="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                    Submit Dispatch Request
                </button>
                <button onclick="this.closest('.fixed').remove()"
                        class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    `;
    return modal;
}

function submitDispatchRequest(lat, lng, type, message) {
    const personnel = document.getElementById('personnel-select').value;
    const priority = document.getElementById('priority-select').value;
    const notes = document.getElementById('dispatch-notes').value;

    if (!personnel) {
        alert('Please select personnel to assign to this request.');
        return;
    }

    // Create dispatch log entry
    const dispatchLog = {
        id: 'DISP-' + Date.now(),
        timestamp: new Date().toISOString(),
        location: { lat: parseFloat(lat), lng: parseFloat(lng) },
        type: type,
        message: message,
        assignedPersonnel: personnel,
        priority: priority,
        notes: notes,
        status: 'dispatched',
        dateTime: new Date().toLocaleString()
    };

    // Store in localStorage (in real app, this would go to backend)
    let dispatchLogs = JSON.parse(localStorage.getItem('dispatchLogs') || '[]');
    dispatchLogs.push(dispatchLog);
    localStorage.setItem('dispatchLogs', JSON.stringify(dispatchLogs));

    // Show success message
    alert(`Dispatch request submitted successfully!\nRequest ID: ${dispatchLog.id}\nAssigned to: ${getPersonnelName(personnel)}`);

    // Close modal
    document.querySelector('.fixed.inset-0').remove();

    // Optionally redirect to dispatch page
    // window.location.href = 'dispatch.html';
}

function getPersonnelName(personnelId) {
    const personnelMap = {
        'john-doe': 'John Doe',
        'jane-smith': 'Jane Smith',
        'mike-johnson': 'Mike Johnson',
        'sarah-wilson': 'Sarah Wilson'
    };
    return personnelMap[personnelId] || personnelId;
}

// View Details Functions
function viewAlertDetails(lat, lng) {
    // Redirect to audit log with location filter
    window.location.href = `audit-log.html?location=${lat},${lng}&type=alert`;
}

function viewTransformerAuditLog(transformerId) {
    // Redirect to audit log with transformer filter
    window.location.href = `audit-log.html?transformer=${transformerId}&status=completed`;
}

function viewTransformerDetails(transformerId) {
    // Redirect to transformer details page
    window.location.href = `transformers.html?id=${transformerId}`;
}

function viewBaseStationDetails(baseStationId) {
    // Redirect to base station details page
    window.location.href = `base-stations.html?id=${baseStationId}`;
}

function showBaseStationInfoPanel(baseStation) {
    const infoPanel = document.getElementById('info-panel');
    const infoContent = document.getElementById('info-content');

    infoContent.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-900">Base Station Info</h3>
            <button onclick="hideInfoPanel()" class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div class="space-y-2 text-sm">
            <div><strong>Name:</strong> ${baseStation.name}</div>
            <div><strong>ID:</strong> ${baseStation.id}</div>
            <div><strong>Status:</strong>
                <span class="px-2 py-1 text-xs rounded-full ${
                    baseStation.status === 'active' ? 'bg-purple-100 text-purple-800' :
                    baseStation.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }">${baseStation.status.toUpperCase()}</span>
            </div>
            <div><strong>Type:</strong> ${baseStation.type}</div>
            <div><strong>Coverage:</strong> ${baseStation.coverage}</div>
            <div><strong>Connected Devices:</strong> ${baseStation.connectedDevices}</div>
            <div><strong>Signal Strength:</strong> ${baseStation.signalStrength}%</div>
            <div><strong>Telecom Tower:</strong> ${baseStation.telecomTower}</div>
            <div><strong>District:</strong> ${baseStation.district}</div>
        </div>
        <div class="mt-4 flex space-x-2">
            <button onclick="viewBaseStationDetails('${baseStation.id}')"
                    class="flex-1 bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                📡 View Details
            </button>
            <button onclick="dispatchRequest(${baseStation.lat}, ${baseStation.lng}, 'maintenance', 'Base station service required')"
                    class="flex-1 bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors">
                🔧 Service
            </button>
        </div>
    `;

    infoPanel.classList.remove('hidden');
    currentInfoPanel = 'baseStation';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Smart Grid: DOM Content Loaded');

    // Wait a bit for header to load if needed
    setTimeout(() => {
        console.log('Smart Grid: Initializing map...');
        initializeMap();
        setupEventListeners();
        updateQuickStats();
        setupDistrictInteractions();
        updateRegionOverview();
        console.log('Smart Grid: Initialization complete');
    }, 100);
});

function initializeMap() {
    console.log('Initializing map...');

    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('Map container not found!');
        return;
    }

    console.log('Map container found, creating Leaflet map...');

    // Initialize map centered on Ashanti region
    map = L.map('map').setView([6.6885, -1.6244], 9);

    console.log('Map created, adding tile layer...');

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    console.log('Tile layer added successfully');
    
    // Initialize layers
    transformerLayer = L.layerGroup().addTo(map);
    smartMeterLayer = L.layerGroup();
    powerLineLayer = L.layerGroup().addTo(map);
    alertLayer = L.layerGroup().addTo(map);
    baseStationLayer = L.layerGroup().addTo(map);
    
    // Load Ghana GeoJSON and add transformers
    loadGhanaMap();
    addTransformers();
    addSmartMeters();
    addBaseStations();
    addPowerLines();
    addAlerts();
}

function loadGhanaMap() {
    // This would normally load from a GeoJSON file
    // For now, we'll add a simple outline
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
        .then(response => response.json())
        .then(data => {
            // Filter for Ghana (this is a simplified approach)
            const ghanaFeature = data.features.find(feature => 
                feature.properties.NAME === 'Ghana'
            );
            
            if (ghanaFeature) {
                L.geoJSON(ghanaFeature, {
                    style: {
                        color: '#10B981',
                        weight: 3,
                        opacity: 0.8,
                        fillOpacity: 0.1
                    }
                }).addTo(map);
            }
        })
        .catch(error => {
            console.log('Could not load Ghana map data:', error);
            // Add a simple marker for Ghana center as fallback
            L.circle([7.9465, -1.0232], {
                radius: 50000,
                color: '#10B981',
                fillOpacity: 0.1
            }).addTo(map);
        });
}

function addTransformers() {
    transformerData.forEach(transformer => {
        const marker = createTransformerMarker(transformer);
        transformerLayer.addLayer(marker);
    });
}

function addSmartMeters() {
    smartMeterData.forEach(meter => {
        const marker = createSmartMeterMarker(meter);
        smartMeterLayer.addLayer(marker);
    });
}

function addBaseStations() {
    baseStationData.forEach(baseStation => {
        const marker = createBaseStationMarker(baseStation);
        baseStationLayer.addLayer(marker);
    });
}

function createTransformerMarker(transformer) {
    const statusColors = {
        'active': '#10B981',
        'maintenance': '#F59E0B',
        'fault': '#EF4444',
        'offline': '#6B7280',
        'critical': '#DC2626'
    };

    const color = statusColors[transformer.status] || '#6B7280';

    // Make critical transformers with blinking exclamation mark
    const isCritical = transformer.status === 'critical';
    const marker = L.circleMarker([transformer.lat, transformer.lng], {
        radius: isCritical ? 10 : 8,
        fillColor: color,
        color: isCritical ? '#ffffff' : '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
        className: isCritical ? 'critical-marker' : ''
    });
    
    // Add popup with enhanced information
    const alertsHtml = transformer.alerts && transformer.alerts.length > 0 ?
        `<div class="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <div class="text-xs font-medium text-red-800 mb-1">🚨 ALERTS:</div>
            ${transformer.alerts.map(alert => `<div class="text-xs text-red-700">• ${alert}</div>`).join('')}
        </div>` : '';

    const healthColor = transformer.healthScore ?
        (transformer.healthScore >= 80 ? '#10B981' :
         transformer.healthScore >= 60 ? '#F59E0B' : '#EF4444') : '#6B7280';

    const popupContent = `
        <div class="p-3 min-w-64">
            <h3 class="font-semibold text-gray-900 mb-2">${transformer.name}</h3>
            ${transformer.priority === 'CRITICAL' ? '<div class="bg-red-600 text-white text-xs px-2 py-1 rounded mb-2 font-bold">⚠️ CRITICAL PRIORITY</div>' : ''}
            <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-600">ID:</span>
                    <span class="font-medium">${transformer.id}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Status:</span>
                    <span class="font-medium capitalize" style="color: ${color}">${transformer.status}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Capacity:</span>
                    <span class="font-medium">${transformer.capacity}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Load:</span>
                    <span class="font-medium ${transformer.load >= 90 ? 'text-red-600' : ''}">${transformer.load}%</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Efficiency:</span>
                    <span class="font-medium">${transformer.efficiency}%</span>
                </div>
                ${transformer.healthScore ? `
                <div class="flex justify-between">
                    <span class="text-gray-600">Health Score:</span>
                    <span class="font-medium" style="color: ${healthColor}">${transformer.healthScore}/100</span>
                </div>` : ''}
                ${transformer.temperature ? `
                <div class="flex justify-between">
                    <span class="text-gray-600">Temperature:</span>
                    <span class="font-medium ${transformer.temperature >= 75 ? 'text-red-600' : ''}">${transformer.temperature}°C</span>
                </div>` : ''}
                <div class="flex justify-between">
                    <span class="text-gray-600">District:</span>
                    <span class="font-medium">${transformer.district}</span>
                </div>
            </div>
            ${alertsHtml}
            ${getTransformerActionButtons(transformer)}
        </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // Store transformer reference for highlighting
    marker.transformer = transformer;

    // Add click event for info panel
    marker.on('click', () => {
        showInfoPanel(transformer);
        // Also focus on the district
        if (transformer.districtKey) {
            updateDistrictSelection(transformer.districtKey);
        }
    });

    return marker;
}

function createSmartMeterMarker(meter) {
    // Create orange square marker for smart meters
    const marker = L.marker([meter.lat, meter.lng], {
        icon: L.divIcon({
            className: 'smart-meter-icon',
            html: '<div style="width: 8px; height: 8px; background: #f97316; border: 1px solid white; transform: rotate(45deg);"></div>',
            iconSize: [10, 10],
            iconAnchor: [5, 5]
        })
    });

    // Add popup for smart meter
    const popupContent = `
        <div class="p-3 min-w-48">
            <h3 class="font-semibold text-gray-900 mb-2">Smart Meter</h3>
            <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-600">ID:</span>
                    <span class="font-medium">${meter.id}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Status:</span>
                    <span class="font-medium text-green-600 capitalize">${meter.status}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Consumption:</span>
                    <span class="font-medium">${meter.consumption} kWh</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Connected to:</span>
                    <span class="font-medium">${meter.transformerId}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">District:</span>
                    <span class="font-medium">${meter.district}</span>
                </div>
            </div>
        </div>
    `;

    marker.bindPopup(popupContent);
    return marker;
}

function createBaseStationMarker(baseStation) {
    const statusColors = {
        'active': '#8B5CF6',
        'maintenance': '#F59E0B',
        'offline': '#6B7280'
    };

    const color = statusColors[baseStation.status] || '#6B7280';

    // Create custom icon for base station
    const baseStationIcon = L.divIcon({
        className: 'base-station-marker',
        html: `
            <div style="
                width: 16px;
                height: 16px;
                background-color: ${color};
                border: 2px solid #ffffff;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                position: relative;
            ">
                <div style="
                    position: absolute;
                    top: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    border-bottom: 8px solid ${color};
                "></div>
            </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    const marker = L.marker([baseStation.lat, baseStation.lng], {
        icon: baseStationIcon
    });

    const popupContent = `
        <div class="p-3 min-w-64">
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-gray-900">${baseStation.name}</h4>
                <span class="px-2 py-1 text-xs rounded-full ${
                    baseStation.status === 'active' ? 'bg-purple-100 text-purple-800' :
                    baseStation.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }">${baseStation.status.toUpperCase()}</span>
            </div>
            <div class="space-y-2 text-sm text-gray-600 mb-3">
                <div><strong>ID:</strong> ${baseStation.id}</div>
                <div><strong>Type:</strong> ${baseStation.type}</div>
                <div><strong>Coverage:</strong> ${baseStation.coverage}</div>
                <div><strong>Connected Devices:</strong> ${baseStation.connectedDevices}</div>
                <div><strong>Signal Strength:</strong> ${baseStation.signalStrength}%</div>
                <div><strong>Telecom Tower:</strong> ${baseStation.telecomTower}</div>
                <div><strong>District:</strong> ${baseStation.district}</div>
            </div>
            <div class="flex space-x-2">
                <button onclick="viewBaseStationDetails('${baseStation.id}')"
                        class="flex-1 bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors">
                    📡 View Details
                </button>
                <button onclick="dispatchRequest(${baseStation.lat}, ${baseStation.lng}, 'maintenance', 'Base station maintenance required')"
                        class="flex-1 bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors">
                    🔧 Request Service
                </button>
            </div>
        </div>
    `;

    marker.bindPopup(popupContent);

    // Store base station reference
    marker.baseStation = baseStation;

    // Add click event for info panel
    marker.on('click', () => {
        showBaseStationInfoPanel(baseStation);
    });

    return marker;
}

function addPowerLines() {
    // Add main power lines connecting Ashanti region transformers
    const mainConnections = [
        [[6.6885, -1.6244], [6.2027, -1.6708]], // Kumasi to Obuasi
        [[6.6885, -1.6244], [6.7500, -1.3667]], // Kumasi to Ejisu
        [[6.6885, -1.6244], [6.8167, -1.0833]], // Kumasi to Asante Akim North
        [[6.6885, -1.6244], [6.5000, -1.4167]], // Kumasi to Bosomtwe
        [[6.7500, -1.3667], [6.8167, -1.0833]], // Ejisu to Asante Akim North
    ];

    mainConnections.forEach(connection => {
        L.polyline(connection, {
            color: '#3B82F6',
            weight: 3,
            opacity: 0.7,
            dashArray: '5, 10'
        }).addTo(powerLineLayer);
    });

    // Add detailed power line connections from data
    powerLineConnections.forEach(connection => {
        const line = L.polyline([
            [connection.from.lat, connection.from.lng],
            [connection.to.lat, connection.to.lng]
        ], {
            color: connection.color,
            weight: connection.type === 'base-to-transformer' ? 2 : 1.5,
            opacity: 0.8,
            dashArray: connection.type === 'base-to-transformer' ? '8, 5' : '4, 3'
        });

        line.addTo(powerLineLayer);

        // Add popup to show connection info
        line.bindPopup(`
            <div class="text-sm">
                <strong>${connection.type === 'base-to-transformer' ? 'Base Station → Transformer' : 'Transformer → Smart Meter'}</strong><br>
                Connection Type: ${connection.type}<br>
                Status: Active
            </div>
        `);
    });
}

function addAlerts() {
    // Add Ashanti region alert markers
    const alerts = [
        {
            lat: 6.2027,
            lng: -1.6708,
            type: 'maintenance',
            message: 'Obuasi Mining Area - Scheduled maintenance'
        },
        {
            lat: 6.6167,
            lng: -1.2167,
            type: 'critical',
            message: 'Konongo Transformer - Fault detected'
        },
        {
            lat: 6.4800,
            lng: -1.4000,
            type: 'critical',
            message: 'Abono Transformer - Offline'
        }
    ];
    
    alerts.forEach(alert => {
        const color = alert.type === 'critical' ? '#EF4444' : '#F59E0B';

        if (alert.type === 'critical') {
            // Create custom HTML for critical alerts with blinking exclamation
            const criticalIcon = L.divIcon({
                className: 'critical-alert-marker',
                html: `
                    <div style="
                        width: 24px;
                        height: 24px;
                        background-color: ${color};
                        border: 2px solid white;
                        border-radius: 50%;
                        position: relative;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    ">
                        <div style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: white;
                            font-weight: bold;
                            font-size: 14px;
                            animation: blink 1s infinite;
                        ">!</div>
                    </div>
                `,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            L.marker([alert.lat, alert.lng], { icon: criticalIcon })
                .bindPopup(`
                    <div class="p-3 min-w-64">
                        <h4 class="font-semibold text-gray-900 mb-2">${alert.type.toUpperCase()}</h4>
                        <p class="text-sm text-gray-600 mb-3">${alert.message}</p>
                        <div class="flex space-x-2">
                            <button onclick="dispatchRequest('${alert.lat}', '${alert.lng}', '${alert.type}', '${alert.message}')"
                                    class="flex-1 bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors">
                                🚨 Dispatch Request
                            </button>
                            <button onclick="viewAlertDetails('${alert.lat}', '${alert.lng}')"
                                    class="flex-1 bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors">
                                📋 View Details
                            </button>
                        </div>
                    </div>
                `)
                .addTo(alertLayer);
        } else {
            // Regular circle marker for non-critical alerts
            L.circleMarker([alert.lat, alert.lng], {
                radius: 12,
                fillColor: color,
                color: '#ffffff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            }).bindPopup(`
                <div class="p-3 min-w-64">
                    <h4 class="font-semibold text-gray-900 mb-2">${alert.type.toUpperCase()}</h4>
                    <p class="text-sm text-gray-600 mb-3">${alert.message}</p>
                    <div class="flex space-x-2">
                        <button onclick="dispatchRequest('${alert.lat}', '${alert.lng}', '${alert.type}', '${alert.message}')"
                                class="flex-1 bg-orange-600 text-white px-3 py-1 rounded text-xs hover:bg-orange-700 transition-colors">
                            🔧 Dispatch Request
                        </button>
                        <button onclick="viewAlertDetails('${alert.lat}', '${alert.lng}')"
                                class="flex-1 bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors">
                            📋 View Details
                        </button>
                    </div>
                </div>
            `).addTo(alertLayer);
        }
    });
}

function setupEventListeners() {
    // Layer toggles
    const transformersLayerToggle = document.getElementById('transformers-layer');
    if (transformersLayerToggle) {
        transformersLayerToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                map.addLayer(transformerLayer);
            } else {
                map.removeLayer(transformerLayer);
            }
        });
    }

    const baseStationsLayerToggle = document.getElementById('base-stations-layer');
    if (baseStationsLayerToggle) {
        baseStationsLayerToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                map.addLayer(baseStationLayer);
            } else {
                map.removeLayer(baseStationLayer);
            }
        });
    }

    const smartMetersLayerToggle = document.getElementById('smart-meters-layer');
    if (smartMetersLayerToggle) {
        smartMetersLayerToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                map.addLayer(smartMeterLayer);
            } else {
                map.removeLayer(smartMeterLayer);
            }
        });
    }

    const powerLinesLayerToggle = document.getElementById('power-lines-layer');
    if (powerLinesLayerToggle) {
        powerLinesLayerToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                map.addLayer(powerLineLayer);
            } else {
                map.removeLayer(powerLineLayer);
            }
        });
    }

    const alertsLayerToggle = document.getElementById('alerts-layer');
    if (alertsLayerToggle) {
        alertsLayerToggle.addEventListener('change', function(e) {
            if (e.target.checked) {
                map.addLayer(alertLayer);
            } else {
                map.removeLayer(alertLayer);
            }
        });
    }

    // Region selector
    const regionSelector = document.getElementById('region-selector');
    if (regionSelector) {
        regionSelector.addEventListener('change', function(e) {
            const regionKey = e.target.value;
            if (regionKey === 'ashanti') {
                map.setView([6.6885, -1.6244], 9);
            } else if (regionKey === 'all') {
                map.setView([7.9465, -1.0232], 7);
            }
        });
    }

    // District selector
    const districtSelector = document.getElementById('district-selector');
    if (districtSelector) {
        districtSelector.addEventListener('change', function(e) {
            const districtKey = e.target.value;
            if (districtKey === 'all') {
                map.setView([6.6885, -1.6244], 9);
                resetDistrictSelection();
            } else {
                focusOnDistrict(districtKey);
                updateDistrictSelection(districtKey);
            }
        });
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                searchTransformers(query);
            } else {
                hideSearchResults();
            }
        });
    }
}

function setupDistrictInteractions() {
    // Add click event listeners to district items in the left panel
    const districtItems = document.querySelectorAll('.district-item');
    districtItems.forEach(item => {
        item.addEventListener('click', function() {
            const districtKey = this.getAttribute('data-district');
            focusOnDistrict(districtKey);
            updateDistrictSelection(districtKey);

            // Update district selector dropdown
            const districtSelector = document.getElementById('district-selector');
            if (districtSelector) {
                districtSelector.value = districtKey;
            }
        });
    });
}

function focusOnDistrict(districtKey) {
    if (ashantiDistricts[districtKey]) {
        const district = ashantiDistricts[districtKey];
        map.setView(district.center, district.zoom);

        // Highlight transformers in this district
        highlightDistrictTransformers(districtKey);

        // Update panel with district details
        updateDistrictDetails(districtKey);
    }
}

function highlightDistrictTransformers(districtKey) {
    // Reset all transformer markers to normal style
    transformerLayer.eachLayer(layer => {
        if (layer.options) {
            layer.setStyle({
                radius: 8,
                weight: 2
            });
        }
    });

    // Highlight transformers in the selected district
    transformerLayer.eachLayer(layer => {
        if (layer.options && layer.transformer) {
            const transformer = layer.transformer;
            if (transformer.districtKey === districtKey) {
                layer.setStyle({
                    radius: 12,
                    weight: 4
                });
            }
        }
    });
}

function updateDistrictSelection(districtKey) {
    // Remove active class from all district items
    document.querySelectorAll('.district-item').forEach(item => {
        item.classList.remove('bg-slate-500');
        item.classList.add('bg-slate-600');
    });

    // Add active class to selected district
    const selectedItem = document.querySelector(`[data-district="${districtKey}"]`);
    if (selectedItem) {
        selectedItem.classList.remove('bg-slate-600');
        selectedItem.classList.add('bg-slate-500');
    }

    // Update district selector
    const districtSelector = document.getElementById('district-selector');
    if (districtSelector) {
        districtSelector.value = districtKey;
    }
}

function resetDistrictSelection() {
    // Remove active class from all district items
    document.querySelectorAll('.district-item').forEach(item => {
        item.classList.remove('bg-slate-500');
        item.classList.add('bg-slate-600');
    });

    // Reset all transformer markers to normal style
    transformerLayer.eachLayer(layer => {
        if (layer.options) {
            layer.setStyle({
                radius: 8,
                weight: 2
            });
        }
    });

    // Reset overview metrics to region totals
    updateRegionOverview();
}

function updateRegionOverview() {
    // Calculate totals for entire Ashanti region
    const totalTransformers = Object.values(ashantiDistricts).reduce((sum, district) => sum + district.transformers, 0);
    const totalSmartMeters = Object.values(ashantiDistricts).reduce((sum, district) => sum + district.smartMeters, 0);
    const activeTransformers = transformerData.filter(t => t.status === 'active').length;
    const totalAlerts = transformerData.filter(t => t.status === 'fault' || t.status === 'maintenance' || t.status === 'offline').length;
    const averageCoverage = Math.round(Object.values(ashantiDistricts).reduce((sum, district) => sum + district.coverage, 0) / Object.values(ashantiDistricts).length);

    // Update the Quick Stats section
    const totalTransformersEl = document.getElementById('total-transformers');
    const activeTransformersEl = document.getElementById('active-transformers');
    const alertCountEl = document.getElementById('alert-count');
    const coveragePercentEl = document.getElementById('coverage-percent');

    if (totalTransformersEl) totalTransformersEl.textContent = totalTransformers;
    if (activeTransformersEl) activeTransformersEl.textContent = activeTransformers;
    if (alertCountEl) alertCountEl.textContent = totalAlerts;
    if (coveragePercentEl) coveragePercentEl.textContent = `${averageCoverage}%`;

    // Update the left panel overview section with region totals
    const transformersCount = document.querySelector('.text-orange-500.text-2xl');
    const activeNodesCount = document.querySelector('.text-green-500.text-2xl');
    const smartMetersCount = document.querySelector('.text-blue-500.text-2xl');
    const coveragePercent = document.querySelectorAll('.text-green-500.text-2xl')[1];

    if (transformersCount) transformersCount.textContent = totalTransformers;
    if (activeNodesCount) activeNodesCount.textContent = activeTransformers;
    if (smartMetersCount) smartMetersCount.textContent = totalSmartMeters.toLocaleString();
    if (coveragePercent) coveragePercent.textContent = `${averageCoverage}%`;
}

function updateDistrictDetails(districtKey) {
    const district = ashantiDistricts[districtKey];
    if (!district) return;

    // Update the Quick Stats section with district-specific data
    const totalTransformersEl = document.getElementById('total-transformers');
    const activeTransformersEl = document.getElementById('active-transformers');
    const alertCountEl = document.getElementById('alert-count');
    const coveragePercentEl = document.getElementById('coverage-percent');

    if (totalTransformersEl) totalTransformersEl.textContent = district.transformers;
    if (activeTransformersEl) {
        const activeTransformers = transformerData.filter(t =>
            t.districtKey === districtKey && t.status === 'active'
        ).length;
        activeTransformersEl.textContent = activeTransformers;
    }
    if (alertCountEl) {
        const districtAlerts = transformerData.filter(t =>
            t.districtKey === districtKey && (t.status === 'fault' || t.status === 'maintenance' || t.status === 'offline')
        ).length;
        alertCountEl.textContent = districtAlerts;
    }
    if (coveragePercentEl) coveragePercentEl.textContent = `${district.coverage}%`;

    // Also update the left panel overview metrics
    const transformersCount = document.querySelector('.text-orange-500.text-2xl');
    const activeNodesCount = document.querySelector('.text-green-500.text-2xl');
    const smartMetersCount = document.querySelector('.text-blue-500.text-2xl');
    const coveragePercent = document.querySelectorAll('.text-green-500.text-2xl')[1];

    if (transformersCount) transformersCount.textContent = district.transformers;
    if (activeNodesCount) {
        const activeTransformers = transformerData.filter(t =>
            t.districtKey === districtKey && t.status === 'active'
        ).length;
        activeNodesCount.textContent = activeTransformers;
    }
    if (smartMetersCount) smartMetersCount.textContent = district.smartMeters.toLocaleString();
    if (coveragePercent) coveragePercent.textContent = `${district.coverage}%`;
}

function updateRegionInfo(regionKey) {
    if (regionKey === 'all') {
        document.getElementById('district-count').textContent = '23';
        document.getElementById('region-population').textContent = '31.7M';
    } else if (ghanaRegions[regionKey]) {
        const region = ghanaRegions[regionKey];
        document.getElementById('district-count').textContent = region.districts;
        document.getElementById('region-population').textContent = region.population;
    }
}

function getTransformerActionButtons(transformer) {
    const status = transformer.status.toLowerCase();

    if (status === 'active' || status === 'operational') {
        // Green/Operational status - View Details button to audit log
        return `
            <button onclick="viewTransformerAuditLog('${transformer.id}')"
                    class="mt-3 w-full bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                ✅ View Audit Log
            </button>
        `;
    } else if (status === 'fault' || status === 'offline' || status === 'critical') {
        // Critical status - Dispatch Request button
        return `
            <div class="mt-3 space-y-2">
                <button onclick="dispatchRequest('${transformer.lat}', '${transformer.lng}', 'critical', 'Transformer ${transformer.id} requires immediate attention')"
                        class="w-full bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                    🚨 Dispatch Request
                </button>
                <button onclick="viewTransformerDetails('${transformer.id}')"
                        class="w-full bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                    📋 View Details
                </button>
            </div>
        `;
    } else if (status === 'maintenance' || status === 'warning') {
        // Maintenance/Warning status - Dispatch Request button
        return `
            <div class="mt-3 space-y-2">
                <button onclick="dispatchRequest('${transformer.lat}', '${transformer.lng}', 'maintenance', 'Transformer ${transformer.id} requires maintenance')"
                        class="w-full bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors">
                    🔧 Dispatch Request
                </button>
                <button onclick="viewTransformerDetails('${transformer.id}')"
                        class="w-full bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                    📋 View Details
                </button>
            </div>
        `;
    } else {
        // Default - View Details button
        return `
            <button onclick="viewTransformerDetails('${transformer.id}')"
                    class="mt-3 w-full bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">
                📋 View Details
            </button>
        `;
    }
}

function updateQuickStats() {
    const activeTransformers = transformerData.filter(t => t.status === 'active').length;
    const totalTransformers = transformerData.length;
    const alerts = 3; // Updated alert count for Ashanti region

    const totalTransformersEl = document.getElementById('total-transformers');
    const activeTransformersEl = document.getElementById('active-transformers');
    const alertCountEl = document.getElementById('alert-count');
    const coveragePercentEl = document.getElementById('coverage-percent');

    if (totalTransformersEl) totalTransformersEl.textContent = totalTransformers;
    if (activeTransformersEl) activeTransformersEl.textContent = activeTransformers;
    if (alertCountEl) alertCountEl.textContent = alerts;
    if (coveragePercentEl) coveragePercentEl.textContent = '87%';
}

function searchTransformers(query) {
    const results = transformerData.filter(transformer => 
        transformer.name.toLowerCase().includes(query) ||
        transformer.id.toLowerCase().includes(query) ||
        transformer.district.toLowerCase().includes(query)
    );
    
    showSearchResults(results);
}

function showSearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = results.map(transformer => `
        <div class="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
             onclick="focusTransformer('${transformer.id}')">
            <div class="font-medium text-sm">${transformer.name}</div>
            <div class="text-xs text-gray-600">${transformer.id} - ${transformer.district}</div>
        </div>
    `).join('');
    
    resultsContainer.classList.remove('hidden');
}

function hideSearchResults() {
    document.getElementById('search-results').classList.add('hidden');
}

function focusTransformer(transformerId) {
    const transformer = transformerData.find(t => t.id === transformerId);
    if (transformer) {
        map.setView([transformer.lat, transformer.lng], 15);
        showInfoPanel(transformer);

        // Find and open the transformer marker popup
        transformerLayer.eachLayer(layer => {
            if (layer.transformer && layer.transformer.id === transformerId) {
                layer.openPopup();
            }
        });
    }
    hideSearchResults();
}

// Make focusTransformer available globally for the critical alert banner
window.focusTransformer = focusTransformer;

function showInfoPanel(transformer) {
    const panel = document.getElementById('info-panel');
    const content = document.getElementById('info-content');
    
    content.innerHTML = `
        <div class="border-b border-gray-200 pb-3 mb-3">
            <h3 class="font-semibold text-gray-900">${transformer.name}</h3>
            <p class="text-sm text-gray-600">${transformer.id}</p>
        </div>
        <div class="space-y-2 text-sm">
            <div class="flex justify-between">
                <span class="text-gray-600">Status:</span>
                <span class="font-medium capitalize">${transformer.status}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Capacity:</span>
                <span class="font-medium">${transformer.capacity}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Current Load:</span>
                <span class="font-medium">${transformer.load}%</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Efficiency:</span>
                <span class="font-medium">${transformer.efficiency}%</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Type:</span>
                <span class="font-medium">${transformer.type}</span>
            </div>
        </div>
        <button onclick="hideInfoPanel()" 
                class="mt-4 w-full bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
            Close
        </button>
    `;
    
    panel.classList.remove('hidden');
    currentInfoPanel = transformer;
}

function hideInfoPanel() {
    document.getElementById('info-panel').classList.add('hidden');
    currentInfoPanel = null;
}

function showTransformerDetails(transformerId) {
    // This would typically open a detailed view or modal
    console.log('Show details for transformer:', transformerId);
    // For now, just focus on the transformer
    focusTransformer(transformerId);
}

// Export functions for global access
window.SmartGridMap = {
    focusTransformer,
    showTransformerDetails,
    hideInfoPanel
};
