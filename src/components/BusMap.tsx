import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const busMarkersLayer = useRef<L.LayerGroup | null>(null);
  const stopsMarkersLayer = useRef<L.LayerGroup | null>(null);

  // Mock bus locations - in production, this would come from real-time API
  const mockBuses: BusLocation[] = [
    { id: 'bus-1', route: 'ER', lat: 40.0067, lng: -83.0305, heading: 45 },
    { id: 'bus-2', route: 'CL', lat: 40.0050, lng: -83.0280, heading: 90 },
    { id: 'bus-3', route: 'NS', lat: 40.0080, lng: -83.0320, heading: 180 },
  ];

  // Mock bus stops
  const mockStops = [
    { id: 'stop-1', name: 'Union Station', lat: 40.0060, lng: -83.0300 },
    { id: 'stop-2', name: 'Library Stop', lat: 40.0070, lng: -83.0310 },
    { id: 'stop-3', name: 'Rec Center', lat: 40.0055, lng: -83.0290 },
  ];

  const filteredBuses = selectedRoute 
    ? mockBuses.filter(bus => bus.route === selectedRoute)
    : mockBuses;

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Create map centered on campus (Ohio State University as example)
    const map = L.map(mapContainer.current).setView([40.0067, -83.0305], 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create layer groups for buses and stops
    busMarkersLayer.current = L.layerGroup().addTo(map);
    stopsMarkersLayer.current = L.layerGroup().addTo(map);

    // Add bus stops
    mockStops.forEach(stop => {
      const stopIcon = L.divIcon({
        className: 'custom-stop-marker',
        html: '<div style="width: 16px; height: 16px; background-color: #10b981; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      L.marker([stop.lat, stop.lng], { icon: stopIcon })
        .bindPopup(`<b>${stop.name}</b><br>Bus Stop`)
        .addTo(stopsMarkersLayer.current!);
    });

    mapInstance.current = map;

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update bus markers when selectedRoute changes
  useEffect(() => {
    if (!mapInstance.current || !busMarkersLayer.current) return;

    // Clear existing bus markers
    busMarkersLayer.current.clearLayers();

    // Add bus markers
    filteredBuses.forEach(bus => {
      // Create custom bus icon with rotation
      const busIcon = L.divIcon({
        className: 'custom-bus-marker',
        html: `
          <div style="
            width: 32px; 
            height: 32px; 
            background-color: hsl(var(--primary)); 
            border: 4px solid white; 
            border-radius: 50%; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(${bus.heading}deg);
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      L.marker([bus.lat, bus.lng], { icon: busIcon })
        .bindPopup(`<b>Bus ${bus.id}</b><br>Route: ${bus.route}<br>Heading: ${bus.heading}°`)
        .addTo(busMarkersLayer.current!);
    });

    // Fit map to show all buses if there are any
    if (filteredBuses.length > 0) {
      const bounds = L.latLngBounds(filteredBuses.map(bus => [bus.lat, bus.lng]));
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [selectedRoute, filteredBuses]);

  const handleRecenter = () => {
    if (mapInstance.current) {
      if (filteredBuses.length > 0) {
        const bounds = L.latLngBounds(filteredBuses.map(bus => [bus.lat, bus.lng]));
        mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
      } else {
        mapInstance.current.setView([40.0067, -83.0305], 15);
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden">
      <div 
        ref={mapContainer}
        className="w-full h-full"
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button 
          size="icon" 
          variant="secondary" 
          className="shadow-md"
          onClick={handleRecenter}
          title="Recenter map"
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <Card className="absolute bottom-4 left-4 p-3 shadow-lg z-[1000]">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--primary))' }} />
            <span>Active Bus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span>Bus Stop</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default BusMap;