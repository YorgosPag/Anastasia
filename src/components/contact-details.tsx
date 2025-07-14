"use client";

import type { Contact } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrandIcons, MessageIcons, PhoneIcon, MailIcon, MapPinIcon, ArrowLeft, UsersIcon, FileTextIcon, UserIcon, HashIcon, Pencil, Trash2 } from "@/components/icons";
import { LabelSuggester } from "./label-suggester";
import { Button } from "./ui/button";
import { useViewMode } from "@/components/providers/view-mode-provider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";


interface ContactDetailsProps {
  contact: Contact | null;
  onBack?: () => void;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const contactTypeTranslations = {
  individual: "Φυσικό Πρόσωπο",
  company: "Νομικό Πρόσωπο",
  "public-service": "Δημόσια Υπηρεσία",
};

export function ContactDetails({ contact, onBack, onEdit, onDelete }: ContactDetailsProps) {
  const { viewMode } = useViewMode();
  
  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <UsersIcon className="w-16 h-16 mb-4" />
        <p className="text-lg">Επιλέξτε μια επαφή για να δείτε τις λεπτομέρειες</p>
      </div>
    );
  }

  const displayName = contact.type === 'company' || contact.type === 'public-service' 
    ? contact.companyName 
    : `${contact.name} ${contact.surname || ''}`;
    
  const fallback = (contact.name?.[0] || contact.companyName?.[0] || 'C').toUpperCase();

  const getPhoneLabel = (label: string) => {
    const labels: { [key: string]: string } = {
        work: "Εργασία", home: "Σπίτι", mobile: "Κινητό", warehouse: "Αποθήκη", other: "Άλλο"
    };
    return labels[label] || label;
  }

  const getEmailLabel = (label: string) => {
    const labels: { [key: string]: string } = {
        work: "Εργασία", personal: "Προσωπικό", other: "Άλλο"
    };
    return labels[label] || label;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-start gap-6">
        <div className="flex-1 flex justify-between items-start">
            <div className="flex items-start gap-4">
              {viewMode === 'mobile' && onBack && <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}><ArrowLeft/></Button>}
              <Avatar className="w-20 h-20 text-3xl">
                <AvatarImage src={contact.avatarUrl} alt={displayName} data-ai-hint="person portrait"/>
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
              <div className="flex-1 pt-2">
                <h1 className="text-2xl lg:text-3xl font-bold">{displayName}</h1>
                <p className="text-muted-foreground">{contact.profession}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">{contactTypeTranslations[contact.type]}</Badge>
                  {contact.roles.map(role => <Badge key={role} variant="outline">{role}</Badge>)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
                 <Button variant="outline" size="icon" onClick={() => onEdit(contact)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Επεξεργασία</span>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Διαγραφή</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Είστε σίγουροι;</AlertDialogTitle>
                        <AlertDialogDescription>
                            Αυτή η ενέργεια δεν μπορεί να αναιρεθεί. Αυτό θα διαγράψει οριστικά την επαφή από τους διακομιστές μας.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Άκυρο</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(contact.id)}>Διαγραφή</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
            <Card>
            <CardHeader>
                <CardTitle>Στοιχεία Επικοινωνίας</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {contact.phones.map(phone => (
                <div key={phone.id} className="flex items-start gap-4">
                    <PhoneIcon className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div className="flex-1">
                    <p>{phone.number} <span className="text-sm text-muted-foreground">({getPhoneLabel(phone.label)})</span></p>
                    <div className="flex items-center gap-2 mt-1">
                        {phone.hasWhatsapp && <MessageIcons.whatsapp className="w-4 h-4 text-muted-foreground" />}
                        {phone.hasViber && <MessageIcons.viber className="w-4 h-4 text-muted-foreground" />}
                        {phone.hasTelegram && <MessageIcons.telegram className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    </div>
                </div>
                ))}
                {contact.emails.map(email => (
                <div key={email.id} className="flex items-start gap-4">
                    <MailIcon className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                        <p>{email.address} <span className="text-sm text-muted-foreground">({getEmailLabel(email.label)})</span></p>
                    </div>
                </div>
                ))}
                {contact.address && (
                    <div className="flex items-start gap-4">
                        <MapPinIcon className="w-5 h-5 mt-1 text-muted-foreground" />
                        <div>
                            <p>{contact.address.street} {contact.address.number}</p>
                            <p className="text-sm text-muted-foreground">{contact.address.postalCode} {contact.address.city}</p>
                        </div>
                    </div>
                )}
            </CardContent>
            </Card>

            {contact.socials.length > 0 &&
                <Card>
                    <CardHeader><CardTitle>Social Media & Ιστοσελίδες</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {contact.socials.map(social => (
                            <div key={social.id} className="flex items-center gap-4">
                                <span className="w-5 h-5 text-muted-foreground flex items-center justify-center">
                                    <BrandIcons platform={social.platform} />
                                </span>
                                <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{social.url}</a>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            }
        </div>
        
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Πρόσθετες Πληροφορίες</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                {contact.nickname && <InfoItem icon={<UserIcon />} label="Nickname" value={contact.nickname} />}
                {contact.taxId && <InfoItem icon={<HashIcon />} label="ΑΦΜ" value={contact.taxId} />}
                {contact.notes && <InfoItem icon={<FileTextIcon />} label="Σημειώσεις" value={contact.notes} />}
                </CardContent>
            </Card>

            <div>
                <LabelSuggester contact={contact} />
            </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4">
            <span className="w-5 h-5 mt-1 text-muted-foreground flex items-center justify-center">{icon}</span>
            <div>
                <p className="font-semibold">{label}</p>
                <p className="text-muted-foreground">{value}</p>
            </div>
        </div>
    );
}
