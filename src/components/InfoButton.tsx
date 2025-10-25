import { Info, MapPin, Clock, Smartphone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const InfoButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            About OSU CABS Tracker
          </SheetTitle>
          <SheetDescription>
            A modern solution for campus transportation
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Problem */}
          <div className="space-y-2">
            <h3 className="font-semibold text-destructive flex items-center gap-2">
              <span className="text-xl">❌</span> The Problem
            </h3>
            <p className="text-sm text-muted-foreground">
              The official OSU app requires users to be near bus stops to see arrival times, making trip planning difficult.
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-2">
            <h3 className="font-semibold text-success flex items-center gap-2">
              <span className="text-xl">✅</span> Our Solution
            </h3>
            <p className="text-sm text-muted-foreground">
              Our PWA allows students to view all routes, buses, and arrival times from anywhere on campus.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Key Features
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Real-time bus locations</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    See exactly where buses are on campus
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Click any stop to see arrivals</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get accurate ETAs for upcoming buses
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Mobile-responsive design</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Works perfectly on all devices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Clean, intuitive interface</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Easy to use, no learning curve
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use */}
          <div className="space-y-2">
            <h3 className="font-semibold">How to Use</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Select a route to filter buses and stops</li>
              <li>View real-time bus locations on the map</li>
              <li>Click on stops to see arrival times</li>
              <li>Plan your trip with confidence!</li>
            </ol>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InfoButton;
