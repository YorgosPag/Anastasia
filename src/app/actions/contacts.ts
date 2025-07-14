"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Contact } from '@/lib/types';
// import { getAdminDb } from "@/lib/firebase-admin"; // This should be set up
import { 
    getContacts as getContactsData,
    getContactById as getContactDataById,
    addContact as addContactData,
    updateContact as updateContactData,
    deleteContact as deleteContactData,
} from '@/lib/contacts-data';

// Mock DB until firebase-admin is set up
const getAdminDb = () => ({} as any);

async function contactsToMarkdown(db: any, contacts: Contact[]): Promise<string> {
    let markdown = '# Λίστα Επαφών\n\n';
    markdown += 'Ακολουθούν τα αναλυτικά στοιχεία για όλες τις επαφές που είναι καταχωρημένες στο σύστημα.\n\n---\n\n';

    contacts.forEach((contact, index) => {
        const fullName = `${contact.name || ''} ${contact.surname || ''}`.trim() || contact.companyName || 'Επαφή χωρίς όνομα';
        markdown += `### ${index + 1}. ${fullName}\n`;
        if (contact.companyName && contact.type !== 'company') markdown += `- **Εταιρεία:** ${contact.companyName}\n`;
        if (contact.profession) markdown += `- **Επάγγελμα/Ιδιότητα:** ${contact.profession}\n`;
        
        contact.emails.forEach(e => {
            markdown += `- **Email (${e.label}):** ${e.address}\n`;
        });
        contact.phones.forEach(p => {
            markdown += `- **Τηλέφωνο (${p.label}):** ${p.number}\n`;
        });
        
        const addressParts = [
            contact.address?.street,
            contact.address?.number,
            contact.address?.postalCode,
            contact.address?.city,
        ];
        const fullAddress = addressParts.filter(Boolean).join(' ');
        if (fullAddress) markdown += `- **Διεύθυνση:** ${fullAddress}\n`;

        if (contact.taxId) markdown += `- **ΑΦΜ:** ${contact.taxId}\n`;
        
        if (contact.notes) markdown += `- **Σημειώσεις:** ${contact.notes}\n`;

        markdown += `\n---\n\n`;
    });

    return markdown;
}

export async function exportContactsToMarkdownAction() {
  try {
    const db = getAdminDb();
    const contacts = await getContactsData(db);
    if (contacts.length === 0) {
      return { success: true, data: "Δεν βρέθηκαν επαφές στη βάση δεδομένων." };
    }
    const markdownData = await contactsToMarkdown(db, contacts);
    return { success: true, data: markdownData };
  } catch (error: any) {
    console.error("🔥 ERROR in exportContactsToMarkdownAction:", error);
    return { success: false, error: `Η εξαγωγή απέτυχε: ${error.message}` };
  }
}
