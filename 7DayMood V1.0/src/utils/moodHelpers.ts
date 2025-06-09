export const getMoodEmoji = (mood: number): string => {
  const moodEmojis = {
    1: '😢',
    2: '😕',
    3: '😐',
    4: '😊',
    5: '😄',
  };
  return moodEmojis[mood as keyof typeof moodEmojis] || '❓';
};

export const getMoodColor = (mood: number): string => {
  const moodColors = {
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-lime-500',
    5: 'bg-green-500',
  };
  return moodColors[mood as keyof typeof moodColors] || 'bg-gray-300';
};

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

export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const isToday = (date: string): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return date === today;
};