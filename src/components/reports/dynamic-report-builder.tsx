
"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter } from 'lucide-react';
import { StagesByStatusChart } from '@/components/reports/stages-by-status-chart';
import { StagesByContractorChart } from '@/components/reports/stages-by-contractor-chart';
import { mockContacts } from '@/data/mock-data';
import { mockProjects } from '@/data/dashboard-data';


const mockReportsTableData = [
    {
        project: 'Αγγέλου Κωνσταντίνος ΕΚΟ23',
        stageCount: 2,
        details: [
            { name: 'Αντλίες θερμότητας αέρα – αέρα διαιρούμενου', description: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς' },
            { name: 'Ηλιακός (Συλλέκτης + Ταμιευτήρας)', description: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς' },
        ],
    }
];


export function DynamicReportBuilder() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Φίλτρα & Επιλογές
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ομαδοποίηση ανά:</label>
              <Select defaultValue="project">
                <SelectTrigger>
                  <SelectValue placeholder="Επιλογή" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">Έργο</SelectItem>
                  <SelectItem value="contractor">Ανάδοχος</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Φίλτρο Έργου:</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Επιλογή" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Όλα τα έργα</SelectItem>
                  {mockProjects.map(p => <SelectItem key={p.id} value={p.id}>{p.projectName}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Φίλτρο Κατάστασης:</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Επιλογή" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Όλες οι καταστάσεις</SelectItem>
                  <SelectItem value="on-track">Εντός</SelectItem>
                  <SelectItem value="delayed">Καθυστέρηση</SelectItem>
                  <SelectItem value="completed">Ολοκληρωμένα</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Φίλτρο Αναδόχου:</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Επιλογή" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Όλοι οι ανάδοχοι</SelectItem>
                   {mockContacts.filter(c => c.roles.includes('vendor') || c.roles.includes('freelancer')).map(c => <SelectItem key={c.id} value={c.id}>{`${c.name || ''} ${c.surname || ''}`.trim()}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Φίλτρο Επιβλέποντα:</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Επιλογή" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Όλοι οι επιβλέποντες</SelectItem>
                  {mockContacts.filter(c => c.roles.includes('employee')).map(c => <SelectItem key={c.id} value={c.id}>{`${c.name || ''} ${c.surname || ''}`.trim()}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Οικονομικό Φίλτρο:</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Επιλογή" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Όλα (Κέρδος/Ζημία)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <StagesByStatusChart />
        </div>
        <div className="lg:col-span-3">
          <StagesByContractorChart />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Έργο</TableHead>
                <TableHead className="text-center">Πλήθος Σταδίων</TableHead>
                <TableHead>Λεπτομέρειες (3 πρώτα στάδια)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReportsTableData.map((row) => (
                <TableRow key={row.project}>
                  <TableCell className="font-medium">{row.project}</TableCell>
                  <TableCell className="text-center">{row.stageCount}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {row.details.map((detail, index) => (
                        <li key={index}>
                          <span className="font-semibold text-foreground">{detail.name}:</span> {detail.description}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
