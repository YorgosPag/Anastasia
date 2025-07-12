"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { suggestContactRoles, SuggestContactRolesInput } from '@/ai/flows/suggest-contact-labels';
import type { Contact } from '@/lib/types';

interface LabelSuggesterProps {
  contact: Contact;
}

export function LabelSuggester({ contact }: LabelSuggesterProps) {
  const [suggestedRoles, setSuggestedRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestLabels = async () => {
    setIsLoading(true);
    setSuggestedRoles([]);
    
    const input: SuggestContactRolesInput = {
      name: `${contact.name || ''} ${contact.surname || ''}`.trim() || contact.companyName || '',
      company: contact.companyName,
      jobTitle: contact.profession,
      address: contact.address ? `${contact.address.street} ${contact.address.number}, ${contact.address.city}` : undefined,
      notes: contact.notes,
    };

    try {
      const result = await suggestContactRoles(input);
      if (result.roles) {
        setSuggestedRoles(result.roles);
      }
    } catch (error) {
      console.error("Error suggesting roles:", error);
      toast({
        variant: "destructive",
        title: "Σφάλμα",
        description: "Δεν ήταν δυνατή η λήψη προτάσεων ρόλων.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Role Suggester</CardTitle>
        <CardDescription>
          Λάβετε προτάσεις ρόλων με βάση τα στοιχεία της επαφής.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button onClick={handleSuggestLabels} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Πρόταση Ρόλων
          </Button>
          <div className="flex flex-wrap gap-2">
            {suggestedRoles.map((role, index) => (
              <Badge key={index} variant="secondary">{role}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
