import { Bus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Route {
  id: string;
  name: string;
  color: string;
  status: 'active' | 'delayed' | 'inactive';
}

interface RouteSelectorProps {
  selectedRoute: string | null;
  onSelectRoute: (routeId: string | null) => void;
}

// Real OSU CABS route codes
// These are the actual route IDs used by the OSU bus API
const routes: Route[] = [
  { id: 'CL', name: 'Campus Loop', color: 'bg-blue-500', status: 'active' },
  { id: 'ER', name: 'East Residential', color: 'bg-green-500', status: 'active' },
  { id: 'HS', name: 'Health Sciences', color: 'bg-purple-500', status: 'active' },
  { id: 'NE', name: 'North Express', color: 'bg-red-500', status: 'active' },
  { id: 'SE', name: 'South Express', color: 'bg-yellow-500', status: 'active' },
  { id: 'WE', name: 'West Express', color: 'bg-orange-500', status: 'active' },
];

const RouteSelector = ({ selectedRoute, onSelectRoute }: RouteSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">CABS Routes</h3>
        {selectedRoute && (
          <button
            onClick={() => onSelectRoute(null)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear selection
          </button>
        )}
      </div>
      
      <div className="grid gap-3">
        {routes.map((route) => {
          const isSelected = selectedRoute === route.id;
          return (
            <Card
              key={route.id}
              className={`p-5 cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary shadow-md' : ''
              }`}
              onClick={() => onSelectRoute(isSelected ? null : route.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${route.color} rounded-lg flex items-center justify-center`}>
                  <Bus className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{route.id}</span>
                    <Badge 
                      variant={route.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {route.status === 'active' ? '● Active' : '⚠ Delayed'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{route.name}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RouteSelector;