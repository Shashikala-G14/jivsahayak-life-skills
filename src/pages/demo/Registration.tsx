import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, ArrowLeft, User, Target, Sparkles } from 'lucide-react';
import { useAppContext, translations, UserPersona } from '@/context/AppContext';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const persona = (location.state as { persona: UserPersona })?.persona || 'woman';
  const { language, setUser, setIsOnboarded } = useAppContext();
  const t = translations[language];

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: 'banking', label: 'Banking & Finance', icon: '🏦' },
    { id: 'digital', label: 'Digital Skills', icon: '📱' },
    { id: 'business', label: 'Start Business', icon: '💼' },
    { id: 'health', label: 'Health & Wellness', icon: '💚' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'rights', label: 'Know My Rights', icon: '⚖️' },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleStart = () => {
    setUser({
      name: name || 'Guest',
      age: age ? parseInt(age) : undefined,
      persona,
      language,
      goals: selectedGoals,
      points: 0,
      badges: [],
      completedModules: [],
      streak: 1,
      level: 1,
    });
    setIsOnboarded(true);
    navigate('/demo/dashboard');
  };

  return (
    <div className="min-h-screen bg-background sunset-gradient flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/demo/persona')}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 hero-gradient rounded-xl flex items-center justify-center">
            <span className="text-xl">🙏</span>
          </div>
          <span className="text-xl font-bold">JivSahayak</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="w-full max-w-md mx-auto animate-slide-up">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 hero-gradient rounded-full flex items-center justify-center shadow-soft">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Tell us about you</h1>
            <p className="text-muted-foreground">(Optional - you can skip)</p>
          </div>

          {/* Name Input */}
          <Card variant="default" className="p-4 mb-4">
            <label className="block text-sm font-medium mb-2">Your Name (Optional)</label>
            <Input 
              placeholder="अपना नाम लिखें / Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg h-12"
            />
          </Card>

          {/* Age Input */}
          <Card variant="default" className="p-4 mb-6">
            <label className="block text-sm font-medium mb-2">Your Age (Optional)</label>
            <Input 
              type="number"
              placeholder="अपनी उम्र / Your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="text-lg h-12"
              min="5"
              max="100"
            />
          </Card>

          {/* Goals Selection */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">What do you want to learn?</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  variant={selectedGoals.includes(goal.id) ? 'elevated' : 'interactive'}
                  className={`p-4 text-center cursor-pointer transition-all duration-300 ${
                    selectedGoals.includes(goal.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <p className="text-sm font-medium">{goal.label}</p>
                </Card>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleStart} 
            variant="hero" 
            size="xl" 
            className="w-full"
          >
            <Sparkles className="w-5 h-5" />
            {t.startLearning}
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button 
            variant="ghost" 
            className="w-full mt-4"
            onClick={handleStart}
          >
            Skip for now →
          </Button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="p-6 flex justify-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <div className="w-3 h-3 rounded-full bg-primary" />
      </div>
    </div>
  );
};

export default Registration;
