
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
import { useToast } from '@/hooks/use-toast';
import { createCustomListItemAction } from '@/app/actions/custom-lists';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { CustomList } from '@/lib/types';

const createItemsSchema = z.object({
  listId: z.string(),
  names: z.string().min(1, { message: "Το όνομα είναι υποχρεωτικό." }),
});

type CreateItemsFormValues = z.infer<typeof createItemsSchema>;

interface CreateItemDialogProps {
  list: CustomList;
  children: React.ReactNode;
}

function CreateItemForm({ list, setOpen }: { list: CustomList, setOpen: (open: boolean) => void }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [state, formAction] = useFormState(createCustomListItemAction, { success: false, message: '' });

  const form = useForm<CreateItemsFormValues>({
    resolver: zodResolver(createItemsSchema),
    defaultValues: {
      listId: list.id,
      names: '',
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

  const onSubmit = (values: CreateItemsFormValues) => {
    const formData = new FormData();
    formData.append('listId', values.listId);
    formData.append('names', values.names);
    startTransition(() => formAction(formData));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="names"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ονόματα Αντικειμένων</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="π.χ. Αντικείμενο 1; Αντικείμενο 2"
                  {...field}
                />
              </FormControl>
               <p className="text-xs text-muted-foreground">Χωρίστε πολλαπλά αντικείμενα με ελληνικό ερωτηματικό (;).</p>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Προσθήκη
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function CreateItemDialog({ list, children }: CreateItemDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Προσθήκη Αντικειμένων στη Λίστα "{list.name}"</DialogTitle>
          <DialogDescription>
            Εισάγετε ένα ή περισσότερα ονόματα αντικειμένων.
          </DialogDescription>
        </DialogHeader>
        <CreateItemForm list={list} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
