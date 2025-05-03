
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
    <Card className="w-full h-full bg-card/70 backdrop-blur-sm border-music-primary/20 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ToggleRight size={18} className="text-music-primary" />
          Generation Controls
        </CardTitle>
        <CardDescription>
          Adjust parameters and generate your MIDI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 flex-1">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="tempo">Tempo (BPM)</Label>
            <span className="text-sm font-medium bg-muted/30 px-2 py-1 rounded-md">{tempo}</span>
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
          <div className="flex justify-between items-center">
            <Label htmlFor="octave">Octave Shift</Label>
            <span className="text-sm font-medium bg-muted/30 px-2 py-1 rounded-md">
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
      <CardFooter className="flex flex-col sm:flex-row gap-4 mt-auto pt-4 pb-4">
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
          variant="outline"
          className={`w-full ${canDownload 
            ? "bg-music-primary hover:bg-music-primary/90 text-primary-foreground border-music-primary/50" 
            : "bg-muted/20"}`}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GenerationControls;
