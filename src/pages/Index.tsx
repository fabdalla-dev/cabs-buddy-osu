import { useState } from 'react';
import BusMap from '@/components/BusMap';
import RouteSelector from '@/components/RouteSelector';
import StopList from '@/components/StopList';
import { Card } from '@/components/ui/card';
import { Bus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">OSU CABS</h1>
                <p className="text-sm text-muted-foreground">Real-time Bus Tracking</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-[350px,1fr] gap-4">
          {/* Sidebar */}
          <aside 
            className={`space-y-4 ${
              showSidebar ? 'block' : 'hidden'
            } lg:block`}
          >
            <Card className="p-4">
              <RouteSelector 
                selectedRoute={selectedRoute}
                onSelectRoute={setSelectedRoute}
              />
            </Card>
            
            <Card className="p-4">
              <StopList selectedRoute={selectedRoute} />
            </Card>
          </aside>

          {/* Map */}
          <main>
            <Card className="overflow-hidden h-[calc(100vh-180px)]">
              <BusMap selectedRoute={selectedRoute} />
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
