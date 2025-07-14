
"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, Filter } from 'lucide-react';
import { StagesByStatusChart } from '@/components/reports/stages-by-status-chart';
import { StagesByContractorChart } from '@/components/reports/stages-by-contractor-chart';
import { mockReportsTableData } from '@/data/reports-data';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Filter className="h-6 w-6" />
            Αναφορές
          </h1>
          <p className="text-muted-foreground">Δυναμικές αναφορές για την επισκόπηση των δεδομένων σας.</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Ευέλικτες Αναφορές
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Αναφορά 1</DropdownMenuItem>
            <DropdownMenuItem>Αναφορά 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
