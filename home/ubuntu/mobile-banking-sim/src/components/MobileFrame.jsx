import React from 'react';

const MobileFrame = ({ children }) => {
  return (
    <div className="mobile-frame">
      <div className="mobile-screen">
        {/* iPhone-style notch */}
        <div className="notch"></div>
        
        {/* Status bar */}
        <div className="status-bar">
          <span>00:35</span>
          <span>📶 📶 🔋 93%</span>
        </div>
        
        {/* App content */}
        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;

