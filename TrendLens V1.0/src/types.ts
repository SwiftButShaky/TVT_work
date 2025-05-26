export interface ModelResult {
  id: string;
  name: string;
  coefficients: any;
  metrics: {
    rSquared: number;
    rmse: number;
    aic: number;
    trend: number;
  };
  points: [number, number][];
  predict: (x: number) => number;
}

export interface DatasetSummary {
  rowCount: number;
  columnCount: number;
  missingValues: number;
  columnTypes: Record<string, string>;
}