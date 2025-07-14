"use client";

import * as React from 'react';
import { mockInterventions } from '@/data/interventions-data';
import type { Intervention } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Pencil } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InterventionForm, type InterventionFormValues } from '@/components/intervention-form';

export default function InterventionsPage() {
  const [interventions, setInterventions] = React.useState<Intervention[]>(mockInterventions);
  const [selectedIntervention, setSelectedIntervention] = React.useState<Intervention | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const handleEditIntervention = (intervention: Intervention) => {
    setSelectedIntervention(intervention);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: InterventionFormValues) => {
    if (selectedIntervention) {
      setInterventions(interventions.map(i => i.id === selectedIntervention.id ? { ...selectedIntervention, ...data } : i));
    }
    setIsFormOpen(false);
    setSelectedIntervention(null);
  };

  return (
    <div className="space-y-6">
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <div className="flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Κατάλογος Παρεμβάσεων</h1>
              <p className="text-muted-foreground">Διαχειριστείτε τις κεντρικές παρεμβάσεις του συστήματος.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Νέα Παρέμβαση
          </Button>
        </div>

        <DialogContent className="sm:max-w-3xl">
           <InterventionForm
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
              intervention={selectedIntervention}
            />
        </DialogContent>
      </Dialog>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Αναζήτηση παρέμβασης..."
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Κωδικός</TableHead>
              <TableHead>Κατηγορία</TableHead>
              <TableHead>Υπο-Κατηγορία</TableHead>
              <TableHead>Κόστος/Μονάδα</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interventions.map((intervention) => (
              <TableRow key={intervention.id}>
                <TableCell className="font-medium">{intervention.code}</TableCell>
                <TableCell>{intervention.category}</TableCell>
                <TableCell>{intervention.subCategory}</TableCell>
                <TableCell>€{intervention.maxCostPerUnit.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEditIntervention(intervention)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}