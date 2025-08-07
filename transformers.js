// Transformers Management JavaScript for PowerGridX
// Handles Ashanti Region transformer and customer data

// Ashanti Region Districts Data
const ashantiDistricts = [
    {
        id: 'kumasi',
        name: 'Kumasi Metropolitan',
        type: 'Urban',
        population: '2,800,000',
        transformers: 24,
        smartMeters: 8047,
        coverage: 94,
        status: 'excellent'
    },
    {
        id: 'obuasi',
        name: 'Obuasi Municipal',
        type: 'Urban',
        population: '175,000',
        transformers: 18,
        smartMeters: 2350,
        coverage: 87,
        status: 'good'
    },
    {
        id: 'ejisu',
        name: 'Ejisu',
        type: 'Peri-Urban',
        population: '143,000',
        transformers: 15,
        smartMeters: 1890,
        coverage: 92,
        status: 'excellent'
    },
    {
        id: 'asante-akim-north',
        name: 'Asante Akim North',
        type: 'Rural',
        population: '98,000',
        transformers: 12,
        smartMeters: 1456,
        coverage: 78,
        status: 'fair'
    },
    {
        id: 'bosomtwe',
        name: 'Bosomtwe',
        type: 'Rural',
        population: '89,000',
        transformers: 8,
        smartMeters: 1058,
        coverage: 65,
        status: 'poor'
    }
];

