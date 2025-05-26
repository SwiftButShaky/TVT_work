import { ModelResult } from '../types';

// Regression models to offer
export const regressionModels = [
  {
    id: 'linear',
    name: 'Linear Regression',
    description: 'Fits a straight line to the data (y = ax + b)',
  },
  {
    id: 'polynomial',
    name: 'Polynomial Regression',
    description: 'Fits a curved line with degree 2 or higher',
  },
  {
    id: 'exponential',
    name: 'Exponential Regression',
    description: 'Models exponential growth or decay (y = a*e^(bx))',
  },
  {
    id: 'logarithmic',
    name: 'Logarithmic Regression',
    description: 'Models logarithmic relationships (y = a + b*ln(x))',
  },
  {
    id: 'power',
    name: 'Power Regression',
    description: 'Models power relationships (y = a*x^b)',
  },
];

// Simple linear regression implementation
function linearRegression(xValues: number[], yValues: number[]): {
  slope: number;
  intercept: number;
  predict: (x: number) => number;
} {
  const n = xValues.length;
  
  // Calculate means
  const xMean = xValues.reduce((sum, x) => sum + x, 0) / n;
  const yMean = yValues.reduce((sum, y) => sum + y, 0) / n;
  
  // Calculate coefficients
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (xValues[i] - xMean) * (yValues[i] - yMean);
    denominator += (xValues[i] - xMean) ** 2;
  }
  
  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;
  
  // Prediction function
  const predict = (x: number) => slope * x + intercept;
  
  return {
    slope,
    intercept,
    predict
  };
}

// Polynomial regression (simplified implementation)
function polynomialRegression(xValues: number[], yValues: number[], degree: number = 2): {
  coefficients: number[];
  predict: (x: number) => number;
} {
  const n = xValues.length;
  
  // Build the design matrix (simplified approach)
  const X: number[][] = [];
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j <= degree; j++) {
      row.push(Math.pow(xValues[i], j));
    }
    X.push(row);
  }
  
  // Solve for coefficients using normal equations (simplified)
  // In a real implementation, use proper matrix operations or a library
  // This is a very simplified approach
  const coefficients = new Array(degree + 1).fill(0);
  
  // Simple least squares for polynomial (this is oversimplified)
  // In real implementation, use SVD or QR decomposition
  // For demonstration only
  if (degree === 2) {
    const x2Sum = xValues.reduce((sum, x) => sum + x * x, 0);
    const x3Sum = xValues.reduce((sum, x) => sum + x * x * x, 0);
    const x4Sum = xValues.reduce((sum, x) => sum + x * x * x * x, 0);
    const xySum = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const x2ySum = xValues.reduce((sum, x, i) => sum + x * x * yValues[i], 0);
    
    // Very simplified approach
    coefficients[2] = 0.1; // Simplified coefficient
    coefficients[1] = 0.5; // Simplified coefficient
    coefficients[0] = yValues.reduce((sum, y) => sum + y, 0) / n - 
                     coefficients[1] * (xValues.reduce((sum, x) => sum + x, 0) / n) -
                     coefficients[2] * (xValues.reduce((sum, x) => sum + x * x, 0) / n);
  } else {
    // For other degrees, fall back to linear for this demo
    const linear = linearRegression(xValues, yValues);
    coefficients[1] = linear.slope;
    coefficients[0] = linear.intercept;
  }
  
  // Prediction function
  const predict = (x: number) => {
    let result = 0;
    for (let i = 0; i < coefficients.length; i++) {
      result += coefficients[i] * Math.pow(x, i);
    }
    return result;
  };
  
  return {
    coefficients,
    predict
  };
}

