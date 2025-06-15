
import React, { useState, useEffect } from 'react';
import ChordInput from './ChordInput';
import ModeSelector from './ModeSelector';
import GenerationControls from './GenerationControls';
import MoodSelector from './MoodSelector';
import { generateMidi, validateChordProgression } from '@/utils/midiUtils';
import { playProgression, stopPlayback } from '@/utils/audioPreviewUtils';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Music } from 'lucide-react';

const MidiGenerator: React.FC = () => {
  const [chordProgression, setChordProgression] = useState<string>('');
  const [mode, setMode] = useState<'chords' | 'melody'>('chords');
  const [tempo, setTempo] = useState<number>(120);
  const [octaveShift, setOctaveShift] = useState<number>(0);
  const [generatedMidi, setGeneratedMidi] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isChordProgressionValid, setIsChordProgressionValid] = useState<boolean>(true);
  const [selectedMood, setSelectedMood] = useState<string>("Happy");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { toast } = useToast();

  // Validate chord progression when it changes
  useEffect(() => {
    if (chordProgression.trim() === '') {
      setIsChordProgressionValid(true);
      return;
    }
    setIsChordProgressionValid(validateChordProgression(chordProgression));
  }, [chordProgression]);

  const handleGenerateMidi = () => {
    if (!isChordProgressionValid || chordProgression.trim() === '') {
      toast({
        title: "Invalid Chord Progression",
        description: "Please enter a valid chord progression before generating.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Short timeout to allow UI to update
    setTimeout(() => {
      try {
        const midiBlob = generateMidi(chordProgression, mode, tempo, octaveShift);
        setGeneratedMidi(midiBlob);
        toast({
          title: "MIDI Generated",
          description: "Your MIDI file is ready for download!",
        });
      } catch (error) {
        console.error('Error generating MIDI:', error);
        toast({
          title: "Generation Failed",
          description: "An error occurred while generating the MIDI file.",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };

  const handleRandomProgression = (progression: string) => {
    setChordProgression(progression);
    toast({
      title: "Random Progression Added",
      description: `Created a ${selectedMood} chord progression.`
    });
  };

  const handleDownload = () => {
    if (!generatedMidi) return;
    
    const url = URL.createObjectURL(generatedMidi);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mode === 'chords' ? 'chords' : 'melody'}_${chordProgression.replace(/\s+/g, '-')}.mid`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handlePreviewPlay = async () => {
    if (!isChordProgressionValid || chordProgression.trim() === '') {
      toast({
        title: "Invalid Chord Progression",
        description: "Please enter a valid chord progression to preview.",
        variant: "destructive"
      });
      return;
    }

    if (isPlaying) {
      stopPlayback();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    toast({
      title: "Playing Preview",
      description: "Playing chord progression with piano sound",
    });

    try {
      await playProgression(chordProgression, tempo);
      // Reset play state after finished
      setTimeout(() => {
        setIsPlaying(false);
      }, (chordProgression.split(/\s+/).length * (60 / tempo) * 4 * 1000) + 500);
    } catch (error) {
      console.error('Error playing preview:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-music-background via-music-background/95 to-music-background/90 py-12 px-4 flex flex-col">
      <div className="max-w-4xl mx-auto space-y-8 flex-grow">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold gradient-heading">MIDI Chord Progression Generator</h1>
          <p className="text-lg text-foreground/90">Create MIDI files from chord progressions directly in your browser</p>
        </div>
        
        <Separator className="bg-music-primary/40" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ChordInput 
              value={chordProgression}
              onChange={setChordProgression}
              isValid={isChordProgressionValid}
              onPreviewPlay={handlePreviewPlay}
              isPlaying={isPlaying}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ModeSelector 
                mode={mode}
                onChange={setMode}
              />
              
              <MoodSelector
                selectedMood={selectedMood}
                onMoodChange={setSelectedMood}
                onRandomProgression={handleRandomProgression}
              />
            </div>
          </div>
          
          <GenerationControls 
            tempo={tempo}
            onTempoChange={setTempo}
            octaveShift={octaveShift}
            onOctaveShiftChange={setOctaveShift}
            onGenerate={handleGenerateMidi}
            isGenerating={isGenerating}
            canDownload={!!generatedMidi}
            onDownload={handleDownload}
            isValid={isChordProgressionValid && chordProgression.trim() !== ''}
          />
        </div>
      </div>
      
      <footer className="mt-auto text-center text-sm text-foreground/80 border-t border-music-primary/30 pt-6 mt-12">
        <p className="font-medium">Developed by Lokesh Darne</p>
        <p className="mt-2 flex items-center justify-center gap-2">
          <Music size={16} className="text-music-primary" />
          <span>Built with React & Tone.js</span>
        </p>
      </footer>
    </div>
  );
};

export default MidiGenerator;
