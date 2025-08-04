// Dispatch Request JavaScript for PowerGridX
let allRequests = [];
let allContractors = [];
let currentFilters = {
    status: 'all',
    region: 'all',
    type: 'all'
};

document.addEventListener('DOMContentLoaded', function() {
    initializeDispatchPage();
    setupEventListeners();
    loadDispatchRequests();
    loadContractors();
});

function initializeDispatchPage() {
    console.log('Dispatch Request page initialized');
    startRealTimeUpdates();
}

function setupEventListeners() {
    // Filter event listeners
    document.getElementById('request-filter').addEventListener('change', function(e) {
        currentFilters.status = e.target.value;
        filterRequests();
    });
    
    document.getElementById('region-filter').addEventListener('change', function(e) {
        currentFilters.region = e.target.value;
        filterRequests();
    });
    
    document.getElementById('type-filter').addEventListener('change', function(e) {
        currentFilters.type = e.target.value;
        filterRequests();
    });
    
    // New request button
    document.querySelector('button:contains("New Dispatch Request")').addEventListener('click', showNewRequestModal);
    
    // Load more button
    document.querySelector('button:contains("Load More")').addEventListener('click', loadMoreRequests);
    
    // Add event listeners to existing buttons
    setupRequestButtons();
}

function setupRequestButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('View Details')) {
            button.addEventListener('click', handleViewDetails);
        } else if (button.textContent.includes('Assign Contractor')) {
            button.addEventListener('click', handleAssignContractor);
        } else if (button.textContent.includes('Track Progress')) {
            button.addEventListener('click', handleTrackProgress);
        } else if (button.textContent.includes('View Report')) {
            button.addEventListener('click', handleViewReport);
        }
    });
}

function loadDispatchRequests() {
    allRequests = [
        {
            id: 'DR-2024-0156',
            title: 'Transformer Fault Repair',
            description: 'Critical transformer fault detected. Power outage affecting 150+ households. Immediate repair required.',
            location: 'TR-ACC-001, Osu Castle Area, Greater Accra',
            priority: 'urgent',
            status: 'pending',
            type: 'repair',
            created: '2024-01-31 14:23:15',
            requestedBy: 'System Alert',
            assignedTo: null,
            estimatedDuration: '4 hours',
            affectedCustomers: 150
        },
        {
            id: 'DR-2024-0155',
            title: 'Scheduled Maintenance',
            description: 'Routine quarterly maintenance and inspection of transformer components.',
            location: 'TR-KMA-002, Kumasi Central, Ashanti',
            priority: 'normal',
            status: 'assigned',
            type: 'maintenance',
            created: '2024-01-30 09:15:22',
            requestedBy: 'Maintenance Schedule',
            assignedTo: 'John Mensah (ECG Licensed)',
            estimatedDuration: '6 hours',
            affectedCustomers: 0
        },
        {
            id: 'DR-2024-0154',
            title: 'Smart Meter Installation',
            description: 'Installation of new smart meter SM-LAB-045 completed successfully.',
            location: 'Labadi Beach Area, Greater Accra',
            priority: 'normal',
            status: 'completed',
            type: 'installation',
            created: '2024-01-30 08:30:45',
            requestedBy: 'Customer Request',
            assignedTo: 'Sarah Asante (Licensed Contractor)',
            estimatedDuration: '2 hours',
            affectedCustomers: 1,
            completedAt: '2024-01-30 16:45:33'
        },
        {
            id: 'DR-2024-0153',
            title: 'Routine Inspection',
            description: 'Monthly visual inspection of power lines and equipment in Central Region.',
            location: 'Multiple locations, Central Region',
            priority: 'low',
            status: 'pending',
            type: 'inspection',
            created: '2024-01-29 11:30:45',
            requestedBy: 'Regional Manager',
            assignedTo: null,
            estimatedDuration: '8 hours',
            affectedCustomers: 0
        }
    ];
    
    displayRequests(allRequests);
    updateSummaryCards();
}

function loadContractors() {
    allContractors = [
        {
            id: 'CONT-001',
            name: 'John Mensah',
            type: 'ECG Licensed',
            specialization: 'Maintenance Specialist',
            status: 'available',
            rating: 4.8,
            completedJobs: 156,
            location: 'Ashanti Region'
        },
        {
            id: 'CONT-002',
            name: 'Sarah Asante',
            type: 'Licensed Contractor',
            specialization: 'Installation Expert',
            status: 'on-assignment',
            rating: 4.9,
            completedJobs: 203,
            location: 'Greater Accra'
        },
        {
            id: 'CONT-003',
            name: 'Michael Osei',
            type: 'ECG Personnel',
            specialization: 'Senior Technician',
            status: 'available',
            rating: 4.7,
            completedJobs: 89,
            location: 'Central Region'
        }
    ];
}

