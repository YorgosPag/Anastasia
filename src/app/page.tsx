"use client";

import * as React from "react";
import { ContactList } from "@/components/contact-list";
import { ContactDetails } from "@/components/contact-details";
import type { Contact } from "@/lib/types";
import { mockContacts } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/components/providers/view-mode-provider";

export default function Home() {
  const [contacts, setContacts] = React.useState<Contact[]>(mockContacts);
  const [selectedContactId, setSelectedContactId] = React.useState<string | null>(null);
  const { viewMode } = useViewMode();

  React.useEffect(() => {
    // When switching to mobile view, always show the list first
    if (viewMode === 'mobile') {
      setSelectedContactId(null);
    } else {
      // In desktop view, select the first contact if none is selected
      if (!selectedContactId && contacts.length > 0) {
        setSelectedContactId(contacts[0].id);
      }
    }
  }, [viewMode, contacts, selectedContactId]);


  const selectedContact = React.useMemo(() => {
    return contacts.find(c => c.id === selectedContactId) ?? null;
  }, [contacts, selectedContactId]);
  
  const handleSelectContact = (id: string) => {
    setSelectedContactId(id);
  }

  const isMobileView = viewMode === 'mobile';
  const showDetails = selectedContactId && selectedContact;

  return (
    <div id="root" className="h-[calc(100vh-4rem)] flex gap-x-4">
      <div className={cn(
        "w-full md:w-[320px] lg:w-[380px] flex-shrink-0 h-full transition-transform duration-300 ease-in-out",
        "bg-card rounded-xl shadow-md border",
        isMobileView && showDetails ? "hidden" : "flex flex-col"
      )}>
         <ContactList
            contacts={contacts}
            selectedContactId={selectedContactId}
            onSelectContact={handleSelectContact}
        />
      </div>
      <div className={cn(
        "flex-grow h-full scroll-container",
        "transition-opacity duration-300 ease-in-out",
        (isMobileView && !showDetails) ? "hidden" : "block",
        (!isMobileView && !showDetails) ? "hidden md:block" : "block"
      )}>
        <ContactDetails
          contact={selectedContact}
          onBack={() => setSelectedContactId(null)}
        />
      </div>
    </div>
  );
}
