// PowerGridX Notification System
// Shared across all pages for consistent alert management

class PGXNotificationSystem {
    constructor() {
        this.notificationId = 0;
        this.unreadNotifications = 0;

        // Check if we're on notifications.html page and reset if needed
        this.checkForSimulationReset();

        this.allNotifications = JSON.parse(localStorage.getItem('pgx_notifications') || '[]');

        this.notificationTemplates = [
            { type: 'error', message: 'Transformer TXF-003 offline in Kumasi Metro District', priority: 'high', category: 'infrastructure' },
            { type: 'warning', message: '12 smart meters pending validation in Ashanti Region', priority: 'medium', category: 'validation' },
            { type: 'error', message: 'Energy theft detected - Est. 8.7 kWh unaccounted in Sector 5', priority: 'high', category: 'security' },
            { type: 'info', message: 'LoRa Base Station BS-002 maintenance scheduled for tomorrow', priority: 'low', category: 'maintenance' },
            { type: 'warning', message: 'Grid load exceeding 85% capacity in Greater Accra', priority: 'medium', category: 'capacity' },
            { type: 'error', message: 'Communication lost with 3 smart poles in Western Region', priority: 'high', category: 'communication' },
            { type: 'info', message: 'Scheduled backup to PGX Cloud completed successfully', priority: 'low', category: 'system' },
            { type: 'warning', message: 'Voltage fluctuation detected in Central Region substations', priority: 'medium', category: 'power_quality' },
            { type: 'error', message: 'District substation DS-007 requires immediate attention', priority: 'high', category: 'infrastructure' },
            { type: 'warning', message: 'Load balancing required in Northern Region grid', priority: 'medium', category: 'load_management' }
        ];
        
        this.init();
    }
    
    init() {
        this.initializeNotifications();
        this.startNotificationSystem();
        this.addHeartbeatToDistricts();
    }

    checkForSimulationReset() {
        // Check if we're on notifications.html page
        const currentPage = window.location.pathname;
        const isNotificationsPage = currentPage.includes('notifications.html') || currentPage.endsWith('notifications.html');

        if (isNotificationsPage) {
            // Check if this is a page refresh/reload
            const navigationEntries = performance.getEntriesByType('navigation');
            const isReload = navigationEntries.length > 0 &&
                           (navigationEntries[0].type === 'reload' || navigationEntries[0].type === 'navigate');

            if (isReload) {
                // Reset the notification system for fresh simulation
                localStorage.setItem('pgx_notifications', JSON.stringify([]));
                localStorage.setItem('pgx_notification_count', '0');
                console.log('Notification system reset for simulation');
            }
        }
    }
    
    addNotification(notification) {
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
        this.updateNotificationBadge();

        return id;
    }
    
    updateNotificationBadge() {
        const badge = document.getElementById('notification-badge');
        if (badge) {
            // Check if notification count was reset
            const storedCount = localStorage.getItem('pgx_notification_count');
            if (storedCount === '0') {
                this.unreadNotifications = 0;
            }

            if (this.unreadNotifications > 0) {
                badge.textContent = this.unreadNotifications > 99 ? '99+' : this.unreadNotifications;
                badge.classList.remove('hidden');
                badge.classList.remove('bg-red-500');
                badge.classList.add('bg-green-500');

                // Store the current count
                localStorage.setItem('pgx_notification_count', this.unreadNotifications.toString());
            } else {
                badge.classList.add('hidden');
                localStorage.setItem('pgx_notification_count', '0');
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
            this.updateNotificationBadge();
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
        // Add notifications every 2 minutes (120 seconds)
        setInterval(() => {
            const randomNotification = this.notificationTemplates[Math.floor(Math.random() * this.notificationTemplates.length)];
            this.addNotification(randomNotification);
        }, 120000); // Every 2 minutes

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
                this.addNotification(aiAlert);

                // Mark as AI alerted
                task.aiAlerted = true;
                localStorage.setItem('pgx_notifications', JSON.stringify(this.allNotifications));
            }
        });
    }
    
    initializeNotifications() {
        // Check if count was reset
        const storedCount = localStorage.getItem('pgx_notification_count');
        if (storedCount === '0') {
            this.unreadNotifications = 0;
        } else {
            this.unreadNotifications = this.allNotifications.filter(n => n.status === 'unread').length;
        }
        this.updateNotificationBadge();
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

    // Method to manually trigger a notification (for testing)
    triggerTestNotification() {
        const randomNotification = this.notificationTemplates[Math.floor(Math.random() * this.notificationTemplates.length)];
        this.addNotification(randomNotification);
    }

    // Method to reset notification simulation
    resetSimulation() {
        this.allNotifications = [];
        this.unreadNotifications = 0;
        localStorage.setItem('pgx_notifications', JSON.stringify([]));
        localStorage.setItem('pgx_notification_count', '0');
        this.updateNotificationBadge();
        console.log('Notification simulation reset from external call');
    }

    // Method to check if notifications page was accessed and reset accordingly
    checkNotificationsPageAccess() {
        const currentPage = window.location.pathname;
        const isNotificationsPage = currentPage.includes('notifications.html') || currentPage.endsWith('notifications.html');

        if (isNotificationsPage) {
            // Reset when notifications page is accessed
            this.resetSimulation();
        }
    }
}

// Initialize the notification system when the script loads
let pgxNotifications;

document.addEventListener('DOMContentLoaded', function() {
    pgxNotifications = new PGXNotificationSystem();

    // Check if we're on notifications page and reset if needed
    const currentPage = window.location.pathname;
    const isNotificationsPage = currentPage.includes('notifications.html') || currentPage.endsWith('notifications.html');

    if (isNotificationsPage) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
            pgxNotifications.resetSimulation();
        }, 100);
    }
});

// Listen for page visibility changes (when user switches tabs or returns to page)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && pgxNotifications) {
        const currentPage = window.location.pathname;
        const isNotificationsPage = currentPage.includes('notifications.html') || currentPage.endsWith('notifications.html');

        if (isNotificationsPage) {
            // Reset when returning to notifications page
            pgxNotifications.resetSimulation();
        }
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PGXNotificationSystem;
}
