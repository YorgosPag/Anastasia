
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
import { updateCustomListItemAction } from '@/app/actions/custom-lists';
import { Loader2 } from 'lucide-react';
import type { CustomListItem } from '@/lib/types';

const editItemSchema = z.object({
  id: z.string(),
  listId: z.string(),
  name: z.string().min(1, { message: "Το όνομα είναι υποχρεωτικό." }),
});

type EditItemFormValues = z.infer<typeof editItemSchema>;

interface EditItemDialogProps {
  item: CustomListItem;
  children: React.ReactNode;
}

function EditItemForm({ item, setOpen }: { item: CustomListItem, setOpen: (open: boolean) => void }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateCustomListItemAction, { success: false, message: '' });

  const form = useForm<EditItemFormValues>({
    resolver: zodResolver(editItemSchema),
    defaultValues: {
      id: item.id,
      listId: item.listId,
      name: item.name,
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

  const onSubmit = (values: EditItemFormValues) => {
    const formData = new FormData();
    formData.append('id', values.id);
    formData.append('listId', values.listId);
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
              <FormLabel>Όνομα Αντικειμένου</FormLabel>
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

export function EditItemDialog({ item, children }: EditItemDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Επεξεργασία Αντικειμένου</DialogTitle>
          <DialogDescription>
            Αλλάξτε το όνομα του αντικειμένου.
          </DialogDescription>
        </DialogHeader>
        <EditItemForm item={item} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
