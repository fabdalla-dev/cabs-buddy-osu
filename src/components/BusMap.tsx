import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

interface BusLocation {
  id: string;
  route: string;
  lat: number;
  lng: number;
  heading: number;
}

interface BusMapProps {
  selectedRoute: string | null;
}

const BusMap = ({ selectedRoute }: BusMapProps) => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const mapContainer = useRef<HTMLDivElement>(null);

  // Mock bus locations - in production, this would come from real-time API
  const mockBuses: BusLocation[] = [
    { id: 'bus-1', route: 'ER', lat: 40.0067, lng: -83.0305, heading: 45 },
    { id: 'bus-2', route: 'CL', lat: 40.0050, lng: -83.0280, heading: 90 },
    { id: 'bus-3', route: 'NS', lat: 40.0080, lng: -83.0320, heading: 180 },
  ];

  const filteredBuses = selectedRoute 
    ? mockBuses.filter(bus => bus.route === selectedRoute)
    : mockBuses;

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current) return;

    // This is a placeholder - actual Mapbox implementation would go here
    // For now, we'll show a mock interface
  }, [mapboxToken]);

  if (showTokenInput && !mapboxToken) {
    return (
      <Card className="p-6 flex flex-col items-center justify-center min-h-[500px] bg-card">
        <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Map Configuration Required</h3>
        <p className="text-muted-foreground text-center mb-4 max-w-md">
          To display the live bus map, please enter your Mapbox public token. 
          Get one free at{' '}
          <a 
            href="https://mapbox.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
          />
          <Button onClick={() => setShowTokenInput(false)}>
            Continue
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden">
      {/* Mock Map Background */}
      <div 
        ref={mapContainer}
        className="w-full h-full bg-gradient-to-br from-secondary via-muted to-accent/10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      >
        {/* Mock Bus Markers */}
        {filteredBuses.map((bus, idx) => (
          <div
            key={bus.id}
            className="absolute w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse"
            style={{
              left: `${30 + idx * 20}%`,
              top: `${40 + idx * 10}%`,
              transform: `rotate(${bus.heading}deg)`
            }}
          >
            <Navigation className="w-4 h-4 text-white" />
          </div>
        ))}

        {/* Mock Stops */}
        <div className="absolute w-4 h-4 bg-accent rounded-full border-2 border-white shadow-md" 
          style={{ left: '25%', top: '35%' }} 
        />
        <div className="absolute w-4 h-4 bg-accent rounded-full border-2 border-white shadow-md" 
          style={{ left: '55%', top: '55%' }} 
        />
        <div className="absolute w-4 h-4 bg-accent rounded-full border-2 border-white shadow-md" 
          style={{ left: '70%', top: '45%' }} 
        />
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button size="icon" variant="secondary" className="shadow-md">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <Card className="absolute bottom-4 left-4 p-3 shadow-lg">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span>Active Bus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span>Bus Stop</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusMap;
