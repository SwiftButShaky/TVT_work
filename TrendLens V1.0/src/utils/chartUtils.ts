import Chart from 'chart.js/auto';
import { ModelResult } from '../types';

// Create scatter chart with regression lines
export function createChart(
  ctx: CanvasRenderingContext2D,
  dataset: any[],
  xColumn: string,
  yColumn: string,
  models: ModelResult[]
): Chart {
  // Extract data points
  const dataPoints = dataset.map(row => ({
    x: parseFloat(row[xColumn]),
    y: parseFloat(row[yColumn])
  }));
  
  // Colors for different models
  const modelColors = [
    'rgba(59, 130, 246, 1)', // Blue
    'rgba(16, 185, 129, 1)',  // Green
    'rgba(139, 92, 246, 1)',  // Purple
    'rgba(249, 115, 22, 1)',  // Orange
    'rgba(236, 72, 153, 1)'   // Pink
  ];
  
  // Create datasets for each model
  const modelDatasets = models.map((model, index) => ({
    label: model.name,
    data: model.points.map(([x, y]) => ({ x, y })),
    borderColor: modelColors[index % modelColors.length],
    backgroundColor: 'transparent',
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.2
  }));
  
  // Create chart
  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Actual Data',
          data: dataPoints,
          backgroundColor: 'rgba(100, 116, 139, 0.5)',
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBorderColor: 'rgba(100, 116, 139, 1)',
          pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        },
        ...modelDatasets
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xColumn,
            font: {
              weight: 'bold'
            }
          },
          grid: {
            display: true,
            color: 'rgba(226, 232, 240, 0.5)'
          }
        },
        y: {
          title: {
            display: true,
            text: yColumn,
            font: {
              weight: 'bold'
            }
          },
          grid: {
            display: true,
            color: 'rgba(226, 232, 240, 0.5)'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: 'rgba(15, 23, 42, 1)',
          bodyColor: 'rgba(15, 23, 42, 0.8)',
          borderColor: 'rgba(203, 213, 225, 1)',
          borderWidth: 1,
          padding: 10,
          boxPadding: 5,
          usePointStyle: true,
          callbacks: {
            label: function(context) {
              const point = context.raw as { x: number; y: number };
              return `${xColumn}: ${point.x.toFixed(2)}, ${yColumn}: ${point.y.toFixed(2)}`;
            }
          }
        }
      }
    }
  });
  
  return chart;
}

// Create a residual plot chart
export function createResidualChart(
  ctx: CanvasRenderingContext2D,
  dataset: any[],
  xColumn: string,
  yColumn: string,
  model: ModelResult
): Chart {
  // Calculate residuals
  const residuals = dataset.map(row => {
    const x = parseFloat(row[xColumn]);
    const actual = parseFloat(row[yColumn]);
    const predicted = model.predict(x);
    return {
      x,
      y: actual - predicted
    };
  });
  
  // Create chart
  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Residuals',
          data: residuals,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBorderColor: 'rgba(59, 130, 246, 1)',
          pointBackgroundColor: 'rgba(255, 255, 255, 1)'
        },
        {
          label: 'Zero Line',
          data: [
            { x: Math.min(...residuals.map(r => r.x)), y: 0 },
            { x: Math.max(...residuals.map(r => r.x)), y: 0 }
          ],
          borderColor: 'rgba(203, 213, 225, 1)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xColumn,
            font: {
              weight: 'bold'
            }
          },
          grid: {
            display: true,
            color: 'rgba(226, 232, 240, 0.5)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Residual (Actual - Predicted)',
            font: {
              weight: 'bold'
            }
          },
          grid: {
            display: true,
            color: 'rgba(226, 232, 240, 0.5)'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: 'rgba(15, 23, 42, 1)',
          bodyColor: 'rgba(15, 23, 42, 0.8)',
          borderColor: 'rgba(203, 213, 225, 1)',
          borderWidth: 1,
          padding: 10,
          boxPadding: 5,
          usePointStyle: true
        }
      }
    }
  });
  
  return chart;
}