
import { Midi } from '@tonejs/midi';
import * as Tone from 'tone';

// Initialize the synth
let synth: Tone.PolySynth | null = null;

// Initialize the synth on first use
const initSynth = async () => {
  if (synth === null) {
    await Tone.start();
    synth = new Tone.PolySynth(Tone.Synth, {
      volume: -8,
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();
  }
  return synth;
};

// Play a chord with piano sound
export const playChord = async (chord: string) => {
  try {
    const chordNotes = getChordNotes(chord);
    if (chordNotes.length === 0) return;
    
    const piano = await initSynth();
    
    // Convert MIDI notes to frequency
    const frequencies = chordNotes.map(note => Tone.Frequency(note, "midi").toFrequency());
    
    // Play the chord
    piano.triggerAttackRelease(frequencies, "2n");
  } catch (error) {
    console.error('Error playing chord:', error);
  }
};

// Play the entire progression
export const playProgression = async (progression: string, tempo: number = 120) => {
  try {
    const chords = progression.trim().split(/\s+/);
    if (chords.length === 0 || !progression.trim()) return;
    
    await Tone.start();
    const piano = await initSynth();
    
    // Calculate duration based on tempo
    const beatDuration = 60 / tempo;
    const chordDuration = beatDuration * 4; // 4 beats per chord
    
    // Stop any previous playing
    Tone.Transport.cancel();
    
    // Schedule each chord
    chords.forEach((chord, i) => {
      const chordNotes = getChordNotes(chord);
      if (chordNotes.length === 0) return;
      
      // Convert MIDI notes to frequency
      const frequencies = chordNotes.map(note => Tone.Frequency(note, "midi").toFrequency());
      
      Tone.Transport.schedule((time) => {
        piano?.triggerAttackRelease(frequencies, "2n", time);
      }, i * chordDuration);
    });
    
    // Start the transport
    Tone.Transport.start();
    
    // Stop after playing all chords
    Tone.Transport.schedule(() => {
      Tone.Transport.stop();
    }, chords.length * chordDuration);
    
  } catch (error) {
    console.error('Error playing progression:', error);
  }
};

// Map chord symbols to notes (using the existing chord map from midiUtils)
const getChordNotes = (chord: string): number[] => {
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
  
  return chordMap[chord] || [];
};

// Stop any currently playing sounds
export const stopPlayback = () => {
  Tone.Transport.stop();
  Tone.Transport.cancel();
  if (synth) {
    synth.releaseAll();
  }
};
