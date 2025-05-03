
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Radio } from 'lucide-react';

interface ModeSelectorProps {
  mode: 'chords' | 'melody';
  onChange: (value: 'chords' | 'melody') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChange }) => {
  return (
    <Card className="w-full h-full bg-card/70 backdrop-blur-sm border-music-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Radio size={18} className="text-music-primary" />
          Mode Selection
        </CardTitle>
        <CardDescription>
          Choose how to generate your MIDI file
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <RadioGroup 
          value={mode} 
          onValueChange={(value) => onChange(value as 'chords' | 'melody')}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-start space-x-2 rounded-md border p-3 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="chords" id="chords" className="mt-1" />
            <Label htmlFor="chords" className="flex flex-col cursor-pointer">
              <span className="font-medium">Full Chords</span>
              <span className="text-muted-foreground text-sm">Generate complete chords with all notes</span>
            </Label>
          </div>
          
          <div className="flex items-start space-x-2 rounded-md border p-3 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="melody" id="melody" className="mt-1" />
            <Label htmlFor="melody" className="flex flex-col cursor-pointer">
              <span className="font-medium">Melody</span>
              <span className="text-muted-foreground text-sm">Generate a melody based on the chord progression</span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ModeSelector;
