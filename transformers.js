// Transformers Management JavaScript for PowerGridX
document.addEventListener('DOMContentLoaded', function() {
    initializeTransformersPage();
    setupEventListeners();
    updateSummaryCards();
});

function initializeTransformersPage() {
    // Initialize any interactive elements
    console.log('Transformers page initialized');
    
    // Add hover effects to transformer cards
    addCardInteractions();
    
    // Simulate real-time updates
    startRealTimeUpdates();
}

function setupEventListeners() {
    // Add event listeners for buttons
    const viewDetailsButtons = document.querySelectorAll('button:contains("View Details")');
    const manageButtons = document.querySelectorAll('button:contains("Manage")');
    
    // Since we can't use :contains in querySelector, we'll use a different approach
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.includes('View Details')) {
            button.addEventListener('click', handleViewDetails);
        } else if (button.textContent.includes('Manage')) {
            button.addEventListener('click', handleManage);
        }
    });
}

function addCardInteractions() {
    const cards = document.querySelectorAll('.transformer-card');
    
    cards.forEach(card => {
        // Add click to expand functionality
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.tagName === 'BUTTON') return;
            
            // Toggle expanded state
            toggleCardExpansion(card);
        });
        
        // Add status indicator animations
        const statusBadge = card.querySelector('[class*="status-"]');
        if (statusBadge) {
            animateStatusBadge(statusBadge);
        }
    });
}

function toggleCardExpansion(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Remove expanded class from all cards
    document.querySelectorAll('.transformer-card').forEach(c => {
        c.classList.remove('expanded');
    });
    
    if (!isExpanded) {
        card.classList.add('expanded');
        showExpandedContent(card);
    }
}

function showExpandedContent(card) {
    // Find the transformer ID from the card
    const transformerId = card.querySelector('h3').textContent;
    
    // Create expanded content
    const expandedContent = document.createElement('div');
    expandedContent.className = 'expanded-content mt-4 p-4 bg-gray-50 rounded-lg';
    expandedContent.innerHTML = `
        <h4 class="font-semibold text-gray-900 mb-3">Additional Information</h4>
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
                <span class="text-gray-600">Installation Date:</span>
                <span class="font-medium block">March 15, 2022</span>
            </div>
            <div>
                <span class="text-gray-600">Last Maintenance:</span>
                <span class="font-medium block">January 20, 2024</span>
            </div>
            <div>
                <span class="text-gray-600">Connected Customers:</span>
                <span class="font-medium block">1,247</span>
            </div>
            <div>
                <span class="text-gray-600">Average Daily Load:</span>
                <span class="font-medium block">385 kVA</span>
            </div>
        </div>
        <div class="mt-4">
            <h5 class="font-medium text-gray-900 mb-2">Recent Activity</h5>
            <div class="space-y-1 text-xs text-gray-600">
                <div>• Load increased by 5% in last 24h</div>
                <div>• Efficiency improved after maintenance</div>
                <div>• No faults detected this month</div>
            </div>
        </div>
    `;
    
    // Remove any existing expanded content
    const existingExpanded = card.querySelector('.expanded-content');
    if (existingExpanded) {
        existingExpanded.remove();
    }
    
    // Add new expanded content
    card.appendChild(expandedContent);
    
    // Animate in
    expandedContent.style.opacity = '0';
    expandedContent.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        expandedContent.style.transition = 'all 0.3s ease';
        expandedContent.style.opacity = '1';
        expandedContent.style.transform = 'translateY(0)';
    }, 10);
}

function animateStatusBadge(badge) {
    const status = badge.textContent.toLowerCase();
    
    if (status === 'active') {
        // Add pulsing animation for active status
        setInterval(() => {
            badge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 500);
        }, 2000);
    }
}

function handleViewDetails(event) {
    const card = event.target.closest('.transformer-card');
    const transformerId = card.querySelector('h3').textContent;
    
    // Show detailed modal or navigate to details page
    showTransformerModal(transformerId);
}

function handleManage(event) {
    const card = event.target.closest('.transformer-card');
    const transformerId = card.querySelector('h3').textContent;
    
    // Show management options
    showManagementOptions(transformerId);
}

function showTransformerModal(transformerId) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-900">Transformer Details: ${transformerId}</h2>
                <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-50 p-3 rounded">
                        <h3 class="font-medium text-gray-900">Technical Specifications</h3>
                        <div class="mt-2 text-sm space-y-1">
                            <div>Rated Power: 500 kVA</div>
                            <div>Primary Voltage: 33 kV</div>
                            <div>Secondary Voltage: 11 kV</div>
                            <div>Frequency: 50 Hz</div>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-3 rounded">
                        <h3 class="font-medium text-gray-900">Performance Metrics</h3>
                        <div class="mt-2 text-sm space-y-1">
                            <div>Current Load: 78%</div>
                            <div>Efficiency: 94%</div>
                            <div>Power Factor: 0.95</div>
                            <div>Temperature: 65°C</div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 p-3 rounded">
                    <h3 class="font-medium text-gray-900">Maintenance History</h3>
                    <div class="mt-2 text-sm space-y-1">
                        <div>• Last inspection: January 20, 2024</div>
                        <div>• Oil level check: January 15, 2024</div>
                        <div>• Cooling system maintenance: December 10, 2023</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function showManagementOptions(transformerId) {
    const options = [
        'Schedule Maintenance',
        'Update Configuration',
        'View Customer List',
        'Generate Report',
        'Set Alerts'
    ];
    
    const dropdown = document.createElement('div');
    dropdown.className = 'fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50';
    dropdown.innerHTML = `
        <div class="bg-white rounded-lg p-4 max-w-sm w-full mx-4">
            <h3 class="font-semibold text-gray-900 mb-3">Manage ${transformerId}</h3>
            <div class="space-y-2">
                ${options.map(option => `
                    <button class="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <button onclick="closeModal()" class="mt-4 w-full bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600">
                Cancel
            </button>
        </div>
    `;
    
    document.body.appendChild(dropdown);
    
    // Add click outside to close
    dropdown.addEventListener('click', function(e) {
        if (e.target === dropdown) {
            closeModal();
        }
    });
}

function closeModal() {
    const modals = document.querySelectorAll('.fixed.inset-0');
    modals.forEach(modal => modal.remove());
}

function updateSummaryCards() {
    // Simulate real-time updates to summary cards
    setInterval(() => {
        const cards = document.querySelectorAll('.transformer-card');
        const activeCount = Array.from(cards).filter(card => 
            card.querySelector('.status-active')
        ).length;
        
        // Update summary if elements exist
        const totalElement = document.querySelector('.text-3xl.font-bold.text-gray-900');
        const activeElement = document.querySelector('.text-3xl.font-bold.text-green-600');
        
        if (totalElement) totalElement.textContent = cards.length;
        if (activeElement) activeElement.textContent = activeCount;
    }, 30000); // Update every 30 seconds
}

function startRealTimeUpdates() {
    // Simulate real-time load updates
    setInterval(() => {
        const loadElements = document.querySelectorAll('[class*="Load:"]');
        loadElements.forEach(element => {
            if (element.textContent.includes('%')) {
                const currentLoad = parseInt(element.textContent);
                const variation = Math.floor(Math.random() * 6) - 3; // -3 to +3
                const newLoad = Math.max(0, Math.min(100, currentLoad + variation));
                element.textContent = element.textContent.replace(/\d+%/, `${newLoad}%`);
            }
        });
    }, 10000); // Update every 10 seconds
}

// Export functions for global access
window.TransformersPage = {
    showTransformerModal,
    showManagementOptions,
    closeModal
};
