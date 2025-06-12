import React, { useState, useEffect } from 'react';
import { Heart, Calendar, TrendingUp } from 'lucide-react';
import MoodSelector from './components/MoodSelector';
import WeeklyOverview from './components/WeeklyOverview';
import MoodTrendChart from './components/MoodTrendChart';
import DailyNote from './components/DailyNote';
import SaveButton from './components/SaveButton';
import { useMoodStorage } from './hooks/useMoodStorage';
import { MoodEntry } from './types/mood';

function App() {
  // State for the currently selected mood (0 = no selection, 1-5 = mood scale)
  const [selectedMood, setSelectedMood] = useState<number>(0);
  
  // State for the daily reflection note
  const [dailyNote, setDailyNote] = useState<string>('');
  
  // State to track if today's mood has been saved
  const [isSaved, setIsSaved] = useState<boolean>(false);
  
  // State to control the save success animation
  const [showSaveAnimation, setShowSaveAnimation] = useState<boolean>(false);

  // Custom hook that handles all localStorage operations
  const { saveMoodEntry, updateMoodEntry, getMoodEntry, getWeeklyMoods } = useMoodStorage();

  // Get today's date in YYYY-MM-DD format for consistent date handling
  const today = new Date().toISOString().split('T')[0];
  
  // Get the past 7 days of mood data (including today)
  const weeklyMoods = getWeeklyMoods();

  // Effect to load today's existing mood data when the app starts
  useEffect(() => {
    const todaysMood = getMoodEntry(today);
    if (todaysMood) {
      // If mood exists for today, populate the form with existing data
      setSelectedMood(todaysMood.mood);
      setDailyNote(todaysMood.note);
      setIsSaved(true); // Mark as saved since data already exists
    }
  }, [today, getMoodEntry]);

  // Handler for saving today's mood entry
  const handleSave = () => {
    // Don't save if no mood is selected
    if (selectedMood === 0) return;

    // Create a new mood entry object
    const entry: MoodEntry = {
      date: today,
      mood: selectedMood,
      note: dailyNote,
      timestamp: Date.now(), // For tracking when the entry was created/updated
    };

    // Save to localStorage via the custom hook
    saveMoodEntry(entry);
    setIsSaved(true);
    
    // Show success animation for 2 seconds
    setShowSaveAnimation(true);
    setTimeout(() => {
      setShowSaveAnimation(false);
    }, 2000);
  };

  // Handler for when user selects a mood
  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
    setIsSaved(false); // Mark as unsaved since user made a change
  };

  // Handler for when user types in the note field
  const handleNoteChange = (note: string) => {
    setDailyNote(note);
    setIsSaved(false); // Mark as unsaved since user made a change
  };

  // Handler for when user edits a past mood entry
  const handleMoodUpdate = (updatedEntry: MoodEntry) => {
    // Update the entry in localStorage
    updateMoodEntry(updatedEntry);
    
    // If the updated entry is for today, refresh the current form state
    if (updatedEntry.date === today) {
      setSelectedMood(updatedEntry.mood);
      setDailyNote(updatedEntry.note);
      setIsSaved(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* App Header with branding */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            {/* App logo using Heart icon */}
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            {/* App title with gradient text */}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              7DayMood
            </h1>
          </div>
          {/* App description */}
          <p className="text-center text-gray-600 mt-2">
            Track your daily emotions and reflect on your week
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main layout: sidebar for today's entry, main area for trends/overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left sidebar: Today's mood entry form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Today's date header */}
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Today's Mood
                </h2>
                {/* Formatted current date */}
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {/* Mood selection component (emoji buttons) */}
              <MoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />

              {/* Daily note/reflection textarea */}
              <div className="mt-8">
                <DailyNote
                  note={dailyNote}
                  onNoteChange={handleNoteChange}
                />
              </div>

              {/* Save button with dynamic states */}
              <div className="mt-6">
                <SaveButton
                  onSave={handleSave}
                  isDisabled={selectedMood === 0} // Disabled if no mood selected
                  isSaved={isSaved}
                />
              </div>

              {/* Success animation shown after saving */}
              {showSaveAnimation && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center space-x-2 text-green-600 font-medium animate-pulse">
                    <TrendingUp className="w-5 h-5" />
                    <span>Mood saved successfully!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right main area: Analytics and weekly overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood trend chart showing patterns over time */}
            <MoodTrendChart weeklyMoods={weeklyMoods} />
            
            {/* Weekly overview showing all 7 days with edit capability */}
            <WeeklyOverview 
              weeklyMoods={weeklyMoods} 
              onMoodUpdate={handleMoodUpdate}
            />
          </div>
        </div>

        {/* Footer with privacy note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Your mood data is stored locally in your browser</p>
        </div>
      </div>
    </div>
  );
}

export default App;