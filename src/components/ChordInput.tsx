
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { validateChordProgression, getSupportedChords } from '@/utils/midiUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Music, Plus, Play, Square, HelpCircle } from 'lucide-react';
import { getRandomChord } from '@/utils/randomChordUtils';

interface ChordInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  onPreviewPlay: () => void;
  isPlaying: boolean;
}

const ChordInput: React.FC<ChordInputProps> = ({ 
  value, 
  onChange, 
  isValid, 
  onPreviewPlay,
  isPlaying 
}) => {
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
    <Card className="w-full h-full bg-card/90 backdrop-blur-sm border-border/60 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
          <Music size={20} className="text-music-primary" />
          Chord Progression
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground/90">
          Enter your chord progression separated by spaces
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="relative">
            <Textarea
              placeholder={placeholderText}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`min-h-24 bg-card/80 border-border/60 text-card-foreground placeholder:text-muted-foreground/70 resize-none text-base ${
                !isValid && value.length > 0 ? 'border-destructive focus:border-destructive' : 'focus:border-primary'
              }`}
            />
            <div className="absolute right-3 bottom-3 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-card/90 backdrop-blur-sm border-border/60 text-card-foreground hover:bg-muted/80 hover:text-foreground shadow-sm"
                onClick={onPreviewPlay}
                title={isPlaying ? "Stop preview" : "Preview with piano sound"}
              >
                {isPlaying ? (
                  <Square size={16} className="mr-1.5" />
                ) : (
                  <Play size={16} className="mr-1.5" />
                )}
                {isPlaying ? "Stop" : "Play"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-card/90 backdrop-blur-sm border-border/60 text-card-foreground hover:bg-muted/80 hover:text-foreground shadow-sm"
                onClick={handleAddRandomChord}
                title="Add a random chord"
              >
                <Plus size={16} className="mr-1.5" /> Random
              </Button>
            </div>
          </div>
          {!isValid && value.length > 0 && (
            <p className="text-sm text-destructive font-medium">
              Invalid chord progression. Please use supported chords.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-start pt-2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground/80 hover:text-foreground h-8 px-2 flex items-center gap-1.5">
              <HelpCircle size={14} />
              <span>Supported chords</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-card border-border/60 shadow-lg">
            <div className="space-y-3">
              <h4 className="font-semibold text-card-foreground">Supported Chords</h4>
              <div className="flex flex-wrap gap-1.5">
                {commonChords.map((chord) => (
                  <span 
                    key={chord} 
                    className="inline-block bg-muted/80 text-muted-foreground px-2.5 py-1 rounded text-xs font-medium"
                  >
                    {chord}
                  </span>
                ))}
                <span className="inline-block bg-muted/80 text-muted-foreground px-2.5 py-1 rounded text-xs font-medium">
                  + more...
                </span>
              </div>
              <p className="text-xs text-muted-foreground/80 pt-1">
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
