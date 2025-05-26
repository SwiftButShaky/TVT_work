import React, { createContext, useContext, useState, ReactNode } from 'react';
import { runRegressionModels } from '../utils/regressionModels';
import { ModelResult } from '../types';

interface DataContextType {
  dataset: any[] | null;
  setDataset: React.Dispatch<React.SetStateAction<any[] | null>>;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  independentVariable: string | null;
  setIndependentVariable: React.Dispatch<React.SetStateAction<string | null>>;
  dependentVariable: string | null;
  setDependentVariable: React.Dispatch<React.SetStateAction<string | null>>;
  selectedModels: string[];
  setSelectedModels: React.Dispatch<React.SetStateAction<string[]>>;
  modelResults: ModelResult[];
  setModelResults: React.Dispatch<React.SetStateAction<ModelResult[]>>;
  selectedDisplayModels: string[];
  setSelectedDisplayModels: React.Dispatch<React.SetStateAction<string[]>>;
  bestModelId: string | null;
  setBestModelId: React.Dispatch<React.SetStateAction<string | null>>;
  forecastHorizon: number;
  updateForecastHorizon: (horizon: number) => void;
  runAnalysis: () => void;
  removeOutliers: () => void;
  handleMissingValues: (strategy: 'drop' | 'mean' | 'zero') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataset, setDataset] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [independentVariable, setIndependentVariable] = useState<string | null>(null);
  const [dependentVariable, setDependentVariable] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>(['linear', 'polynomial', 'exponential']);
  const [modelResults, setModelResults] = useState<ModelResult[]>([]);
  const [selectedDisplayModels, setSelectedDisplayModels] = useState<string[]>([]);
  const [bestModelId, setBestModelId] = useState<string | null>(null);
  const [forecastHorizon, setForecastHorizon] = useState<number>(5);

  // Run regression analysis
  const runAnalysis = () => {
    if (!dataset || !independentVariable || !dependentVariable || selectedModels.length === 0) {
      return;
    }

    setLoading(true);
    
    try {
      // Extract x and y values from dataset
      const xValues = dataset.map(row => parseFloat(row[independentVariable]));
      const yValues = dataset.map(row => parseFloat(row[dependentVariable]));
      
      // Run regression models
      const results = runRegressionModels(xValues, yValues, selectedModels);
      setModelResults(results);
      
      // Find best model based on R-squared
      const bestModel = results.reduce((best, current) => 
        current.metrics.rSquared > best.metrics.rSquared ? current : best, results[0]);
      
      setBestModelId(bestModel.id);
      
      // Set selected display models to include best model only initially
      setSelectedDisplayModels([bestModel.id]);
    } catch (error) {
      console.error('Error running analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove outliers using IQR method (simplified implementation)
  const removeOutliers = () => {
    if (!dataset || !dependentVariable) return;
    
    setLoading(true);
    
    try {
      const values = dataset.map(row => parseFloat(row[dependentVariable])).filter(v => !isNaN(v));
      
      // Calculate quartiles and IQR
      values.sort((a, b) => a - b);
      const q1 = values[Math.floor(values.length / 4)];
      const q3 = values[Math.floor(3 * values.length / 4)];
      const iqr = q3 - q1;
      
      // Define bounds
      const lowerBound = q1 - 1.5 * iqr;
      const upperBound = q3 + 1.5 * iqr;
      
      // Filter dataset
      const filteredDataset = dataset.filter(row => {
        const value = parseFloat(row[dependentVariable]);
        return !isNaN(value) && value >= lowerBound && value <= upperBound;
      });
      
      setDataset(filteredDataset);
    } catch (error) {
      console.error('Error removing outliers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle missing values
  const handleMissingValues = (strategy: 'drop' | 'mean' | 'zero') => {
    if (!dataset || !columns.length) return;
    
    setLoading(true);
    
    try {
      let processedDataset = [...dataset];
      
      if (strategy === 'drop') {
        // Drop rows with any missing values in numerical columns
        processedDataset = processedDataset.filter(row => {
          return columns.every(col => {
            const value = row[col];
            return value !== null && value !== undefined && value !== '';
          });
        });
      } else {
        // For each numerical column, calculate mean or use zero
        columns.forEach(col => {
          const values = dataset
            .map(row => row[col])
            .filter(val => val !== null && val !== undefined && val !== '' && !isNaN(parseFloat(val)))
            .map(val => parseFloat(val));
          
          const fillValue = strategy === 'mean' && values.length > 0
            ? values.reduce((sum, val) => sum + val, 0) / values.length
            : 0;
          
          // Fill missing values
          processedDataset = processedDataset.map(row => {
            const value = row[col];
            if (value === null || value === undefined || value === '' || isNaN(parseFloat(value))) {
              return { ...row, [col]: fillValue };
            }
            return row;
          });
        });
      }
      
      setDataset(processedDataset);
    } catch (error) {
      console.error('Error handling missing values:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update forecast horizon
  const updateForecastHorizon = (horizon: number) => {
    setForecastHorizon(horizon);
  };

  return (
    <DataContext.Provider
      value={{
        dataset,
        setDataset,
        columns,
        setColumns,
        loading,
        setLoading,
        independentVariable,
        setIndependentVariable,
        dependentVariable,
        setDependentVariable,
        selectedModels,
        setSelectedModels,
        modelResults,
        setModelResults,
        selectedDisplayModels,
        setSelectedDisplayModels,
        bestModelId,
        setBestModelId,
        forecastHorizon,
        updateForecastHorizon,
        runAnalysis,
        removeOutliers,
        handleMissingValues,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};