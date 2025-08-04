// Dashboard JavaScript for PowerGridX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Update time every second
    setInterval(updateTime, 1000);
    
    // Update metrics every 30 seconds
    setInterval(updateMetrics, 30000);
    
    // Update activity feed every 60 seconds
    setInterval(updateActivityFeed, 60000);
});

function initializeDashboard() {
    // Initialize charts
    initializeEnergyChart();
    initializeTheftChart();
    
    // Initialize activity feed
    updateActivityFeed();
    
    // Initialize real-time updates
    startRealTimeUpdates();
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        lastUpdateElement.textContent = timeString;
    }
}

function updateMetrics() {
    // Simulate real-time metric updates
    const metrics = {
        totalEnergy: generateRandomValue(1900, 2000, 1),
        theftDetected: generateRandomValue(5.0, 6.0, 1),
        smartPoles: generateRandomValue(65, 75, 0),
        activeAlerts: generateRandomValue(5, 10, 0)
    };
    
    // Update DOM elements
    updateElement('total-energy', `${metrics.totalEnergy} kWh`);
    updateElement('theft-detected', `${metrics.theftDetected}%`);
    updateElement('smart-poles', metrics.smartPoles);
    updateElement('active-alerts', metrics.activeAlerts);
}

function generateRandomValue(min, max, decimals) {
    const value = Math.random() * (max - min) + min;
    return decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.floor(value);
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function initializeEnergyChart() {
    const ctx = document.getElementById('energyChart');
    if (!ctx) return;
    
    // Generate sample data for 24 hours
    const hours = [];
    const energyData = [];
    const theftData = [];
    
    for (let i = 0; i < 24; i++) {
        hours.push(`${i}:00`);
        energyData.push(Math.random() * 100 + 300 + i * 5);
        theftData.push(Math.random() * 20 + 10);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'Energy Tracked (kWh)',
                data: energyData,
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Theft Detected (kWh)',
                data: theftData,
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function initializeTheftChart() {
    const ctx = document.getElementById('theftChart');
    if (!ctx) return;
    
    const data = {
        labels: ['Greater Accra', 'Ashanti', 'Central', 'Western'],
        datasets: [{
            data: [45, 28, 16, 11],
            backgroundColor: [
                '#EF4444', // Red
                '#F59E0B', // Yellow
                '#3B82F6', // Blue
                '#10B981'  // Green
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '60%'
        }
    });
}

function updateActivityFeed() {
    const activities = [
        {
            type: 'alert',
            icon: '🚨',
            title: 'High energy consumption detected',
            location: 'Tema Industrial Zone',
            time: '2 minutes ago',
            severity: 'warning'
        },
        {
            type: 'maintenance',
            icon: '🔧',
            title: 'Scheduled maintenance completed',
            location: 'TR-KMA-001, Kumasi Central',
            time: '15 minutes ago',
            severity: 'success'
        },
        {
            type: 'installation',
            icon: '⚡',
            title: 'New smart meter activated',
            location: 'Labadi Beach Area',
            time: '32 minutes ago',
            severity: 'info'
        },
        {
            type: 'theft',
            icon: '⚠️',
            title: 'Potential energy theft detected',
            location: 'Osu Castle Area',
            time: '1 hour ago',
            severity: 'error'
        },
        {
            type: 'connection',
            icon: '🔌',
            title: 'Smart pole connected to network',
            location: 'Madina Central',
            time: '2 hours ago',
            severity: 'success'
        }
    ];
    
    const feedContainer = document.getElementById('activity-feed');
    if (!feedContainer) return;
    
    feedContainer.innerHTML = activities.map(activity => `
        <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex-shrink-0 text-lg">${activity.icon}</div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">${activity.title}</p>
                <p class="text-xs text-gray-500">${activity.location}</p>
            </div>
            <div class="flex-shrink-0 text-xs text-gray-400">${activity.time}</div>
        </div>
    `).join('');
}

function startRealTimeUpdates() {
    // Simulate real-time data updates
    setInterval(() => {
        // Add visual indicators for live updates
        const indicators = document.querySelectorAll('.pulse-dot');
        indicators.forEach(indicator => {
            indicator.style.opacity = '0.3';
            setTimeout(() => {
                indicator.style.opacity = '1';
            }, 200);
        });
    }, 5000);
}

// Export functions for use in other modules
window.PowerGridXDashboard = {
    updateMetrics,
    updateActivityFeed,
    generateRandomValue
};
