import React, { useState } from 'react';
import { GpaProjection } from '../types';
import { calculateProjection } from '../utils/gpaCalculator';

interface ProjectionCalculatorProps {
  currentGPA: number;
  currentCredits: number;
}

export const ProjectionCalculator: React.FC<ProjectionCalculatorProps> = ({
  currentGPA,
  currentCredits,
}) => {
  const [targetGPA, setTargetGPA] = useState<string>('3.5');
  const [remainingCredits, setRemainingCredits] = useState<string>('15');
  const [projection, setProjection] = useState<GpaProjection | null>(null);

  const handleCalculate = () => {
    const target = parseFloat(targetGPA);
    const remaining = parseFloat(remainingCredits);

    if (isNaN(target) || isNaN(remaining)) {
      return;
    }

    const result = calculateProjection(
      currentGPA,
      target,
      currentCredits,
      remaining
    );
    setProjection(result);
  };

  const getLetterGrade = (gpa: number): string => {
    if (gpa >= 4.0) return 'A';
    if (gpa >= 3.7) return 'A-';
    if (gpa >= 3.3) return 'B+';
    if (gpa >= 3.0) return 'B';
    if (gpa >= 2.7) return 'B-';
    if (gpa >= 2.3) return 'C+';
    if (gpa >= 2.0) return 'C';
    if (gpa >= 1.7) return 'C-';
    if (gpa >= 1.3) return 'D+';
    if (gpa >= 1.0) return 'D';
    return 'F';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">GPA Projection Calculator</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Target GPA</label>
          <input
            type="number"
            value={targetGPA}
            onChange={(e) => setTargetGPA(e.target.value)}
            step="0.1"
            min="0"
            max="4.0"
            placeholder="0.0"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Remaining Credits</label>
          <input
            type="number"
            value={remainingCredits}
            onChange={(e) => setRemainingCredits(e.target.value)}
            min="0"
            placeholder="0"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Calculate Projection
      </button>

      {projection && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-3">Results</h3>
          <div className="space-y-2">
            <p>
              Required GPA for remaining credits:{' '}
              <span className="font-semibold">
                {projection.requiredGPA} ({getLetterGrade(projection.requiredGPA)})
              </span>
            </p>
            <p>
              This means you need to maintain at least a{' '}
              <span className="font-semibold">{getLetterGrade(projection.requiredGPA)}</span>
              {' '}average in your remaining {remainingCredits} credits.
            </p>
            <p>
              Status:{' '}
              <span
                className={`font-semibold ${
                  projection.isAchievable ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {projection.isAchievable
                  ? 'Target is achievable!'
                  : 'Target is not achievable'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};