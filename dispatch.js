// Dispatch Request JavaScript for PowerGridX
// Handles personnel assignment and dispatch request management

// Personnel database with detailed information
const personnelDatabase = [
    {
        id: 'PGX-001',
        username: 'john.doe',
        name: 'John Doe',
        phone: '+233-24-123-4567',
        district: 'kumasi',
        districtName: 'Kumasi Metropolitan',
        specialization: 'electrical',
        certifications: ['ECG Licensed', 'High Voltage Certified'],
        experience: '8 years',
        status: 'available',
        currentLocation: 'Kumasi Central',
        completedTasks: 156
    },
    {
        id: 'PGX-002',
        username: 'jane.smith',
        name: 'Jane Smith',
        phone: '+233-24-234-5678',
        district: 'obuasi',
        districtName: 'Obuasi Municipal',
        specialization: 'electrical',
        certifications: ['Electrical Engineer', 'Safety Inspector'],
        experience: '12 years',
        status: 'available',
        currentLocation: 'Obuasi Mining Area',
        completedTasks: 203
    },
    {
        id: 'PGX-003',
        username: 'mike.johnson',
        name: 'Mike Johnson',
        phone: '+233-24-345-6789',
        district: 'ejisu',
        districtName: 'Ejisu',
        specialization: 'mechanical',
        certifications: ['Maintenance Specialist', 'Equipment Technician'],
        experience: '6 years',
        status: 'on-assignment',
        currentLocation: 'Ejisu Industrial Zone',
        completedTasks: 98
    },
    {
        id: 'PGX-004',
        username: 'sarah.wilson',
        name: 'Sarah Wilson',
        phone: '+233-24-456-7890',
        district: 'asante-akim-north',
        districtName: 'Asante Akim North',
        specialization: 'maintenance',
        certifications: ['Field Technician', 'Emergency Response'],
        experience: '4 years',
        status: 'available',
        currentLocation: 'Agogo Township',
        completedTasks: 67
    },
    {
        id: 'PGX-005',
        username: 'kwame.asante',
        name: 'Kwame Asante',
        phone: '+233-24-567-8901',
        district: 'bosomtwe',
        districtName: 'Bosomtwe',
        specialization: 'inspection',
        certifications: ['Quality Inspector', 'Safety Coordinator'],
        experience: '10 years',
        status: 'available',
        currentLocation: 'Kuntanase',
        completedTasks: 134
    },
    {
        id: 'PGX-006',
        username: 'ama.osei',
        name: 'Ama Osei',
        phone: '+233-24-678-9012',
        district: 'kumasi',
        districtName: 'Kumasi Metropolitan',
        specialization: 'electrical',
        certifications: ['Senior Technician', 'Training Supervisor'],
        experience: '15 years',
        status: 'available',
        currentLocation: 'Kumasi Tech Park',
        completedTasks: 287
    }
];

let selectedPersonnel = [];
let currentTask = null;
let pendingRequest = null;

// Initialize dispatch page
document.addEventListener('DOMContentLoaded', function() {
    loadPendingRequest();
    displayPersonnel();
    setupEventListeners();
});

function loadPendingRequest() {
    const requestData = sessionStorage.getItem('pendingDispatchRequest');
    if (requestData) {
        pendingRequest = JSON.parse(requestData);
        
        // Show alert
        const alertDiv = document.getElementById('pending-request-alert');
        const alertDetails = document.getElementById('alert-details');
        
        if (alertDiv && alertDetails) {
            alertDiv.classList.remove('hidden');
            alertDetails.textContent = `${pendingRequest.type.toUpperCase()} alert at coordinates ${pendingRequest.location.lat}, ${pendingRequest.location.lng}`;
        }
        
        // Populate form fields
        populateRequestForm();
    }
}

function populateRequestForm() {
    if (!pendingRequest) return;
    
    document.getElementById('issue-type').value = pendingRequest.type.toUpperCase();
    document.getElementById('priority-level').value = pendingRequest.priority;
    document.getElementById('location-coords').value = `Lat: ${pendingRequest.location.lat}, Lng: ${pendingRequest.location.lng}`;
    document.getElementById('issue-description').value = pendingRequest.message;
}

function displayPersonnel(filteredPersonnel = null) {
    const personnel = filteredPersonnel || personnelDatabase;
    const container = document.getElementById('personnel-list');
    
    if (!container) return;
    
    container.innerHTML = personnel.map(person => createPersonnelCard(person)).join('');
    
    // Add click events
    container.querySelectorAll('.personnel-card').forEach((card, index) => {
        card.addEventListener('click', () => selectPersonnel(personnel[index]));
    });
}

