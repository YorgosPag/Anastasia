
"use client";

import * as React from 'react';
import type { Contact } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ContactForm } from '@/components/contact-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getContacts as getContactsData } from '@/data/mock-data'; // Using mock data for now
import { deleteContactAction } from '../actions/contacts';
import { useToast } from '@/hooks/use-toast';
import { useFormState } from 'react-dom';

export default function ContactsPage() {
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = React.useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);
  const [contactToDelete, setContactToDelete] = React.useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const { toast } = useToast();

  const [deleteState, deleteFormAction] = useFormState(deleteContactAction, { success: false, message: '' });

  React.useEffect(() => {
    async function loadContacts() {
      const data = await getContactsData();
      setContacts(data);
      setFilteredContacts(data);
    }
    loadContacts();
  }, []);

  React.useEffect(() => {
    const results = contacts.filter(contact => {
      const name = getContactDisplayName(contact).toLowerCase();
      const profession = contact.profession?.toLowerCase() || '';
      const email = contact.emails.find(e => e.address.toLowerCase().includes(searchTerm.toLowerCase()));
      return name.includes(searchTerm.toLowerCase()) || profession.includes(searchTerm.toLowerCase()) || !!email;
    });
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  const handleNewContact = () => {
    setSelectedContact(null);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };

  const openDeleteAlert = (contact: Contact) => {
    setContactToDelete(contact);
    setIsDeleteAlertOpen(true);
  }

  const handleDeleteContact = () => {
    if (contactToDelete) {
      const formData = new FormData();
      formData.append('id', contactToDelete.id);
      deleteFormAction(formData);
      setContactToDelete(null); // Optimistic UI update
    }
    setIsDeleteAlertOpen(false);
  };

  React.useEffect(() => {
    if (deleteState.success) {
      toast({ title: "Επιτυχία", description: deleteState.message });
      // Optimistic update handled by revalidatePath, but we can force a client refresh
      getContactsData().then(data => {
        setContacts(data);
        setFilteredContacts(data);
      });
    } else if (deleteState.message) {
      toast({ variant: 'destructive', title: "Σφάλμα", description: deleteState.message });
    }
  }, [deleteState, toast]);

  const handleFormSubmitted = () => {
    setIsFormOpen(false);
    // Re-fetch data
    getContactsData().then(data => {
      setContacts(data);
      setFilteredContacts(data);
    });
  }

  const getContactDisplayName = (contact: Contact) => {
    if (contact.type === 'company' || contact.type === 'public-service') {
        return contact.companyName || 'Άγνωστη Εταιρεία';
    }
    return `${contact.name || ''} ${contact.surname || ''}`.trim();
  }
    
  const getContactFallback = (contact: Contact) => {
    const name = getContactDisplayName(contact);
    return (name?.[0] || 'C').toUpperCase();
  }

  return (
    <div className="space-y-6">
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <div className="flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Λίστα Επαφών</h1>
              <p className="text-muted-foreground">Διαχειριστείτε όλες τις επαφές σας από ένα κεντρικό σημείο.</p>
          </div>
          <Button onClick={handleNewContact}>
            <Plus className="mr-2 h-4 w-4" />
            Νέα Επαφή
          </Button>
        </div>

        <DialogContent className="sm:max-w-2xl">
           <ContactForm 
              onFormSubmitted={handleFormSubmitted}
              onCancel={() => setIsFormOpen(false)}
              contact={selectedContact}
            />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Είστε σίγουροι;</AlertDialogTitle>
            <AlertDialogDescription>
              Αυτή η ενέργεια δεν μπορεί να αναιρεθεί. Αυτό θα διαγράψει οριστικά την επαφή.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setContactToDelete(null)}>Άκυρο</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteContact}>Διαγραφή</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Αναζήτηση επαφής..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Όνομα/Εταιρεία</TableHead>
              <TableHead>Ρόλος/Ειδικότητα</TableHead>
              <TableHead>Επικοινωνία</TableHead>
              <TableHead>Σημειώσεις</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatarUrl} alt={getContactDisplayName(contact)} data-ai-hint="person portrait" />
                      <AvatarFallback>{getContactFallback(contact)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{getContactDisplayName(contact)}</div>
                      { (contact.type === 'individual' && contact.profession) && <div className="text-sm text-muted-foreground">{contact.profession}</div>}
                      { (contact.type !== 'individual' && contact.profession) && <div className="text-sm text-muted-foreground">{contact.profession}</div>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {contact.roles.map(role => <Badge key={role} variant="outline">{role}</Badge>)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {contact.emails.map(e => <div key={e.id}>{e.address}</div>)}
                    {contact.phones.map(p => <div key={p.id}>{p.label}: {p.number}</div>)}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{contact.notes}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditContact(contact)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Επεξεργασία
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => openDeleteAlert(contact)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Διαγραφή
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
