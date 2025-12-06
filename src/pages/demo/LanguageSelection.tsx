import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Volume2 } from 'lucide-react';
import { useAppContext, languageLabels, Language } from '@/context/AppContext';

const LanguageSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setLanguage } = useAppContext();
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);

  const languages: { code: Language; flag: string }[] = [
    { code: 'hi', flag: '🇮🇳' },
    { code: 'en', flag: '🇬🇧' },
    { code: 'ta', flag: '🇮🇳' },
    { code: 'bn', flag: '🇮🇳' },
    { code: 'te', flag: '🇮🇳' },
    { code: 'mr', flag: '🇮🇳' },
    { code: 'gu', flag: '🇮🇳' },
    { code: 'kn', flag: '🇮🇳' },
  ];

  const handleContinue = () => {
    if (selectedLang) {
      setLanguage(selectedLang);
      navigate('/demo/persona');
    }
  };

  return (
    <div className="min-h-screen bg-background sunset-gradient flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 hero-gradient rounded-2xl flex items-center justify-center shadow-soft">
            <span className="text-2xl">🙏</span>
          </div>
          <span className="text-2xl font-bold text-foreground">JivSahayak</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Volume2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">अपनी भाषा चुनें</h1>
            <p className="text-lg text-muted-foreground">Select Your Language</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {languages.map((lang) => (
              <Card
                key={lang.code}
                variant={selectedLang === lang.code ? 'elevated' : 'interactive'}
                className={`p-4 text-center cursor-pointer transition-all duration-300 ${
                  selectedLang === lang.code 
                    ? 'ring-2 ring-primary shadow-glow' 
                    : ''
                }`}
                onClick={() => setSelectedLang(lang.code)}
              >
                <div className="text-3xl mb-2">{lang.flag}</div>
                <p className="text-lg font-semibold">{languageLabels[lang.code]}</p>
              </Card>
            ))}
          </div>

          <Button 
            onClick={handleContinue} 
            variant="hero" 
            size="xl" 
            className="w-full"
            disabled={!selectedLang}
          >
            आगे बढ़ें / Continue
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="p-6 flex justify-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary" />
        <div className="w-3 h-3 rounded-full bg-muted" />
        <div className="w-3 h-3 rounded-full bg-muted" />
      </div>
    </div>
  );
};

export default LanguageSelection;
