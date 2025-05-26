import React from 'react';
import { Settings, Check, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';
import { regressionModels } from '../utils/regressionModels';

const ModelSelection: React.FC = () => {
  const { 
    selectedModels, 
    setSelectedModels, 
    columns, 
    independentVariable, 
    setIndependentVariable,
    dependentVariable,
    setDependentVariable,
    runAnalysis
  } = useData();

  const toggleModel = (modelId: string) => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      } else {
        return [...prev, modelId];
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-blue-600" />
          Model Configuration
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Choose Variable Columns
          </label>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Independent Variable (X-axis)
              </label>
              <div className="relative">
                <select
                  value={independentVariable || ''}
                  onChange={(e) => setIndependentVariable(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 pl-3 pr-10 bg-white text-slate-800"
                >
                  <option value="">Select a column</option>
                  {columns.map(column => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Dependent Variable (Y-axis)
              </label>
              <div className="relative">
                <select
                  value={dependentVariable || ''}
                  onChange={(e) => setDependentVariable(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 pl-3 pr-10 bg-white text-slate-800"
                >
                  <option value="">Select a column</option>
                  {columns.map(column => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Regression Models
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {regressionModels.map(model => (
              <div 
                key={model.id}
                className="flex items-center p-2 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer"
                onClick={() => toggleModel(model.id)}
              >
                <div className={`w-5 h-5 flex items-center justify-center rounded mr-3 ${
                  selectedModels.includes(model.id) 
                    ? 'bg-blue-600 text-white' 
                    : 'border border-slate-300'
                }`}>
                  {selectedModels.includes(model.id) && <Check className="h-3 w-3" />}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700">{model.name}</div>
                  <div className="text-xs text-slate-500">{model.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={runAnalysis}
          disabled={!independentVariable || !dependentVariable || selectedModels.length === 0}
          className={`px-4 py-2 rounded-md ${
            !independentVariable || !dependentVariable || selectedModels.length === 0
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white transition-colors'
          }`}
        >
          Run Analysis
        </button>
      </div>
    </div>
  );
};

export default ModelSelection;