function displayRequests(requests) {
    const container = document.querySelector('.space-y-4');
    if (!container) return;
    
    // Keep the existing static requests and add dynamic ones
    const existingRequests = container.children.length;
    
    // Clear dynamic requests (keep first 4 static ones)
    while (container.children.length > 4) {
        container.removeChild(container.lastChild);
    }
    
    // Add dynamic requests
    requests.slice(4).forEach(request => {
        const requestElement = createRequestHTML(request);
        container.appendChild(requestElement);
    });
}

function createRequestHTML(request) {
    const priorityClass = getPriorityClass(request.priority);
    const statusClass = getStatusClass(request.status);
    const borderColor = getBorderColor(request.priority);
    
    const requestDiv = document.createElement('div');
    requestDiv.className = `request-card bg-white rounded-lg shadow border-l-4 ${borderColor}`;
    
    requestDiv.innerHTML = `
        <div class="p-6">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                        <span class="text-sm font-medium text-gray-900">${request.id}</span>
                        <span class="${priorityClass} px-2 py-1 rounded-full text-xs font-medium">${request.priority.toUpperCase()}</span>
                        <span class="${statusClass} px-2 py-1 rounded-full text-xs font-medium">${request.status.toUpperCase()}</span>
                    </div>
                    
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">${request.title}</h3>
                    
                    <div class="flex items-center space-x-2 mb-2">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span class="text-sm text-gray-600">${request.location}</span>
                    </div>
                    
                    <p class="text-sm text-gray-600 mb-3">${request.description}</p>
                    
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                        <span>📅 Created: ${request.created}</span>
                        <span>⚡ Requested by: ${request.requestedBy}</span>
                        ${request.assignedTo ? `<span>👷 Assigned to: ${request.assignedTo}</span>` : ''}
                    </div>
                </div>
                
                <div class="flex flex-col space-y-2 ml-4">
                    <button onclick="viewRequestDetails('${request.id}')" class="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-blue-200 transition-colors">
                        View Details
                    </button>
                    ${getActionButton(request)}
                </div>
            </div>
        </div>
    `;
    
    return requestDiv;
}

function getPriorityClass(priority) {
    const classes = {
        'urgent': 'priority-urgent',
        'normal': 'priority-normal',
        'low': 'priority-low'
    };
    return classes[priority] || 'priority-normal';
}

function getStatusClass(status) {
    const classes = {
        'pending': 'status-pending',
        'assigned': 'status-assigned',
        'completed': 'status-completed'
    };
    return classes[status] || 'status-pending';
}

function getBorderColor(priority) {
    const colors = {
        'urgent': 'border-red-500',
        'normal': 'border-blue-500',
        'low': 'border-gray-300'
    };
    return colors[priority] || 'border-blue-500';
}

function getActionButton(request) {
    switch (request.status) {
        case 'pending':
            return `<button onclick="assignContractor('${request.id}')" class="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-orange-600 transition-colors">Assign Contractor</button>`;
        case 'assigned':
            return `<button onclick="trackProgress('${request.id}')" class="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-medium hover:bg-green-200 transition-colors">Track Progress</button>`;
        case 'completed':
            return `<button onclick="viewReport('${request.id}')" class="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-200 transition-colors">View Report</button>`;
        default:
            return '';
    }
}

function filterRequests() {
    let filtered = allRequests;
    
    if (currentFilters.status !== 'all') {
        filtered = filtered.filter(request => request.status === currentFilters.status);
    }
    
    if (currentFilters.region !== 'all') {
        filtered = filtered.filter(request => 
            request.location.toLowerCase().includes(currentFilters.region.replace('-', ' '))
        );
    }
    
    if (currentFilters.type !== 'all') {
        filtered = filtered.filter(request => request.type === currentFilters.type);
    }
    
    displayRequests(filtered);
}

function updateSummaryCards() {
    const pending = allRequests.filter(r => r.status === 'pending').length;
    const assigned = allRequests.filter(r => r.status === 'assigned').length;
    const completed = allRequests.filter(r => r.status === 'completed').length;
    const availableContractors = allContractors.filter(c => c.status === 'available').length;
    
    // Update summary cards
    const summaryCards = document.querySelectorAll('.text-3xl.font-bold');
    if (summaryCards.length >= 4) {
        summaryCards[0].textContent = pending;
        summaryCards[1].textContent = assigned;
        summaryCards[2].textContent = completed;
        summaryCards[3].textContent = availableContractors;
    }
}

function showNewRequestModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 class="text-xl font-bold text-gray-900 mb-4">New Dispatch Request</h2>
            <form id="new-request-form" class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-3 py-2" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select class="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="low">Low</option>
                            <option value="normal" selected>Normal</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select class="w-full border border-gray-300 rounded px-3 py-2">
                            <option value="maintenance">Maintenance</option>
                            <option value="repair">Repair</option>
                            <option value="installation">Installation</option>
                            <option value="inspection">Inspection</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-3 py-2" required>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea class="w-full border border-gray-300 rounded px-3 py-2 h-24" required></textarea>
                </div>
                <div class="flex space-x-3">
                    <button type="submit" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        Create Request
                    </button>
                    <button type="button" onclick="closeModal()" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('new-request-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission logic here
        closeModal();
        alert('New dispatch request created successfully!');
    });
}

function closeModal() {
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(modal => modal.remove());
}

function viewRequestDetails(requestId) {
    const request = allRequests.find(r => r.id === requestId);
    if (!request) return;
    
    // Show detailed modal
    console.log('View details for request:', requestId);
    alert(`Viewing details for ${requestId}`);
}

function assignContractor(requestId) {
    const availableContractors = allContractors.filter(c => c.status === 'available');
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Assign Contractor</h2>
            <div class="space-y-3">
                ${availableContractors.map(contractor => `
                    <div class="border border-gray-200 rounded p-3 cursor-pointer hover:bg-gray-50"
                         onclick="selectContractor('${requestId}', '${contractor.id}')">
                        <div class="font-medium">${contractor.name}</div>
                        <div class="text-sm text-gray-600">${contractor.type} • ${contractor.specialization}</div>
                        <div class="text-xs text-gray-500">Rating: ${contractor.rating}/5 • ${contractor.completedJobs} jobs completed</div>
                    </div>
                `).join('')}
            </div>
            <button onclick="closeModal()" class="mt-4 w-full bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600">
                Cancel
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function selectContractor(requestId, contractorId) {
    const request = allRequests.find(r => r.id === requestId);
    const contractor = allContractors.find(c => c.id === contractorId);
    
    if (request && contractor) {
        request.status = 'assigned';
        request.assignedTo = `${contractor.name} (${contractor.type})`;
        contractor.status = 'on-assignment';
        
        filterRequests();
        updateSummaryCards();
        closeModal();
        alert(`${contractor.name} has been assigned to ${requestId}`);
    }
}

function trackProgress(requestId) {
    console.log('Track progress for request:', requestId);
    alert(`Tracking progress for ${requestId}`);
}

function viewReport(requestId) {
    console.log('View report for request:', requestId);
    alert(`Viewing report for ${requestId}`);
}

function loadMoreRequests() {
    // Simulate loading more requests
    const newRequests = [
        {
            id: `DR-2024-${String(allRequests.length + 1).padStart(4, '0')}`,
            title: 'Cable Replacement',
            description: 'Underground cable showing signs of wear and needs replacement.',
            location: 'Tema Community 1, Greater Accra',
            priority: 'normal',
            status: 'pending',
            type: 'maintenance',
            created: new Date().toISOString().replace('T', ' ').substring(0, 19),
            requestedBy: 'Field Inspector',
            assignedTo: null,
            estimatedDuration: '5 hours',
            affectedCustomers: 45
        }
    ];
    
    allRequests = [...allRequests, ...newRequests];
    filterRequests();
    updateSummaryCards();
}

function startRealTimeUpdates() {
    // Simulate real-time status updates
    setInterval(() => {
        // Randomly update request statuses
        const pendingRequests = allRequests.filter(r => r.status === 'assigned');
        if (pendingRequests.length > 0) {
            const randomRequest = pendingRequests[Math.floor(Math.random() * pendingRequests.length)];
            if (Math.random() < 0.1) { // 10% chance
                randomRequest.status = 'completed';
                randomRequest.completedAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
                
                // Free up contractor
                const contractor = allContractors.find(c => 
                    randomRequest.assignedTo && randomRequest.assignedTo.includes(c.name)
                );
                if (contractor) {
                    contractor.status = 'available';
                }
                
                filterRequests();
                updateSummaryCards();
            }
        }
    }, 30000); // Check every 30 seconds
}

// Export functions for global access
window.DispatchPage = {
    viewRequestDetails,
    assignContractor,
    selectContractor,
    trackProgress,
    viewReport,
    closeModal
};
