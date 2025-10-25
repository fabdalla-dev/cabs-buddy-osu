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

const mockStops: Stop[] = [
  {
    id: 'stop-1',
    name: 'Ohio Union',
    address: '1739 N High St',
    nextBus: 2,
    following: [12, 25]
  },
  {
    id: 'stop-2',
    name: 'Towers',
    address: '2100 Neil Ave',
    nextBus: 5,
    following: [18, 31]
  },
  {
    id: 'stop-3',
    name: 'RPAC',
    address: '337 Annie & John Glenn Ave',
    nextBus: 8,
    following: [21, 34]
  },
  {
    id: 'stop-4',
    name: 'Gateway',
    address: '1125 Kinnear Rd',
    nextBus: 15,
    following: [28, 41]
  },
];

const StopList = ({ selectedRoute }: StopListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Nearby Stops</h3>
      
      <div className="space-y-3">
        {mockStops.map((stop) => (
          <Card key={stop.id} className="p-5 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">{stop.name}</h4>
                <p className="text-sm text-muted-foreground truncate">{stop.address}</p>
                
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <Badge 
                    variant={stop.nextBus <= 3 ? 'default' : 'secondary'}
                    className="flex items-center gap-1"
                  >
                    <Clock className="w-3 h-3" />
                    {stop.nextBus} min
                  </Badge>
                  
                  {stop.following.map((time, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {time} min
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StopList;