// Comprehensive Transformer Database
const transformersDatabase = [
    // Kumasi Metropolitan Transformers
    {
        id: 'TR-KMA-001',
        name: 'Kumasi Central Primary',
        district: 'kumasi',
        districtName: 'Kumasi Metropolitan',
        location: 'Kejetia Market Area',
        landmark: 'Near Kumasi Central Market',
        geolocation: { lat: 6.6885, lng: -1.6244 },
        areaType: 'Urban',
        voltage: '33/11 kV',
        capacity: '1500 kVA',
        loadPercentage: 89,
        connectedCustomers: 1247,
        singlePhase: 1089,
        threePhase: 158,
        smartNodes: 3,
        status: 'active',
        lastMaintained: '2024-01-15',
        maintenanceContractors: [
            { name: 'John Doe', date: '2024-01-15', time: '09:30', type: 'Routine Inspection' },
            { name: 'Jane Smith', date: '2023-12-10', time: '14:20', type: 'Load Testing' }
        ],
        efficiency: 94
    },
    {
        id: 'TR-KMA-002',
        name: 'KNUST Campus Transformer',
        district: 'kumasi',
        districtName: 'Kumasi Metropolitan',
        location: 'KNUST Campus',
        landmark: 'University of Science and Technology',
        geolocation: { lat: 6.6745, lng: -1.5716 },
        areaType: 'Urban',
        voltage: '33/11 kV',
        capacity: '2000 kVA',
        loadPercentage: 76,
        connectedCustomers: 892,
        singlePhase: 654,
        threePhase: 238,
        smartNodes: 2,
        status: 'active',
        lastMaintained: '2024-01-20',
        maintenanceContractors: [
            { name: 'Mike Johnson', date: '2024-01-20', time: '11:15', type: 'Preventive Maintenance' }
        ],
        efficiency: 96
    },
    // Obuasi Municipal Transformers
    {
        id: 'TR-OBS-001',
        name: 'Obuasi Mining Area Primary',
        district: 'obuasi',
        districtName: 'Obuasi Municipal',
        location: 'Obuasi Mining Complex',
        landmark: 'AngloGold Ashanti Mine',
        geolocation: { lat: 6.2028, lng: -1.6703 },
        areaType: 'Urban',
        voltage: '33/11 kV',
        capacity: '2500 kVA',
        loadPercentage: 92,
        connectedCustomers: 1456,
        singlePhase: 1123,
        threePhase: 333,
        smartNodes: 4,
        status: 'active',
        lastMaintained: '2024-01-18',
        maintenanceContractors: [
            { name: 'Sarah Wilson', date: '2024-01-18', time: '08:45', type: 'Emergency Repair' },
            { name: 'Kwame Asante', date: '2024-01-05', time: '16:30', type: 'Routine Check' }
        ],
        efficiency: 91
    },
    // Ejisu Transformers
    {
        id: 'TR-EJS-001',
        name: 'Ejisu Township Transformer',
        district: 'ejisu',
        districtName: 'Ejisu',
        location: 'Ejisu Town Center',
        landmark: 'Ejisu Government Hospital',
        geolocation: { lat: 6.7394, lng: -1.3628 },
        areaType: 'Peri-Urban',
        voltage: '33/11 kV',
        capacity: '800 kVA',
        loadPercentage: 67,
        connectedCustomers: 634,
        singlePhase: 567,
        threePhase: 67,
        smartNodes: 2,
        status: 'active',
        lastMaintained: '2024-01-12',
        maintenanceContractors: [
            { name: 'Ama Osei', date: '2024-01-12', time: '13:20', type: 'Load Balancing' }
        ],
        efficiency: 88
    },
    // Asante Akim North Transformers
    {
        id: 'TR-AAN-001',
        name: 'Agogo Rural Transformer',
        district: 'asante-akim-north',
        districtName: 'Asante Akim North',
        location: 'Agogo Township',
        landmark: 'Agogo Presbyterian Hospital',
        geolocation: { lat: 7.0833, lng: -1.0833 },
        areaType: 'Rural',
        voltage: '33/11 kV',
        capacity: '500 kVA',
        loadPercentage: 54,
        connectedCustomers: 387,
        singlePhase: 356,
        threePhase: 31,
        smartNodes: 1,
        status: 'active',
        lastMaintained: '2024-01-08',
        maintenanceContractors: [
            { name: 'John Doe', date: '2024-01-08', time: '10:15', type: 'Routine Maintenance' }
        ],
        efficiency: 85
    },
    // Bosomtwe Transformers
    {
        id: 'TR-BSM-001',
        name: 'Kuntanase Lake Transformer',
        district: 'bosomtwe',
        districtName: 'Bosomtwe',
        location: 'Kuntanase',
        landmark: 'Lake Bosomtwe Resort',
        geolocation: { lat: 6.5167, lng: -1.4167 },
        areaType: 'Rural',
        voltage: '33/11 kV',
        capacity: '400 kVA',
        loadPercentage: 43,
        connectedCustomers: 234,
        singlePhase: 218,
        threePhase: 16,
        smartNodes: 1,
        status: 'maintenance',
        lastMaintained: '2024-01-25',
        maintenanceContractors: [
            { name: 'Mike Johnson', date: '2024-01-25', time: '14:45', type: 'Scheduled Maintenance' },
            { name: 'Sarah Wilson', date: '2024-01-10', time: '09:30', type: 'Inspection' }
        ],
        efficiency: 82
    }
];

// Customer Database Sample
const customersDatabase = [
    // Sample customers for TR-KMA-001
    {
        id: 'CUST-001',
        transformerId: 'TR-KMA-001',
        meterNumber: 'SM-KMA-001-001',
        customerName: 'Kwame Nkrumah Shop',
        customerType: 'Commercial',
        phaseType: 'Three Phase',
        connectionStatus: 'Connected',
        address: 'Kejetia Market, Shop 45A',
        monthlyConsumption: 450,
        suspiciousActivity: false
    },
    {
        id: 'CUST-002',
        transformerId: 'TR-KMA-001',
        meterNumber: 'SM-KMA-001-002',
        customerName: 'Akosua Mensah Residence',
        customerType: 'Residential',
        phaseType: 'Single Phase',
        connectionStatus: 'Connected',
        address: 'Adum, House 23',
        monthlyConsumption: 125,
        suspiciousActivity: false
    },
    {
        id: 'CUST-003',
        transformerId: 'TR-KMA-001',
        meterNumber: 'SM-KMA-001-003',
        customerName: 'Yaw Boateng Electronics',
        customerType: 'Commercial',
        phaseType: 'Single Phase',
        connectionStatus: 'Suspicious Activity',
        address: 'Central Market, Block C',
        monthlyConsumption: 89,
        suspiciousActivity: true
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    displayDistricts();
    updateDashboardMetrics();
});

