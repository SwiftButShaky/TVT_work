import React from 'react';
import { GpaCalculation } from '../types';

interface GpaDisplayProps {
  gpa: GpaCalculation;
}

export const GpaDisplay: React.FC<GpaDisplayProps> = ({ gpa }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Weighted GPA</h3>
        <p className="text-3xl font-bold text-blue-600">{gpa.weightedGPA}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Unweighted GPA</h3>
        <p className="text-3xl font-bold text-green-600">{gpa.unweightedGPA}</p>
      </div>
    </div>
  );
};