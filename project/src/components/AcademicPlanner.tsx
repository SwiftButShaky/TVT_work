import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export const AcademicPlanner: React.FC = () => {
  const [goals, setGoals] = useState('');
  const [interests, setInterests] = useState('');
  const [currentGPA, setCurrentGPA] = useState('');
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Making request to:', `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/academic-planner`);
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/academic-planner`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ goals, interests, currentGPA }),
        }
      );

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate academic plan');
      }

      setPlan(data.plan);
    } catch (err: any) {
      console.error('Detailed error:', err);
      setError(err.message || 'Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold">AI Academic Planner</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            What are your academic goals?
          </label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="e.g., Graduate with honors, prepare for medical school, etc."
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            What are your academic interests?
          </label>
          <textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., Biology, Computer Science, Psychology, etc."
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Current GPA</label>
          <input
            type="number"
            value={currentGPA}
            onChange={(e) => setCurrentGPA(e.target.value)}
            placeholder="0.0"
            step="0.1"
            min="0"
            max="4.0"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={generatePlan}
        disabled={loading || !goals || !interests || !currentGPA}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Generating Plan...
          </>
        ) : (
          'Generate 4-Year Plan'
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {plan && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-3">Your 4-Year Academic Plan</h3>
          <div className="prose max-w-none whitespace-pre-wrap">
            {plan}
          </div>
        </div>
      )}
    </div>
  );
};