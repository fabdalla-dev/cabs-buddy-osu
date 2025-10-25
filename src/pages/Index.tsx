import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ChatbotFAB from '@/components/ChatbotFAB';
import BusMap from '@/components/BusMap';
import StopList from '@/components/StopList';
import WelcomeHero from '@/components/WelcomeHero';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('osu-cabs-visited');
    if (!hasVisited) {
      setShowWelcome(true);
    }
  }, []);

  const handleDismissWelcome = () => {
    localStorage.setItem('osu-cabs-visited', 'true');
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Hero */}
      {showWelcome && <WelcomeHero onDismiss={handleDismissWelcome} />}

      <Navigation />
      
      <main className="container mx-auto p-6 lg:p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Navigate Campus with Ease</h1>
          <p className="text-xl text-muted-foreground mb-6">
            See real-time bus routes, arrivals, and schedules — all in one place.
          </p>
          <NavLink to="/routes">
            <Button size="lg" className="shadow-lg">
              View All Routes
            </Button>
          </NavLink>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: Map View */}
          <Card className="overflow-hidden h-[600px]">
            <BusMap selectedRoute={selectedRoute} />
          </Card>

          {/* Right: Live Arrivals */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Live Arrivals</h2>
              <p className="text-muted-foreground">Real-time bus arrival information</p>
            </div>
            <StopList selectedRoute={selectedRoute} />
          </div>
        </div>
      </main>

      <ChatbotFAB />
    </div>
  );
};

export default Index;
