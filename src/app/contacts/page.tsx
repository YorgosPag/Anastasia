
"use client";

import * as React from 'react';
import { mockContacts } from '@/data/mock-data';
import type { Contact } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ContactForm, type ContactFormValues } from '@/components/contact-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trash2, Pencil } from 'lucide-react';

export default function ContactsPage() {
  const [contacts, setContacts] = React.useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false);
  const [contactToDelete, setContactToDelete] = React.useState<Contact | null>(null);

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
      setContacts(contacts.filter(p => p.id !== contactToDelete.id));
      setContactToDelete(null);
    }
    setIsDeleteAlertOpen(false);
  };
  
  const handleFormSubmit = (data: ContactFormValues) => {
    if (selectedContact) {
      setContacts(contacts.map(c => c.id === selectedContact.id ? { ...c, ...data, id: c.id, phones: c.phones, emails: c.emails, socials: c.socials } : c));
    } else {
      const newContact: Contact = {
        ...data,
        id: (contacts.length + 1).toString(),
        phones: [],
        emails: [],
        socials: [],
        roles: data.roles || [],
      };
      setContacts([newContact, ...contacts]);
    }
    setIsFormOpen(false);
    setSelectedContact(null);
  };

  const getContactDisplayName = (contact: Contact) => {
    if (contact.type === 'company' || contact.type === 'public-service') {
        return contact.companyName || contact.name || 'Άγνωστη Εταιρεία';
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

        <DialogContent className="sm:max-w-md">
           <ContactForm 
              onSubmit={handleFormSubmit}
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
            {contacts.map((contact) => (
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
