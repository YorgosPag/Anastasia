import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bell } from 'lucide-react';
import { recentOffers } from '@/data/dashboard-data';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

export function RecentOffers() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Ειδοποιήσεις</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 overflow-y-auto">
        {recentOffers.map((offer) => (
          <div key={offer.id} className="flex items-start gap-4">
            <Avatar className="h-9 w-9 mt-1">
                <AvatarFallback className="bg-muted text-muted-foreground">Γ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{offer.title}</p>
              <p className="text-sm text-muted-foreground">{offer.project}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{offer.time}</p>
              <p className="text-xs text-muted-foreground">{offer.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <div className="p-4 mt-auto">
         <Button variant="outline" className="w-full">
            Προβολή Ημερολογίου <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </div>
    </Card>
  );
}
