// Audit Log JavaScript for PowerGridX
let currentFilter = 'all';
let currentDateFilter = null;
let allActivities = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeAuditLog();
    setupEventListeners();
    loadActivities();
    updateBlockchainStatus();
});

function initializeAuditLog() {
    console.log('Audit Log initialized');
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date-filter').value = today;
    
    // Start real-time updates
    startRealTimeUpdates();
}

function setupEventListeners() {
    // Activity filter
    document.getElementById('activity-filter').addEventListener('change', function(e) {
        currentFilter = e.target.value;
        filterActivities();
    });
    
    // Date filter
    document.getElementById('date-filter').addEventListener('change', function(e) {
        currentDateFilter = e.target.value;
        filterActivities();
    });
    
    // Export button
    document.querySelector('button:contains("Export")').addEventListener('click', exportAuditLog);
    
    // Load more button
    document.querySelector('button:contains("Load More")').addEventListener('click', loadMoreActivities);
}

function loadActivities() {
    // Sample audit log data
    allActivities = [
        {
            id: 'AL-001',
            timestamp: '2024-01-31 14:23:15',
            type: 'critical',
            title: 'Tampering detected at TR-ACC-001 (Osu Primary Transformer)',
            description: 'Unauthorized access attempt detected. Security protocols activated.',
            location: 'Greater Accra → Accra Metropolitan → Osu Zone',
            source: 'System Alert',
            blockHash: '0x7f9a2b8c...d4e5f6a7'
        },
        {
            id: 'AL-002',
            timestamp: '2024-01-31 13:45:32',
            type: 'maintenance',
            title: 'Scheduled maintenance completed on TR-KMA-001',
            description: 'Routine inspection and oil level check completed successfully.',
            location: 'Ashanti → Kumasi Metropolitan → Kumasi Central Zone',
            source: 'Contractor: John Mensah',
            blockHash: '0x8a1b3c9d...e5f7a8b2'
        },
        {
            id: 'AL-003',
            timestamp: '2024-01-31 12:20:18',
            type: 'installation',
            title: 'New smart meter installed at Labadi Beach Area',
            description: 'Smart meter SM-LAB-045 successfully installed and configured.',
            location: 'Greater Accra → Accra Metropolitan → Osu Zone',
            source: 'Contractor: Sarah Asante',
            blockHash: '0x9b2c4d0e...f6a8b9c3'
        },
        {
            id: 'AL-004',
            timestamp: '2024-01-31 09:15:44',
            type: 'fault',
            title: 'Power outage reported in Effia-Kuma Village',
            description: 'Transformer TR-WR-003 experiencing load issues. Repair team dispatched.',
            location: 'Western → Sekondi-Takoradi Metropolitan → Takoradi Industrial Zone',
            source: 'Customer Report',
            blockHash: '0xac3d5e1f...a7b9c0d4'
        },
        {
            id: 'AL-005',
            timestamp: '2024-01-30 16:30:22',
            type: 'installation',
            title: 'Smart pole activated with monitoring nodes',
            description: 'Smart pole SP-ASH-012 now online with full sensor suite.',
            location: 'Ashanti → Kumasi Metropolitan → Kumasi Central Zone',
            source: 'Contractor: Michael Osei',
            blockHash: '0xbd4e6f20...b8c0d1e5'
        },
        {
            id: 'AL-006',
            timestamp: '2024-01-30 14:12:50',
            type: 'maintenance',
            title: 'Monitoring nodes calibration completed',
            description: 'All sensor nodes in Tema Industrial Zone recalibrated for optimal performance.',
            location: 'Greater Accra → Tema Metropolitan → Tema Industrial Zone',
            source: 'Contractor: Grace Adjei',
            blockHash: '0xce5f7031...c9d1e2f6'
        }
    ];
    
    displayActivities(allActivities);
    updateSummaryCards();
}

function displayActivities(activities) {
    const container = document.querySelector('.divide-y.divide-gray-200');
    if (!container) return;
    
    container.innerHTML = activities.map(activity => createActivityHTML(activity)).join('');
    
    // Add click events to activity items
    container.querySelectorAll('.activity-item').forEach((item, index) => {
        item.addEventListener('click', () => showActivityDetails(activities[index]));
    });
}

