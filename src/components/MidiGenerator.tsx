
import React, { useState, useEffect } from 'react';
import ChordInput from './ChordInput';
import ModeSelector from './ModeSelector';
import GenerationControls from './GenerationControls';
import { generateMidi, validateChordProgression } from '@/utils/midiUtils';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const MidiGenerator: React.FC = () => {
  const [chordProgression, setChordProgression] = useState<string>('');
  const [mode, setMode] = useState<'chords' | 'melody'>('chords');
  const [tempo, setTempo] = useState<number>(120);
  const [octaveShift, setOctaveShift] = useState<number>(0);
  const [generatedMidi, setGeneratedMidi] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isChordProgressionValid, setIsChordProgressionValid] = useState<boolean>(true);
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

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-heading">MIDI Chord Progression Generator</h1>
        <p className="text-muted-foreground">Create MIDI files from chord progressions directly in your browser</p>
      </div>
      
      <Separator className="bg-music-primary/30" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ChordInput 
            value={chordProgression}
            onChange={setChordProgression}
            isValid={isChordProgressionValid}
          />
          
          <ModeSelector 
            mode={mode}
            onChange={setMode}
          />
        </div>
        
        <div>
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
    </div>
  );
};

export default MidiGenerator;
