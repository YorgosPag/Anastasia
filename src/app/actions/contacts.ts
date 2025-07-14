
"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Contact } from '@/lib/types';
import { 
    getContacts as getContactsData,
    addContact as addContactData,
    updateContact as updateContactData,
    deleteContact as deleteContactData,
} from '@/data/mock-data'; // Changed to mock data temporarily

// Mock DB functions until full Firebase client setup
// const getAdminDb = () => ({} as any);

async function contactsToMarkdown(contacts: Contact[]): Promise<string> {
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
    const contacts = await getContactsData();
    if (contacts.length === 0) {
      return { success: true, data: "Δεν βρέθηκαν επαφές στη βάση δεδομένων." };
    }
    const markdownData = await contactsToMarkdown(contacts);
    return { success: true, data: markdownData };
  } catch (error: any) {
    console.error("🔥 ERROR in exportContactsToMarkdownAction:", error);
    return { success: false, error: `Η εξαγωγή απέτυχε: ${error.message}` };
  }
}

// CRUD Actions
const ContactFormSchema = z.object({
  type: z.enum(["individual", "company", "public-service"]),
  name: z.string().min(1, "Το όνομα είναι υποχρεωτικό."),
  surname: z.string().optional(),
  companyName: z.string().optional(),
  profession: z.string().optional(),
  taxId: z.string().optional(),
  notes: z.string().optional(),
  roles: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().optional(),
    number: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
  }).optional(),
}).refine(data => {
    if ((data.type === 'company' || data.type === 'public-service') && !data.companyName) {
        return false;
    }
    return true;
}, {
    message: "Η επωνυμία εταιρείας είναι υποχρεωτική.",
    path: ["companyName"],
});

export async function addContactAction(prevState: any, formData: FormData) {
  const validatedFields = ContactFormSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
      return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Σφάλμα. Διορθώστε τα πεδία και προσπαθήστε ξανά.',
      };
  }

  try {
      await addContactData(validatedFields.data);
      revalidatePath('/contacts');
      return { success: true, message: 'Η επαφή δημιουργήθηκε.' };
  } catch (e: any) {
      return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${e.message}` };
  }
}

const UpdateContactSchema = ContactFormSchema.extend({
  id: z.string().min(1),
});
export async function updateContactAction(prevState: any, formData: FormData) {
  const validatedFields = UpdateContactSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
      return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Σφάλμα. Διορθώστε τα πεδία και προσπαθήστε ξανά.',
      };
  }
  const { id, ...contactData } = validatedFields.data;

  try {
      await updateContactData(id, contactData);
      revalidatePath('/contacts');
      return { success: true, message: 'Η επαφή ενημερώθηκε.' };
  } catch (e: any) {
      return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${e.message}` };
  }
}


export async function deleteContactAction(prevState: any, formData: FormData) {
  try {
    const id = formData.get('id') as string;
    await deleteContactData(id);
    revalidatePath('/contacts');
    return { success: true, message: 'Η επαφή διαγράφηκε.' };
  } catch (error: any) {
    return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
  }
}
