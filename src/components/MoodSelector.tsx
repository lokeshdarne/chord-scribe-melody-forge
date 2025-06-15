
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { getAvailableMoods, getRandomProgressionByMood } from '@/utils/randomChordUtils';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
  onRandomProgression: (progression: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  selectedMood, 
  onMoodChange,
  onRandomProgression 
}) => {
  const moods = getAvailableMoods();
  
  const handleGenerateRandomProgression = () => {
    const randomProgression = getRandomProgressionByMood(selectedMood);
    onRandomProgression(randomProgression);
  };
  
  return (
    <Card className="w-full h-full flex flex-col justify-between bg-card/90 backdrop-blur-sm border-border/60 rounded-xl shadow-lg p-6 min-h-[310px]">
      <CardHeader className="pb-3 px-0">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-card-foreground">
          <Shuffle size={18} className="text-music-primary" />
          Random Progression
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground/90">
          Generate chord progressions by mood
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between pt-0 pb-0 px-0">
        <div className="flex-1 flex flex-col gap-6">
          <div className="space-y-3">
            <label htmlFor="mood-select" className="text-sm font-medium text-card-foreground">
              Select Mood
            </label>
            <Select value={selectedMood} onValueChange={onMoodChange}>
              <SelectTrigger id="mood-select" className="w-full bg-card border-border/60 text-card-foreground hover:bg-muted/50">
                <SelectValue placeholder="Select a mood" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/60 shadow-lg">
                {moods.map((mood) => (
                  <SelectItem key={mood} value={mood} className="text-card-foreground hover:bg-muted/80 focus:bg-muted/80">
                    {mood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="pt-6">
          <Button 
            onClick={handleGenerateRandomProgression} 
            className="w-full bg-music-secondary hover:bg-music-secondary/90 text-white text-base font-medium py-3 rounded-lg shadow-md border border-music-secondary/50 focus:outline-none focus:ring-2 focus:ring-music-primary transition"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Generate Random Progression
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodSelector;