function createPersonnelCard(person) {
    const statusColor = person.status === 'available' ? 'green' : 
                       person.status === 'on-assignment' ? 'yellow' : 'red';
    
    const statusText = person.status === 'available' ? 'Available' :
                      person.status === 'on-assignment' ? 'On Assignment' : 'Unavailable';
    
    return `
        <div class="personnel-card border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors ${person.status !== 'available' ? 'opacity-60 cursor-not-allowed' : ''}" 
             data-personnel-id="${person.id}">
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ${person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                </div>
                
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                        <h3 class="text-sm font-semibold text-gray-900">${person.name}</h3>
                        <span class="px-2 py-1 text-xs font-medium rounded-full bg-${statusColor}-100 text-${statusColor}-800">
                            ${statusText}
                        </span>
                    </div>
                    
                    <div class="space-y-1 text-xs text-gray-600">
                        <div class="flex justify-between">
                            <span class="font-medium">ID:</span>
                            <span>${person.id}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Username:</span>
                            <span>${person.username}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Phone:</span>
                            <span>${person.phone}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">District:</span>
                            <span>${person.districtName}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Specialization:</span>
                            <span class="capitalize">${person.specialization}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Experience:</span>
                            <span>${person.experience}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-medium">Completed Tasks:</span>
                            <span>${person.completedTasks} tasks</span>
                        </div>
                    </div>
                    
                    <div class="mt-2">
                        <div class="text-xs text-gray-500 mb-1">Certifications:</div>
                        <div class="flex flex-wrap gap-1">
                            ${person.certifications.map(cert => 
                                `<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">${cert}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="mt-2 text-xs text-gray-500">
                        📍 Current Location: ${person.currentLocation}
                    </div>

                    <div class="mt-3 pt-3 border-t border-gray-200">
                        <button onclick="toggleContractorSelection('${person.id}')"
                                class="contractor-select-btn w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors
                                       ${person.status === 'available' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}"
                                ${person.status !== 'available' ? 'disabled' : ''}>
                            <span class="select-text">Select Contractor</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function toggleContractorSelection(personId) {
    const person = personnelDatabase.find(p => p.id === personId);
    if (!person || person.status !== 'available') {
        alert('This contractor is not available for assignment.');
        return;
    }

    const index = selectedPersonnel.findIndex(p => p.id === personId);
    if (index > -1) {
        // Remove from selection
        selectedPersonnel.splice(index, 1);
    } else {
        // Add to selection
        selectedPersonnel.push(person);
    }

    updateContractorSelectionUI();
    showSelectedPersonnelSummary();
    updateSubmitButton();
}

function updateContractorSelectionUI() {
    document.querySelectorAll('.contractor-select-btn').forEach(btn => {
        const card = btn.closest('.personnel-card');
        const personId = card.getAttribute('data-personnel-id');
        const isSelected = selectedPersonnel.some(p => p.id === personId);
        const selectText = btn.querySelector('.select-text');

        if (isSelected) {
            btn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
            btn.classList.add('bg-green-500', 'hover:bg-green-600');
            selectText.textContent = '✓ Selected';
            card.classList.add('border-green-500', 'bg-green-50');
            card.classList.remove('border-gray-200');
        } else {
            btn.classList.remove('bg-green-500', 'hover:bg-green-600');
            btn.classList.add('bg-blue-500', 'hover:bg-blue-600');
            selectText.textContent = 'Select Contractor';
            card.classList.remove('border-green-500', 'bg-green-50');
            card.classList.add('border-gray-200');
        }
    });
}

function updateSubmitButton() {
    const submitBtn = document.getElementById('submit-dispatch');
    if (submitBtn) {
        if (selectedPersonnel.length > 0) {
            submitBtn.disabled = false;
            submitBtn.className = 'flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer';
            submitBtn.textContent = `Assign Task to ${selectedPersonnel.length} Contractor${selectedPersonnel.length > 1 ? 's' : ''}`;
        } else {
            submitBtn.disabled = true;
            submitBtn.className = 'flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg font-medium cursor-not-allowed';
            submitBtn.textContent = 'Submit Dispatch Request';
        }
    }
}

function showSelectedPersonnelSummary() {
    const summaryDiv = document.getElementById('selected-personnel');
    const detailsDiv = document.getElementById('selected-personnel-details');

    if (summaryDiv && detailsDiv) {
        if (selectedPersonnel.length > 0) {
            summaryDiv.classList.remove('hidden');
            detailsDiv.innerHTML = `
                <div class="space-y-2">
                    ${selectedPersonnel.map(person => `
                        <div class="flex items-center space-x-3 p-2 bg-white rounded border">
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                ${person.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div class="flex-1">
                                <div class="font-medium">${person.name} (${person.id})</div>
                                <div class="text-xs text-gray-600">${person.phone} • ${person.districtName}</div>
                                <div class="text-xs text-gray-500">
                                    <strong>Specialization:</strong> ${person.specialization.charAt(0).toUpperCase() + person.specialization.slice(1)} •
                                    <strong>Experience:</strong> ${person.experience}
                                </div>
                            </div>
                            <button onclick="toggleContractorSelection('${person.id}')" class="text-red-500 hover:text-red-700 text-sm">
                                ✕
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            summaryDiv.classList.add('hidden');
        }
    }
}

function setupEventListeners() {
    // District filter
    const districtFilter = document.getElementById('district-filter');
    if (districtFilter) {
        districtFilter.addEventListener('change', applyFilters);
    }

    // Skill filter
    const skillFilter = document.getElementById('skill-filter');
    if (skillFilter) {
        skillFilter.addEventListener('change', applyFilters);
    }

    // Submit button
    const submitBtn = document.getElementById('submit-dispatch');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitDispatchRequest);
    }
}

