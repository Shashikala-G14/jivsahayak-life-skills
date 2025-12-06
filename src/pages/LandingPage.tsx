import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Play, 
  Users, 
  BookOpen, 
  Mic, 
  Heart, 
  Shield, 
  Smartphone,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import heroImage from '@/assets/hero-illustration.jpg';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Life Skills Education',
      description: 'Learn banking, finance, health, and daily life skills through simple lessons',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Women Empowerment',
      description: 'Special programs for women on rights, business, and self-reliance',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Mindset Stories',
      description: 'Inspiring stories that change perspectives and break barriers',
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: 'Voice Assistant',
      description: 'Ask Sahayak AI any question in your local language',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Works Offline',
      description: 'Download lessons and learn without internet connection',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: '8+ Languages',
      description: 'Available in Hindi, Tamil, Bengali, Telugu, and more',
    },
  ];

  const stats = [
    { value: '10L+', label: 'Lives Impacted' },
    { value: '500+', label: 'Villages Reached' },
    { value: '8', label: 'Languages' },
    { value: '50+', label: 'Learning Modules' },
  ];

  const personas = [
    { emoji: '👧', label: 'Children', description: 'Fun learning for ages 5-14' },
    { emoji: '👩', label: 'Women', description: 'Empowerment & skills' },
    { emoji: '👨', label: 'Men', description: 'Career & finance' },
    { emoji: '👴', label: 'Elders', description: 'Digital literacy' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 hero-gradient rounded-xl flex items-center justify-center">
              <span className="text-xl">🙏</span>
            </div>
            <span className="text-xl font-bold text-foreground">JivSahayak</span>
          </div>
          <Button onClick={() => navigate('/demo')} variant="hero" size="sm">
            <Play className="w-4 h-4" />
            View Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Empowering Rural India</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-gradient-hero">JivSahayak</span>
                <br />
                <span className="text-foreground">Your Life Companion</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Simple, voice-powered education app for rural communities. Learn banking, 
                life skills, and empower yourself — all in your own language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={() => navigate('/demo')} variant="hero" size="xl">
                  <Play className="w-5 h-5" />
                  Try Demo Now
                </Button>
                <Button variant="outline" size="xl">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up-delayed">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="Rural woman learning on smartphone in golden wheat field"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
              {/* Floating cards */}
              <div className="absolute -left-4 top-1/4 animate-float">
                <Card variant="glass" className="p-4 shadow-elevated">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Lesson Complete!</p>
                      <p className="text-xs text-muted-foreground">+25 points</p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="absolute -right-4 bottom-1/4 animate-float-delayed">
                <Card variant="glass" className="p-4 shadow-elevated">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <Star className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">New Badge!</p>
                      <p className="text-xs text-muted-foreground">Banking Beginner</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Everyone in the Family</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personalized learning journeys for children, women, men, and elders
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {personas.map((persona, index) => (
              <Card 
                key={index} 
                variant="interactive"
                className="p-6 text-center"
              >
                <div className="text-5xl mb-4">{persona.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{persona.label}</h3>
                <p className="text-sm text-muted-foreground">{persona.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Learn</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, icon-based interface designed for everyone, including those who can't read
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="feature" className="p-6">
                <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card variant="elevated" className="p-8 md:p-12 text-center hero-gradient">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join lakhs of learners across India who are transforming their lives with JivSahayak
            </p>
            <Button 
              onClick={() => navigate('/demo')} 
              variant="glass" 
              size="xl"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <Play className="w-5 h-5" />
              View Demo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <span className="text-sm">🙏</span>
              </div>
              <span className="font-semibold">JivSahayak</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>100% Safe & Private • Made with ❤️ for India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