function loadHeader() {
    // Load shared header
    if (typeof loadSharedHeader === 'function') {
        loadSharedHeader('transformers');
    }
}

function displayDistricts() {
    const container = document.getElementById('districts-grid');
    if (!container) return;
    
    container.innerHTML = ashantiDistricts.map(district => createDistrictCard(district)).join('');
}

function createDistrictCard(district) {
    const statusColor = district.status === 'excellent' ? 'green' :
                       district.status === 'good' ? 'blue' :
                       district.status === 'fair' ? 'yellow' : 'red';
    
    const coverageColor = district.coverage >= 90 ? 'green' :
                         district.coverage >= 80 ? 'yellow' : 'red';
    
    return `
        <div class="district-card bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer" 
             onclick="showDistrictTransformers('${district.id}')">
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">${district.name}</h3>
                    <span class="px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-800">
                        ${district.type}
                    </span>
                </div>
                
                <div class="space-y-3">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Population:</span>
                        <span class="text-sm font-medium text-gray-900">${district.population}</span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Transformers:</span>
                        <span class="text-sm font-medium text-blue-600">${district.transformers}</span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Smart Meters:</span>
                        <span class="text-sm font-medium text-purple-600">${district.smartMeters.toLocaleString()}</span>
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600">Coverage:</span>
                        <span class="text-sm font-medium text-${coverageColor}-600">${district.coverage}%</span>
                    </div>
                </div>
                
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <button class="w-full bg-pgx-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pgx-orange-dark transition-colors">
                        View Transformers →
                    </button>
                </div>
            </div>
        </div>
    `;
}

function showDistrictTransformers(districtId) {
    const district = ashantiDistricts.find(d => d.id === districtId);
    const districtTransformers = transformersDatabase.filter(t => t.district === districtId);

    const container = document.getElementById('districts-grid');
    container.innerHTML = `
        <div class="col-span-full mb-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <button onclick="displayDistricts()" class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                        ← Back to Districts
                    </button>
                    <h2 class="text-xl font-semibold text-gray-900">${district.name} Transformers</h2>
                </div>
                <span class="text-sm text-gray-600">${districtTransformers.length} transformers found</span>
            </div>
        </div>

        ${districtTransformers.map(transformer => createTransformerCard(transformer)).join('')}
    `;
}

function createTransformerCard(transformer) {
    const statusColor = transformer.status === 'active' ? 'green' :
                       transformer.status === 'maintenance' ? 'yellow' : 'red';

    const loadColor = transformer.loadPercentage >= 90 ? 'red' :
                     transformer.loadPercentage >= 75 ? 'yellow' : 'green';

    return `
        <div class="transformer-card bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">${transformer.name}</h3>
                        <p class="text-sm text-gray-600">${transformer.id}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-800 uppercase">
                        ${transformer.status}
                    </span>
                </div>

                <div class="space-y-2 mb-4">
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Location:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.location}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Area Type:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.areaType}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Capacity:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.capacity}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Load:</span>
                        <span class="text-sm font-medium text-${loadColor}-600">${transformer.loadPercentage}%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Customers:</span>
                        <span class="text-sm font-medium text-blue-600 cursor-pointer hover:underline" onclick="showCustomers('${transformer.id}')">${transformer.connectedCustomers}</span>
                    </div>
                </div>

                <div class="flex space-x-2">
                    <button onclick="showTransformerDetails('${transformer.id}')" class="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                        View Details
                    </button>
                    <button onclick="showCustomers('${transformer.id}')" class="flex-1 bg-pgx-orange text-white px-3 py-2 rounded text-sm font-medium hover:bg-pgx-orange-dark transition-colors">
                        View Customers
                    </button>
                </div>
            </div>
        </div>
    `;
}

