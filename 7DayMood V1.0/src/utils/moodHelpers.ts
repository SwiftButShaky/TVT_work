/**
 * Utility functions for mood-related operations
 * These functions provide consistent mood representation across the app
 */

/**
 * Get the emoji representation for a mood level
 * @param mood - Mood level (1-5)
 * @returns Emoji string
 */
export const getMoodEmoji = (mood: number): string => {
  const moodEmojis = {
    1: '😢', // Terrible - crying face
    2: '😕', // Bad - disappointed face
    3: '😐', // Okay - neutral face
    4: '😊', // Good - smiling face
    5: '😄', // Great - grinning face
  };
  return moodEmojis[mood as keyof typeof moodEmojis] || '❓';
};

/**
 * Get the background color class for a mood level
 * @param mood - Mood level (1-5)
 * @returns Tailwind CSS background color class
 */
export const getMoodColor = (mood: number): string => {
  const moodColors = {
    1: 'bg-red-500',    // Terrible - red
    2: 'bg-orange-500', // Bad - orange
    3: 'bg-yellow-500', // Okay - yellow
    4: 'bg-lime-500',   // Good - lime green
    5: 'bg-green-500',  // Great - green
  };
  return moodColors[mood as keyof typeof moodColors] || 'bg-gray-300';
};

/**
 * Get the ring color class for a mood level (used for selection indicators)
 * @param mood - Mood level (1-5)
 * @returns Tailwind CSS ring color class
 */
export const getMoodColorRing = (mood: number): string => {
  const moodColors = {
    1: 'ring-red-500',
    2: 'ring-orange-500',
    3: 'ring-yellow-500',
    4: 'ring-lime-500',
    5: 'ring-green-500',
  };
  return moodColors[mood as keyof typeof moodColors] || 'ring-gray-300';
};

/**
 * Get the text label for a mood level
 * @param mood - Mood level (1-5)
 * @returns Human-readable mood description
 */
export const getMoodLabel = (mood: number): string => {
  const moodLabels = {
    1: 'Terrible',
    2: 'Bad',
    3: 'Okay',
    4: 'Good',
    5: 'Great',
  };
  return moodLabels[mood as keyof typeof moodLabels] || 'Unknown';
};

/**
 * Format a date string for display
 * @param date - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "Mon Jan 15")
 */
export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short', // Mon, Tue, etc.
    month: 'short',   // Jan, Feb, etc.
    day: 'numeric',   // 1, 2, 3, etc.
  });
};

/**
 * Check if a date string represents today
 * @param date - Date string in YYYY-MM-DD format
 * @returns True if the date is today
 */
export const isToday = (date: string): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return date === today;
};