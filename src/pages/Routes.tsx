import { useState } from 'react';
import { Search } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ChatbotFAB from '@/components/ChatbotFAB';
import RouteSelector from '@/components/RouteSelector';
import BusMap from '@/components/BusMap';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Routes = () => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Campus Routes</h1>
          <p className="text-muted-foreground">Explore all bus routes and stops</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a route or stop..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[380px,1fr] gap-6 lg:gap-8 sticky top-[72px] z-40">
          {/* Left: Route List */}
          <aside>
            <Card className="p-6 max-h-[calc(100vh-96px)] overflow-y-auto">
              <RouteSelector 
                selectedRoute={selectedRoute}
                onSelectRoute={setSelectedRoute}
              />
            </Card>
          </aside>

          {/* Right: Map */}
          <Card className="overflow-hidden h-[calc(100vh-96px)]">
            <BusMap selectedRoute={selectedRoute} />
          </Card>
        </div>
      </main>

      <ChatbotFAB />
    </div>
  );
};

export default Routes;
