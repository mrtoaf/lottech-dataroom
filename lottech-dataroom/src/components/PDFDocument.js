import React, { useState, useEffect } from 'react';
import { usePDF } from 'react-to-pdf';
import LotTechDealerTechLandscape from './LotTechDealerTechLandscape';
import LotTechMarketAnalysis from './LotTechMarketAnalysis';

const PDFDocument = () => {
  const [currentView, setCurrentView] = useState('landscape');
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Set pageLoaded to true after component mounts and renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 2000); // Wait 2 seconds to ensure charts and data are loaded
    
    return () => clearTimeout(timer);
  }, [currentView]); // Reset when view changes
  
  const { toPDF, targetRef } = usePDF({
    filename: currentView === 'landscape' 
      ? 'LotTech-Dealer-Technology-Landscape.pdf'
      : 'LotTech-Market-Size-Analysis.pdf',
    page: {
      margin: 20,
      format: [215.9, 279.4], // US Letter size (8.5x11 inches)
      orientation: 'portrait',
    },
    canvas: {
      useCORS: true,
      scale: 1.5
    },
    font: {
      size: 12,
      family: 'Helvetica'
    }
  });

  const renderContent = () => {
    switch(currentView) {
      case 'landscape':
        return <LotTechDealerTechLandscape />;
      case 'market':
        return <LotTechMarketAnalysis />;
      default:
        return <LotTechDealerTechLandscape />;
    }
  };

  const handleViewChange = (e) => {
    setPageLoaded(false); // Hide button during view change
    setCurrentView(e.target.value);
  };

  return (
    <div className="pdf-container">
      <div className="download-button-container">
        <div className="pdf-name-container">
          <select 
            className="pdf-name-select"
            value={currentView}
            onChange={handleViewChange}
          >
            <option value="landscape">Dealer Technology Landscape</option>
            <option value="market">Market Size Analysis</option>
          </select>
        </div>
        {pageLoaded && (
          <button 
            onClick={() => toPDF()}
            className="download-button"
          >
            Download PDF
          </button>
        )}
      </div>
      <div ref={targetRef} className="pdf-content">
        {renderContent()}
      </div>

      <style>{`
        .pdf-container {
          position: relative;
          width: 100%;
        }
        
        .download-button-container {
          position: sticky;
          top: 20px;
          z-index: 100;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          gap: 10px;
          min-height: 46px; /* Maintain height even when button is hidden */
        }
        
        .pdf-name-container {
          position: relative;
        }
        
        .pdf-name-select {
          padding: 10px 20px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          appearance: none;
          background-color: white;
          font-size: 14px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 16px;
          padding-right: 40px;
          min-width: 250px;
        }
        
        .download-button {
          background-color: #3b82f6;
          color: white;
          font-weight: bold;
          padding: 10px 24px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s, transform 0.2s, opacity 0.3s;
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .download-button:hover {
          background-color: #2563eb;
          transform: translateY(-2px);
        }
        
        .download-button:active {
          transform: translateY(0);
        }
        
        .pdf-content {
          background-color: white;
          padding: 15px 10px;
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-radius: 8px;
        }
        
        @media print {
          .download-button-container {
            display: none;
          }
          
          .pdf-content {
            padding: 0;
            box-shadow: none;
            border-radius: 0;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PDFDocument;