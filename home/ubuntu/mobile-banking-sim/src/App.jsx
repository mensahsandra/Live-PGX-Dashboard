import React, { useState } from 'react';
import MobileFrame from './components/MobileFrame';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const handleSplashComplete = () => {
    setCurrentScreen('welcome');
  };

  const handleWelcomeEnter = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'welcome':
        return <WelcomeScreen onEnter={handleWelcomeEnter} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <SplashScreen onComplete={handleSplashComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MobileFrame>
        {renderCurrentScreen()}
      </MobileFrame>
    </div>
  );
}

export default App;
