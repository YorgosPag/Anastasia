
"use client";

import { useState, useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteCustomListItemAction } from '@/app/actions/custom-lists';
import { Loader2 } from 'lucide-react';
import type { CustomListItem } from '@/lib/types';

interface DeleteItemDialogProps {
  item: CustomListItem;
  children: React.ReactNode;
}

export function DeleteItemDialog({ item, children }: DeleteItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [state, formAction] = useFormState(deleteCustomListItemAction, { success: false, message: '' });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: "Επιτυχία", description: state.message });
        setOpen(false);
      } else {
        toast({ variant: 'destructive', title: "Σφάλμα", description: state.message });
      }
    }
  }, [state, toast]);

  const handleDelete = () => {
    const formData = new FormData();
    formData.append('itemId', item.id);
    formData.append('itemName', item.name);
    startTransition(() => formAction(formData));
  };
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Είστε σίγουροι;</AlertDialogTitle>
          <AlertDialogDescription>
            Αυτή η ενέργεια θα διαγράψει οριστικά το αντικείμενο "{item.name}". Δεν μπορεί να αναιρεθεί.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Άκυρο</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
             {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Διαγραφή
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
