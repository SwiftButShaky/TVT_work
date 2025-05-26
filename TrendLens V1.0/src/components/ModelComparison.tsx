import React, { useState } from 'react';
import { Award, Check, Info, HelpCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

interface TooltipProps {
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <HelpCircle 
        className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-help ml-1" 
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && (
        <div className="absolute z-50 w-64 p-2 mt-1 text-sm bg-white border border-slate-200 rounded-md shadow-lg -right-2 top-full">
          <div className="text-slate-700">{content}</div>
        </div>
      )}
    </div>
  );
};

const ModelComparison: React.FC = () => {
  const { 
    modelResults, 
    selectedDisplayModels, 
    setSelectedDisplayModels,
    bestModelId
  } = useData();
  
  if (modelResults.length === 0) {
    return null;
  }

  const toggleModelDisplay = (modelId: string) => {
    setSelectedDisplayModels(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      } else {
        return [...prev, modelId];
      }
    });
  };
  
  // Sort models by R-squared (descending)
  const sortedModels = [...modelResults].sort((a, b) => b.metrics.rSquared - a.metrics.rSquared);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-600" />
          Model Comparison
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                R²
                <Tooltip content="R-squared (coefficient of determination) measures how well the model explains the variation in your data. Values range from 0 to 1, where 1 means perfect prediction. A higher value indicates a better fit." />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                RMSE
                <Tooltip content="Root Mean Square Error measures the average prediction error in your data's original units. Lower values indicate more accurate predictions. It's particularly useful for understanding real-world accuracy." />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
                AIC
                <Tooltip content="Akaike Information Criterion balances model accuracy with complexity. It helps prevent overfitting by penalizing models with too many parameters. Lower values indicate a better balance." />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Show
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedModels.map((model, index) => (
              <tr 
                key={model.id} 
                className={`hover:bg-slate-50 ${model.id === bestModelId ? 'bg-blue-50' : ''}`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    {model.id === bestModelId && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 flex items-center">
                        Best
                        <Tooltip content="This model provides the best balance of accuracy and simplicity for your data, based on multiple evaluation metrics." />
                      </span>
                    )}
                    <span className={`font-medium ${model.id === bestModelId ? 'text-blue-700' : 'text-slate-700'}`}>
                      {model.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                  {model.metrics.rSquared.toFixed(4)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                  {model.metrics.rmse.toFixed(4)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                  {model.metrics.aic.toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => toggleModelDisplay(model.id)}
                    className={`w-6 h-6 flex items-center justify-center rounded-md ${
                      selectedDisplayModels.includes(model.id)
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded-md flex items-start text-sm">
        <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium">Understanding these metrics:</p>
          <ul className="list-disc list-inside mt-1 text-blue-600 space-y-1">
            <li>
              <span className="text-blue-700">R²</span>: Higher is better (0-1). Shows how well the model explains data variation.
            </li>
            <li>
              <span className="text-blue-700">RMSE</span>: Lower is better. Shows average prediction error in your data's units.
            </li>
            <li>
              <span className="text-blue-700">AIC</span>: Lower is better. Balances accuracy with model complexity.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;