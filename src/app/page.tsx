"use client";

import * as React from "react";
import { ContactList } from "@/components/contact-list";
import { ContactDetails } from "@/components/contact-details";
import type { Contact } from "@/lib/types";
import { mockContacts } from "@/data/mock-data";
import { cn } from "@/lib/utils";

export default function Home() {
  const [contacts, setContacts] = React.useState<Contact[]>(mockContacts);
  const [selectedContactId, setSelectedContactId] = React.useState<string | null>(mockContacts[0]?.id || null);

  const selectedContact = React.useMemo(() => {
    return contacts.find(c => c.id === selectedContactId) ?? null;
  }, [contacts, selectedContactId]);

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-x-4 p-4">
      <div className={cn(
        "w-full md:w-[320px] lg:w-[380px] flex-shrink-0 h-full overflow-y-auto transition-transform duration-300 ease-in-out",
        "bg-card rounded-xl shadow-md border",
        selectedContactId ? "hidden md:flex flex-col" : "flex flex-col"
      )}>
         <div className="overflow-y-auto space-y-3 max-h-full p-4">
            <ContactList
                contacts={contacts}
                selectedContactId={selectedContactId}
                onSelectContact={setSelectedContactId}
            />
        </div>
      </div>
      <div className={cn(
        "flex-grow h-full overflow-y-auto",
        "transition-opacity duration-300 ease-in-out",
        selectedContactId ? "block" : "hidden md:block"
      )}>
        <ContactDetails
          contact={selectedContact}
          onBack={() => setSelectedContactId(null)}
        />
      </div>
    </div>
  );
}
