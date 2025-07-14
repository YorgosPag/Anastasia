"use client"

import { useState } from 'react';
import { ContactList } from '@/components/contact-list';
import { ContactDetails } from '@/components/contact-details';
import { mockContacts } from '@/data/mock-data';
import type { Contact } from '@/lib/types';
import { useViewMode } from '@/components/providers/view-mode-provider';
import { cn } from '@/lib/utils';

export default function ContactsPage() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(mockContacts[0]?.id || null);
  const { viewMode } = useViewMode();
  
  const selectedContact = mockContacts.find(c => c.id === selectedContactId) || null;
  
  const handleSelectContact = (id: string) => {
    setSelectedContactId(id);
  };
  
  const handleBack = () => {
    setSelectedContactId(null);
  }

  const showDetails = viewMode === 'mobile' ? !!selectedContact : true;
  const showList = viewMode === 'mobile' ? !selectedContact : true;

  return (
    <div className="flex h-full">
      <div className={cn("h-full transition-all duration-300", 
          showList ? "w-full md:w-1/3 lg:w-1/4" : "w-0"
      )}>
        {showList && <ContactList contacts={mockContacts} selectedContactId={selectedContactId} onSelectContact={handleSelectContact} />}
      </div>
      
      <div className={cn("h-full flex-grow transition-all duration-300",
          showDetails ? "w-full md:w-2/3 lg:w-3/4" : "w-0"
      )}>
        {showDetails && <ContactDetails contact={selectedContact} onBack={handleBack} />}
      </div>
    </div>
  );
}
