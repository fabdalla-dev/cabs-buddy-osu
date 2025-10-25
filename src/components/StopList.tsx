import { Clock, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Stop {
  id: string;
  name: string;
  address: string;
  nextBus: number; // minutes
  following: number[]; // minutes for following buses
}

interface StopListProps {
  selectedRoute: string | null;
}

const mockArrivals = [
  { 
    id: 1, 
    route: 'CABS East', 
    stop: 'Ohio Union', 
    nextBus: '10:30 AM',
    followingBus: '10:45 AM',
  },
  { 
    id: 2, 
    route: 'CABS West', 
    stop: 'Ohio Union', 
    nextBus: '10:35 AM',
    followingBus: '10:50 AM',
  },
  { 
    id: 3, 
    route: 'CABS North', 
    stop: 'Thompson Library', 
    nextBus: '10:32 AM',
    followingBus: '10:47 AM',
  },
  { 
    id: 4, 
    route: 'CABS East', 
    stop: 'RPAC', 
    nextBus: '10:40 AM',
    followingBus: '10:55 AM',
  },
  { 
    id: 5, 
    route: 'CABS South', 
    stop: 'Morrill Tower', 
    nextBus: '10:37 AM',
    followingBus: '10:52 AM',
  },
];

const StopList = ({ selectedRoute }: StopListProps) => {
  const filteredArrivals = selectedRoute
    ? mockArrivals.filter((arrival) => arrival.route === selectedRoute)
    : mockArrivals;

  return (
    <div className="space-y-4">
      {filteredArrivals.map((arrival) => (
        <Card key={arrival.id} className="p-6 hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">🚌</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{arrival.route}</h3>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <span>📍</span>
                  {arrival.stop}
                </p>
              </div>
            </div>
            <div className="pl-[52px] space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">⏰ Next bus:</span>
                <span className="text-lg font-bold text-primary">{arrival.nextBus}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">🕐 Following bus:</span>
                <span className="text-base font-semibold text-foreground">{arrival.followingBus}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StopList;
