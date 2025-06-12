import React from 'react';
import { Save, Check } from 'lucide-react';

interface SaveButtonProps {
  onSave: () => void;
  isDisabled: boolean;
  isSaved: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onSave, isDisabled, isSaved }) => {
  return (
    <button
      onClick={onSave}
      disabled={isDisabled}
      className={`
        w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300
        flex items-center justify-center space-x-2
        ${isDisabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : isSaved
          ? 'bg-green-500 text-white hover:bg-green-600 transform hover:scale-105'
          : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
        }
        shadow-md hover:shadow-lg
      `}
    >
      {isSaved ? (
        <>
          <Check className="w-5 h-5" />
          <span>Saved!</span>
        </>
      ) : (
        <>
          <Save className="w-5 h-5" />
          <span>Save Today's Mood</span>
        </>
      )}
    </button>
  );
};

export default SaveButton;