function showTransformerDetails(transformerId) {
    const transformer = transformersDatabase.find(t => t.id === transformerId);
    if (!transformer) return;

    const modal = document.getElementById('transformer-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalTitle.textContent = `${transformer.name} (${transformer.id})`;

    // Generate revenue and energy metrics for this transformer
    const revenueMetrics = generateTransformerMetrics(transformer);

    modalContent.innerHTML = `
        <!-- Revenue and Energy Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Monthly Revenue Card -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-green-700">Monthly Revenue</p>
                        <p class="text-2xl font-bold text-green-900">₵ ${revenueMetrics.monthlyRevenue.toLocaleString()}</p>
                        <p class="text-sm text-green-600 mt-1">${revenueMetrics.revenueChange} from last month</p>
                    </div>
                    <div class="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Energy Consumption Card -->
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-purple-700">Energy Consumption</p>
                        <p class="text-2xl font-bold text-purple-900">${revenueMetrics.energyConsumption.toLocaleString()} kWh</p>
                        <p class="text-sm text-purple-600 mt-1">${revenueMetrics.efficiencyChange} efficiency</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Power Transmitted Card -->
            <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-yellow-700">Power Transmitted</p>
                        <p class="text-2xl font-bold text-yellow-900">${revenueMetrics.powerTransmitted} MWh</p>
                        <p class="text-sm text-yellow-600 mt-1">Peak: ${revenueMetrics.peakPower} MWh</p>
                    </div>
                    <div class="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-900">Basic Information</h4>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Transformer ID:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.id}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Name:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.name}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">District:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.districtName}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Location:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.location}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Landmark:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.landmark}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Area Type:</span>
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${transformer.areaType === 'Urban' ? 'bg-blue-100 text-blue-800' : transformer.areaType === 'Peri-Urban' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}">${transformer.areaType}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Geolocation:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.geolocation.lat}, ${transformer.geolocation.lng}</span>
                    </div>
                </div>
            </div>

            <!-- Technical Specifications -->
            <div class="space-y-4">
                <h4 class="text-lg font-semibold text-gray-900">Technical Specifications</h4>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Voltage:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.voltage}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Capacity:</span>
                        <span class="text-sm font-medium text-gray-900">${transformer.capacity}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Load Percentage:</span>
                        <span class="text-sm font-medium ${transformer.loadPercentage >= 90 ? 'text-red-600' : transformer.loadPercentage >= 75 ? 'text-yellow-600' : 'text-green-600'}">${transformer.loadPercentage}%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Efficiency:</span>
                        <span class="text-sm font-medium text-green-600">${transformer.efficiency}%</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Status:</span>
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${transformer.status === 'active' ? 'bg-green-100 text-green-800' : transformer.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'} uppercase">${transformer.status}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Smart Nodes:</span>
                        <span class="text-sm font-medium text-blue-600">${transformer.smartNodes}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Customer Information -->
        <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Customer Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-blue-600">${transformer.connectedCustomers}</div>
                    <div class="text-sm text-blue-600">Total Customers</div>
                </div>
                <div class="bg-green-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-green-600">${transformer.singlePhase}</div>
                    <div class="text-sm text-green-600">Single Phase</div>
                </div>
                <div class="bg-purple-50 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold text-purple-600">${transformer.threePhase}</div>
                    <div class="text-sm text-purple-600">Three Phase</div>
                </div>
            </div>
        </div>

        <!-- Maintenance History -->
        <div class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Maintenance History</h4>
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Last Maintained:</span>
                    <span class="text-sm font-medium text-gray-900">${transformer.lastMaintained}</span>
                </div>
                <div class="space-y-2">
                    ${transformer.maintenanceContractors.map(contractor => `
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="flex justify-between items-center">
                                <div>
                                    <div class="text-sm font-medium text-gray-900">${contractor.name}</div>
                                    <div class="text-xs text-gray-600">${contractor.type}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xs text-gray-600">${contractor.date}</div>
                                    <div class="text-xs text-gray-600">${contractor.time}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 pt-6 border-t border-gray-200 flex space-x-3">
            <button onclick="showCustomers('${transformer.id}')" class="flex-1 bg-pgx-orange text-white px-4 py-2 rounded-lg font-medium hover:bg-pgx-orange-dark transition-colors">
                View Customers
            </button>
            <button onclick="exportTransformerData('${transformer.id}')" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Export Data
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent body scroll when modal is open
}

function showCustomers(transformerId) {
    const transformer = transformersDatabase.find(t => t.id === transformerId);
    if (!transformer) return;

    // Generate sample customers for the transformer
    const customers = generateCustomersForTransformer(transformer);

    const modal = document.getElementById('customer-modal');
    const modalTitle = document.getElementById('customer-modal-title');
    const modalContent = document.getElementById('customer-modal-content');

    modalTitle.textContent = `Customers - ${transformer.name} (${transformer.connectedCustomers} total)`;

    modalContent.innerHTML = `
        <!-- Customer Summary -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-blue-50 rounded-lg p-4 text-center">
                <div class="text-xl font-bold text-blue-600">${transformer.connectedCustomers}</div>
                <div class="text-sm text-blue-600">Total Customers</div>
            </div>
            <div class="bg-green-50 rounded-lg p-4 text-center">
                <div class="text-xl font-bold text-green-600">${transformer.singlePhase}</div>
                <div class="text-sm text-green-600">Single Phase</div>
            </div>
            <div class="bg-purple-50 rounded-lg p-4 text-center">
                <div class="text-xl font-bold text-purple-600">${transformer.threePhase}</div>
                <div class="text-sm text-purple-600">Three Phase</div>
            </div>
            <div class="bg-red-50 rounded-lg p-4 text-center">
                <div class="text-xl font-bold text-red-600">${customers.filter(c => c.suspiciousActivity).length}</div>
                <div class="text-sm text-red-600">Suspicious Activity</div>
            </div>
        </div>

        <!-- Customer List -->
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meter Number</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consumption</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${customers.map(customer => `
                        <tr class="${customer.suspiciousActivity ? 'bg-red-50' : ''}">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${customer.customerName}</div>
                                <div class="text-sm text-gray-500">${customer.address}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.meterNumber}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs font-medium rounded-full ${customer.customerType === 'Commercial' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">${customer.customerType}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs font-medium rounded-full ${customer.phaseType === 'Three Phase' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}">${customer.phaseType}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs font-medium rounded-full ${customer.suspiciousActivity ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">${customer.connectionStatus}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.monthlyConsumption} kWh</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <!-- Export Button -->
        <div class="mt-6 pt-6 border-t border-gray-200">
            <button onclick="exportCustomerData('${transformerId}')" class="bg-pgx-orange text-white px-4 py-2 rounded-lg font-medium hover:bg-pgx-orange-dark transition-colors">
                📊 Export Customer Data
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent body scroll when modal is open
}

function generateCustomersForTransformer(transformer) {
    const customers = [];
    const customerTypes = ['Residential', 'Commercial'];
    const phaseTypes = ['Single Phase', 'Three Phase'];
    const firstNames = ['Kwame', 'Akosua', 'Yaw', 'Ama', 'Kofi', 'Efua', 'Kwaku', 'Adwoa', 'Kojo', 'Abena'];
    const lastNames = ['Mensah', 'Asante', 'Boateng', 'Osei', 'Nkrumah', 'Adjei', 'Owusu', 'Appiah', 'Gyasi', 'Frimpong'];
    const businessTypes = ['Shop', 'Electronics', 'Restaurant', 'Pharmacy', 'Salon', 'Workshop', 'Store', 'Office'];

    // Generate sample customers (showing first 20 for display)
    for (let i = 0; i < Math.min(20, transformer.connectedCustomers); i++) {
        const isCommercial = Math.random() < 0.3; // 30% commercial
        const isThreePhase = Math.random() < (transformer.threePhase / transformer.connectedCustomers);
        const hasSuspiciousActivity = Math.random() < 0.05; // 5% suspicious activity

        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const businessType = businessTypes[Math.floor(Math.random() * businessTypes.length)];

        const customerName = isCommercial ? `${firstName} ${lastName} ${businessType}` : `${firstName} ${lastName} Residence`;

        customers.push({
            id: `CUST-${transformer.id}-${String(i + 1).padStart(3, '0')}`,
            transformerId: transformer.id,
            meterNumber: `SM-${transformer.id}-${String(i + 1).padStart(3, '0')}`,
            customerName: customerName,
            customerType: isCommercial ? 'Commercial' : 'Residential',
            phaseType: isThreePhase ? 'Three Phase' : 'Single Phase',
            connectionStatus: hasSuspiciousActivity ? 'Suspicious Activity' : 'Connected',
            address: `${transformer.location}, Unit ${i + 1}`,
            monthlyConsumption: Math.floor(Math.random() * (isCommercial ? 800 : 300)) + 50,
            suspiciousActivity: hasSuspiciousActivity
        });
    }

    return customers;
}

function closeTransformerModal() {
    document.getElementById('transformer-modal').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Re-enable body scroll
}

function closeCustomerModal() {
    document.getElementById('customer-modal').classList.add('hidden');
    document.body.style.overflow = 'auto'; // Re-enable body scroll
}

// Dashboard category toggle functionality
function toggleCategory(categoryName) {
    const content = document.getElementById(`${categoryName}-content`);
    const arrow = document.getElementById(`${categoryName}-arrow`);

    if (content.style.display === 'none') {
        content.style.display = 'block';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        content.style.display = 'none';
        arrow.style.transform = 'rotate(-90deg)';
    }
}

// Region selector functionality
function initializeRegionSelector() {
    const regionSelector = document.getElementById('region-selector');
    if (regionSelector) {
        regionSelector.addEventListener('change', function(e) {
            const selectedRegion = e.target.value;
            updateDashboardForRegion(selectedRegion);
        });
    }
}

function updateDashboardForRegion(regionValue) {
    // Update dashboard metrics based on selected region
    const regionData = getRegionData(regionValue);

    // Update transformer counts
    document.getElementById('active-transformers').textContent = regionData.transformers.active;
    document.getElementById('inactive-transformers').textContent = regionData.transformers.inactive;

    // Update customer counts
    document.getElementById('single-phase-customers').textContent = regionData.customers.singlePhase.toLocaleString();
    document.getElementById('three-phase-customers').textContent = regionData.customers.threePhase.toLocaleString();
    document.getElementById('connected-customers').textContent = regionData.customers.connected.toLocaleString();
    document.getElementById('suspicious-customers').textContent = regionData.customers.suspicious.toLocaleString();

    // Update smart nodes
    document.getElementById('connected-nodes').textContent = regionData.smartNodes.connected;
    document.getElementById('disconnected-nodes').textContent = regionData.smartNodes.disconnected;

    // Refresh the transformer grid
    loadTransformersForRegion(regionValue);
}

function getRegionData(regionValue) {
    const regionDataMap = {
        'ashanti': {
            transformers: { active: 5, inactive: 1 },
            customers: { singlePhase: 4007, threePhase: 843, connected: 4656, suspicious: 194 },
            smartNodes: { connected: 13, disconnected: 0 }
        },
        'greater-accra': {
            transformers: { active: 12, inactive: 2 },
            customers: { singlePhase: 8500, threePhase: 1200, connected: 9400, suspicious: 300 },
            smartNodes: { connected: 25, disconnected: 1 }
        },
        'western': {
            transformers: { active: 8, inactive: 1 },
            customers: { singlePhase: 3200, threePhase: 650, connected: 3700, suspicious: 150 },
            smartNodes: { connected: 18, disconnected: 0 }
        },
        'central': {
            transformers: { active: 6, inactive: 0 },
            customers: { singlePhase: 2800, threePhase: 420, connected: 3100, suspicious: 120 },
            smartNodes: { connected: 15, disconnected: 0 }
        },
        'northern': {
            transformers: { active: 4, inactive: 2 },
            customers: { singlePhase: 1800, threePhase: 280, connected: 1950, suspicious: 130 },
            smartNodes: { connected: 10, disconnected: 2 }
        },
        'eastern': {
            transformers: { active: 7, inactive: 1 },
            customers: { singlePhase: 3500, threePhase: 580, connected: 3900, suspicious: 180 },
            smartNodes: { connected: 16, disconnected: 0 }
        },
        'volta': {
            transformers: { active: 5, inactive: 1 },
            customers: { singlePhase: 2200, threePhase: 350, connected: 2400, suspicious: 150 },
            smartNodes: { connected: 12, disconnected: 1 }
        },
        'upper-east': {
            transformers: { active: 3, inactive: 1 },
            customers: { singlePhase: 1200, threePhase: 180, connected: 1300, suspicious: 80 },
            smartNodes: { connected: 8, disconnected: 1 }
        },
        'upper-west': {
            transformers: { active: 2, inactive: 1 },
            customers: { singlePhase: 900, threePhase: 120, connected: 980, suspicious: 40 },
            smartNodes: { connected: 6, disconnected: 1 }
        },
        'brong-ahafo': {
            transformers: { active: 6, inactive: 0 },
            customers: { singlePhase: 2800, threePhase: 450, connected: 3100, suspicious: 150 },
            smartNodes: { connected: 14, disconnected: 0 }
        }
    };

    return regionDataMap[regionValue] || regionDataMap['ashanti'];
}

function loadTransformersForRegion(regionValue) {
    // This function would typically load transformer data for the selected region
    // For now, we'll just refresh the existing transformer grid
    // In a real application, this would make an API call to get region-specific data

    console.log(`Loading transformers for region: ${regionValue}`);

    // You could add region-specific transformer loading logic here
    // For example:
    // - Update transformer locations on the map
    // - Filter transformer list by region
    // - Update district information

    // For demonstration, we'll just log the change
    const regionNames = {
        'ashanti': 'Ashanti Region',
        'greater-accra': 'Greater Accra Region',
        'western': 'Western Region',
        'central': 'Central Region',
        'northern': 'Northern Region',
        'eastern': 'Eastern Region',
        'volta': 'Volta Region',
        'upper-east': 'Upper East Region',
        'upper-west': 'Upper West Region',
        'brong-ahafo': 'Brong Ahafo Region'
    };

    // Update page title or any region-specific UI elements
    console.log(`Dashboard updated for: ${regionNames[regionValue]}`);
}

// Search functionality for dashboard
function initializeDashboardSearch() {
    const searchInput = document.getElementById('dashboard-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Filter transformers based on search term
            filterTransformers(searchTerm);
        });
    }
}

