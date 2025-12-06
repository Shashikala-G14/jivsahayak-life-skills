import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useAppContext, personaLabels, UserPersona, translations } from '@/context/AppContext';

const PersonaSelection: React.FC = () => {
  const navigate = useNavigate();
  const { language, setUser } = useAppContext();
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);
  const t = translations[language];

  const personas: { type: UserPersona; color: string }[] = [
    { type: 'child', color: 'from-blue-400 to-blue-600' },
    { type: 'woman', color: 'from-pink-400 to-rose-600' },
    { type: 'man', color: 'from-teal-400 to-teal-600' },
    { type: 'elder', color: 'from-amber-400 to-orange-600' },
  ];

  const handleContinue = () => {
    if (selectedPersona) {
      navigate('/demo/register', { state: { persona: selectedPersona } });
    }
  };

  return (
    <div className="min-h-screen bg-background sunset-gradient flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/demo')}>
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
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{t.selectPersona}</h1>
            <p className="text-lg text-muted-foreground">Who are you?</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {personas.map((persona) => (
              <Card
                key={persona.type}
                variant={selectedPersona === persona.type ? 'elevated' : 'interactive'}
                className={`p-6 text-center cursor-pointer transition-all duration-300 ${
                  selectedPersona === persona.type 
                    ? 'ring-2 ring-primary shadow-glow scale-105' 
                    : ''
                }`}
                onClick={() => setSelectedPersona(persona.type)}
              >
                <div 
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${persona.color} flex items-center justify-center shadow-soft`}
                >
                  <span className="text-4xl">{personaLabels[persona.type].icon}</span>
                </div>
                <p className="text-xl font-semibold mb-1">{personaLabels[persona.type].label}</p>
                <p className="text-sm text-muted-foreground">{personaLabels[persona.type].description}</p>
              </Card>
            ))}
          </div>

          <Button 
            onClick={handleContinue} 
            variant="hero" 
            size="xl" 
            className="w-full"
            disabled={!selectedPersona}
          >
            {t.continue}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="p-6 flex justify-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <div className="w-3 h-3 rounded-full bg-muted" />
      </div>
    </div>
  );
};

export default PersonaSelection;