function applyFilters() {
    const districtFilter = document.getElementById('district-filter').value;
    const skillFilter = document.getElementById('skill-filter').value;

    let filtered = personnelDatabase;

    if (districtFilter !== 'all') {
        filtered = filtered.filter(person => person.district === districtFilter);
    }

    if (skillFilter !== 'all') {
        filtered = filtered.filter(person => person.specialization === skillFilter);
    }

    displayPersonnel(filtered);
}

function submitDispatchRequest() {
    if (selectedPersonnel.length === 0) {
        alert('Please select at least one contractor to assign to this request.');
        return;
    }

    // Get task details
    const taskType = document.getElementById('issue-type').value || 'Maintenance Task';
    const location = document.getElementById('location-coords').value || 'Ashanti Region';

    // Show assignment confirmation modal
    showAssignmentConfirmation(taskType, location);
}

function showAssignmentConfirmation(taskName, location) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Confirm Assignment</h3>
                    <button onclick="closeAssignmentModal()" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div class="mb-6">
                    <p class="text-gray-700 mb-4">
                        Are you sure you want to assign <strong>${selectedPersonnel.length} contractor${selectedPersonnel.length > 1 ? 's' : ''}</strong> to:
                    </p>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="font-medium text-gray-900">${taskName}</p>
                        <p class="text-sm text-gray-600 mt-1">📍 ${location}</p>
                    </div>

                    <div class="mt-4">
                        <p class="text-sm font-medium text-gray-700 mb-2">Selected Contractors:</p>
                        <div class="space-y-1">
                            ${selectedPersonnel.map(person => `
                                <div class="text-sm text-gray-600">• ${person.name} (${person.specialization})</div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="flex space-x-3">
                    <button onclick="confirmAssignment()" class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        Yes, Assign
                    </button>
                    <button onclick="closeAssignmentModal()" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    window.currentAssignmentModal = modal;
}

function closeAssignmentModal() {
    if (window.currentAssignmentModal) {
        document.body.removeChild(window.currentAssignmentModal);
        window.currentAssignmentModal = null;
    }
}

function confirmAssignment() {
    const additionalNotes = document.getElementById('additional-notes').value;
    const estimatedDuration = document.getElementById('estimated-duration').value;
    const taskType = document.getElementById('issue-type').value || 'Maintenance Task';
    const location = document.getElementById('location-coords').value || 'Ashanti Region';

    // Create dispatch request for each contractor
    const dispatchRequests = selectedPersonnel.map(person => ({
        id: 'DISP-' + Date.now() + '-' + person.id,
        timestamp: new Date().toISOString(),
        dateTime: new Date().toLocaleString(),
        location: pendingRequest ? pendingRequest.location : { lat: 6.6885, lng: -1.6244 },
        type: pendingRequest ? pendingRequest.type : 'maintenance',
        message: pendingRequest ? pendingRequest.message : taskType,
        assignedPersonnel: person.id,
        personnelName: person.name,
        personnelPhone: person.phone,
        priority: document.getElementById('priority-level').value,
        notes: additionalNotes,
        estimatedDuration: estimatedDuration,
        status: 'dispatched'
    }));

    // Store in localStorage
    let dispatchLogs = JSON.parse(localStorage.getItem('dispatchLogs') || '[]');
    dispatchLogs.push(...dispatchRequests);
    localStorage.setItem('dispatchLogs', JSON.stringify(dispatchLogs));

    // Clear session storage
    sessionStorage.removeItem('pendingDispatchRequest');

    // Close modal
    closeAssignmentModal();

    // Show success message
    alert(`Dispatch request submitted successfully!\n\n${selectedPersonnel.length} contractor${selectedPersonnel.length > 1 ? 's have' : ' has'} been assigned to: ${taskType}\n\nLocation: ${location}\n\nThe personnel have been notified and will respond shortly.`);

    // Redirect to audit log or back to map
    const choice = confirm('Would you like to view the audit log to track this request?\n\nClick OK for Audit Log or Cancel to return to the map.');
    if (choice) {
        window.location.href = 'audit-log.html';
    } else {
        window.location.href = 'smart-grid.html';
    }
}