function createActivityHTML(activity) {
    const badgeClass = getBadgeClass(activity.type);
    const typeLabel = activity.type.toUpperCase();
    
    return `
        <div class="activity-item p-6 cursor-pointer">
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                    <span class="${badgeClass} px-2 py-1 rounded-full text-xs font-medium">${typeLabel}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                        <h4 class="text-sm font-medium text-gray-900">${activity.title}</h4>
                        <span class="text-xs text-gray-500">${activity.timestamp}</span>
                    </div>
                    <p class="mt-1 text-sm text-gray-600">${activity.description}</p>
                    <div class="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>${activity.location}</span>
                        <span>${activity.source}</span>
                    </div>
                    <div class="mt-1 text-xs text-gray-400">
                        Block: ${activity.blockHash}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getBadgeClass(type) {
    const classes = {
        'critical': 'badge-critical',
        'maintenance': 'badge-maintenance',
        'installation': 'badge-installation',
        'fault': 'badge-fault'
    };
    return classes[type] || 'badge-maintenance';
}

function filterActivities() {
    let filtered = allActivities;
    
    // Filter by type
    if (currentFilter !== 'all') {
        filtered = filtered.filter(activity => activity.type === currentFilter);
    }
    
    // Filter by date
    if (currentDateFilter) {
        filtered = filtered.filter(activity => 
            activity.timestamp.startsWith(currentDateFilter)
        );
    }
    
    displayActivities(filtered);
}

function showActivityDetails(activity) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-900">Activity Details</h2>
                <button onclick="closeActivityModal()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Activity ID</label>
                        <div class="text-sm text-gray-900">${activity.id}</div>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Type</label>
                        <div class="text-sm text-gray-900 capitalize">${activity.type}</div>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Timestamp</label>
                        <div class="text-sm text-gray-900">${activity.timestamp}</div>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Source</label>
                        <div class="text-sm text-gray-900">${activity.source}</div>
                    </div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700">Title</label>
                    <div class="text-sm text-gray-900">${activity.title}</div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700">Description</label>
                    <div class="text-sm text-gray-900">${activity.description}</div>
                </div>
                <div>
                    <label class="text-sm font-medium text-gray-700">Location</label>
                    <div class="text-sm text-gray-900">${activity.location}</div>
                </div>
                <div class="bg-blue-50 p-3 rounded">
                    <label class="text-sm font-medium text-blue-900">Blockchain Verification</label>
                    <div class="text-sm text-blue-800 font-mono">${activity.blockHash}</div>
                    <div class="text-xs text-blue-600 mt-1">✓ Verified and immutable</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeActivityModal();
        }
    });
}

function closeActivityModal() {
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(modal => modal.remove());
}

function updateSummaryCards() {
    const totalActivities = allActivities.length;
    const criticalEvents = allActivities.filter(a => a.type === 'critical').length;
    const maintenanceTasks = allActivities.filter(a => a.type === 'maintenance').length;
    const installations = allActivities.filter(a => a.type === 'installation').length;
    
    // Update summary cards if elements exist
    const summaryCards = document.querySelectorAll('.text-3xl.font-bold');
    if (summaryCards.length >= 4) {
        summaryCards[0].textContent = totalActivities.toLocaleString();
        summaryCards[1].textContent = criticalEvents;
        summaryCards[2].textContent = maintenanceTasks;
        summaryCards[3].textContent = installations;
    }
}

function updateBlockchainStatus() {
    // Simulate blockchain status updates
    setInterval(() => {
        const blockHeight = document.querySelector('.font-semibold.text-gray-800');
        if (blockHeight && blockHeight.textContent.includes(',')) {
            const currentHeight = parseInt(blockHeight.textContent.replace(',', ''));
            const newHeight = currentHeight + Math.floor(Math.random() * 3) + 1;
            blockHeight.textContent = newHeight.toLocaleString();
        }
        
        // Update block hash
        const blockHash = document.querySelector('.font-mono.text-xs.text-gray-800');
        if (blockHash) {
            const newHash = generateRandomHash();
            blockHash.textContent = newHash;
        }
    }, 30000); // Update every 30 seconds
}

function generateRandomHash() {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 8; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    hash += '...';
    for (let i = 0; i < 8; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

function exportAuditLog() {
    // Create CSV content
    const headers = ['ID', 'Timestamp', 'Type', 'Title', 'Description', 'Location', 'Source', 'Block Hash'];
    const csvContent = [
        headers.join(','),
        ...allActivities.map(activity => [
            activity.id,
            activity.timestamp,
            activity.type,
            `"${activity.title}"`,
            `"${activity.description}"`,
            `"${activity.location}"`,
            `"${activity.source}"`,
            activity.blockHash
        ].join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function loadMoreActivities() {
    // Simulate loading more activities
    const additionalActivities = [
        {
            id: 'AL-007',
            timestamp: '2024-01-30 11:45:22',
            type: 'maintenance',
            title: 'Transformer cooling system serviced',
            description: 'Cooling fans and radiators cleaned and inspected.',
            location: 'Central → Cape Coast Metropolitan → Cape Coast Central',
            source: 'Contractor: Emmanuel Asante',
            blockHash: '0xdf6a8142...d0e2f3a7'
        },
        {
            id: 'AL-008',
            timestamp: '2024-01-30 09:30:15',
            type: 'installation',
            title: 'New distribution line activated',
            description: 'Distribution line DL-CR-012 commissioned and energized.',
            location: 'Central → Komenda-Edina-Eguafo-Abirem → Elmina',
            source: 'ECG Engineering Team',
            blockHash: '0xe07b9253...e1f3a4b8'
        }
    ];
    
    allActivities = [...allActivities, ...additionalActivities];
    filterActivities();
    updateSummaryCards();
}

function startRealTimeUpdates() {
    // Simulate new activities being added
    setInterval(() => {
        const newActivity = {
            id: `AL-${String(allActivities.length + 1).padStart(3, '0')}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            type: ['maintenance', 'installation', 'fault'][Math.floor(Math.random() * 3)],
            title: 'Real-time activity update',
            description: 'This is a simulated real-time activity.',
            location: 'Various locations',
            source: 'System Generated',
            blockHash: generateRandomHash()
        };
        
        allActivities.unshift(newActivity);
        if (allActivities.length > 50) {
            allActivities = allActivities.slice(0, 50); // Keep only latest 50
        }
        
        filterActivities();
        updateSummaryCards();
    }, 60000); // Add new activity every minute
}

// Export functions for global access
window.AuditLog = {
    showActivityDetails,
    closeActivityModal,
    exportAuditLog,
    loadMoreActivities
};
