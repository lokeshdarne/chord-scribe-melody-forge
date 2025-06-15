
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
    <Card className="w-full h-full flex flex-col justify-between bg-card/70 backdrop-blur-sm border-music-primary/20 rounded-xl shadow p-6 min-h-[310px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Shuffle size={18} className="text-music-primary" />
          Random Progression
        </CardTitle>
        <CardDescription>
          Generate chord progressions by mood
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between pt-0 pb-0">
        <div className="flex-1 flex flex-col gap-6">
          <div className="space-y-2">
            <label htmlFor="mood-select" className="text-sm font-medium">
              Select Mood
            </label>
            <Select value={selectedMood} onValueChange={onMoodChange}>
              <SelectTrigger id="mood-select" className="w-full bg-popover">
                <SelectValue placeholder="Select a mood" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-music-primary/20">
                {moods.map((mood) => (
                  <SelectItem key={mood} value={mood}>
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
            className="w-full bg-music-secondary hover:bg-music-secondary/90 text-white text-base py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-music-primary transition"
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

