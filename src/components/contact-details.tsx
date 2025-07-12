"use client";

import type { Contact } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrandIcons, MessageIcons, PhoneIcon, MailIcon, GlobeIcon, BuildingIcon, UserIcon, HashIcon, MapPinIcon, ArrowLeft } from "@/components/icons";
import { LabelSuggester } from "./label-suggester";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ContactDetailsProps {
  contact: Contact | null;
  onBack?: () => void;
}

const contactTypeTranslations = {
  individual: "Φυσικό Πρόσωπο",
  company: "Νομικό Πρόσωπο",
  "public-service": "Δημόσια Υπηρεσία",
};

export function ContactDetails({ contact, onBack }: ContactDetailsProps) {
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
        {onBack && <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}><ArrowLeft/></Button>}
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

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        
        <Card>
            <CardHeader><CardTitle>Πρόσθετες Πληροφορίες</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {contact.nickname && <InfoItem icon={<UserIcon />} label="Nickname" value={contact.nickname} />}
              {contact.taxId && <InfoItem icon={<HashIcon />} label="ΑΦΜ" value={contact.taxId} />}
              {contact.notes && <InfoItem icon={<FileTextIcon />} label="Σημειώσεις" value={contact.notes} />}
            </CardContent>
        </Card>

        {contact.socials.length > 0 &&
            <Card className="lg:col-span-2">
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
        
        <div className="lg:col-span-2">
            <LabelSuggester contact={contact} />
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

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}


function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
