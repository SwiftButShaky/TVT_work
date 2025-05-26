import React from 'react';
import { DataProvider } from '../context/DataContext';
import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <DataProvider>
      <Dashboard />
    </DataProvider>
  );
};

export default DashboardPage;