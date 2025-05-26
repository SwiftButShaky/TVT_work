import React from 'react';
import { DataProvider } from '../context/DataContext';
import Dashboard from '../components/Dashboard';

const AnalysisPage: React.FC = () => {
  return (
    <DataProvider>
      <Dashboard />
    </DataProvider>
  );
};

export default AnalysisPage;