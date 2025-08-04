import React from 'react';
import welcomeVideo from '../assets/UserWelcomepage.mp4';
import pgxLogo from '../assets/PGX_Logo.png';

const WelcomeScreen = ({ onEnter }) => {
  return (
    <div className="welcome-screen">
      <video 
        className="welcome-video" 
        autoPlay 
        muted 
        loop
        playsInline
      >
        <source src={welcomeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="welcome-overlay">
        {/* PowerGridX Logo */}
        <div className="access-logo mb-8">
          <img 
            src={pgxLogo} 
            alt="PowerGridX Logo" 
            className="w-20 h-20"
          />
        </div>
        
        <h1 className="welcome-title">PowerGridX</h1>
        <p className="welcome-subtitle">Rebuilding trust in Africa's grid with cloud-connected smart meters and solar nodes that see, secure, and scale.</p>
        
        <button 
          className="enter-button"
          onClick={onEnter}
        >
          ENTER HERE
        </button>
        
        {/* Page indicators */}
        <div className="flex space-x-2 mt-8">
          <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
        </div>
        
        <p className="text-xs mt-8 opacity-60">VERSION 1.0.0 - Smart Energy Infrastructure</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;

