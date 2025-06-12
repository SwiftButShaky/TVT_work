import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';
import { MoodEntry } from '../types/mood';
import { getMoodEmoji, getMoodColor, formatDate, isToday } from '../utils/moodHelpers';
import EditMoodModal from './EditMoodModal';

interface WeeklyOverviewProps {
  weeklyMoods: MoodEntry[]; // Array of mood entries for the past 7 days
  onMoodUpdate: (updatedEntry: MoodEntry) => void; // Callback when a mood is updated
}

/**
 * Component that displays a list view of the past 7 days of mood entries
 * Allows users to edit past entries via a modal dialog
 */
const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({ weeklyMoods, onMoodUpdate }) => {
  // State to track which mood entry is being edited (null = no modal open)
  const [editingMood, setEditingMood] = useState<MoodEntry | null>(null);

  /**
   * Handle click on edit button - only allow editing if mood was logged
   * @param entry - The mood entry to edit
   */
  const handleEditClick = (entry: MoodEntry) => {
    if (entry.mood > 0) { // Only allow editing if mood was actually logged
      setEditingMood(entry);
    }
  };

  /**
   * Handle saving changes from the edit modal
   * @param updatedEntry - The updated mood entry
   */
  const handleSaveEdit = (updatedEntry: MoodEntry) => {
    onMoodUpdate(updatedEntry); // Call parent callback to update data
    setEditingMood(null); // Close the modal
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Your Week at a Glance
        </h2>
        
        {/* List of mood entries for each day */}
        <div className="space-y-4">
          {weeklyMoods.map((entry, index) => (
            <div
              key={entry.date}
              className={`
                group flex items-center justify-between p-4 rounded-lg transition-all duration-200
                ${isToday(entry.date) 
                  ? 'bg-blue-50 border-2 border-blue-200' // Highlight today's entry
                  : 'bg-gray-50 hover:bg-gray-100'
                }
              `}
            >
              {/* Left side: Date and mood info */}
              <div className="flex items-center space-x-4 flex-1">
                {/* Date display */}
                <div className="text-sm font-medium text-gray-600 w-20">
                  {formatDate(entry.date)}
                  {isToday(entry.date) && (
                    <span className="block text-xs text-blue-600 font-semibold">Today</span>
                  )}
                </div>
                
                {/* Mood display */}
                <div className="flex items-center space-x-3 flex-1">
                  {entry.mood > 0 ? (
                    <>
                      {/* Mood emoji with colored background */}
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-lg
                          ${getMoodColor(entry.mood)} shadow-sm
                        `}
                      >
                        {getMoodEmoji(entry.mood)}
                      </div>
                      {/* Show note if it exists (truncated) */}
                      {entry.note && (
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          "{entry.note}"
                        </div>
                      )}
                    </>
                  ) : (
                    // Show placeholder for days without mood data
                    <div className="text-sm text-gray-400 italic">
                      No mood logged
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right side: Mood level indicator and edit button */}
              <div className="flex items-center space-x-3">
                {/* Mood level dots (1-5 scale visualization) */}
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
                
                {/* Edit button (only shown on hover and if mood exists) */}
                {entry.mood > 0 && (
                  <button
                    onClick={() => handleEditClick(entry)}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white hover:shadow-md rounded-lg transition-all duration-200"
                    title="Edit mood entry"
                  >
                    <Edit3 className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal - only rendered when editingMood is not null */}
      {editingMood && (
        <EditMoodModal
          isOpen={true}
          onClose={() => setEditingMood(null)}
          moodEntry={editingMood}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
};

export default WeeklyOverview