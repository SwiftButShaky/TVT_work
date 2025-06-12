import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MoodEntry } from '../types/mood';
import { getMoodColor, getMoodEmoji, formatDate } from '../utils/moodHelpers';

interface MoodTrendChartProps {
  weeklyMoods: MoodEntry[]; // Array of mood entries for the past 7 days
}

/**
 * Component that displays a line chart of mood trends over time
 * Shows average mood, trend direction, and visual chart with data points
 */
const MoodTrendChart: React.FC<MoodTrendChartProps> = ({ weeklyMoods }) => {
  // Filter out days where no mood was logged (mood = 0)
  const validMoods = weeklyMoods.filter(entry => entry.mood > 0);
  
  // If less than 2 data points, show placeholder message
  if (validMoods.length < 2) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Mood Trends
        </h2>
        <div className="text-center text-gray-500 py-8">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Track your mood for a few days to see trends!</p>
        </div>
      </div>
    );
  }

  /**
   * Calculate trend direction by comparing recent vs older mood averages
   * Positive = mood improving, Negative = mood declining, ~0 = stable
   */
  const calculateTrend = () => {
    if (validMoods.length < 2) return 0;
    
    // Get the most recent 3 entries and the 3 before that
    const recent = validMoods.slice(-3);
    const older = validMoods.slice(-6, -3);
    
    if (older.length === 0) return 0;
    
    // Calculate average mood for each period
    const recentAvg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    const olderAvg = older.reduce((sum, entry) => sum + entry.mood, 0) / older.length;
    
    // Return the difference (positive = improving, negative = declining)
    return recentAvg - olderAvg;
  };

  const trend = calculateTrend();
  // Calculate overall average mood across all valid entries
  const averageMood = validMoods.reduce((sum, entry) => sum + entry.mood, 0) / validMoods.length;

  // Get appropriate icon based on trend direction
  const getTrendIcon = () => {
    if (trend > 0.3) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (trend < -0.3) return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-600" />;
  };

  // Get descriptive text for trend
  const getTrendText = () => {
    if (trend > 0.3) return "Your mood is trending upward! 📈";
    if (trend < -0.3) return "Your mood has been declining lately 📉";
    return "Your mood has been stable 📊";
  };

  // Get color class for trend text
  const getTrendColor = () => {
    if (trend > 0.3) return "text-green-600";
    if (trend < -0.3) return "text-red-600";
    return "text-gray-600";
  };

  const maxMood = 5; // Maximum mood value for chart scaling
  const chartHeight = 120; // Height of chart area in pixels

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Mood Trends
      </h2>

      {/* Chart Container */}
      <div className="mb-6">
        <div className="relative" style={{ height: chartHeight + 40 }}>
          {/* Y-axis labels (mood levels 1-5 with emojis) */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
            {[5, 4, 3, 2, 1].map(level => (
              <div key={level} className="flex items-center">
                <span className="w-6 text-right">{level}</span>
                <span className="ml-1">{getMoodEmoji(level)}</span>
              </div>
            ))}
          </div>

          {/* Chart area with grid and data visualization */}
          <div className="ml-12 relative" style={{ height: chartHeight }}>
            {/* Horizontal grid lines for each mood level */}
            {[1, 2, 3, 4, 5].map(level => (
              <div
                key={level}
                className="absolute w-full border-t border-gray-100"
                style={{ 
                  top: `${((maxMood - level) / (maxMood - 1)) * 100}%` 
                }}
              />
            ))}

            {/* SVG for drawing the line chart */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Connect data points with a line */}
              {validMoods.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#3B82F6" // Blue color
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={validMoods.map((entry, index) => {
                    // Calculate x position (spread evenly across width)
                    const x = (index / (validMoods.length - 1)) * 100;
                    // Calculate y position (inverted because SVG y=0 is top)
                    const y = ((maxMood - entry.mood) / (maxMood - 1)) * 100;
                    return `${x}%,${y}%`;
                  }).join(' ')}
                />
              )}

              {/* Individual data points */}
              {validMoods.map((entry, index) => {
                const x = (index / Math.max(validMoods.length - 1, 1)) * 100;
                const y = ((maxMood - entry.mood) / (maxMood - 1)) * 100;
                return (
                  <g key={entry.date}>
                    {/* Outer circle (white with blue border) */}
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="6"
                      className="fill-white stroke-blue-500 stroke-2"
                    />
                    {/* Inner circle (colored based on mood) */}
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      className={getMoodColor(entry.mood).replace('bg-', 'fill-')}
                    />
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels (dates) */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-gray-500">
              {validMoods.map((entry, index) => (
                <span key={entry.date} className="text-center">
                  {formatDate(entry.date).split(' ')[0]} {/* Show only day part */}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics section */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        {/* Average mood display */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">
            {averageMood.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Average Mood</div>
        </div>
        
        {/* Trend indicator */}
        <div className="text-center">
          <div className={`flex items-center justify-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}
            </span>
          </div>
          <div className="text-sm text-gray-600">Trend</div>
        </div>
      </div>

      {/* Trend description */}
      <div className={`mt-4 text-center text-sm font-medium ${getTrendColor()}`}>
        {getTrendText()}
      </div>
    </div>
  );
};

export default MoodTrendChart;