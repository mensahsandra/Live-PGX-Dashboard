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
        rating: 4.8,
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
        rating: 4.9,
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
        rating: 4.6,
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
        rating: 4.7,
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
        rating: 4.8,
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
        rating: 4.9,
        completedTasks: 287
    }
];

let selectedPersonnel = null;
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
                            <span class="font-medium">Rating:</span>
                            <span>⭐ ${person.rating}/5.0 (${person.completedTasks} tasks)</span>
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
                </div>
            </div>
        </div>
    `;
}

function selectPersonnel(person) {
    if (person.status !== 'available') {
        alert(`${person.name} is currently ${person.status.replace('-', ' ')} and cannot be assigned to new tasks.`);
        return;
    }

    selectedPersonnel = person;

    // Update UI to show selection
    document.querySelectorAll('.personnel-card').forEach(card => {
        card.classList.remove('border-blue-500', 'bg-blue-100');
        card.classList.add('border-gray-200');
    });

    const selectedCard = document.querySelector(`[data-personnel-id="${person.id}"]`);
    if (selectedCard) {
        selectedCard.classList.remove('border-gray-200');
        selectedCard.classList.add('border-blue-500', 'bg-blue-100');
    }

    // Show selected personnel summary
    showSelectedPersonnelSummary();

    // Enable submit button
    const submitBtn = document.getElementById('submit-dispatch');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.className = 'flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer';
        submitBtn.textContent = 'Submit Dispatch Request';
    }
}

function showSelectedPersonnelSummary() {
    const summaryDiv = document.getElementById('selected-personnel');
    const detailsDiv = document.getElementById('selected-personnel-details');

    if (summaryDiv && detailsDiv && selectedPersonnel) {
        summaryDiv.classList.remove('hidden');
        detailsDiv.innerHTML = `
            <div class="flex items-center space-x-3 mb-2">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ${selectedPersonnel.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <div class="font-medium">${selectedPersonnel.name} (${selectedPersonnel.id})</div>
                    <div class="text-xs">${selectedPersonnel.phone} • ${selectedPersonnel.districtName}</div>
                </div>
            </div>
            <div class="text-xs">
                <strong>Specialization:</strong> ${selectedPersonnel.specialization.charAt(0).toUpperCase() + selectedPersonnel.specialization.slice(1)} •
                <strong>Experience:</strong> ${selectedPersonnel.experience} •
                <strong>Rating:</strong> ⭐ ${selectedPersonnel.rating}/5.0
            </div>
        `;
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
    if (!selectedPersonnel) {
        alert('Please select personnel to assign to this request.');
        return;
    }

    const additionalNotes = document.getElementById('additional-notes').value;
    const estimatedDuration = document.getElementById('estimated-duration').value;

    // Create dispatch request
    const dispatchRequest = {
        id: 'DISP-' + Date.now(),
        timestamp: new Date().toISOString(),
        dateTime: new Date().toLocaleString(),
        location: pendingRequest ? pendingRequest.location : { lat: 0, lng: 0 },
        type: pendingRequest ? pendingRequest.type : 'maintenance',
        message: pendingRequest ? pendingRequest.message : 'Manual dispatch request',
        assignedPersonnel: selectedPersonnel.id,
        personnelName: selectedPersonnel.name,
        personnelPhone: selectedPersonnel.phone,
        priority: document.getElementById('priority-level').value,
        notes: additionalNotes,
        estimatedDuration: estimatedDuration,
        status: 'dispatched'
    };

    // Store in localStorage
    let dispatchLogs = JSON.parse(localStorage.getItem('dispatchLogs') || '[]');
    dispatchLogs.push(dispatchRequest);
    localStorage.setItem('dispatchLogs', JSON.stringify(dispatchLogs));

    // Clear session storage
    sessionStorage.removeItem('pendingDispatchRequest');

    // Show success message
    alert(`Dispatch request submitted successfully!\n\nRequest ID: ${dispatchRequest.id}\nAssigned to: ${selectedPersonnel.name} (${selectedPersonnel.id})\nPhone: ${selectedPersonnel.phone}\nDistrict: ${selectedPersonnel.districtName}\n\nThe personnel has been notified and will respond shortly.`);

    // Redirect to audit log or back to map
    const choice = confirm('Would you like to view the audit log to track this request?\n\nClick OK for Audit Log or Cancel to return to the map.');
    if (choice) {
        window.location.href = 'audit-log.html';
    } else {
        window.location.href = 'smart-grid.html';
    }
}
