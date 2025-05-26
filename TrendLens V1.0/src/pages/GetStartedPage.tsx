import React from 'react';
import { FileText, BarChart3, TrendingUp, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetStartedPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Welcome to TrendLens
        </h1>
        <p className="text-xl text-slate-600">
          Discover insights in your data through automated analysis and visualization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-800 ml-3">
              1. Upload Your Data
            </h2>
          </div>
          <p className="text-slate-600 mb-4">
            Start by uploading your CSV file. We support various data formats and automatically handle cleaning and preprocessing.
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>• CSV files with headers</li>
            <li>• Automatic type detection</li>
            <li>• Missing value handling</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-800 ml-3">
              2. Select Variables
            </h2>
          </div>
          <p className="text-slate-600 mb-4">
            Choose which variables to analyze. TrendLens will automatically identify suitable columns for analysis.
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>• Independent variable selection</li>
            <li>• Dependent variable selection</li>
            <li>• Automatic type validation</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-800 ml-3">
              3. Analyze Trends
            </h2>
          </div>
          <p className="text-slate-600 mb-4">
            Our algorithms automatically fit multiple regression models and identify the best one for your data.
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>• Multiple regression models</li>
            <li>• Automatic model selection</li>
            <li>• Performance metrics</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Share2 className="h-8 w-8 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-800 ml-3">
              4. Share Results
            </h2>
          </div>
          <p className="text-slate-600 mb-4">
            Export your analysis results and visualizations in various formats for sharing and presentation.
          </p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>• Download charts as images</li>
            <li>• Export data as CSV</li>
            <li>• Share analysis results</li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <BarChart3 className="h-5 w-5 mr-2" />
          Start Analyzing Your Data
        </Link>
      </div>
    </div>
  );
};

export default GetStartedPage;