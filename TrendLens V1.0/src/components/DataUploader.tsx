import React, { useRef, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { parseCSV } from '../utils/dataProcessing';

const DataUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setDataset, setColumns, setLoading } = useData();

  const handleFileUpload = async (file: File) => {
    setError(null);
    setLoading(true);
    
    try {
      if (!file.name.endsWith('.csv')) {
        throw new Error('Please upload a CSV file');
      }
      
      const result = await parseCSV(file);
      
      // Additional validation for the parsed data
      if (result.data.some(row => Object.keys(row).length !== result.columns.length)) {
        console.warn('Some rows have inconsistent field counts. Data has been normalized.');
      }
      
      setDataset(result.data);
      setColumns(result.columns);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
      <h2 className="text-xl font-semibold text-slate-700 mb-2">Upload Your Dataset</h2>
      <p className="text-slate-500 mb-6">
        Drop your CSV file here, or click to select a file
      </p>
      <button
        onClick={triggerFileInput}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors font-medium inline-flex items-center"
      >
        <FileText className="h-5 w-5 mr-2" />
        Select CSV File
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {error && (
        <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
      
      <p className="mt-6 text-xs text-slate-400">
        Supported format: CSV (Comma Separated Values)
      </p>
    </div>
  );
};

export default DataUploader;