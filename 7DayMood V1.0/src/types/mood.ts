/**
 * Type definitions for mood tracking data structures
 */

/**
 * Represents a single mood entry for a specific day
 */
export interface MoodEntry {
  date: string;     // Date in YYYY-MM-DD format for consistent sorting/lookup
  mood: number;     // Mood level on 1-5 scale (0 = no mood logged)
  note: string;     // Optional daily reflection note
  timestamp: number; // Unix timestamp for when entry was created/updated
}

/**
 * Structure for storing all mood data
 * Uses date strings as keys for efficient lookup
 * Example: { "2024-01-15": MoodEntry, "2024-01-16": MoodEntry }
 */
export interface WeeklyMoodData {
  [date: string]: MoodEntry;
}