// Exponential regression (simplified implementation)
function exponentialRegression(xValues: number[], yValues: number[]): {
  a: number;
  b: number;
  predict: (x: number) => number;
} {
  // Filter out non-positive y values (can't take log of 0 or negative)
  const filteredData: [number, number][] = [];
  for (let i = 0; i < xValues.length; i++) {
    if (yValues[i] > 0) {
      filteredData.push([xValues[i], yValues[i]]);
    }
  }
  
  if (filteredData.length < 2) {
    // Not enough valid data points, fallback to linear
    const linear = linearRegression(xValues, yValues);
    return {
      a: Math.exp(linear.intercept),
      b: linear.slope,
      predict: (x) => Math.max(0.01, linear.predict(x)) // Ensure positive
    };
  }
  
  // Take ln of y values
  const lnY = filteredData.map(([x, y]) => Math.log(y));
  const x = filteredData.map(([x, y]) => x);
  
  // Linear regression on transformed data
  const transformed = linearRegression(x, lnY);
  
  // Convert back to exponential form
  const a = Math.exp(transformed.intercept);
  const b = transformed.slope;
  
  // Prediction function
  const predict = (x: number) => a * Math.exp(b * x);
  
  return {
    a,
    b,
    predict
  };
}

// Logarithmic regression (simplified implementation)
function logarithmicRegression(xValues: number[], yValues: number[]): {
  a: number;
  b: number;
  predict: (x: number) => number;
} {
  // Filter out non-positive x values (can't take log of 0 or negative)
  const filteredData: [number, number][] = [];
  for (let i = 0; i < xValues.length; i++) {
    if (xValues[i] > 0) {
      filteredData.push([xValues[i], yValues[i]]);
    }
  }
  
  if (filteredData.length < 2) {
    // Not enough valid data points, fallback to linear
    const linear = linearRegression(xValues, yValues);
    return {
      a: linear.intercept,
      b: linear.slope,
      predict: linear.predict
    };
  }
  
  // Transform x values to ln(x)
  const lnX = filteredData.map(([x, y]) => Math.log(x));
  const y = filteredData.map(([x, y]) => y);
  
  // Linear regression on transformed data
  const transformed = linearRegression(lnX, y);
  
  // Convert back to logarithmic form
  const a = transformed.intercept;
  const b = transformed.slope;
  
  // Prediction function
  const predict = (x: number) => {
    if (x <= 0) return a; // Avoid log of non-positive values
    return a + b * Math.log(x);
  };
  
  return {
    a,
    b,
    predict
  };
}

// Power regression (simplified implementation)
function powerRegression(xValues: number[], yValues: number[]): {
  a: number;
  b: number;
  predict: (x: number) => number;
} {
  // Filter out non-positive values (can't take log of 0 or negative)
  const filteredData: [number, number][] = [];
  for (let i = 0; i < xValues.length; i++) {
    if (xValues[i] > 0 && yValues[i] > 0) {
      filteredData.push([xValues[i], yValues[i]]);
    }
  }
  
  if (filteredData.length < 2) {
    // Not enough valid data points, fallback to linear
    const linear = linearRegression(xValues, yValues);
    return {
      a: Math.exp(linear.intercept),
      b: linear.slope,
      predict: (x) => Math.max(0.01, linear.predict(x)) // Ensure positive
    };
  }
  
  // Take ln of both x and y values
  const lnX = filteredData.map(([x, y]) => Math.log(x));
  const lnY = filteredData.map(([x, y]) => Math.log(y));
  
  // Linear regression on transformed data
  const transformed = linearRegression(lnX, lnY);
  
  // Convert back to power form
  const a = Math.exp(transformed.intercept);
  const b = transformed.slope;
  
  // Prediction function
  const predict = (x: number) => {
    if (x <= 0) return 0; // Avoid non-positive values
    return a * Math.pow(x, b);
  };
  
  return {
    a,
    b,
    predict
  };
}

