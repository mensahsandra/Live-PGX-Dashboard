import React, { useEffect } from 'react';
import pgxLogo from '../assets/PGX_Logo.png';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <img 
        src={pgxLogo} 
        alt="PGX Logo" 
        className="splash-logo"
      />
      <h1 className="text-2xl font-bold mb-4">PGX</h1>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <p className="mt-4 text-sm opacity-75">Loading...</p>
    </div>
  );
};

export default SplashScreen;

