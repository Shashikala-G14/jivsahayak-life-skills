import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Play, 
  Check, 
  Clock, 
  Star, 
  Lock,
  Volume2,
  ChevronRight,
  Award
} from 'lucide-react';
import { modules } from '@/data/modules';
import { useAppContext, translations } from '@/context/AppContext';

const ModuleDetail: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { language } = useAppContext();
  const t = translations[language];
  
  const module = modules.find(m => m.id === moduleId);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['bank-1']);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }

  const progress = (completedLessons.length / module.lessons.length) * 100;

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎬';
      case 'audio': return '🔊';
      case 'interactive': return '🎮';
      case 'story': return '📖';
      default: return '📚';
    }
  };

  const handleStartLesson = (lessonId: string) => {
    setActiveLesson(lessonId);
    // Simulate lesson completion after 2 seconds
    setTimeout(() => {
      if (!completedLessons.includes(lessonId)) {
        setCompletedLessons(prev => [...prev, lessonId]);
      }
      setActiveLesson(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="hero-gradient px-4 pt-6 pb-16 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="glass" 
            size="icon" 
            onClick={() => navigate('/demo/dashboard')}
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{module.title}</h1>
            <p className="text-white/70 text-sm">{module.lessons.length} lessons • {module.duration}</p>
          </div>
          <Button 
            variant="glass" 
            size="icon"
            className="bg-white/20 text-white hover:bg-white/30"
          >
            <Volume2 className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
            {module.icon}
          </div>
          <div className="flex-1">
            <p className="text-white/80 text-sm mb-2">{module.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-white/80">
                <Star className="w-4 h-4 text-accent" />
                {module.points} points
              </span>
              <span className="flex items-center gap-1 text-white/80">
                <Clock className="w-4 h-4" />
                {module.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-4 -mt-8">
        <Card variant="elevated" className="p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{completedLessons.length}/{module.lessons.length}</span>
          </div>
          <Progress value={progress} className="h-2 mb-3" />
          {progress === 100 && (
            <div className="flex items-center gap-2 text-success">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Module Complete! Badge earned!</span>
            </div>
          )}
        </Card>

        {/* Lessons List */}
        <h2 className="text-lg font-semibold mb-4">Lessons</h2>
        <div className="space-y-3">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isActive = activeLesson === lesson.id;
            const isLocked = index > 0 && !completedLessons.includes(module.lessons[index - 1].id);

            return (
              <Card 
                key={lesson.id}
                variant={isCompleted ? 'default' : isActive ? 'elevated' : 'interactive'}
                className={`p-4 transition-all duration-300 ${
                  isLocked ? 'opacity-50' : ''
                } ${isActive ? 'ring-2 ring-primary' : ''}`}
                onClick={() => !isLocked && !isActive && handleStartLesson(lesson.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    isCompleted 
                      ? 'bg-success/20 text-success' 
                      : isActive
                        ? 'hero-gradient text-white animate-pulse'
                        : 'bg-muted'
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : isLocked ? <Lock className="w-5 h-5" /> : getLessonIcon(lesson.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{lesson.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{lesson.duration}</span>
                      <span>•</span>
                      <span className="text-primary">+{lesson.points} pts</span>
                    </div>
                  </div>
                  {!isLocked && !isCompleted && !isActive && (
                    <Button variant="icon" size="icon">
                      <Play className="w-5 h-5" />
                    </Button>
                  )}
                  {isActive && (
                    <div className="text-sm text-primary font-medium">
                      Playing...
                    </div>
                  )}
                </div>

                {/* Lesson Steps (if interactive and active/completed) */}
                {lesson.steps && (isActive || isCompleted) && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium mb-3">Steps:</p>
                    <div className="space-y-2">
                      {lesson.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            isCompleted ? 'bg-success text-white' : 'bg-muted'
                          }`}>
                            {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                          </div>
                          <p className="text-sm text-muted-foreground flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
