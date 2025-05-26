import Papa from 'papaparse';

export interface ParseResult {
  data: any[];
  columns: string[];
}

export const parseCSV = (file: File): Promise<ParseResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        // Handle parsing errors more gracefully
        if (results.errors && results.errors.length > 0) {
          // Filter out non-critical errors (like field count mismatches)
          const criticalErrors = results.errors.filter(error => 
            !error.message.includes('Too many fields') && 
            !error.message.includes('Too few fields')
          );
          
          if (criticalErrors.length > 0) {
            reject(new Error(`Error parsing CSV: ${criticalErrors[0].message}`));
            return;
          }
        }
        
        const data = results.data as any[];
        const columns = results.meta.fields || [];
        
        // Validate data structure
        if (!data || data.length === 0) {
          reject(new Error('The uploaded file does not contain any data'));
          return;
        }
        
        if (!columns || columns.length === 0) {
          reject(new Error('The uploaded file does not contain column headers'));
          return;
        }
        
        // Normalize the data to ensure consistent field counts
        const processedData = data.map(row => {
          const processed: Record<string, any> = {};
          
          // Initialize all columns with null
          columns.forEach(column => {
            processed[column] = null;
          });
          
          // Fill in available values
          for (const key of columns) {
            const value = row[key];
            
            // Convert numerical strings to numbers if possible
            if (typeof value === 'string' && !isNaN(Number(value)) && value.trim() !== '') {
              processed[key] = Number(value);
            } else {
              processed[key] = value ?? null; // Use null for missing values
            }
          }
          
          return processed;
        });
        
        resolve({
          data: processedData,
          columns
        });
      },
      error: (error) => {
        reject(new Error(`Error parsing CSV: ${error.message}`));
      }
    });
  });
};

export const detectDataType = (column: any[]): 'numeric' | 'categorical' | 'date' | 'unknown' => {
  // Check if empty
  if (!column || column.length === 0) return 'unknown';
  
  // Check sample (up to 10 items)
  const sampleSize = Math.min(10, column.length);
  const sample = column.slice(0, sampleSize);
  
  // Check if all are numbers
  const allNumbers = sample.every(val => 
    typeof val === 'number' || 
    (typeof val === 'string' && !isNaN(Number(val)) && val.trim() !== '')
  );
  
  if (allNumbers) return 'numeric';
  
  // Check if dates (simple check, would be more sophisticated in production)
  const potentialDatePattern = /^\d{1,4}[-/]\d{1,2}[-/]\d{1,4}$/;
  const allDates = sample.every(val => 
    val instanceof Date ||
    (typeof val === 'string' && (potentialDatePattern.test(val) || !isNaN(Date.parse(val))))
  );
  
  if (allDates) return 'date';
  
  // If not numeric or dates, assume categorical
  return 'categorical';
};

export const summarizeDataset = (dataset: any[]): { 
  rowCount: number; 
  columnCount: number;
  missingValues: number;
  columnTypes: Record<string, string>;
} => {
  if (!dataset || dataset.length === 0) {
    return { rowCount: 0, columnCount: 0, missingValues: 0, columnTypes: {} };
  }
  
  const columns = Object.keys(dataset[0]);
  const columnTypes: Record<string, string> = {};
  let missingValues = 0;
  
  // Analyze each column
  for (const column of columns) {
    const values = dataset.map(row => row[column]);
    columnTypes[column] = detectDataType(values);
    
    // Count missing values
    missingValues += values.filter(val => 
      val === null || val === undefined || val === '' || val === 'NA' || val === 'N/A'
    ).length;
  }
  
  return {
    rowCount: dataset.length,
    columnCount: columns.length,
    missingValues,
    columnTypes
  };
};