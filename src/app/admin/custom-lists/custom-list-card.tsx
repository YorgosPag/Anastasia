
"use client";

import { useState } from 'react';
import type { CustomList, CustomListItem } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateItemDialog } from './create-item-dialog';
import { EditItemDialog } from './edit-item-dialog';
import { DeleteItemDialog } from './delete-item-dialog';
import { EditListDialog } from './edit-list-dialog';
import { DeleteListDialog } from './delete-list-dialog';


interface CustomListCardProps {
  list: CustomList;
  items: CustomListItem[];
}

export function CustomListCard({ list, items }: CustomListCardProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Accordion type="single" collapsible className="w-full border rounded-lg">
      <AccordionItem value={list.id}>
        <div className="flex items-center pr-4">
          <AccordionTrigger className="flex-1 px-6 py-4">
            {list.name} ({items.length})
          </AccordionTrigger>
          <div className="flex items-center gap-1">
             <CreateItemDialog list={list}>
                <Button variant="ghost" size="icon"><Plus className="h-4 w-4" /></Button>
             </CreateItemDialog>
             <EditListDialog list={list}>
                <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
             </EditListDialog>
             <DeleteListDialog list={list}>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
             </DeleteListDialog>
          </div>
        </div>
        <AccordionContent>
          <div className="px-6 pb-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Αναζήτηση αντικειμένου..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="rounded-md border max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Όνομα Αντικειμένου</TableHead>
                    <TableHead className="text-right w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <EditItemDialog item={item}>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Επεξεργασία
                                </DropdownMenuItem>
                            </EditItemDialog>
                             <DeleteItemDialog item={item}>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Διαγραφή
                                </DropdownMenuItem>
                            </DeleteItemDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             {filteredItems.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">Δεν βρέθηκαν αντικείμενα.</p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
