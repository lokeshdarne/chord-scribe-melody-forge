
import { getSupportedChords } from './midiUtils';

// Define mood-based chord progression patterns
type MoodPattern = {
  name: string;
  patterns: string[][];
};

// Mood-based chord patterns
export const moodPatterns: MoodPattern[] = [
  {
    name: "Happy",
    patterns: [
      ["C", "G", "Am", "F"],
      ["G", "D", "Em", "C"],
      ["F", "C", "G", "Am"],
      ["D", "A", "Bm", "G"]
    ]
  },
  {
    name: "Sad",
    patterns: [
      ["Am", "F", "C", "G"],
      ["Em", "C", "G", "D"],
      ["Dm", "Bb", "F", "C"],
      ["Bm", "G", "D", "A"]
    ]
  },
  {
    name: "Uplifting",
    patterns: [
      ["F", "G", "Em", "Am"],
      ["C", "G", "F", "Am"],
      ["D", "A", "Bm", "G"],
      ["G", "C", "D", "Em"]
    ]
  },
  {
    name: "Deep",
    patterns: [
      ["Cm", "G#", "D#", "G"],
      ["Fm", "C", "G", "Bb"],
      ["Em", "Cmaj7", "Am7", "B7"],
      ["Gm", "Eb", "Bb", "F"]
    ]
  },
  {
    name: "Dreamy",
    patterns: [
      ["Fmaj7", "Em7", "Dm7", "Cmaj7"],
      ["Gmaj7", "Bm7", "Em7", "A7"],
      ["Dmaj7", "Bm7", "Em7", "A7"],
      ["Cmaj7", "Am7", "Dm7", "G7"]
    ]
  }
];

// Get available moods
export const getAvailableMoods = (): string[] => {
  return moodPatterns.map(mood => mood.name);
};

// Get a random chord from the supported chords
export const getRandomChord = (): string => {
  const chords = getSupportedChords();
  const randomIndex = Math.floor(Math.random() * chords.length);
  return chords[randomIndex];
};

// Get a random chord progression based on mood
export const getRandomProgressionByMood = (mood: string): string => {
  const moodPattern = moodPatterns.find(m => m.name === mood);
  
  if (!moodPattern) {
    // Default to Happy if mood not found
    const defaultMood = moodPatterns[0];
    const randomPatternIndex = Math.floor(Math.random() * defaultMood.patterns.length);
    return defaultMood.patterns[randomPatternIndex].join(' ');
  }
  
  const randomPatternIndex = Math.floor(Math.random() * moodPattern.patterns.length);
  return moodPattern.patterns[randomPatternIndex].join(' ');
};
