
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio } from 'lucide-react';

interface ModeSelectorProps {
  mode: 'chords' | 'melody';
  onChange: (value: 'chords' | 'melody') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChange }) => {
  return (
    <Card className="w-full h-full flex flex-col justify-between bg-card/70 backdrop-blur-sm border-music-primary/20 rounded-xl shadow p-6 min-h-[310px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Radio size={18} className="text-music-primary" />
          Mode Selection
        </CardTitle>
        <CardDescription>
          Choose how to generate your MIDI file
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between pt-0 pb-0">
        <RadioGroup 
          value={mode} 
          onValueChange={(value) => onChange(value as 'chords' | 'melody')}
          className="flex flex-col gap-4"
        >
          <div className="flex items-start gap-3 rounded-lg border p-4 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="chords" id="chords" className="mt-1.5" />
            <Label htmlFor="chords" className="flex flex-col cursor-pointer select-none">
              <span className="font-medium text-base">Full Chords</span>
              <span className="text-muted-foreground text-sm leading-snug">Generate complete chords with all notes</span>
            </Label>
          </div>
          <div className="flex items-start gap-3 rounded-lg border p-4 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="melody" id="melody" className="mt-1.5" />
            <Label htmlFor="melody" className="flex flex-col cursor-pointer select-none">
              <span className="font-medium text-base">Melody</span>
              <span className="text-muted-foreground text-sm leading-snug">Generate a melody based on the chord progression</span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ModeSelector;

