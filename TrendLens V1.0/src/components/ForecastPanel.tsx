import React, { useState } from 'react';
import { TrendingUp, Sliders } from 'lucide-react';
import { useData } from '../context/DataContext';

const ForecastPanel: React.FC = () => {
  const { 
    bestModelId, 
    modelResults,
    dataset, 
    independentVariable,
    updateForecastHorizon,
    forecastHorizon
  } = useData();
  
  const [horizonValue, setHorizonValue] = useState(forecastHorizon);
  
  if (!bestModelId || modelResults.length === 0) {
    return null;
  }
  
  const bestModel = modelResults.find(model => model.id === bestModelId);
  if (!bestModel) return null;
  
  const handleHorizonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setHorizonValue(value);
  };
  
  const applyHorizonChange = () => {
    updateForecastHorizon(horizonValue);
  };
  
  // Simple calculation to get the maximum value from the independent variable
  // In a real application, more sophisticated logic would be needed for date handling
  const getMaxIndependentValue = () => {
    if (!dataset || !independentVariable) return 0;
    return Math.max(...dataset.map(row => parseFloat(row[independentVariable])));
  };
  
  const maxValue = getMaxIndependentValue();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
          Forecast & Prediction
        </h2>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-md mb-4">
        <div className="flex items-start">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <Sliders className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <h3 className="font-medium text-slate-800 mb-1">Forecast Configuration</h3>
            <p className="text-sm text-slate-600 mb-3">
              Adjust how far into the future you want to predict using the best model: 
              <span className="font-medium text-green-700 ml-1">
                {bestModel.name}
              </span>
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Forecast Horizon
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min={1}
                    max={Math.max(20, Math.round(dataset.length * 0.5))}
                    value={horizonValue}
                    onChange={handleHorizonChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <span className="text-sm font-medium text-slate-700 w-8">
                    {horizonValue}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Short-term</span>
                  <span>Long-term</span>
                </div>
              </div>
              
              <button
                onClick={applyHorizonChange}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b border-slate-200 pb-2">
          <span className="text-sm font-medium text-slate-700">Metric</span>
          <span className="text-sm font-medium text-slate-700">Value</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Last Data Point</span>
          <span className="text-sm font-medium text-slate-800">{maxValue.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Predicted Next Value</span>
          <span className="text-sm font-medium text-green-700">
            {(maxValue * (1 + bestModel.metrics.trend / 100)).toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Trend Direction</span>
          <span className={`text-sm font-medium ${
            bestModel.metrics.trend > 0 
              ? 'text-green-700' 
              : bestModel.metrics.trend < 0 
                ? 'text-red-700' 
                : 'text-slate-700'
          }`}>
            {bestModel.metrics.trend > 0 
              ? '↗ Increasing' 
              : bestModel.metrics.trend < 0 
                ? '↘ Decreasing' 
                : '→ Stable'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Confidence Level</span>
          <span className="text-sm font-medium text-slate-800">
            {(bestModel.metrics.rSquared * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Forecast Horizon</span>
          <span className="text-sm font-medium text-slate-800">
            {forecastHorizon} {forecastHorizon === 1 ? 'point' : 'points'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForecastPanel;