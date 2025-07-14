
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { Intervention } from "@/lib/types";

const interventionFormSchema = z.object({
  info: z.string().optional(),
  energyChar: z.string().optional(),
  expenseCategory: z.string().optional(),
  category: z.string().min(1, "Η κατηγορία είναι υποχρεωτική."),
  code: z.string().min(1, "Ο κωδικός είναι υποχρεωτικός."),
  unit: z.string().min(1, "Η μονάδα μέτρησης είναι υποχρεωτική."),
  maxCostPerUnit: z.coerce.number().min(0, "Το κόστος πρέπει να είναι θετικός αριθμός."),
  maxAmount: z.coerce.number().min(0, "Το ποσό πρέπει να είναι θετικός αριθμός."),
  subCategory: z.string().min(1, "Η υπο-κατηγορία είναι υποχρεωτική."),
});

export type InterventionFormValues = z.infer<typeof interventionFormSchema>;

interface InterventionFormProps {
  intervention?: Intervention | null;
  onSubmit: (data: InterventionFormValues) => void;
  onCancel: () => void;
}

export function InterventionForm({ intervention, onSubmit, onCancel }: InterventionFormProps) {
  const form = useForm<InterventionFormValues>({
    resolver: zodResolver(interventionFormSchema),
    defaultValues: {
      info: intervention?.info ?? "",
      energyChar: intervention?.energyChar ?? "",
      expenseCategory: intervention?.expenseCategory ?? "",
      category: intervention?.category ?? "",
      code: intervention?.code ?? "",
      unit: intervention?.unit ?? "",
      maxCostPerUnit: intervention?.maxCostPerUnit ?? 0,
      maxAmount: intervention?.maxAmount ?? 0,
      subCategory: intervention?.subCategory ?? "",
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Επεξεργασία Master Παρέμβασης</DialogTitle>
        <DialogDescription>
          Ενημερώστε τα στοιχεία της παρέμβασης. Αυτές οι αλλαγές θα εφαρμοστούν σε όλες τις μελλοντικές χρήσεις.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4 mt-4">
          <FormField
            control={form.control}
            name="info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Info</FormLabel>
                <FormControl>
                  <Textarea placeholder="Πληροφορίες παρέμβασης" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="energyChar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ενεργειακά Χαρακτηριστικά</FormLabel>
                  <FormControl>
                    <Input placeholder="π.χ. 100 < P <= 200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="expenseCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Κατηγορία Δαπάνης</FormLabel>
                  <FormControl>
                    <Input placeholder="π.χ. I Μη κεντρικά" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Κατηγορία Παρέμβασης</FormLabel>
                  <FormControl>
                    <Input placeholder="π.χ. Εξοικονόμηση Ενέργειας" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Κωδικός</FormLabel>
                  <FormControl>
                    <Input placeholder="π.χ. 1.B2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Μονάδα Μέτρησης</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Επιλέξτε μονάδα..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m²">m² (Τετραγωνικά μέτρα)</SelectItem>
                    <SelectItem value="kW">kW (Κιλοβάτ)</SelectItem>
                    <SelectItem value="item">Τεμάχιο</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="maxCostPerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Μέγιστο Κόστος/Μονάδα</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="π.χ. 454" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Μέγιστο Ποσό Παρέμβασης</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="π.χ. 22700" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Υπο-Κατηγορία Παρέμβασης</FormLabel>
                <FormControl>
                  <Input placeholder="Αναλυτική περιγραφή υπο-κατηγορίας" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Άκυρο
            </Button>
            <Button type="submit">Αποθήκευση Αλλαγών</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
