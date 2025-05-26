import React from 'react';
import { Filter, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';

const DataCleaningTools: React.FC = () => {
  const { 
    dataset, 
    columns,
    removeOutliers,
    handleMissingValues
  } = useData();
  
  if (!dataset || columns.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          Data Cleaning
        </h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">Handle Missing Values</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleMissingValues('drop')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-sm flex-1"
            >
              Drop Rows
            </button>
            <button
              onClick={() => handleMissingValues('mean')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-sm flex-1"
            >
              Fill with Mean
            </button>
            <button
              onClick={() => handleMissingValues('zero')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-sm flex-1"
            >
              Fill with Zeros
            </button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">Outlier Detection</h3>
          <button
            onClick={removeOutliers}
            className="w-full px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-sm flex items-center justify-center"
          >
            <Trash2 className="h-4 w-4 mr-2 text-slate-500" />
            Remove Outliers (IQR Method)
          </button>
        </div>
        
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Dataset Quality Score</span>
            <div className="flex items-center">
              <div className="w-20 h-2 bg-slate-200 rounded-full mr-2 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: '85%' }}
                ></div>
              </div>
              <span className="text-xs font-medium text-slate-700">85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCleaningTools;