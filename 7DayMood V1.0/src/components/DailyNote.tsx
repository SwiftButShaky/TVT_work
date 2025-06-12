import React from 'react';
import { MessageCircle } from 'lucide-react';

interface DailyNoteProps {
  note: string;
  onNoteChange: (note: string) => void;
}

const DailyNote: React.FC<DailyNoteProps> = ({ note, onNoteChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Daily Reflection
        </h3>
      </div>
      
      <textarea
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder="How was your day? What happened that influenced your mood?"
        className="
          w-full p-4 border border-gray-200 rounded-lg resize-none
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          placeholder-gray-400 text-gray-700
        "
        rows={4}
      />
    </div>
  );
};

export default DailyNote;