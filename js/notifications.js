// PowerGridX Notification System
// Shared across all pages for consistent alert management

class PGXNotificationSystem {
    constructor() {
        this.notificationId = 0;
        this.unreadNotifications = 0;
        this.allNotifications = JSON.parse(localStorage.getItem('pgx_notifications') || '[]');
        
        this.notificationTemplates = [
            { type: 'error', message: 'Transformer TXF-003 offline in Kumasi Metro', icon: '⚡', priority: 'high', category: 'infrastructure' },
            { type: 'warning', message: '12 smart meters pending validation in Ashanti', icon: '⚠️', priority: 'medium', category: 'validation' },
            { type: 'error', message: 'Energy theft detected – Est. 8.7 kWh in Sector 5', icon: '🚨', priority: 'high', category: 'security' },
            { type: 'info', message: 'LoRa Base Station BS-002 maintenance scheduled', icon: '🔧', priority: 'low', category: 'maintenance' },
            { type: 'warning', message: 'Grid load exceeding 85% capacity in Greater Accra', icon: '📊', priority: 'medium', category: 'capacity' },
            { type: 'error', message: 'Communication lost with 3 smart poles in Western', icon: '📡', priority: 'high', category: 'communication' },
            { type: 'info', message: 'Scheduled backup to PGX Cloud completed', icon: '☁️', priority: 'low', category: 'system' },
            { type: 'warning', message: 'Voltage fluctuation detected in Central Region', icon: '⚡', priority: 'medium', category: 'power_quality' },
            { type: 'error', message: 'District substation DS-007 requires immediate attention', icon: '🔴', priority: 'high', category: 'infrastructure' },
            { type: 'warning', message: 'Load balancing required in Northern Region', icon: '⚖️', priority: 'medium', category: 'load_management' }
        ];
        
        this.init();
    }
    
    init() {
        this.createNotificationContainer();
        this.initializeNotifications();
        this.startNotificationSystem();
        this.addHeartbeatToDistricts();
    }
    
    createNotificationContainer() {
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            document.body.appendChild(container);
        }
        
