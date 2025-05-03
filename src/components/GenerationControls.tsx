
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ToggleRight } from 'lucide-react';

interface GenerationControlsProps {
  tempo: number;
  onTempoChange: (value: number) => void;
  octaveShift: number;
  onOctaveShiftChange: (value: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  canDownload: boolean;
  onDownload: () => void;
  isValid: boolean;
}

const GenerationControls: React.FC<GenerationControlsProps> = ({ 
  tempo, 
  onTempoChange, 
  octaveShift, 
  onOctaveShiftChange, 
  onGenerate, 
  isGenerating, 
  canDownload, 
  onDownload,
  isValid
}) => {
  return (
    <Card className="w-full h-full bg-card/70 backdrop-blur-sm border-music-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ToggleRight size={18} className="text-music-primary" />
          Generation Controls
        </CardTitle>
        <CardDescription>
          Adjust parameters and generate your MIDI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="tempo">Tempo (BPM)</Label>
            <span className="text-sm font-medium">{tempo}</span>
          </div>
          <Slider
            id="tempo"
            value={[tempo]}
            min={60}
            max={180}
            step={1}
            onValueChange={(value) => onTempoChange(value[0])}
            className="cursor-pointer"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="octave">Octave Shift</Label>
            <span className="text-sm font-medium">
              {octaveShift > 0 ? `+${octaveShift}` : octaveShift}
            </span>
          </div>
          <Slider
            id="octave"
            value={[octaveShift]}
            min={-2}
            max={2}
            step={1}
            onValueChange={(value) => onOctaveShiftChange(value[0])}
            className="cursor-pointer"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4 mt-auto">
        <Button 
          onClick={onGenerate} 
          disabled={isGenerating || !isValid}
          className="w-full bg-music-accent hover:bg-music-accent/90 text-white"
        >
          {isGenerating ? 'Generating...' : 'Generate MIDI'}
        </Button>
        
        <Button
          onClick={onDownload}
          disabled={!canDownload}
          variant={canDownload ? "default" : "outline"}
          className={`w-full ${canDownload ? "bg-music-primary hover:bg-music-primary/90 text-primary-foreground" : ""}`}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GenerationControls;
