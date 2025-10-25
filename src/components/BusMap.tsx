import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navigation, Loader2 } from 'lucide-react';

// OSU CABS API base URL
const API_BASE = 'https://content.osu.edu/v2/bus/routes';

// Interface for bus vehicle data from API
interface BusVehicle {
  vehicleId: string;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
}

// Interface for bus stop data from API
interface BusStop {
  stopId: string;
  name: string;
  latitude: number;
  longitude: number;
}

// Interface for route data from API
interface RouteData {
  data: {
    stops: BusStop[];
  };
}

// Interface for vehicles data from API
interface VehiclesData {
  data: {
    vehicles: BusVehicle[];
  };
}

interface BusMapProps {
  selectedRoute: string | null;
}

const BusMap = ({ selectedRoute }: BusMapProps) => {
  // Refs for map and layers (these persist across re-renders)
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const busMarkersLayer = useRef<L.LayerGroup | null>(null);
  const stopMarkersLayer = useRef<L.LayerGroup | null>(null);

  // State for storing fetched data
  const [buses, setBuses] = useState<BusVehicle[]>([]);
  const [stops, setStops] = useState<BusStop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ======================================
  // STEP 1: Initialize the map (runs once)
  // ======================================
  useEffect(() => {
    // Don't initialize if container doesn't exist or map already exists
    if (!mapContainer.current || mapInstance.current) return;

    // Create map centered on OSU campus
    const map = L.map(mapContainer.current).setView([40.0067, -83.0305], 15);

    // Add tile layer (the actual map images from OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Create separate layer groups for buses and stops
    // This makes it easy to clear and redraw markers
    busMarkersLayer.current = L.layerGroup().addTo(map);
    stopMarkersLayer.current = L.layerGroup().addTo(map);

    // Save map instance to ref
    mapInstance.current = map;

    // Cleanup function: remove map when component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // Empty dependency array = runs only once

  // ======================================
  // STEP 2: Fetch data when route changes
  // ======================================
  useEffect(() => {
    // Don't fetch if no route is selected
    if (!selectedRoute) {
      setBuses([]);
      setStops([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // FETCH STOPS
        // API endpoint: https://content.osu.edu/v2/bus/routes/{ROUTE_CODE}
        const stopsResponse = await fetch(`${API_BASE}/${selectedRoute}`);
        
        if (!stopsResponse.ok) {
          throw new Error(`Failed to fetch stops: ${stopsResponse.status}`);
        }
        
        const stopsData: RouteData = await stopsResponse.json();
        console.log('Stops data:', stopsData); // Debug log
        
        // Extract stops array from the nested data structure
        const fetchedStops = stopsData?.data?.stops || [];
        setStops(fetchedStops);

        // FETCH BUSES
        // API endpoint: https://content.osu.edu/v2/bus/routes/{ROUTE_CODE}/vehicles
        const busesResponse = await fetch(`${API_BASE}/${selectedRoute}/vehicles`);
        
        if (!busesResponse.ok) {
          throw new Error(`Failed to fetch buses: ${busesResponse.status}`);
        }
        
        const busesData: VehiclesData = await busesResponse.json();
        console.log('Buses data:', busesData); // Debug log
        
        // Extract vehicles array from the nested data structure
        const fetchedBuses = busesData?.data?.vehicles || [];
        setBuses(fetchedBuses);

      } catch (err) {
        console.error('Error fetching bus data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchData();

    // Set up auto-refresh every 15 seconds
    const interval = setInterval(fetchData, 15000);

    // Cleanup: clear interval when component unmounts or route changes
    return () => clearInterval(interval);
  }, [selectedRoute]); // Re-run when selectedRoute changes

  // ======================================
  // STEP 3: Update bus markers when buses change
  // ======================================
  useEffect(() => {
    if (!mapInstance.current || !busMarkersLayer.current) return;

    // Clear all existing bus markers
    busMarkersLayer.current.clearLayers();

    // Add a marker for each bus
    buses.forEach(bus => {
      // Create custom HTML icon for the bus
      const busIcon = L.divIcon({
        className: 'custom-bus-icon',
        html: `
          <div style="
            width: 32px; 
            height: 32px; 
            background-color: hsl(203 100% 40%); 
            border: 3px solid white; 
            border-radius: 50%; 
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
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
        iconAnchor: [16, 16],
      });

      // Add marker to the map
      L.marker([bus.latitude, bus.longitude], { icon: busIcon })
        .bindPopup(`
          <div style="font-family: system-ui; padding: 4px;">
            <b>Bus ${bus.vehicleId}</b><br>
            Speed: ${Math.round(bus.speed)} mph<br>
            Heading: ${Math.round(bus.heading)}°
          </div>
        `)
        .addTo(busMarkersLayer.current!);
    });

    // Auto-center map to show all buses if any exist
    if (buses.length > 0 && mapInstance.current) {
      const bounds = L.latLngBounds(buses.map(b => [b.latitude, b.longitude]));
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [buses]); // Re-run when buses array changes

  // ======================================
  // STEP 4: Update stop markers when stops change
  // ======================================
  useEffect(() => {
    if (!mapInstance.current || !stopMarkersLayer.current) return;

    // Clear all existing stop markers
    stopMarkersLayer.current.clearLayers();

    // Add a marker for each stop
    stops.forEach(stop => {
      // Create custom HTML icon for the stop
      const stopIcon = L.divIcon({
        className: 'custom-stop-icon',
        html: `
          <div style="
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: #10b981;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      // Add marker to the map
      L.marker([stop.latitude, stop.longitude], { icon: stopIcon })
        .bindPopup(`
          <div style="font-family: system-ui; padding: 4px;">
            <b>${stop.name}</b><br>
            Stop ID: ${stop.stopId}
          </div>
        `)
        .addTo(stopMarkersLayer.current!);
    });
  }, [stops]); // Re-run when stops array changes

  // ======================================
  // HELPER FUNCTION: Recenter map
  // ======================================
  const handleRecenter = () => {
    if (!mapInstance.current) return;

    if (buses.length > 0) {
      // Center on all buses
      const bounds = L.latLngBounds(buses.map(b => [b.latitude, b.longitude]));
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    } else if (stops.length > 0) {
      // If no buses, center on stops
      const bounds = L.latLngBounds(stops.map(s => [s.latitude, s.longitude]));
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    } else {
      // Default to OSU campus center
      mapInstance.current.setView([40.0067, -83.0305], 15);
    }
  };

  // ======================================
  // RENDER
  // ======================================
  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
          <Card className="px-4 py-2 shadow-lg flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </Card>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] max-w-md">
          <Card className="px-4 py-2 shadow-lg bg-destructive/10 border-destructive">
            <p className="text-sm text-destructive">{error}</p>
          </Card>
        </div>
      )}

      {/* Recenter Button */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button 
          onClick={handleRecenter} 
          size="icon" 
          variant="secondary"
          title="Recenter map on buses"
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <Card className="absolute bottom-4 left-4 p-3 shadow-lg z-[1000]">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(203 100% 40%)' }} />
            <span>Active Bus ({buses.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span>Bus Stop ({stops.length})</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusMap;