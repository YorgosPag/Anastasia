"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { ContactCard } from "@/components/contact-card";
import type { Contact } from "@/lib/types";
import { Search } from "lucide-react";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
}

export function ContactList({ contacts, selectedContactId, onSelectContact }: ContactListProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredContacts = React.useMemo(() => {
    if (!searchTerm) return contacts;
    return contacts.filter(contact =>
      (contact.name + " " + (contact.surname || "") + " " + (contact.companyName || "")).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  return (
    <>
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-4">Επαφές</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Αναζήτηση επαφών..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {filteredContacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={contact.id === selectedContactId}
              onClick={() => onSelectContact(contact.id)}
            />
          ))}
      </div>
      <div className="p-4 border-t text-sm text-muted-foreground">
        {filteredContacts.length} από {contacts.length} επαφές
      </div>
    </>
  );
}
