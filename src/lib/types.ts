export type ContactType = "individual" | "company" | "public-service";
export type ContactRole = "client" | "vendor" | "employee" | "prospect" | "lead" | "partner" | "competitor" | "personal" | "family" | "friend" | "freelancer";
export type Gender = "male" | "female" | "other";

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
  street?: string;
  number?: string;
  postalCode?: string;
  city?: string;
  municipality?: string;
  prefecture?: string;
}

export interface Contact {
  id: string;
  type: ContactType;
  avatarUrl?: string;
  name: string;
  surname?: string;
  fatherName?: string;
  motherName?: string;
  birthDate?: string;
  birthPlace?: string;
  gender?: Gender;
  nationality?: string;
  nickname?: string;
  profession?: string;
  companyName?: string;
  taxId?: string;
  taxOffice?: string;
  idNumber?: string;
  idIssueDate?: string;
  idAuthority?: string;
  taxisUsername?: string;
  taxisPassword?: string;
  address?: Address;
  phones: Phone[];
  emails: Email[];
  socials: SocialMedia[];
  notes?: string;
  roles: ContactRole[];
}


export type ProjectStatus = 'on-track' | 'delayed' | 'completed' | 'quotation'; // Added 'quotation'
export type StageStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface User {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface AuditLogEntry {
    id: string;
    user: User;
    action: string;
    timestamp: string;
    details: string;
}

export interface Attachment {
    id: string;
    name: string;
    url: string;
    uploadedAt: string;
}

export interface Stage {
    id: string;
    title: string;
    status: StageStatus;
    deadline: string;
    lastUpdated: string;
    files: Attachment[];
    notes?: string;
    assigneeContactId?: string;
    supervisorContactId?: string;
}

export interface Intervention {
  id: string;
  info: string;
  energyChar: string;
  expenseCategory: string;
  category: string;
  code: string;
  unit: string;
  maxCostPerUnit: number;
  maxAmount: number;
  subCategory: string;
  interventionCategory: string;
  interventionSubcategory: string;
  stages: Stage[];
}

export interface Project {
    id: string;
    clientName: string;
    applicationId: string;
    address: string;
    projectCode: string;
    projectName: string;
    status: ProjectStatus;
    progress: number;
    deadline: string;
    budget: number;
    notifications: number;
    interventions: Intervention[];
    auditLog: AuditLogEntry[];
}
