import { useState, useEffect } from 'react';
import { MoodEntry, WeeklyMoodData } from '../types/mood';

// Key used to store mood data in localStorage
const STORAGE_KEY = '7daymood-data';

/**
 * Custom hook that manages all mood data storage operations
 * Uses localStorage to persist data between browser sessions
 */
export const useMoodStorage = () => {
  // State to hold all mood data in memory (keyed by date)
  const [moodData, setMoodData] = useState<WeeklyMoodData>({});

  // Load existing mood data from localStorage when hook initializes
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        // Parse the JSON data and update state
        setMoodData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing mood data:', error);
        // If data is corrupted, we'll start fresh
      }
    }
  }, []);

  /**
   * Save a new mood entry or update an existing one
   * @param entry - The mood entry to save
   */
  const saveMoodEntry = (entry: MoodEntry) => {
    // Create new data object with the updated entry
    const newMoodData = {
      ...moodData,
      [entry.date]: entry, // Use date as key for easy lookup
    };
    
    // Update both state and localStorage
    setMoodData(newMoodData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMoodData));
  };

  /**
   * Update an existing mood entry (same as save for our use case)
   * @param entry - The mood entry to update
   */
  const updateMoodEntry = (entry: MoodEntry) => {
    saveMoodEntry(entry); // Same functionality as save
  };

  /**
   * Get a mood entry for a specific date
   * @param date - Date string in YYYY-MM-DD format
   * @returns The mood entry or undefined if not found
   */
  const getMoodEntry = (date: string): MoodEntry | undefined => {
    return moodData[date];
  };

  /**
   * Get mood entries for the past 7 days (including today)
   * Creates placeholder entries for days without data
   * @returns Array of 7 mood entries, ordered from oldest to newest
   */
  const getWeeklyMoods = (): MoodEntry[] => {
    const today = new Date();
    const weeklyMoods: MoodEntry[] = [];
    
    // Loop through the past 7 days (6 days ago to today)
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i); // Go back i days
      const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      
      // Get existing mood entry or create placeholder
      const moodEntry = moodData[dateString];
      if (moodEntry) {
        weeklyMoods.push(moodEntry);
      } else {
        // Create placeholder entry for days without data
        weeklyMoods.push({
          date: dateString,
          mood: 0, // 0 indicates no mood logged
          note: '',
          timestamp: 0,
        });
      }
    }
    
    return weeklyMoods;
  };

  // Return all the functions that components can use
  return {
    saveMoodEntry,
    updateMoodEntry,
    getMoodEntry,
    getWeeklyMoods,
  };
};