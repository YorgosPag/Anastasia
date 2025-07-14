
"use client";

import { useState, useEffect, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { updateCustomListAction } from '@/app/actions/custom-lists';
import { Loader2 } from 'lucide-react';
import type { CustomList } from '@/lib/types';

const updateListSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Το όνομα της λίστας είναι υποχρεωτικό." }),
});

type UpdateListFormValues = z.infer<typeof updateListSchema>;

interface EditListDialogProps {
  list: CustomList;
  children: React.ReactNode;
}

function EditListForm({ list, setOpen }: { list: CustomList, setOpen: (open: boolean) => void }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateCustomListAction, { success: false, message: '' });

  const form = useForm<UpdateListFormValues>({
    resolver: zodResolver(updateListSchema),
    defaultValues: {
      id: list.id,
      name: list.name,
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: "Επιτυχία", description: state.message });
        setOpen(false);
      } else {
        toast({ variant: 'destructive', title: "Σφάλμα", description: state.message });
      }
    }
  }, [state, toast, setOpen]);

  const onSubmit = (values: UpdateListFormValues) => {
    const formData = new FormData();
    formData.append('id', values.id);
    formData.append('name', values.name);
    startTransition(() => formAction(formData));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Όνομα Λίστας</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Αποθήκευση
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function EditListDialog({ list, children }: EditListDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Επεξεργασία Λίστας</DialogTitle>
          <DialogDescription>
            Αλλάξτε το όνομα της λίστας. Αυτό θα ενημερωθεί σε όλη την εφαρμογή.
          </DialogDescription>
        </DialogHeader>
        <EditListForm list={list} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