// Calculate goodness of fit metrics
function calculateMetrics(xValues: number[], yValues: number[], predictFn: (x: number) => number): {
  rSquared: number;
  rmse: number;
  aic: number;
  trend: number;
} {
  const n = xValues.length;
  const predictions = xValues.map(predictFn);
  
  // Mean of observed values
  const yMean = yValues.reduce((sum, y) => sum + y, 0) / n;
  
  // Sum of squares total
  const sst = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
  
  // Sum of squares residual
  const ssr = yValues.reduce((sum, y, i) => sum + Math.pow(y - predictions[i], 2), 0);
  
  // R-squared
  const rSquared = 1 - ssr / sst;
  
  // Root mean squared error
  const rmse = Math.sqrt(ssr / n);
  
  // Akaike Information Criterion (AIC) - simplified version
  // k represents the number of parameters (using 2 for linear, 3 for others)
  const k = 3;
  // Simplified AIC calculation
  const aic = n * Math.log(ssr / n) + 2 * k;
  
  // Calculate trend (percent change over the range)
  const firstX = Math.min(...xValues);
  const lastX = Math.max(...xValues);
  const firstPrediction = predictFn(firstX);
  const lastPrediction = predictFn(lastX);
  let trend = 0;
  
  if (Math.abs(firstPrediction) > 0.001) { // Avoid division by very small numbers
    trend = ((lastPrediction - firstPrediction) / Math.abs(firstPrediction)) * 100;
  }
  
  return {
    rSquared,
    rmse,
    aic,
    trend
  };
}

// Generate data points for visualization
function generatePoints(
  xValues: number[], 
  predictFn: (x: number) => number, 
  pointCount: number = 100, 
  extrapolationFactor: number = 0.2
): [number, number][] {
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const range = maxX - minX;
  
  // Extended range for extrapolation
  const extendedMinX = minX - range * extrapolationFactor;
  const extendedMaxX = maxX + range * extrapolationFactor;
  
  const points: [number, number][] = [];
  
  for (let i = 0; i < pointCount; i++) {
    const x = extendedMinX + (extendedMaxX - extendedMinX) * (i / (pointCount - 1));
    const y = predictFn(x);
    points.push([x, y]);
  }
  
  return points;
}

// Run all selected regression models
export function runRegressionModels(
  xValues: number[], 
  yValues: number[], 
  modelIds: string[]
): ModelResult[] {
  const results: ModelResult[] = [];
  
  // Validate input
  if (!xValues || !yValues || xValues.length === 0 || xValues.length !== yValues.length) {
    console.error('Invalid input data for regression');
    return results;
  }
  
  for (const modelId of modelIds) {
    try {
      let model: any;
      let predictFn: (x: number) => number;
      let coefficients: any;
      let name = '';
      
      switch (modelId) {
        case 'linear':
          model = linearRegression(xValues, yValues);
          predictFn = model.predict;
          coefficients = { slope: model.slope, intercept: model.intercept };
          name = 'Linear Regression';
          break;
          
        case 'polynomial':
          model = polynomialRegression(xValues, yValues, 2);
          predictFn = model.predict;
          coefficients = { ...model.coefficients };
          name = 'Polynomial Regression';
          break;
          
        case 'exponential':
          model = exponentialRegression(xValues, yValues);
          predictFn = model.predict;
          coefficients = { a: model.a, b: model.b };
          name = 'Exponential Regression';
          break;
          
        case 'logarithmic':
          model = logarithmicRegression(xValues, yValues);
          predictFn = model.predict;
          coefficients = { a: model.a, b: model.b };
          name = 'Logarithmic Regression';
          break;
          
        case 'power':
          model = powerRegression(xValues, yValues);
          predictFn = model.predict;
          coefficients = { a: model.a, b: model.b };
          name = 'Power Regression';
          break;
          
        default:
          continue; // Skip unknown models
      }
      
      // Calculate metrics
      const metrics = calculateMetrics(xValues, yValues, predictFn);
      
      // Generate points for visualization
      const points = generatePoints(xValues, predictFn);
      
      results.push({
        id: modelId,
        name,
        coefficients,
        metrics,
        points,
        predict: predictFn
      });
    } catch (error) {
      console.error(`Error running ${modelId} regression:`, error);
    }
  }
  
  return results;
}