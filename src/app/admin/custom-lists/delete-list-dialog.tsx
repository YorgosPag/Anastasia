
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
import { deleteCustomListAction } from '@/app/actions/custom-lists';
import { Loader2 } from 'lucide-react';
import type { CustomList } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface DeleteListDialogProps {
  list: CustomList;
  children: React.ReactNode;
}

export function DeleteListDialog({ list, children }: DeleteListDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [state, formAction] = useFormState(deleteCustomListAction, { success: false, message: '' });

  useEffect(() => {
    if (!open) {
        // Reset state when dialog closes
        formAction(new FormData()); 
    }
    if (state.message && state.success) {
      toast({ title: "Επιτυχία", description: state.message });
      setOpen(false);
    }
  }, [state, toast, setOpen, open]);

  const handleDelete = () => {
    const formData = new FormData();
    formData.append('listId', list.id);
    formData.append('listName', list.name);
    startTransition(() => formAction(formData));
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Είστε απολύτως σίγουροι;</AlertDialogTitle>
          <AlertDialogDescription>
            Αυτή η ενέργεια θα διαγράψει οριστικά τη λίστα "{list.name}" και όλα τα περιεχόμενά της. Δεν μπορεί να αναιρεθεί.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {state.message && !state.success && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Αποτυχία Διαγραφής</AlertTitle>
                <AlertDescription dangerouslySetInnerHTML={{ __html: state.message }} />
            </Alert>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Άκυρο</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending || (state.message && !state.success)} className="bg-destructive hover:bg-destructive/90">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ναι, Διαγραφή
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
