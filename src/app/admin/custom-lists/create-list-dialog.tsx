
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
import { createCustomListAction } from '@/app/actions/custom-lists';
import { Loader2 } from 'lucide-react';

const createListSchema = z.object({
  name: z.string().min(1, { message: "Το όνομα της λίστας είναι υποχρεωτικό." }),
});

type CreateListFormValues = z.infer<typeof createListSchema>;

function CreateListForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [state, formAction] = useFormState(createCustomListAction, { success: false, message: '' });

  const form = useForm<CreateListFormValues>({
    resolver: zodResolver(createListSchema),
    defaultValues: { name: '' },
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
  
  const onSubmit = (values: CreateListFormValues) => {
    const formData = new FormData();
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
                <Input placeholder="π.χ. Ρόλοι Επαφών" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Δημιουργία
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function CreateListDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Δημιουργία Νέας Λίστας</DialogTitle>
          <DialogDescription>
            Δώστε ένα όνομα για τη νέα λίστα σας. Αυτό θα εμφανίζεται σε όλη την εφαρμογή.
          </DialogDescription>
        </DialogHeader>
        <CreateListForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
