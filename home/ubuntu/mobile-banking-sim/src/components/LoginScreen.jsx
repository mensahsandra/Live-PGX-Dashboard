import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import pgxLogo from '../assets/PGX_Logo.png';

const LoginScreen = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-900 to-blue-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <div className="w-6"></div>
        <div className="flex items-center space-x-2">
          <img 
            src={pgxLogo} 
            alt="PowerGridX Logo" 
            className="w-8 h-8"
          />
          <span className="text-white text-lg font-semibold">PowerGridX</span>
        </div>
        <div className="w-6 h-6 text-white">🔔</div>
      </div>

      {/* Login Form */}
      <div className="px-6 mt-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-3 px-4 text-center font-semibold rounded-l-lg ${
                activeTab === 'signin' 
                  ? 'bg-yellow-400 text-blue-900' 
                  : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => setActiveTab('signin')}
            >
              SIGN IN
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-semibold rounded-r-lg ${
                activeTab === 'register' 
                  ? 'bg-yellow-400 text-blue-900' 
                  : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => setActiveTab('register')}
            >
              REGISTER
            </button>
          </div>

          {activeTab === 'signin' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User ID*
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your User ID"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN*
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your PIN"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember Me</span>
                </label>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleLogin}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 rounded-lg"
                >
                  SIGN IN
                </Button>
                <Button
                  variant="outline"
                  className="w-12 h-12 rounded-lg border-yellow-400 text-yellow-600"
                >
                  👆
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meter Number*
                </label>
                <input
                  type="text"
                  placeholder="Enter your Meter Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-3 rounded-lg"
              >
                CONTINUE
              </Button>

              <p className="text-xs text-center text-gray-600">
                A verification code will be sent to your registered mobile number
              </p>

              <div className="text-center">
                <button className="text-sm text-blue-600">
                  Already have verification code? →
                </button>
              </div>
            </div>
          )}

          {/* Location indicator */}
          <div className="flex items-center justify-center mt-6">
            <span className="text-sm text-gray-600 mr-2">Africa</span>
            <div className="w-6 h-4 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

