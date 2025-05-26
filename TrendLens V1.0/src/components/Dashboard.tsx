import React from 'react';
import { useData } from '../context/DataContext';
import DataUploader from './DataUploader';
import DataPreview from './DataPreview';
import ModelSelection from './ModelSelection';
import VisualizationPanel from './VisualizationPanel';
import ForecastPanel from './ForecastPanel';
import ModelComparison from './ModelComparison';
import DataCleaningTools from './DataCleaningTools';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { dataset, loading } = useData();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-600">Processing your data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!dataset ? (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Discover Trends in Your Data
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Upload your time-series or tabular dataset and TrendLens will automatically analyze it, 
              fit various regression models, and visualize the results.
            </p>
          </div>
          <DataUploader />
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <DataPreview />
              <div className="mt-6">
                <DataCleaningTools />
              </div>
            </div>
            <div className="lg:col-span-2">
              <VisualizationPanel />
              <div className="mt-6">
                <ModelSelection />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ModelComparison />
            <ForecastPanel />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;