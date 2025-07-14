"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { ContactCard } from "@/components/contact-card";
import type { Contact } from "@/lib/types";
import { Plus, Search } from "lucide-react";
import { Button } from "./ui/button";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
  onNewContact: () => void;
}

export function ContactList({ contacts, selectedContactId, onSelectContact, onNewContact }: ContactListProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredContacts = React.useMemo(() => {
    if (!searchTerm) return contacts;
    return contacts.filter(contact =>
      (contact.name + " " + (contact.surname || "") + " " + (contact.companyName || "")).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  return (
    <div className="flex flex-col h-full bg-card rounded-xl shadow-md border">
       <div className="p-4 pb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Επαφές</h2>
          <Button size="sm" onClick={onNewContact}>
            <Plus className="mr-2 h-4 w-4" />
            Νέα Επαφή
          </Button>
        </div>
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
      <div className="flex-grow scroll-container space-y-3 px-4">
          {filteredContacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={contact.id === selectedContactId}
              onClick={() => onSelectContact(contact.id)}
            />
          ))}
      </div>
      <div className="pt-4 text-sm text-muted-foreground px-4 pb-4">
        {filteredContacts.length} από {contacts.length} επαφές
      </div>
    </div>
  );
}
