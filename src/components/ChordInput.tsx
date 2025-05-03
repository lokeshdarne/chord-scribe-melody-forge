
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { validateChordProgression, getSupportedChords } from '@/utils/midiUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Music, Plus } from 'lucide-react';
import { getRandomChord } from '@/utils/randomChordUtils';

interface ChordInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

const ChordInput: React.FC<ChordInputProps> = ({ value, onChange, isValid }) => {
  const placeholderText = "Enter chord progression (e.g. C G Am F)";
  const supportedChords = getSupportedChords();
  
  // Filter to common chord types for display
  const commonChords = ["C", "G", "D", "A", "E", "F", "Dm", "Em", "Am", "G7", "Cmaj7"];
  
  // Handler for adding a random chord
  const handleAddRandomChord = () => {
    const randomChord = getRandomChord();
    const newValue = value ? `${value} ${randomChord}` : randomChord;
    onChange(newValue);
  };
  
  return (
    <Card className="w-full bg-card/70 backdrop-blur-sm border-music-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music size={18} className="text-music-primary" />
          Chord Progression
        </CardTitle>
        <CardDescription>
          Enter your chord progression separated by spaces
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="relative">
            <Textarea
              placeholder={placeholderText}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`min-h-24 bg-muted/30 chord-input-placeholder resize-none ${
                !isValid && value.length > 0 ? 'border-destructive' : 'border-input'
              }`}
            />
            <Button 
              variant="outline" 
              size="sm"
              className="absolute right-3 bottom-3 bg-card/50 backdrop-blur-sm"
              onClick={handleAddRandomChord}
              title="Add a random chord"
            >
              <Plus size={16} className="mr-1" /> Random Chord
            </Button>
          </div>
          {!isValid && value.length > 0 && (
            <p className="text-sm text-destructive">
              Invalid chord progression. Please use supported chords.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start space-y-2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="text-sm px-0 text-muted-foreground">
              View supported chords
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Supported Chords</h4>
              <div className="flex flex-wrap gap-1">
                {commonChords.map((chord) => (
                  <span 
                    key={chord} 
                    className="inline-block bg-muted px-2 py-1 rounded text-xs"
                  >
                    {chord}
                  </span>
                ))}
                <span className="inline-block bg-muted px-2 py-1 rounded text-xs">
                  + more...
                </span>
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Supports major, minor, 7th, and major 7th chords in all keys
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardFooter>
    </Card>
  );
};

export default ChordInput;
