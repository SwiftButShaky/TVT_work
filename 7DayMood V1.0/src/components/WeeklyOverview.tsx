import React from 'react';
import { MoodEntry } from '../types/mood';
import { getMoodEmoji, getMoodColor, formatDate, isToday } from '../utils/moodHelpers';

interface WeeklyOverviewProps {
  weeklyMoods: MoodEntry[];
}

const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ weeklyMoods }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Your Week at a Glance
      </h2>
      
      <div className="space-y-4">
        {weeklyMoods.map((entry, index) => (
          <div
            key={entry.date}
            className={`
              flex items-center justify-between p-4 rounded-lg transition-all duration-200
              ${isToday(entry.date) 
                ? 'bg-blue-50 border-2 border-blue-200' 
                : 'bg-gray-50 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-600 w-20">
                {formatDate(entry.date)}
                {isToday(entry.date) && (
                  <span className="block text-xs text-blue-600 font-semibold">Today</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {entry.mood > 0 ? (
                  <>
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-lg
                        ${getMoodColor(entry.mood)} shadow-sm
                      `}
                    >
                      {getMoodEmoji(entry.mood)}
                    </div>
                    {entry.note && (
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        "{entry.note}"
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-gray-400 italic">
                    No mood logged
                  </div>
                )}
              </div>
            </div>
            
            {entry.mood > 0 && (
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`
                      w-2 h-2 rounded-full
                      ${level <= entry.mood ? getMoodColor(entry.mood) : 'bg-gray-200'}
                    `}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyOverview;