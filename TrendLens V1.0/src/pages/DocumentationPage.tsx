import React from 'react';
import { Book, FileText, Code, Lightbulb, ArrowRight } from 'lucide-react';

const DocumentationPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Documentation</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Book className="h-5 w-5 mr-2 text-blue-600" />
              Getting Started
            </h2>
            <div className="prose text-slate-600">
              <p>
                TrendLens is a powerful tool for analyzing time-series and tabular data through automated regression analysis. 
                Follow these steps to begin:
              </p>
              <ol className="list-decimal list-inside space-y-2 mt-4">
                <li>Upload your CSV dataset</li>
                <li>Select independent and dependent variables</li>
                <li>Choose regression models to apply</li>
                <li>Analyze results and forecasts</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Data Requirements
            </h2>
            <div className="bg-slate-50 p-4 rounded-md text-slate-700">
              <ul className="space-y-2">
                <li>• File format: CSV (Comma Separated Values)</li>
                <li>• First row must contain column headers</li>
                <li>• Numerical data for analysis columns</li>
                <li>• Missing values are handled automatically</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Code className="h-5 w-5 mr-2 text-blue-600" />
              Available Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-md">
                <h3 className="font-medium text-slate-800 mb-2">Linear Regression</h3>
                <p className="text-sm text-slate-600">Fits a straight line to your data. Best for steady, consistent trends.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-md">
                <h3 className="font-medium text-slate-800 mb-2">Polynomial Regression</h3>
                <p className="text-sm text-slate-600">Captures non-linear patterns and complex relationships.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-md">
                <h3 className="font-medium text-slate-800 mb-2">Exponential Regression</h3>
                <p className="text-sm text-slate-600">Models exponential growth or decay patterns.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-md">
                <h3 className="font-medium text-slate-800 mb-2">Power Regression</h3>
                <p className="text-sm text-slate-600">Useful for modeling relationships following power laws.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
              Best Practices
            </h2>
            <div className="space-y-4 text-slate-700">
              <div className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>Clean your data before upload: remove obvious errors and standardize formats.</p>
              </div>
              <div className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>Compare multiple models to find the best fit for your data pattern.</p>
              </div>
              <div className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>Consider the context when interpreting results and making forecasts.</p>
              </div>
              <div className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>Use the data cleaning tools to handle outliers and missing values appropriately.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;