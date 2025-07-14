"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Copy } from "lucide-react";

export default function InstructionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleClose = (open: boolean) => {
        if (!open) {
            setIsModalOpen(false);
            // The router.push was causing an infinite loop or rendering issue.
            // The dialog can be closed without navigating away.
        } else {
            setIsModalOpen(true);
        }
    };
    
    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Οδηγίες Χρήσης & Επεξεργασίας</DialogTitle>
                    <DialogDescription>
                        Σημαντικές πληροφορίες για την ορθή χρήση και τροποποίηση της εφαρμογής.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>ΠΡΟΣΟΧΗ – ΑΥΣΤΗΡΕΣ ΟΔΗΓΙΕΣ ΤΡΟΠΟΠΟΙΗΣΗΣ</AlertTitle>
                        <AlertDescription className="space-y-3">
                            <div className="text-destructive-foreground/90">
                                <p className="font-semibold">Απόλυτη Εγκράτεια Ενεργειών:</p>
                                <p>Σε κάθε περίπτωση, πριν παραχθεί οποιοσδήποτε κώδικας ή πραγματοποιηθεί οποιαδήποτε αλλαγή στην εφαρμογή (εμφάνιση, δομή, κώδικα, αρχιτεκτονική ή δεδομένα), ο agent υποχρεούται να γράφει με σαφήνεια τι κατάλαβε από την οδηγία ή τι προτείνει ως ενέργεια (όσο μικρή ή προφανής κι αν φαίνεται). Θα περιμένει ρητή επιβεβαίωση ή διόρθωση από εμένα πριν προχωρήσει περαιτέρω.</p>
                            </div>
                             <div className="text-destructive-foreground/90">
                                <p>Απαγορεύεται αυστηρά η τροποποίηση οποιουδήποτε στοιχείου της εφαρμογής, εκτός αν έχει δοθεί ρητή εντολή και μόνο στο συγκεκριμένο σημείο που έχει ζητηθεί.</p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li><span className="font-semibold">Αποκλειστικότητα Αλλαγών:</span> Κάθε αλλαγή γίνεται ΜΟΝΟ βάσει εντολής και στο ακριβές scope που έχει δοθεί. Δεν γίνονται παράπλευρες ή πρόσθετες επεμβάσεις χωρίς νέα ρητή εντολή.</li>
                                    <li><span className="font-semibold">Ακεραιότητα Εφαρμογής:</span> Οι οδηγίες αυτές είναι απολύτως δεσμευτικές και κρίσιμες για τη σταθερότητα και ασφάλεια της εφαρμογής.</li>
                                    <li><span className="font-semibold">Μη Παρέμβαση:</span> Δεν γίνονται αλλαγές σε άλλα σημεία του κώδικα, στη δομή, στα δεδομένα, στην εμφάνιση ή στη λειτουργία, εκτός αν ζητηθεί ρητά και συγκεκριμένα.</li>
                                </ul>
                            </div>
                             <div className="text-destructive-foreground/90">
                                <p>Οποιαδήποτε απόκλιση από τις παραπάνω οδηγίες θεωρείται σοβαρό σφάλμα και μπορεί να προκαλέσει ανεπανόρθωτη βλάβη στην εφαρμογή.</p>
                             </div>
                        </AlertDescription>
                    </Alert>
                </div>
                 <div className="flex justify-end">
                    <Button variant="outline">
                        <Copy className="mr-2 h-4 w-4" />
                        Αντιγραφή Οδηγιών
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}