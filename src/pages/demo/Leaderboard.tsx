import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trophy, Medal, Crown } from 'lucide-react';
import { leaderboardData, badges } from '@/data/modules';
import { useAppContext, translations } from '@/context/AppContext';

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { language, user } = useAppContext();
  const t = translations[language];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="hero-gradient px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="glass" size="icon" onClick={() => navigate('/demo/dashboard')} className="bg-white/20 text-white hover:bg-white/30">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6" /> {t.leaderboard}
          </h1>
        </div>

        {/* User Rank Card */}
        <Card variant="glass" className="p-4 bg-white/10 border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">👤</div>
            <div className="flex-1">
              <p className="text-white font-semibold">{user?.name || 'You'}</p>
              <p className="text-white/70 text-sm">Rank #12 • {user?.points || 150} points</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 mt-6 space-y-3">
        {leaderboardData.map((entry) => (
          <Card key={entry.rank} variant={entry.rank <= 3 ? 'elevated' : 'default'} className={`p-4 ${entry.rank === 1 ? 'ring-2 ring-accent' : ''}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center">{getRankIcon(entry.rank)}</div>
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">{entry.avatar}</div>
              <div className="flex-1">
                <p className="font-semibold">{entry.name}</p>
                <p className="text-sm text-muted-foreground">{entry.village}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{entry.points}</p>
                <p className="text-xs text-muted-foreground">points</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Badges Section */}
      <div className="px-4 mt-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" /> {t.badges}
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {badges.slice(0, 8).map((badge, idx) => (
            <Card key={badge.id} variant="default" className={`p-3 text-center ${idx < 2 ? '' : 'opacity-40'}`}>
              <div className="text-2xl mb-1">{badge.icon}</div>
              <p className="text-xs font-medium truncate">{badge.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
