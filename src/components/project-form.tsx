
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Project } from "@/lib/types";

const projectFormSchema = z.object({
  projectName: z.string().min(1, "Ο τίτλος του έργου είναι υποχρεωτικός."),
  applicationId: z.string().optional(),
  clientName: z.string().min(1, "Το όνομα του πελάτη είναι υποχρεωτικός."),
  deadline: z.date({
    required_error: "Η προθεσμία είναι υποχρεωτική.",
  }).transform(date => format(date, 'dd/MM/yyyy')),
  address: z.string().optional(),
  projectCode: z.string().optional(),
});

export type ProjectFormValues = Omit<z.infer<typeof projectFormSchema>, 'deadline'> & { deadline: string };

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: ProjectFormValues) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const parseDate = (dateString: string | undefined): Date | undefined => {
    if (!dateString) return undefined;
    if (dateString instanceof Date) return dateString;
    const [day, month, year] = dateString.split('/');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return isNaN(date.getTime()) ? undefined : date;
  }
  
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: project?.projectName ?? "",
      applicationId: project?.applicationId ?? "",
      clientName: project?.clientName ?? "",
      deadline: parseDate(project?.deadline),
      address: project?.address ?? "",
      projectCode: project?.projectCode ?? "",
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{project ? "Επεξεργασία Έργου" : "Δημιουργία Νέου Έργου"}</DialogTitle>
        <DialogDescription>
          {project ? "Ενημερώστε τα βασικά στοιχεία του έργου." : "Συμπληρώστε τα στοιχεία για να δημιουργήσετε ένα νέο έργο."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Τίτλος Έργου</FormLabel>
                <FormControl>
                  <Input placeholder="π.χ. Αγγέλου Κωνσταντίνος ΕΚΟ23" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Αριθμός Αίτησης (Προαιρετικό)</FormLabel>
                <FormControl>
                  <Input placeholder="π.χ. 61-038111" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ιδιοκτήτης / Ωφελούμενος</FormLabel>
                 <FormControl>
                  <Input placeholder="π.χ. Κωνσταντίνος Αγγέλου" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Προθεσμία Ολοκλήρωσης</FormLabel>
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
                        date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
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
