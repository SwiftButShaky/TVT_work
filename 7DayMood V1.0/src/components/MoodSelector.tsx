import React from 'react';
import { getMoodEmoji, getMoodColor, getMoodColorRing, getMoodLabel } from '../utils/moodHelpers';

interface MoodSelectorProps {
  selectedMood: number;
  onMoodSelect: (mood: number) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  const moods = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        How are you feeling today?
      </h3>
      
      <div className="flex justify-center space-x-3">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className={`
              relative w-16 h-16 rounded-full transition-all duration-300 transform hover:scale-110
              ${selectedMood === mood 
                ? `${getMoodColor(mood)} ring-4 ${getMoodColorRing(mood)} ring-opacity-50 scale-110` 
                : 'bg-gray-100 hover:bg-gray-200'
              }
              flex items-center justify-center text-2xl
              shadow-md hover:shadow-lg
            `}
          >
            <span className="select-none">
              {getMoodEmoji(mood)}
            </span>
            {selectedMood === mood && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                  {getMoodLabel(mood)}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="h-6"></div>
    </div>
  );
};

export default MoodSelector;