import React, { useState } from 'react';
import { Table, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const DataPreview: React.FC = () => {
  const { dataset, columns } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  
  if (!dataset || !columns || dataset.length === 0) {
    return null;
  }
  
  const totalPages = Math.ceil(dataset.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = dataset.slice(startIndex, startIndex + rowsPerPage);
  
  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center">
          <Table className="h-5 w-5 mr-2 text-blue-600" />
          Data Preview
        </h2>
        <span className="text-sm text-slate-500">
          {dataset.length} rows × {columns.length} columns
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr className="bg-slate-50">
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {visibleRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-slate-50">
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex}
                    className="px-4 py-2 whitespace-nowrap text-sm text-slate-600"
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`p-1 rounded ${
                currentPage === 1 
                  ? 'text-slate-300' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`p-1 rounded ${
                currentPage === totalPages 
                  ? 'text-slate-300' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPreview;