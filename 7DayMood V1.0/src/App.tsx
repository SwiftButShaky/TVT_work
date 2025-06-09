import React, { useState, useEffect } from 'react';
import { Heart, Calendar, TrendingUp } from 'lucide-react';
import MoodSelector from './components/MoodSelector';
import WeeklyOverview from './components/WeeklyOverview';
import DailyNote from './components/DailyNote';
import SaveButton from './components/SaveButton';
import { useMoodStorage } from './hooks/useMoodStorage';
import { MoodEntry } from './types/mood';

function App() {
  const [selectedMood, setSelectedMood] = useState<number>(0);
  const [dailyNote, setDailyNote] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showSaveAnimation, setShowSaveAnimation] = useState<boolean>(false);

  const { saveMoodEntry, getMoodEntry, getWeeklyMoods } = useMoodStorage();

  const today = new Date().toISOString().split('T')[0];
  const weeklyMoods = getWeeklyMoods();

  useEffect(() => {
    const todaysMood = getMoodEntry(today);
    if (todaysMood) {
      setSelectedMood(todaysMood.mood);
      setDailyNote(todaysMood.note);
      setIsSaved(true);
    }
  }, [today, getMoodEntry]);

  const handleSave = () => {
    if (selectedMood === 0) return;

    const entry: MoodEntry = {
      date: today,
      mood: selectedMood,
      note: dailyNote,
      timestamp: Date.now(),
    };

    saveMoodEntry(entry);
    setIsSaved(true);
    setShowSaveAnimation(true);

    setTimeout(() => {
      setShowSaveAnimation(false);
    }, 2000);
  };

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
    setIsSaved(false);
  };

  const handleNoteChange = (note: string) => {
    setDailyNote(note);
    setIsSaved(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              7DayMood
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Track your daily emotions and reflect on your week
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Mood Entry */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Today's Mood
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <MoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />

              <div className="mt-8">
                <DailyNote
                  note={dailyNote}
                  onNoteChange={handleNoteChange}
                />
              </div>

              <div className="mt-6">
                <SaveButton
                  onSave={handleSave}
                  isDisabled={selectedMood === 0}
                  isSaved={isSaved}
                />
              </div>

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

          {/* Weekly Overview */}
          <div>
            <WeeklyOverview weeklyMoods={weeklyMoods} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Your mood data is stored locally in your browser</p>
        </div>
      </div>
    </div>
  );
}

export default App;