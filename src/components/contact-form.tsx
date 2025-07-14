
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Contact } from "@/lib/types";

const contactFormSchema = z.object({
  type: z.enum(["individual", "company", "public-service"], {
    required_error: "Απαιτείται τύπος επαφής.",
  }),
  name: z.string().min(1, "Το όνομα είναι υποχρεωτικό."),
  surname: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  birthDate: z.date().optional(),
  birthPlace: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  nationality: z.string().optional(),
  companyName: z.string().optional(),
  profession: z.string().optional(),
  taxId: z.string().optional(),
  notes: z.string().optional(),
  roles: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().optional(),
    number: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    municipality: z.string().optional(),
    prefecture: z.string().optional(),
  }).optional(),
}).refine(data => {
    if ((data.type === 'company' || data.type === 'public-service') && !data.companyName) {
        return false;
    }
    return true;
}, {
    message: "Η επωνυμία εταιρείας είναι υποχρεωτική για εταιρείες και δημόσιες υπηρεσίες.",
    path: ["companyName"],
});

export type ContactFormValues = Omit<z.infer<typeof contactFormSchema>, 'birthDate'> & {
  birthDate?: string;
};


interface ContactFormProps {
  contact?: Contact | null;
  onSubmit: (data: ContactFormValues) => void;
  onCancel: () => void;
}

export function ContactForm({ contact, onSubmit, onCancel }: ContactFormProps) {
  
  const parseDate = (dateString: string | undefined): Date | undefined => {
    if (!dateString) return undefined;
    const [day, month, year] = dateString.split('/');
    if (day && month && year) {
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        return isNaN(date.getTime()) ? undefined : date;
    }
    return undefined;
  }
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
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
      fatherName: contact?.fatherName ?? "",
      motherName: contact?.motherName ?? "",
      birthDate: parseDate(contact?.birthDate),
      birthPlace: contact?.birthPlace ?? "",
      gender: contact?.gender,
      nationality: contact?.nationality ?? "",
      address: {
        street: contact?.address?.street ?? "",
        number: contact?.address?.number ?? "",
        postalCode: contact?.address?.postalCode ?? "",
        city: contact?.address?.city ?? "",
        municipality: contact?.address?.municipality ?? "",
        prefecture: contact?.address?.prefecture ?? "",
      },
    },
  });

  const watchType = form.watch("type");

  const handleFormSubmit = (values: z.infer<typeof contactFormSchema>) => {
    const dataWithFormattedDate: ContactFormValues = {
        ...values,
        birthDate: values.birthDate instanceof Date ? format(values.birthDate, 'dd/MM/yyyy') : undefined,
    };
    onSubmit(dataWithFormattedDate);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{contact ? "Επεξεργασία Επαφής" : "Δημιουργία Νέας Επαφής"}</DialogTitle>
        <DialogDescription>
          {contact ? "Ενημερώστε τα στοιχεία της επαφής." : "Συμπληρώστε τα στοιχεία για να δημιουργήσετε μια νέα επαφή."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
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

          <Accordion type="multiple" defaultValue={['personal']} className="w-full">
            <AccordionItem value="personal">
              <AccordionTrigger>Προσωπικά Στοιχεία</AccordionTrigger>
              <AccordionContent className="space-y-4">
                 {watchType === "individual" ? (
                    <>
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
                     <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="fatherName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Όνομα Πατέρα</FormLabel>
                            <FormControl>
                              <Input placeholder="Όνομα Πατέρα" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="motherName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Όνομα Μητέρας</FormLabel>
                            <FormControl>
                              <Input placeholder="Όνομα Μητέρας" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className="flex-1 flex flex-col">
                                <FormLabel>Ημ/νία Γέννησης</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "dd/MM/yyyy")
                                        ) : (
                                            <span>Επιλέξτε ημερομηνία</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="birthPlace"
                            render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Τόπος Γέννησης</FormLabel>
                                <FormControl>
                                <Input placeholder="Τόπος Γέννησης" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Φύλο</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger><SelectValue placeholder="Επιλογή φύλου" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">Άνδρας</SelectItem>
                                        <SelectItem value="female">Γυναίκα</SelectItem>
                                        <SelectItem value="other">Άλλο</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nationality"
                            render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Υπηκοότητα</FormLabel>
                                <FormControl>
                                <Input placeholder="Υπηκοότητα" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    </>
                  ) : (
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ονομασία</FormLabel>
                            <FormControl>
                              <Input placeholder="Ονομασία" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  )}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 aspect-square max-w-24 border-2 border-dashed rounded-lg flex items-center justify-center text-center p-2 text-muted-foreground text-sm cursor-pointer hover:bg-accent">
                        Μεταφέρετε ή πατήστε για ανέβασμα
                    </div>
                 </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="identity">
              <AccordionTrigger>Στοιχεία Ταυτότητας & ΑΦΜ</AccordionTrigger>
              <AccordionContent className="space-y-4">
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="taxis">
              <AccordionTrigger>Στοιχεία Σύνδεσης Taxis</AccordionTrigger>
               <AccordionContent>
                  Coming soon...
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="communication">
              <AccordionTrigger>Στοιχεία Επικοινωνίας</AccordionTrigger>
              <AccordionContent>
                  Coming soon...
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="social">
              <AccordionTrigger>Κοινωνικά Δίκτυα</AccordionTrigger>
              <AccordionContent>
                  Coming soon...
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="address">
              <AccordionTrigger>Στοιχεία Διεύθυνσης</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Οδός</FormLabel>
                        <FormControl><Input placeholder="Οδός" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem className="w-1/4">
                        <FormLabel>Αριθμός</FormLabel>
                        <FormControl><Input placeholder="Αρ." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="address.postalCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Τ.Κ.</FormLabel>
                        <FormControl><Input placeholder="Τ.Κ." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Πόλη</FormLabel>
                        <FormControl><Input placeholder="Πόλη" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="address.municipality"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Δήμος</FormLabel>
                        <FormControl><Input placeholder="Δήμος" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.prefecture"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Νομός</FormLabel>
                        <FormControl><Input placeholder="Νομός" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="professional">
              <AccordionTrigger>Επαγγελματικά Στοιχεία</AccordionTrigger>
              <AccordionContent className="space-y-4">
                {(watchType === "company" || watchType === "public-service") && (
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Επωνυμία</FormLabel>
                        <FormControl>
                          <Input placeholder="Επωνυμία Εταιρείας / Υπηρεσίας" {...field} />
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="other">
              <AccordionTrigger>Λοιπά</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Σημειώσεις</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Πρόσθετες σημειώσεις" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
