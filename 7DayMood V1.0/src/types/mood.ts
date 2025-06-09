export interface MoodEntry {
  date: string; // YYYY-MM-DD format
  mood: number; // 1-5 scale
  note: string;
  timestamp: number;
}

export interface WeeklyMoodData {
  [date: string]: MoodEntry;
}