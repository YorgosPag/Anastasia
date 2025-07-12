import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Contact } from "@/lib/types";

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

export function ContactCard({ contact, isSelected, onClick }: ContactCardProps) {
  const displayName = contact.type === 'company' || contact.type === 'public-service' 
    ? contact.companyName 
    : `${contact.name} ${contact.surname || ''}`;
  
  const subtitle = contact.profession || (contact.type === 'individual' ? 'Ιδιώτης' : 'Οργανισμός');
  const fallback = (contact.name?.[0] || contact.companyName?.[0] || 'C').toUpperCase();

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-2 rounded-lg w-full text-left transition-colors duration-200",
        "hover:bg-muted/80 focus:outline-none",
        isSelected
          ? "bg-primary/10 border-2 border-primary relative z-20"
          : "hover:shadow-md border-2 border-transparent"
      )}
    >
      <Avatar>
        <AvatarImage src={contact.avatarUrl} alt={displayName} data-ai-hint="person portrait" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="flex-1 truncate">
        <div className="font-semibold truncate">{displayName}</div>
        <div className="text-sm text-muted-foreground truncate">{subtitle}</div>
      </div>
    </button>
  );
}
