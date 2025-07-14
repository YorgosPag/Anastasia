"use client";

import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';

export default function SupplierOffersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8" />
            Προσφορές Προμηθευτών
          </h1>
          <p className="text-muted-foreground">Διαχειριστείτε τις προσφορές από τους προμηθευτές σας.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Νέα Προσφορά
        </Button>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-10 text-center text-muted-foreground">
        <p>Δεν υπάρχουν διαθέσιμες προσφορές προμηθευτών.</p>
      </div>
    </div>
  );
}