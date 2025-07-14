
"use client";

import { useState } from 'react';
import type { CustomList, CustomListItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListChecks, Plus, Search } from 'lucide-react';
import { CreateListDialog } from './create-list-dialog';
import { CustomListCard } from './custom-list-card';

interface CustomListsManagerProps {
  lists: CustomList[];
  items: CustomListItem[];
}

export function CustomListsManager({ lists, items }: CustomListsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ListChecks className="h-8 w-8" />
            Προσαρμοσμένες Λίστες
          </h1>
          <p className="text-muted-foreground">Κεντρική διαχείριση επιλογών για όλα τα dropdowns της εφαρμογής.</p>
        </div>
        <CreateListDialog>
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                Νέα Λίστα
            </Button>
        </CreateListDialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Αναζήτηση λίστας..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredLists.map(list => (
          <CustomListCard
            key={list.id}
            list={list}
            items={items.filter(item => item.listId === list.id)}
          />
        ))}
      </div>
    </div>
  );
}
