import React, { useState } from 'react';
import { calculateRequiredGrade } from '../utils/gradeCalculator';

export const FinalGradeCalculator: React.FC = () => {
  const [currentGrade, setCurrentGrade] = useState<string>('');
  const [remainingWeight, setRemainingWeight] = useState<string>('');
  const [targetGrade, setTargetGrade] = useState<string>('');
  const [result, setResult] = useState<{ required: number; possible: boolean } | null>(null);

  const handleCalculate = () => {
    const current = parseFloat(currentGrade);
    const weight = parseFloat(remainingWeight);
    const target = parseFloat(targetGrade);

    if (isNaN(current) || isNaN(weight) || isNaN(target)) {
      return;
    }

    const calculation = calculateRequiredGrade(current, weight, target);
    setResult(calculation);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Final Grade Calculator</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Current Grade (%)</label>
          <input
            type="number"
            value={currentGrade}
            onChange={(e) => setCurrentGrade(e.target.value)}
            placeholder="85"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Remaining Weight (%)</label>
          <input
            type="number"
            value={remainingWeight}
            onChange={(e) => setRemainingWeight(e.target.value)}
            placeholder="30"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Target Final Grade (%)</label>
          <input
            type="number"
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value)}
            placeholder="90"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Calculate Required Grade
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-3">Results</h3>
          <div className="space-y-2">
            <p>
              Required grade on remaining work:{' '}
              <span className="font-semibold">{result.required.toFixed(2)}%</span>
            </p>
            <p>
              Status:{' '}
              <span
                className={`font-semibold ${
                  result.possible ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {result.possible
                  ? 'Target is achievable!'
                  : 'Target grade is not possible'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};