import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ChatbotFAB from '@/components/ChatbotFAB';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock } from 'lucide-react';

interface RouteSchedule {
  route: string;
  fullName: string;
  firstBus: string;
  lastBus: string;
  color: string;
}

const weekdaySchedules: RouteSchedule[] = [
  { route: 'ER', fullName: 'East Residential', firstBus: '6:30 AM', lastBus: '12:00 AM', color: 'bg-primary' },
  { route: 'CL', fullName: 'Campus Loop', firstBus: '7:00 AM', lastBus: '11:30 PM', color: 'bg-accent' },
  { route: 'NS', fullName: 'North-South', firstBus: '6:45 AM', lastBus: '11:45 PM', color: 'bg-success' },
  { route: 'WC', fullName: 'West Campus', firstBus: '7:15 AM', lastBus: '11:00 PM', color: 'bg-warning' },
];

const weekendSchedules: RouteSchedule[] = [
  { route: 'ER', fullName: 'East Residential', firstBus: '8:00 AM', lastBus: '10:00 PM', color: 'bg-primary' },
  { route: 'CL', fullName: 'Campus Loop', firstBus: '9:00 AM', lastBus: '9:00 PM', color: 'bg-accent' },
  { route: 'NS', fullName: 'North-South', firstBus: '8:30 AM', lastBus: '9:30 PM', color: 'bg-success' },
  { route: 'WC', fullName: 'West Campus', firstBus: 'Not Operating', lastBus: 'Not Operating', color: 'bg-warning' },
];

const OperatingHours = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto p-6 lg:p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Operating Hours</h1>
          <p className="text-muted-foreground">View bus schedules for all routes</p>
        </div>

        {/* Schedule Tabs */}
        <Tabs defaultValue="weekday" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="weekday">Weekday</TabsTrigger>
            <TabsTrigger value="weekend">Weekend</TabsTrigger>
          </TabsList>

          <TabsContent value="weekday">
            <div className="grid gap-4">
              {weekdaySchedules.map((schedule) => (
                <Card key={schedule.route} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${schedule.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-lg font-bold text-white">{schedule.route}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{schedule.fullName}</h3>
                        <p className="text-sm text-muted-foreground">Route {schedule.route}</p>
                      </div>
                    </div>
                    <div className="text-right flex gap-8">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          First Bus
                        </p>
                        <p className="font-semibold">{schedule.firstBus}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Last Bus
                        </p>
                        <p className="font-semibold">{schedule.lastBus}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekend">
            <div className="grid gap-4">
              {weekendSchedules.map((schedule) => (
                <Card key={schedule.route} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${schedule.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-lg font-bold text-white">{schedule.route}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{schedule.fullName}</h3>
                        <p className="text-sm text-muted-foreground">Route {schedule.route}</p>
                      </div>
                    </div>
                    <div className="text-right flex gap-8">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          First Bus
                        </p>
                        <p className="font-semibold">{schedule.firstBus}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Last Bus
                        </p>
                        <p className="font-semibold">{schedule.lastBus}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="p-6 mt-8 bg-muted/50">
          <h3 className="font-semibold mb-2">Important Notes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Schedules may vary during university breaks and holidays</li>
            <li>• Times shown are approximate and subject to traffic conditions</li>
            <li>• Check the app for real-time updates on bus locations</li>
          </ul>
        </Card>
      </main>

      <ChatbotFAB />
    </div>
  );
};

export default OperatingHours;