        // Add notification styles if not already present
        if (!document.getElementById('pgx-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'pgx-notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    max-width: 350px;
                    min-width: 300px;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .light-alert {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 12px 16px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .alert-indicator {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    z-index: 999;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                    animation: pulse-alert 2s infinite;
                    cursor: pointer;
                }
                
                @keyframes pulse-alert {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    25% { transform: scale(1.1); }
                    50% { transform: scale(1); }
                    75% { transform: scale(1.05); }
                }
                
                .heartbeat {
                    animation: heartbeat 2s infinite;
                }
                
                .district-marker.heartbeat {
                    animation: heartbeat 2s infinite;
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    showLightAlert(notification) {
        const container = document.getElementById('notification-container');
        const id = ++this.notificationId;
        
        // Create notification object for storage
        const notificationObj = {
            id: id,
            ...notification,
            timestamp: new Date().toISOString(),
            status: 'unread',
            assignedTo: null,
            workStarted: null,
            completed: null
        };
        
        // Store notification
        this.allNotifications.unshift(notificationObj);
        localStorage.setItem('pgx_notifications', JSON.stringify(this.allNotifications));
        this.unreadNotifications++;
        this.updateNotificationIndicator();
        
        const alertEl = document.createElement('div');
        alertEl.className = `notification light-alert ${this.getNotificationClass(notification.type)}`;
        alertEl.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-lg">${notification.icon}</span>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800">${notification.message}</p>
                    <p class="text-xs text-gray-500 mt-1">${notification.category} • ${notification.priority} priority</p>
                </div>
                <button onclick="pgxNotifications.viewNotification(${id})" class="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    View
                </button>
            </div>
        `;
        
        container.appendChild(alertEl);
        
        // Show alert
        setTimeout(() => alertEl.classList.add('show'), 100);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertEl.classList.remove('show');
            setTimeout(() => alertEl.remove(), 300);
        }, 5000);
        
        return id;
    }
    
    updateNotificationIndicator() {
        let indicator = document.getElementById('notification-indicator');
        if (!indicator && this.unreadNotifications > 0) {
            indicator = document.createElement('div');
            indicator.id = 'notification-indicator';
            indicator.className = 'alert-indicator';
            indicator.onclick = () => window.open('notifications.html', '_blank');
            document.body.appendChild(indicator);
        }
        
        if (indicator) {
            if (this.unreadNotifications > 0) {
                indicator.textContent = this.unreadNotifications > 99 ? '99+' : this.unreadNotifications;
                indicator.style.display = 'flex';
            } else {
                indicator.style.display = 'none';
            }
        }
    }
    
    viewNotification(id) {
        // Mark as read
        const notification = this.allNotifications.find(n => n.id === id);
        if (notification && notification.status === 'unread') {
            notification.status = 'read';
            this.unreadNotifications--;
            localStorage.setItem('pgx_notifications', JSON.stringify(this.allNotifications));
            this.updateNotificationIndicator();
        }
        
        // Open notifications page
        window.open('notifications.html', '_blank');
    }
    
    getNotificationClass(type) {
        const classes = {
            'info': 'bg-blue-50 border-blue-200 text-blue-800',
            'warning': 'bg-yellow-50 border-yellow-200 text-yellow-800',
            'error': 'bg-red-50 border-red-200 text-red-800',
            'success': 'bg-green-50 border-green-200 text-green-800'
        };
        return classes[type] || classes.info;
    }
    
    startNotificationSystem() {
        // Show alerts every 1 minute
        setInterval(() => {
            const randomNotification = this.notificationTemplates[Math.floor(Math.random() * this.notificationTemplates.length)];
            this.showLightAlert(randomNotification);
        }, 60000); // Every 1 minute
        
        // AI monitoring system - check pending tasks every 2 minutes
        setInterval(() => {
            this.checkPendingTasks();
        }, 120000); // Every 2 minutes
    }
    
    checkPendingTasks() {
        const pendingTasks = this.allNotifications.filter(n => 
            n.status === 'in_progress' && 
            n.workStarted && 
            (new Date() - new Date(n.workStarted)) > 600000 // 10 minutes
        );
        
        pendingTasks.forEach(task => {
            if (!task.aiAlerted) {
                const aiAlert = {
                    type: 'warning',
                    message: `AI Alert: Task "${task.message}" has been pending for over 10 minutes`,
                    icon: '🤖',
                    priority: 'high',
                    category: 'ai_monitoring'
                };
                this.showLightAlert(aiAlert);
                
                // Mark as AI alerted
                task.aiAlerted = true;
                localStorage.setItem('pgx_notifications', JSON.stringify(this.allNotifications));
            }
        });
    }
    
    initializeNotifications() {
        this.unreadNotifications = this.allNotifications.filter(n => n.status === 'unread').length;
        this.updateNotificationIndicator();
    }
    
    addHeartbeatToDistricts() {
        // Add heartbeat animation to district markers on maps
        setTimeout(() => {
            const districtMarkers = document.querySelectorAll('.district-marker, .green-marker, [class*="marker"]');
            districtMarkers.forEach(marker => {
                if (marker.style.backgroundColor === 'green' || marker.classList.contains('bg-green-500')) {
                    marker.classList.add('heartbeat');
                }
            });
        }, 1000);
    }
    
    // Method to update overview based on region selection
    updateOverviewForRegion(regionData) {
        const overviewElements = {
            'region-name': regionData.name,
            'total-districts': regionData.districts,
            'active-transformers': regionData.transformers,
            'smart-meters': regionData.smartMeters,
            'coverage-percentage': regionData.coverage,
            'grid-status': regionData.gridStatus
        };
        
        Object.keys(overviewElements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = overviewElements[id];
            }
        });
    }
}

// Initialize the notification system when the script loads
let pgxNotifications;

document.addEventListener('DOMContentLoaded', function() {
    pgxNotifications = new PGXNotificationSystem();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PGXNotificationSystem;
}
