"use client";

import * as React from "react";
import { ContactList } from "@/components/contact-list";
import { ContactDetails } from "@/components/contact-details";
import type { Contact } from "@/lib/types";
import { mockContacts } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [contacts, setContacts] = React.useState<Contact[]>(mockContacts);
  const [selectedContactId, setSelectedContactId] = React.useState<string | null>(mockContacts[0]?.id || null);

  const selectedContact = React.useMemo(() => {
    return contacts.find(c => c.id === selectedContactId) ?? null;
  }, [contacts, selectedContactId]);

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className={cn(
        "w-full md:w-[320px] lg:w-[380px] flex-shrink-0 h-full overflow-y-auto transition-transform duration-300 ease-in-out",
        selectedContactId ? "hidden md:flex flex-col" : "flex flex-col"
      )}>
         <div className="dark:bg-[#2A2A2A] rounded-2xl p-5 mx-4 mt-4 shadow-lg overflow-y-auto space-y-3 max-h-[calc(100vh-100px)]">
            <ContactList
                contacts={contacts}
                selectedContactId={selectedContactId}
                onSelectContact={setSelectedContactId}
            />
        </div>
      </div>
      <Separator orientation="vertical" className="h-full hidden md:block" />
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
