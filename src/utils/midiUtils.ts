
import { Midi } from '@tonejs/midi';

// Map chord symbols to notes
const chordMap: Record<string, number[]> = {
  // Major chords
  "C": [60, 64, 67],
  "C#": [61, 65, 68],
  "D": [62, 66, 69],
  "D#": [63, 67, 70],
  "Eb": [63, 67, 70],
  "E": [64, 68, 71],
  "F": [65, 69, 72],
  "F#": [66, 70, 73],
  "G": [67, 71, 74],
  "G#": [68, 72, 75],
  "Ab": [68, 72, 75],
  "A": [69, 73, 76],
  "A#": [70, 74, 77],
  "Bb": [70, 74, 77],
  "B": [71, 75, 78],
  
  // Minor chords
  "Cm": [60, 63, 67],
  "C#m": [61, 64, 68],
  "Dm": [62, 65, 69],
  "D#m": [63, 66, 70],
  "Ebm": [63, 66, 70],
  "Em": [64, 67, 71],
  "Fm": [65, 68, 72],
  "F#m": [66, 69, 73],
  "Gm": [67, 70, 74],
  "G#m": [68, 71, 75],
  "Abm": [68, 71, 75],
  "Am": [69, 72, 76],
  "A#m": [70, 73, 77],
  "Bbm": [70, 73, 77],
  "Bm": [71, 74, 78],
  
  // Seventh chords
  "C7": [60, 64, 67, 70],
  "D7": [62, 66, 69, 72],
  "E7": [64, 68, 71, 74],
  "F7": [65, 69, 72, 75],
  "G7": [67, 71, 74, 77],
  "A7": [69, 73, 76, 79],
  "B7": [71, 75, 78, 81],
  
  // Minor seventh chords
  "Cm7": [60, 63, 67, 70],
  "Dm7": [62, 65, 69, 72],
  "Em7": [64, 67, 71, 74],
  "Fm7": [65, 68, 72, 75],
  "Gm7": [67, 70, 74, 77],
  "Am7": [69, 72, 76, 79],
  "Bm7": [71, 74, 78, 81],
  
  // Major seventh chords
  "Cmaj7": [60, 64, 67, 71],
  "Dmaj7": [62, 66, 69, 73],
  "Emaj7": [64, 68, 71, 75],
  "Fmaj7": [65, 69, 72, 76],
  "Gmaj7": [67, 71, 74, 78],
  "Amaj7": [69, 73, 76, 80],
  "Bmaj7": [71, 75, 78, 82],
};

// Parse a chord progression string into an array of chords
export const parseChordProgression = (progression: string): string[] => {
  return progression
    .trim()
    .split(/[\s,|]+/)
    .filter(chord => chord.length > 0);
};

// Validate if all chords in the progression are recognized
export const validateChordProgression = (progression: string): boolean => {
  const chords = parseChordProgression(progression);
  return chords.length > 0 && chords.every(chord => Object.keys(chordMap).includes(chord));
};

// Get a list of all supported chords
export const getSupportedChords = (): string[] => {
  return Object.keys(chordMap);
};

// Generate melody notes from a chord
const generateMelodyFromChord = (chord: string, octaveShift: number = 0): number[] => {
  const baseNotes = chordMap[chord] || [];
  // For melody, just use the root note and maybe the 3rd and 5th occasionally
  if (baseNotes.length > 0) {
    const rootNote = baseNotes[0] + (octaveShift * 12);
    const thirdOrFifth = Math.random() > 0.5 ? 
      baseNotes[1] + (octaveShift * 12) : 
      baseNotes[2] + (octaveShift * 12);
    
    return [rootNote, thirdOrFifth];
  }
  return [];
};

// Generate a MIDI file for a chord progression
export const generateMidi = (
  progression: string, 
  mode: 'chords' | 'melody',
  tempo: number = 120,
  octaveShift: number = 0
): Blob => {
  const midi = new Midi();
  const track = midi.addTrack();
  
  const chords = parseChordProgression(progression);
  
  // Set the track name based on mode
  track.name = mode === 'chords' ? "Chord Progression" : "Melody";
  
  // Calculate timing (in seconds)
  const beatDuration = 60 / tempo; // Duration of one beat in seconds
  const chordDuration = beatDuration * 4; // Each chord lasts 4 beats (a full measure)
  
  // Add notes for each chord
  chords.forEach((chord, i) => {
    const startTime = i * chordDuration;
    
    if (mode === 'chords') {
      // Full chord mode - add all notes of the chord
      const chordNotes = chordMap[chord] || [];
      chordNotes.forEach(note => {
        // Apply octave shift
        const shiftedNote = note + (octaveShift * 12);
        track.addNote({
          midi: shiftedNote,
          time: startTime,
          duration: chordDuration * 0.95, // Slightly shorter to avoid notes running together
          velocity: 0.8 // Volume/velocity (0-1)
        });
      });
    } else {
      // Melody mode - create a simple melody based on the chord
      const melodyNotes = generateMelodyFromChord(chord, octaveShift);
      let noteTime = startTime;
      
      // Create a simple rhythm for the melody
      const rhythmPatterns = [
        [0.5, 0.5, 1, 2],
        [1, 1, 1, 1],
        [2, 1, 1],
        [1, 0.5, 0.5, 2]
      ];
      
      // Select a rhythm pattern for this chord
      const pattern = rhythmPatterns[Math.floor(Math.random() * rhythmPatterns.length)];
      
      // Apply the rhythm pattern
      pattern.forEach((duration) => {
        // 70% chance to play note for each beat
        if (Math.random() < 0.7) {
          const noteChoice = Math.floor(Math.random() * melodyNotes.length);
          track.addNote({
            midi: melodyNotes[noteChoice],
            time: noteTime,
            duration: duration * beatDuration * 0.95, // Slightly shorter
            velocity: 0.7 + (Math.random() * 0.3) // Vary the velocity for more natural sound
          });
        }
        noteTime += duration * beatDuration;
      });
    }
  });
  
  return new Blob([midi.toArray()], { type: "audio/midi" });
};
