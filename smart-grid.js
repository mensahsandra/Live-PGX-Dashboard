// Smart Grid Management JavaScript for PowerGridX
let map;
let transformerLayer;
let smartMeterLayer;
let powerLineLayer;
let alertLayer;
let currentInfoPanel = null;

// Ghana regions data with coordinates
const ghanaRegions = {
    'ashanti': {
        name: 'Ashanti Region',
        center: [6.7, -1.6],
        zoom: 9,
        districts: 5,
        population: '5.8M',
        transformers: 89
    },
    'greater-accra': {
        name: 'Greater Accra',
        center: [5.6, -0.2],
        zoom: 10,
        districts: 8,
        population: '4.2M',
        transformers: 156
    },
    'central': {
        name: 'Central Region',
        center: [5.3, -1.0],
        zoom: 9,
        districts: 4,
        population: '2.8M',
        transformers: 67
    },
    'western': {
        name: 'Western Region',
        center: [5.0, -2.5],
        zoom: 9,
        districts: 6,
        population: '3.1M',
        transformers: 78
    }
};

// Sample transformer data
const transformerData = [
    {
        id: 'TR-ACC-001',
        name: 'Osu Primary Transformer',
        lat: 5.5558,
        lng: -0.1826,
        status: 'active',
        capacity: '500 kVA',
        load: 78,
        efficiency: 94,
        district: 'Accra Metropolitan',
        type: 'Urban'
    },
    {
        id: 'TR-ACC-002',
        name: 'Tema Industrial Transformer',
        lat: 5.6698,
        lng: 0.0166,
        status: 'active',
        capacity: '1000 kVA',
        load: 85,
        efficiency: 91,
        district: 'Tema Metropolitan',
        type: 'Industrial'
    },
    {
        id: 'TR-GAE-001',
        name: 'Madina Central Transformer',
        lat: 5.6837,
        lng: -0.1668,
        status: 'active',
        capacity: '400 kVA',
        load: 72,
        efficiency: 89,
        district: 'Ga East Municipal',
        type: 'Peri-Urban'
    },
    {
        id: 'TR-ASH-001',
        name: 'Kumasi Central Transformer',
        lat: 6.6885,
        lng: -1.6244,
        status: 'maintenance',
        capacity: '750 kVA',
        load: 0,
        efficiency: 0,
        district: 'Kumasi Metropolitan',
        type: 'Urban'
    },
    {
        id: 'TR-WR-001',
        name: 'Takoradi Port Transformer',
        lat: 4.8845,
        lng: -1.7554,
        status: 'active',
        capacity: '800 kVA',
        load: 92,
        efficiency: 87,
        district: 'Sekondi-Takoradi Metropolitan',
        type: 'Industrial'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    updateQuickStats();
});

function initializeMap() {
    // Initialize map centered on Ghana
    map = L.map('map').setView([7.9465, -1.0232], 7);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Initialize layers
    transformerLayer = L.layerGroup().addTo(map);
    smartMeterLayer = L.layerGroup();
    powerLineLayer = L.layerGroup().addTo(map);
    alertLayer = L.layerGroup().addTo(map);
    
    // Load Ghana GeoJSON and add transformers
    loadGhanaMap();
    addTransformers();
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

function createTransformerMarker(transformer) {
    const statusColors = {
        'active': '#10B981',
        'maintenance': '#F59E0B',
        'fault': '#EF4444',
        'offline': '#6B7280'
    };
    
    const color = statusColors[transformer.status] || '#6B7280';
    
    const marker = L.circleMarker([transformer.lat, transformer.lng], {
        radius: 8,
        fillColor: color,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
    });
    
    // Add popup
    const popupContent = `
        <div class="p-3 min-w-64">
            <h3 class="font-semibold text-gray-900 mb-2">${transformer.name}</h3>
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
                    <span class="font-medium">${transformer.load}%</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Efficiency:</span>
                    <span class="font-medium">${transformer.efficiency}%</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">District:</span>
                    <span class="font-medium">${transformer.district}</span>
                </div>
            </div>
            <button onclick="showTransformerDetails('${transformer.id}')" 
                    class="mt-3 w-full bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">
                View Details
            </button>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // Add click event for info panel
    marker.on('click', () => {
        showInfoPanel(transformer);
    });
    
    return marker;
}

function addPowerLines() {
    // Add sample power lines connecting transformers
    const connections = [
        [[5.5558, -0.1826], [5.6698, 0.0166]], // Osu to Tema
        [[5.6698, 0.0166], [5.6837, -0.1668]], // Tema to Madina
        [[6.6885, -1.6244], [4.8845, -1.7554]] // Kumasi to Takoradi
    ];
    
    connections.forEach(connection => {
        L.polyline(connection, {
            color: '#3B82F6',
            weight: 3,
            opacity: 0.7,
            dashArray: '5, 10'
        }).addTo(powerLineLayer);
    });
}

function addAlerts() {
    // Add sample alert markers
    const alerts = [
        {
            lat: 5.5558,
            lng: -0.1826,
            type: 'critical',
            message: 'High load detected'
        },
        {
            lat: 6.6885,
            lng: -1.6244,
            type: 'maintenance',
            message: 'Scheduled maintenance'
        }
    ];
    
    alerts.forEach(alert => {
        const color = alert.type === 'critical' ? '#EF4444' : '#F59E0B';
        
        L.circleMarker([alert.lat, alert.lng], {
            radius: 12,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        }).bindPopup(`
            <div class="p-2">
                <h4 class="font-semibold text-gray-900">${alert.type.toUpperCase()}</h4>
                <p class="text-sm text-gray-600">${alert.message}</p>
            </div>
        `).addTo(alertLayer);
    });
}

function setupEventListeners() {
    // Region selector
    document.getElementById('region-selector').addEventListener('change', function(e) {
        const regionKey = e.target.value;
        if (regionKey === 'all') {
            map.setView([7.9465, -1.0232], 7);
            updateRegionInfo('all');
        } else if (ghanaRegions[regionKey]) {
            const region = ghanaRegions[regionKey];
            map.setView(region.center, region.zoom);
            updateRegionInfo(regionKey);
        }
    });
    
    // Layer toggles
    document.getElementById('transformers-layer').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(transformerLayer);
        } else {
            map.removeLayer(transformerLayer);
        }
    });
    
    document.getElementById('smart-meters-layer').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(smartMeterLayer);
        } else {
            map.removeLayer(smartMeterLayer);
        }
    });
    
    document.getElementById('power-lines-layer').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(powerLineLayer);
        } else {
            map.removeLayer(powerLineLayer);
        }
    });
    
    document.getElementById('alerts-layer').addEventListener('change', function(e) {
        if (e.target.checked) {
            map.addLayer(alertLayer);
        } else {
            map.removeLayer(alertLayer);
        }
    });
    
    // Search functionality
    document.getElementById('search-input').addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            searchTransformers(query);
        } else {
            hideSearchResults();
        }
    });
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

function updateQuickStats() {
    const activeTransformers = transformerData.filter(t => t.status === 'active').length;
    const totalTransformers = transformerData.length;
    const alerts = 2; // Sample alert count
    
    document.getElementById('total-transformers').textContent = totalTransformers;
    document.getElementById('active-transformers').textContent = activeTransformers;
    document.getElementById('alert-count').textContent = alerts;
    document.getElementById('coverage-percent').textContent = '87%';
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
    }
    hideSearchResults();
}

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
