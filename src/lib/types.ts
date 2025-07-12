export type ContactType = "individual" | "company" | "public-service";
export type ContactRole = "client" | "vendor" | "employee" | "prospect" | "lead" | "partner" | "competitor" | "personal" | "family" | "friend" | "freelancer";

export interface Phone {
  id: string;
  number: string;
  label: "home" | "work" | "mobile" | "warehouse" | "other";
  hasWhatsapp?: boolean;
  hasViber?: boolean;
  hasTelegram?: boolean;
}

export interface Email {
  id: string;
  address: string;
  label: "personal" | "work" | "other";
}

export interface SocialMedia {
  id: string;
  platform: "facebook" | "instagram" | "tiktok" | "linkedin" | "youtube" | "x" | "website" | "other";
  url: string;
}

export interface Address {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  municipality?: string;
  prefecture?: string;
}

export interface Contact {
  id: string;
  type: ContactType;
  avatarUrl?: string;
  name: string;
  surname?: string;
  nickname?: string;
  profession?: string;
  companyName?: string;
  taxId?: string;
  address?: Address;
  phones: Phone[];
  emails: Email[];
  socials: SocialMedia[];
  notes?: string;
  labels: ContactRole[];
}
