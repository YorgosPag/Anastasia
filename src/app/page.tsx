"use client";

import * as React from "react";
import { ContactList } from "@/components/contact-list";
import { ContactDetails } from "@/components/contact-details";
import type { Contact } from "@/lib/types";
import { mockContacts } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/components/providers/view-mode-provider";
import { useSidebar } from "@/components/ui/sidebar";

export default function Home() {
  const [contacts, setContacts] = React.useState<Contact[]>(mockContacts);
  const [selectedContactId, setSelectedContactId] = React.useState<string | null>(null);
  const { viewMode } = useViewMode();
  const { isMobile, setOpenMobile } = useSidebar();

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
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  const isMobileView = viewMode === 'mobile';
  const showDetails = selectedContactId && selectedContact;

  if (isMobileView) {
    return (
       <div id="root" className="h-full flex flex-col overflow-hidden relative">
          {!showDetails ? (
              <ContactList
                  contacts={contacts}
                  selectedContactId={selectedContactId}
                  onSelectContact={handleSelectContact}
              />
          ) : (
              <ContactDetails
                contact={selectedContact}
                onBack={() => setSelectedContactId(null)}
              />
          )}
       </div>
    )
  }


  return (
    <div id="root" className="h-full flex gap-x-4 overflow-hidden relative">
      <div className={cn(
        "h-full transition-transform duration-300 ease-in-out",
        "w-full md:w-[320px] lg:w-[380px] flex-shrink-0",
      )}>
         <ContactList
            contacts={contacts}
            selectedContactId={selectedContactId}
            onSelectContact={handleSelectContact}
        />
      </div>
      <div className={cn(
        "flex-grow h-full scroll-container transition-transform duration-300 ease-in-out",
        !showDetails && "hidden md:block"
      )}>
        <ContactDetails
          contact={selectedContact}
          onBack={() => setSelectedContactId(null)}
        />
      </div>
    </div>
  );
}
