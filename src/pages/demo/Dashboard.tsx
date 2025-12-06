import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Home, 
  BookOpen, 
  Mic, 
  User, 
  Trophy,
  Flame,
  Star,
  Target,
  ChevronRight,
  Play,
  Award,
  Zap
} from 'lucide-react';
import { useAppContext, translations, personaLabels } from '@/context/AppContext';
import { modules, dailyChallenges, badges } from '@/data/modules';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, language } = useAppContext();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('home');

  const userModules = modules.filter(m => 
    user?.persona && m.personas.includes(user.persona)
  );

  const completedLessons = 3;
  const totalLessons = 24;
  const progressPercent = (completedLessons / totalLessons) * 100;

  const todayChallenge = dailyChallenges[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="hero-gradient px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">{personaLabels[user?.persona || 'woman'].icon}</span>
            </div>
            <div>
              <p className="text-white/80 text-sm">Namaste 🙏</p>
              <h2 className="text-xl font-bold text-white">{user?.name || 'Guest'}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-full px-3 py-1.5 flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-300" />
              <span className="text-white font-semibold text-sm">{user?.streak || 1}</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="glass" className="p-3 bg-white/10 border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{user?.points || 150}</p>
              <p className="text-xs text-white/70">{t.points}</p>
            </div>
          </Card>
          <Card variant="glass" className="p-3 bg-white/10 border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{user?.level || 1}</p>
              <p className="text-xs text-white/70">{t.level}</p>
            </div>
          </Card>
          <Card variant="glass" className="p-3 bg-white/10 border-white/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{user?.badges?.length || 2}</p>
              <p className="text-xs text-white/70">{t.badges}</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-4">
        {/* Progress Card */}
        <Card variant="elevated" className="p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              {t.yourProgress}
            </h3>
            <span className="text-sm text-muted-foreground">{completedLessons}/{totalLessons} lessons</span>
          </div>
          <Progress value={progressPercent} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">Keep going! Complete 2 more lessons today.</p>
        </Card>

        {/* Daily Challenge */}
        <Card variant="interactive" className="p-4 mb-6 bg-gradient-to-r from-accent/20 to-accent/5 border-accent/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{t.dailyChallenge}</p>
                <h3 className="font-semibold">{todayChallenge.title}</h3>
                <p className="text-sm text-primary">+{todayChallenge.points} {t.points}</p>
              </div>
            </div>
            <Button variant="accent" size="sm">
              Start
            </Button>
          </div>
        </Card>

        {/* Modules */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {t.modules}
            </h3>
            <Button variant="ghost" size="sm">
              See all <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {userModules.slice(0, 4).map((module) => (
              <Card 
                key={module.id} 
                variant="interactive"
                className="p-4"
                onClick={() => navigate(`/demo/module/${module.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center text-2xl shadow-soft">
                    {module.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{module.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{module.duration}</span>
                      <span>•</span>
                      <span className="text-primary">+{module.points} pts</span>
                    </div>
                  </div>
                  <Button variant="icon" size="icon">
                    <Play className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements Preview */}
        <Card variant="default" className="p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              {t.achievements}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/demo/achievements')}>
              View all <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {badges.slice(0, 4).map((badge, idx) => (
              <div 
                key={badge.id} 
                className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                  idx < 2 ? 'bg-gradient-to-br from-accent to-accent/70 shadow-soft' : 'bg-muted'
                }`}
              >
                {badge.icon}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            variant="interactive" 
            className="p-4 text-center"
            onClick={() => navigate('/demo/assistant')}
          >
            <div className="w-14 h-14 mx-auto mb-3 nature-gradient rounded-2xl flex items-center justify-center shadow-soft">
              <Mic className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-semibold">{t.askSahayak}</h4>
            <p className="text-sm text-muted-foreground">Voice help</p>
          </Card>
          <Card 
            variant="interactive" 
            className="p-4 text-center"
            onClick={() => navigate('/demo/leaderboard')}
          >
            <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-soft">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-semibold">{t.leaderboard}</h4>
            <p className="text-sm text-muted-foreground">Compete</p>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 safe-area-inset-bottom">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { id: 'home', icon: Home, label: t.home },
            { id: 'learn', icon: BookOpen, label: t.learn },
            { id: 'assistant', icon: Mic, label: t.assistant },
            { id: 'profile', icon: User, label: t.profile },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'assistant') navigate('/demo/assistant');
                if (tab.id === 'learn') navigate('/demo/modules');
                if (tab.id === 'profile') navigate('/demo/profile');
              }}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
