import { useEffect, useState } from 'react';
import { Clock, MapPin, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const API_BASE = 'https://content.osu.edu/v2/bus/routes';

interface StopArrival {
  stopId: string;
  stopName: string;
  routeName: string;
  arrivals: {
    arrivalTime: string; // ISO timestamp
    estimatedMinutes: number;
  }[];
}

interface StopListProps {
  selectedRoute: string | null;
}

const StopList = ({ selectedRoute }: StopListProps) => {
  const [arrivals, setArrivals] = useState<StopArrival[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedRoute) {
      setArrivals([]);
      return;
    }

    const fetchArrivals = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, get all stops for the route
        const stopsResponse = await fetch(`${API_BASE}/${selectedRoute}`);
        if (!stopsResponse.ok) {
          throw new Error('Failed to fetch stops');
        }
        const stopsData = await stopsResponse.json();
        const stops = stopsData?.data?.stops || [];

        // Then, fetch arrivals for each stop
        const arrivalPromises = stops.slice(0, 5).map(async (stop: any) => {
          try {
            const arrivalResponse = await fetch(
              `${API_BASE}/${selectedRoute}/stops/${stop.stopId}/arrivals`
            );
            if (!arrivalResponse.ok) return null;
            
            const arrivalData = await arrivalResponse.json();
            const arrivalTimes = arrivalData?.data?.arrivals || [];

            if (arrivalTimes.length === 0) return null;

            return {
              stopId: stop.stopId,
              stopName: stop.name,
              routeName: selectedRoute,
              arrivals: arrivalTimes.slice(0, 2).map((arrival: any) => ({
                arrivalTime: arrival.arrivalTime,
                estimatedMinutes: Math.max(0, Math.round(
                  (new Date(arrival.arrivalTime).getTime() - Date.now()) / 60000
                )),
              })),
            };
          } catch {
            return null;
          }
        });

        const results = await Promise.all(arrivalPromises);
        const validArrivals = results.filter(Boolean) as StopArrival[];
        setArrivals(validArrivals);

      } catch (err) {
        console.error('Error fetching arrivals:', err);
        setError('Failed to load arrival times');
      } finally {
        setLoading(false);
      }
    };

    fetchArrivals();

    // Refresh every 30 seconds
    const interval = setInterval(fetchArrivals, 30000);
    return () => clearInterval(interval);
  }, [selectedRoute]);

  if (!selectedRoute) {
    return (
      <Card className="p-8 text-center">
        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Select a Route</h3>
        <p className="text-sm text-muted-foreground">
          Choose a bus route to see live arrival times
        </p>
      </Card>
    );
  }

  if (loading && arrivals.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-sm text-muted-foreground">Loading arrival times...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center border-destructive/50">
        <p className="text-sm text-destructive">{error}</p>
      </Card>
    );
  }

  if (arrivals.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Buses Available</h3>
        <p className="text-sm text-muted-foreground">
          There are currently no buses running on this route.
          <br />
          Check back during operating hours.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {arrivals.map((arrival) => (
        <Card key={arrival.stopId} className="p-6 hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🚌</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Route {arrival.routeName}</h3>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {arrival.stopName}
                </p>
              </div>
            </div>
            <div className="pl-[52px] space-y-2">
              {arrival.arrivals[0] && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Next bus:
                  </span>
                  <Badge variant="default" className="text-base font-bold">
                    {arrival.arrivals[0].estimatedMinutes === 0
                      ? 'Arriving now'
                      : `${arrival.arrivals[0].estimatedMinutes} min`}
                  </Badge>
                </div>
              )}
              {arrival.arrivals[1] && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Following bus:
                  </span>
                  <span className="text-base font-semibold text-foreground">
                    {arrival.arrivals[1].estimatedMinutes} min
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StopList;