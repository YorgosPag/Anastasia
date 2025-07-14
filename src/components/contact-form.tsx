
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
import type { Contact, ContactType } from "@/lib/types";

const contactFormSchema = z.object({
  type: z.enum(["individual", "company", "public-service"], {
    required_error: "Απαιτείται τύπος επαφής.",
  }),
  name: z.string().min(1, "Το όνομα είναι υποχρεωτικό."),
  surname: z.string().optional(),
  companyName: z.string().optional(),
  profession: z.string().optional(),
  taxId: z.string().optional(),
  notes: z.string().optional(),
  roles: z.array(z.string()).optional(),
}).refine(data => {
    if ((data.type === 'company' || data.type === 'public-service') && !data.companyName) {
        return false;
    }
    return true;
}, {
    message: "Η επωνυμία εταιρείας είναι υποχρεωτική για εταιρείες και δημόσιες υπηρεσίες.",
    path: ["companyName"],
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (data: ContactFormValues) => void;
  onCancel: () => void;
}

export function ContactForm({ contact, onSubmit, onCancel }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      type: contact?.type ?? "individual",
      name: contact?.name ?? "",
      surname: contact?.surname ?? "",
      companyName: contact?.companyName ?? "",
      profession: contact?.profession ?? "",
      taxId: contact?.taxId ?? "",
      notes: contact?.notes ?? "",
      roles: contact?.roles ?? [],
    },
  });

  const watchType = form.watch("type");

  return (
    <>
      <DialogHeader>
        <DialogTitle>{contact ? "Επεξεργασία Επαφής" : "Δημιουργία Νέας Επαφής"}</DialogTitle>
        <DialogDescription>
          {contact ? "Επεξεργαστείτε τα παρακάτω πεδία για να ενημερώσετε την επαφή." : "Συμπληρώστε τα παρακάτω πεδία για να δημιουργήσετε μια νέα επαφή."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Τύπος Επαφής</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Επιλέξτε τύπο επαφής" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="individual">Φυσικό Πρόσωπο</SelectItem>
                    <SelectItem value="company">Νομικό Πρόσωπο</SelectItem>
                    <SelectItem value="public-service">Δημόσια Υπηρεσία</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchType === "individual" && (
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Όνομα</FormLabel>
                    <FormControl>
                      <Input placeholder="Όνομα" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Επώνυμο</FormLabel>
                    <FormControl>
                      <Input placeholder="Επώνυμο" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {(watchType === "company" || watchType === "public-service") && (
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Επωνυμία Εταιρείας</FormLabel>
                  <FormControl>
                    <Input placeholder="Επωνυμία Εταιρείας" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Επάγγελμα / Ιδιότητα</FormLabel>
                <FormControl>
                  <Input placeholder="π.χ. Υδραυλικός, Δικηγόρος" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ΑΦΜ</FormLabel>
                <FormControl>
                  <Input placeholder="ΑΦΜ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Σημειώσεις</FormLabel>
                <FormControl>
                  <Input placeholder="Πρόσθετες σημειώσεις" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Άκυρο
            </Button>
            <Button type="submit">Αποθήκευση</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
