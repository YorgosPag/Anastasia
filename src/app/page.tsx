"use client"

import { useState } from 'react';
import { ContactList } from '@/components/contact-list';
import { ContactDetails } from '@/components/contact-details';
import { mockContacts } from '@/data/mock-data';
import type { Contact } from '@/lib/types';
import { useViewMode } from '@/components/providers/view-mode-provider';
import { cn } from '@/lib/utils';
import { ContactForm, ContactFormValues } from '@/components/contact-form';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(contacts[0]?.id || null);
  const { viewMode } = useViewMode();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const selectedContact = contacts.find(c => c.id === selectedContactId) || null;
  
  const handleSelectContact = (id: string) => {
    setSelectedContactId(id);
  };
  
  const handleBack = () => {
    setSelectedContactId(null);
  }

  const handleOpenNewForm = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  }

  const handleOpenEditForm = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  }

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    if (selectedContactId === id) {
      setSelectedContactId(contacts[0]?.id || null);
    }
  }

  const handleSaveContact = (data: ContactFormValues) => {
    if (editingContact) {
      // Update existing contact
      const updatedContact: Contact = { ...editingContact, ...data };
      setContacts(prev => prev.map(c => c.id === editingContact.id ? updatedContact : c));
    } else {
      // Create new contact
      const newContact: Contact = {
        id: (contacts.length + 1).toString(),
        ...data,
        phones: [],
        emails: [],
        socials: [],
      };
      setContacts(prev => [...prev, newContact]);
    }
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const showDetails = viewMode === 'mobile' ? !!selectedContact : true;
  const showList = viewMode === 'mobile' ? !selectedContact : true;

  return (
    <>
      <div className="flex h-full">
        <div className={cn("h-full transition-all duration-300", 
            showList ? "w-full md:w-1/3 lg:w-1/4" : "w-0 hidden md:block"
        )}>
          {showList && <ContactList 
              contacts={contacts} 
              selectedContactId={selectedContactId} 
              onSelectContact={handleSelectContact}
              onNewContact={handleOpenNewForm}
            />}
        </div>
        
        <div className={cn("h-full flex-grow transition-all duration-300",
            showDetails ? "w-full md:w-2/3 lg:w-3/4" : "w-0 hidden md:block"
        )}>
          {showDetails && <ContactDetails 
              contact={selectedContact} 
              onBack={handleBack}
              onEdit={handleOpenEditForm}
              onDelete={handleDeleteContact}
            />}
        </div>
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <ContactForm
            contact={editingContact}
            onSubmit={handleSaveContact}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