function filterTransformers(searchTerm) {
    const transformerCards = document.querySelectorAll('.transformer-card');
    transformerCards.forEach(card => {
        const transformerName = card.querySelector('.transformer-name')?.textContent.toLowerCase() || '';
        const district = card.querySelector('.district')?.textContent.toLowerCase() || '';
        const location = card.querySelector('.location')?.textContent.toLowerCase() || '';

        if (transformerName.includes(searchTerm) ||
            district.includes(searchTerm) ||
            location.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add event listeners for modal interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initializeRegionSelector();
    initializeDashboardSearch();

    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeTransformerModal();
            closeCustomerModal();
        }
    });

    // Click outside modal to close
    document.getElementById('transformer-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeTransformerModal();
        }
    });

    document.getElementById('customer-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCustomerModal();
        }
    });
});

function updateDashboardMetrics() {
    // Calculate totals from all transformers
    const totalTransformers = transformersDatabase.length;
    const activeTransformers = transformersDatabase.filter(t => t.status === 'active').length;
    const inactiveTransformers = totalTransformers - activeTransformers;

    const totalCustomers = transformersDatabase.reduce((sum, t) => sum + t.connectedCustomers, 0);
    const totalSinglePhase = transformersDatabase.reduce((sum, t) => sum + t.singlePhase, 0);
    const totalThreePhase = transformersDatabase.reduce((sum, t) => sum + t.threePhase, 0);
    const connectedCustomers = Math.floor(totalCustomers * 0.96); // 96% connected
    const suspiciousCustomers = Math.floor(totalCustomers * 0.04); // 4% suspicious

    const totalSmartNodes = transformersDatabase.reduce((sum, t) => sum + t.smartNodes, 0);
    const connectedNodes = totalSmartNodes; // All nodes connected in this simulation

    // Update dashboard elements
    const elements = {
        'active-transformers': activeTransformers,
        'inactive-transformers': inactiveTransformers,
        'single-phase-customers': totalSinglePhase.toLocaleString(),
        'three-phase-customers': totalThreePhase.toLocaleString(),
        'connected-customers': connectedCustomers.toLocaleString(),
        'suspicious-customers': suspiciousCustomers,
        'connected-nodes': connectedNodes,
        'disconnected-nodes': 0
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

function exportTransformerData(transformerId) {
    const transformer = transformersDatabase.find(t => t.id === transformerId);
    if (!transformer) return;

    const data = {
        transformer: transformer,
        exportDate: new Date().toISOString(),
        exportedBy: 'PowerGridX System'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transformer_${transformer.id}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportCustomerData(transformerId) {
    const transformer = transformersDatabase.find(t => t.id === transformerId);
    if (!transformer) return;

    const customers = generateCustomersForTransformer(transformer);
    const data = {
        transformer: {
            id: transformer.id,
            name: transformer.name,
            location: transformer.location
        },
        customers: customers,
        exportDate: new Date().toISOString(),
        exportedBy: 'PowerGridX System'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_${transformer.id}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateTransformerMetrics(transformer) {
    // Generate realistic metrics based on transformer characteristics
    const baseRevenue = {
        'Distribution': { min: 45000, max: 85000 },
        'Power': { min: 120000, max: 250000 },
        'Step-up': { min: 80000, max: 150000 },
        'Step-down': { min: 60000, max: 120000 }
    };

    const transformerType = transformer.technicalSpecs?.transformerType || 'Distribution';
    const revenueRange = baseRevenue[transformerType] || baseRevenue['Distribution'];

    // Calculate base metrics
    const monthlyRevenue = Math.floor(Math.random() * (revenueRange.max - revenueRange.min) + revenueRange.min);
    const energyConsumption = Math.floor(monthlyRevenue * 0.025 + Math.random() * 5000); // Roughly correlate with revenue
    const powerTransmitted = Math.floor(energyConsumption / 1000 * 0.8); // Convert to MWh
    const peakPower = Math.floor(powerTransmitted * 1.15); // Peak is typically 15% higher

    // Generate change percentages
    const revenueChangeValue = (Math.random() * 30 - 5).toFixed(1); // -5% to +25%
    const efficiencyChangeValue = (Math.random() * 15 + 2).toFixed(1); // +2% to +17%

    const revenueChange = revenueChangeValue > 0 ? `+${revenueChangeValue}%` : `${revenueChangeValue}%`;
    const efficiencyChange = `+${efficiencyChangeValue}%`;

    return {
        monthlyRevenue,
        energyConsumption,
        powerTransmitted,
        peakPower,
        revenueChange,
        efficiencyChange
    };
}
