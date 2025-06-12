import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { MoodEntry } from '../types/mood';
import MoodSelector from './MoodSelector';
import DailyNote from './DailyNote';
import { formatDate } from '../utils/moodHelpers';

interface EditMoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  moodEntry: MoodEntry;
  onSave: (updatedEntry: MoodEntry) => void;
}

const EditMoodModal: React.FC<EditMoodModalProps> = ({
  isOpen,
  onClose,
  moodEntry,
  onSave,
}) => {
  const [selectedMood, setSelectedMood] = useState(moodEntry.mood);
  const [dailyNote, setDailyNote] = useState(moodEntry.note);

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedEntry: MoodEntry = {
      ...moodEntry,
      mood: selectedMood,
      note: dailyNote,
      timestamp: Date.now(),
    };
    onSave(updatedEntry);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Mood - {formatDate(moodEntry.date)}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <MoodSelector
              selectedMood={selectedMood}
              onMoodSelect={setSelectedMood}
            />

            <DailyNote
              note={dailyNote}
              onNoteChange={setDailyNote}
            />

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={selectedMood === 0}
                className={`
                  flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300
                  flex items-center justify-center space-x-2
                  ${selectedMood === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
                  }
                `}
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMoodModal;