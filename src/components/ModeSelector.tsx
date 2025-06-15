
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
    <Card className="w-full h-full flex flex-col justify-between bg-card/90 backdrop-blur-sm border-border/60 rounded-xl shadow-lg p-6 min-h-[310px]">
      <CardHeader className="pb-3 px-0">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
          <Radio size={18} className="text-music-primary" />
          Mode Selection
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground/90">
          Choose how to generate your MIDI file
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between pt-0 pb-0 px-0">
        <RadioGroup 
          value={mode} 
          onValueChange={(value) => onChange(value as 'chords' | 'melody')}
          className="flex flex-col gap-4"
        >
          <div className="flex items-start gap-3 rounded-lg border border-border/60 p-4 hover:bg-muted/40 transition-colors bg-card/50">
            <RadioGroupItem value="chords" id="chords" className="mt-1.5 border-border/60 text-primary" />
            <Label htmlFor="chords" className="flex flex-col cursor-pointer select-none">
              <span className="font-medium text-base text-card-foreground">Full Chords</span>
              <span className="text-muted-foreground/80 text-sm leading-snug">Generate complete chords with all notes</span>
            </Label>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-border/60 p-4 hover:bg-muted/40 transition-colors bg-card/50">
            <RadioGroupItem value="melody" id="melody" className="mt-1.5 border-border/60 text-primary" />
            <Label htmlFor="melody" className="flex flex-col cursor-pointer select-none">
              <span className="font-medium text-base text-card-foreground">Melody</span>
              <span className="text-muted-foreground/80 text-sm leading-snug">Generate a melody based on the chord progression</span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ModeSelector;
