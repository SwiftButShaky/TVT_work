import React, { useRef, useEffect } from 'react';
import { BarChart3, Download } from 'lucide-react';
import { useData } from '../context/DataContext';
import { createChart } from '../utils/chartUtils';

const VisualizationPanel: React.FC = () => {
  const { 
    dataset, 
    independentVariable, 
    dependentVariable,
    modelResults,
    selectedDisplayModels 
  } = useData();
  
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);
  
  useEffect(() => {
    if (chartRef.current && dataset && independentVariable && dependentVariable) {
      // Destroy previous chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = createChart(
          ctx, 
          dataset, 
          independentVariable, 
          dependentVariable,
          modelResults.filter(model => selectedDisplayModels.includes(model.id))
        );
      }
    }
    
    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [dataset, independentVariable, dependentVariable, modelResults, selectedDisplayModels]);
  
  const downloadChart = () => {
    if (chartRef.current) {
      const link = document.createElement('a');
      link.download = 'trendlens-chart.png';
      link.href = chartRef.current.toDataURL('image/png');
      link.click();
    }
  };
  
  if (!dataset || !independentVariable || !dependentVariable) {
    return (
      <div className="bg-white rounded-lg shadow p-4 min-h-[300px] flex items-center justify-center">
        <p className="text-slate-500 text-center">
          Select variables in the Model Configuration section to visualize your data.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
          Data Visualization
        </h2>
        
        <button 
          onClick={downloadChart}
          className="text-slate-600 hover:text-blue-600 transition-colors flex items-center text-sm"
        >
          <Download className="h-4 w-4 mr-1" />
          Download
        </button>
      </div>
      
      <div className="relative min-h-[300px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default VisualizationPanel;