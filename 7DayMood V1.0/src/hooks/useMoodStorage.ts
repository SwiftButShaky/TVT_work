import { useState, useEffect } from 'react';
import { MoodEntry, WeeklyMoodData } from '../types/mood';

const STORAGE_KEY = '7daymood-data';

export const useMoodStorage = () => {
  const [moodData, setMoodData] = useState<WeeklyMoodData>({});

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        setMoodData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing mood data:', error);
      }
    }
  }, []);

  const saveMoodEntry = (entry: MoodEntry) => {
    const newMoodData = {
      ...moodData,
      [entry.date]: entry,
    };
    setMoodData(newMoodData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMoodData));
  };

  const getMoodEntry = (date: string): MoodEntry | undefined => {
    return moodData[date];
  };

  const getWeeklyMoods = (): MoodEntry[] => {
    const today = new Date();
    const weeklyMoods: MoodEntry[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const moodEntry = moodData[dateString];
      if (moodEntry) {
        weeklyMoods.push(moodEntry);
      } else {
        weeklyMoods.push({
          date: dateString,
          mood: 0,
          note: '',
          timestamp: 0,
        });
      }
    }
    
    return weeklyMoods;
  };

  return {
    saveMoodEntry,
    getMoodEntry,
    getWeeklyMoods,
  };
};