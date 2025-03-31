import React, { useState } from 'react';
import LotTechDealerTechLandscape from './LotTechDealerTechLandscape';
import LotTechMarketAnalysis from './LotTechMarketAnalysis';

const TabView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'Dealer Technology Landscape', component: <LotTechDealerTechLandscape /> },
    { title: 'Market Size Analysis', component: <LotTechMarketAnalysis /> }
  ];

  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {tabs[activeTab].component}
      </div>

      <style>{`
        .tab-container {
          width: 100%;
        }
        
        .tab-header {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 20px;
          background-color: #f9fafb;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          overflow: hidden;
        }
        
        .tab-button {
          padding: 12px 20px;
          border: none;
          background: none;
          cursor: pointer;
          font-weight: 500;
          color: #4b5563;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
        }
        
        .tab-button:hover {
          color: #3b82f6;
          background-color: #f3f4f6;
        }
        
        .tab-button.active {
          color: #3b82f6;
          border-bottom: 2px solid #3b82f6;
          background-color: white;
        }
        
        .tab-content {
          padding: 0;
        }
        
        @media (max-width: 640px) {
          .tab-button {
            padding: 10px 15px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default TabView;