import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import pgxLogo from '../assets/PGX_Logo.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="h-full bg-gradient-to-br from-yellow-400 to-yellow-300 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12 text-white">
        <div className="text-2xl">☰</div>
        <h1 className="text-xl font-semibold">Energy Dashboard</h1>
        <div className="text-2xl">⚡</div>
      </div>

      {/* Current Usage Circle */}
      <div className="flex justify-center mt-8 mb-8">
        <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-white text-sm">Current Usage</p>
            <p className="text-white text-2xl font-bold">2.4 kWh</p>
            <p className="text-white text-xs">Today</p>
          </div>
        </div>
      </div>

      {/* Balance Details */}
      <div className="px-6 mb-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
            <span className="text-gray-700">CREDIT BALANCE</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
            <span className="text-gray-700">DAYS REMAINING</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">$45.20</span>
          <span className="font-semibold">18 days</span>
        </div>
      </div>

      {/* Meter Info Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">MY SMART METER</h3>
            <span className="text-sm text-gray-500">📊 Usage</span>
          </div>
          <div className="bg-orange-400 rounded-lg p-4 text-white">
            <p className="font-semibold">PREPAID SMART METER</p>
            <p className="text-lg font-bold">$45.20 Credit</p>
            <p className="text-sm opacity-90">Meter #: PGX-2024-001</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-20">
        <h3 className="font-semibold mb-4">QUICK ACTIONS</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <span className="text-2xl">💳</span>
            </div>
            <p className="text-xs">Top Up</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-xs">Usage Stats</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <span className="text-2xl">🔧</span>
            </div>
            <p className="text-xs">Report Issue</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
              <span className="text-2xl">💡</span>
            </div>
            <p className="text-xs">Energy Tips</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsage = () => (
    <div className="h-full bg-gray-50 pb-20 pt-16">
      <div className="px-6">
        <h2 className="text-xl font-bold mb-6">Energy Usage</h2>
        
        {/* Usage Chart Placeholder */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="font-semibold mb-4">Daily Usage (kWh)</h3>
          <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded flex items-end justify-center">
            <div className="text-center">
              <div className="w-8 h-16 bg-blue-500 rounded-t mb-2"></div>
              <p className="text-xs">Today</p>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-xl font-bold">16.8 kWh</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-xl font-bold">68.4 kWh</p>
          </div>
        </div>

        {/* Consumption Insights */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">💡 Energy Insights</h3>
          <p className="text-sm text-gray-600 mb-2">You used 15% less energy this week compared to similar households.</p>
          <p className="text-sm text-blue-600">Tip: Consider switching off appliances during peak hours to save more.</p>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="h-full bg-gray-50 pb-20 pt-16">
      <div className="px-6">
        <h2 className="text-xl font-bold mb-6">Help & Support</h2>
        
        {/* Quick Support Options */}
        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Report Meter Issue</h3>
              <p className="text-sm text-gray-600">Tamper alerts, faults, or connectivity issues</p>
            </div>
            <span className="text-2xl">🔧</span>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Recharge Support</h3>
              <p className="text-sm text-gray-600">Issues with top-up or missing credits</p>
            </div>
            <span className="text-2xl">💳</span>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-semibold">FAQ & Help</h3>
              <p className="text-sm text-gray-600">Common questions and troubleshooting</p>
            </div>
            <span className="text-2xl">❓</span>
          </div>
        </div>

        {/* Trust & Security */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">🔒 Security & Trust</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Meter ID:</strong> PGX-2024-001</p>
            <p><strong>Last Service:</strong> Jan 15, 2024</p>
            <p><strong>Technician ID:</strong> TEC-001-GH</p>
          </div>
          <button className="mt-3 text-blue-600 text-sm">Verify Transaction Token →</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full relative">
      {/* Content based on active tab */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'usage' && renderUsage()}
      {activeTab === 'support' && renderSupport()}

      {/* Bottom Navigation - Fixed within mobile frame */}
      <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white">
        <div className="flex justify-around py-3">
          <button 
            className={`text-center ${activeTab === 'dashboard' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="text-xl mb-1">🏠</div>
            <p className="text-xs">Dashboard</p>
          </button>
          <button 
            className={`text-center ${activeTab === 'usage' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            <div className="text-xl mb-1">📊</div>
            <p className="text-xs">Usage</p>
          </button>
          <button 
            className={`text-center ${activeTab === 'support' ? 'text-yellow-400' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            <div className="text-xl mb-1">🛠️</div>
            <p className="text-xs">Support</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

