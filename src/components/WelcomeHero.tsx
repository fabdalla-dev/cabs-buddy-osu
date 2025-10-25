import { MapPin, Clock, Smartphone, Sparkles, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WelcomeHeroProps {
  onDismiss: () => void;
}

const WelcomeHero = ({ onDismiss }: WelcomeHeroProps) => {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="max-w-2xl w-full p-8 relative shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onDismiss}
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="inline-block">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              OSU CABS Real-Time Tracker
            </h1>
            <p className="text-xl text-muted-foreground">
              A modern, intuitive web app for tracking Ohio State campus buses in real-time
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <h3 className="font-semibold text-destructive flex items-center gap-2">
                <span className="text-2xl">❌</span> Problem
              </h3>
              <p className="text-sm text-muted-foreground">
                The official OSU app requires users to be near bus stops to see arrival times, making trip planning difficult.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-success flex items-center gap-2">
                <span className="text-2xl">✅</span> Solution
              </h3>
              <p className="text-sm text-muted-foreground">
                Our PWA allows students to view all routes, buses, and arrival times from anywhere on campus.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Features
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">Real-time bus locations</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">Click any stop to see arrivals</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Smartphone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">Mobile-responsive design</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">Clean, intuitive interface</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button 
            onClick={onDismiss}
            size="lg"
            className="w-full sm:w-auto"
          >
            Start Tracking Buses
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeHero;
