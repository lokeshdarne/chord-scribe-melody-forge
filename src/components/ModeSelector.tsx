
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
    <Card className="w-full bg-card/70 backdrop-blur-sm border-music-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio size={18} className="text-music-primary" />
          Mode Selection
        </CardTitle>
        <CardDescription>
          Choose how to generate your MIDI file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={mode} 
          onValueChange={(value) => onChange(value as 'chords' | 'melody')}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="chords" id="chords" />
            <Label htmlFor="chords" className="flex flex-col cursor-pointer">
              <span className="font-medium">Full Chords</span>
              <span className="text-muted-foreground text-sm">Generate complete chords with all notes</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="melody" id="melody" />
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
