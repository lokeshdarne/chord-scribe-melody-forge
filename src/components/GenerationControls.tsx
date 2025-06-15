
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
    <Card className="w-full h-full bg-card/90 backdrop-blur-sm border-border/60 flex flex-col shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
          <ToggleRight size={20} className="text-music-primary" />
          Generation Controls
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground/90">
          Adjust parameters and generate your MIDI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 flex-1">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="tempo" className="text-base font-medium text-card-foreground">Tempo (BPM)</Label>
            <span className="text-base font-semibold bg-muted/80 text-foreground px-3 py-1.5 rounded-md border border-border/40">
              {tempo}
            </span>
          </div>
          <Slider
            id="tempo"
            value={[tempo]}
            min={60}
            max={180}
            step={1}
            onValueChange={(value) => onTempoChange(value[0])}
            className="cursor-pointer slider-improved"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="octave" className="text-base font-medium text-card-foreground">Octave Shift</Label>
            <span className="text-base font-semibold bg-muted/80 text-foreground px-3 py-1.5 rounded-md border border-border/40">
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
            className="cursor-pointer slider-improved"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 mt-auto pt-4 pb-6">
        <Button 
          onClick={onGenerate} 
          disabled={isGenerating || !isValid}
          className="w-full bg-music-accent hover:bg-music-accent/90 text-white font-medium text-base py-3 shadow-md border border-music-accent/50"
        >
          {isGenerating ? 'Generating...' : 'Generate MIDI'}
        </Button>
        
        <Button
          onClick={onDownload}
          disabled={!canDownload}
          variant="outline"
          className={`w-full font-medium text-base py-3 shadow-md ${canDownload 
            ? "bg-music-primary hover:bg-music-primary/90 text-primary-foreground border-music-primary/60" 
            : "bg-muted/40 border-border/60 text-muted-foreground"}`}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GenerationControls;
