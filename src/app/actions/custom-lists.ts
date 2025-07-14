
"use server";

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
    createCustomList as createCustomListDb,
    getCustomListItems,
    createCustomListItems as createCustomListItemsDb,
    updateCustomList as updateCustomListDb,
    findListItemUsage,
    deleteCustomList as deleteCustomListDb,
    updateCustomListItem as updateCustomListItemDb,
    deleteCustomListItem as deleteCustomListItemDb,
} from '@/lib/custom-lists-data';
import { getAdminDb } from '@/lib/firebase-admin';

// Map user-friendly names to immutable system keys.
const SYSTEM_LIST_KEYS: { [key: string]: string } = {
    'Κωδικός': 'CODE',
    'Κατηγορία Παρέμβασης': 'INTERVENTION_CATEGORY',
    'Κατηγορία Δαπάνης': 'EXPENSE_CATEGORY',
    'Υπο-Κατηγορία Παρέμβασης': 'INTERVENTION_SUBCATEGORY',
    'info': 'INFO',
    'Ενεργειακά Χαρακτηριστικά': 'ENERGY_SPECS',
    'τίτλοι παρεμβάσεων': 'INTERVENTION_TITLES',
    'Ρόλοι Επαφών': 'CONTACT_ROLES',
    'Μονάδες Μέτρησης': 'UNITS_OF_MEASUREMENT',
};

// =================================================================
// List Actions
// =================================================================

const CreateListSchema = z.object({
  name: z.string().min(1, { message: "Το όνομα της λίστας είναι υποχρεωτικό." }),
});

export async function createCustomListAction(prevState: any, formData: FormData) {
  const validatedFields = CreateListSchema.safeParse({ name: formData.get('name') });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Διορθώστε τα σφάλματα και προσπαθήστε ξανά.",
    };
  }

  try {
    const db = getAdminDb();
    const { name } = validatedFields.data;
    const key = SYSTEM_LIST_KEYS[name] || null;

    await createCustomListDb(db, name, key);
    revalidatePath('/admin/custom-lists');
    return { success: true, message: `Η λίστα "${name}" δημιουργήθηκε.` };
  } catch (error: any) {
    return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
  }
}

const UpdateListSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Το όνομα της λίστας είναι υποχρεωτικό." }),
});

export async function updateCustomListAction(prevState: any, formData: FormData) {
    const validatedFields = UpdateListSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors, message: 'Σφάλματα στη φόρμα.' };
    }

    try {
        const db = getAdminDb();
        const { id, name } = validatedFields.data;
        await updateCustomListDb(db, id, name);
        revalidatePath('/admin/custom-lists');
        return { success: true, message: 'Η λίστα ενημερώθηκε.' };
    } catch (error: any) {
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }
}


const DeleteListSchema = z.object({
  listId: z.string(),
  listName: z.string(),
});

export async function deleteCustomListAction(prevState: any, formData: FormData) {
  const validatedFields = DeleteListSchema.safeParse(Object.fromEntries(formData.entries()));
   if (!validatedFields.success) {
    return { success: false, message: "Μη έγκυρα δεδομένα." };
  }

  const { listId, listName } = validatedFields.data;
  const db = getAdminDb();
  
  try {
    const usage = await findListItemUsage(db, listId);
    if (usage.length > 0) {
      const usageDetails = usage.map(u => `<li>Έργο: ${u.projectName} (ID: ${u.projectId})</li>`).join('');
      return {
        success: false,
        message: `Η λίστα "${listName}" δεν μπορεί να διαγραφεί επειδή χρησιμοποιείται στα παρακάτω έργα:<ul>${usageDetails}</ul>`
      };
    }

    await deleteCustomListDb(db, listId);
    revalidatePath('/admin/custom-lists');
    return { success: true, message: `Η λίστα "${listName}" διαγράφηκε.` };
  } catch (error: any) {
    return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
  }
}

// =================================================================
// List Item Actions
// =================================================================

const CreateItemsSchema = z.object({
  listId: z.string(),
  names: z.string().min(1, { message: "Το όνομα είναι υποχρεωτικό." }),
});

export async function createCustomListItemAction(prevState: any, formData: FormData) {
  const validatedFields = CreateItemsSchema.safeParse(Object.fromEntries(formData.entries()));
   if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors, message: 'Σφάλματα στη φόρμα.' };
  }

  try {
    const db = getAdminDb();
    const { listId, names } = validatedFields.data;
    const itemNames = [...new Set(names.split(';').map(n => n.trim()).filter(Boolean))];

    if (itemNames.length === 0) {
        return { success: false, message: "Δεν δόθηκαν έγκυρα ονόματα." };
    }
    
    // Check for duplicates
    const existingItems = await getCustomListItems(db, listId);
    const existingNames = new Set(existingItems.map(item => item.name));
    const newNames = itemNames.filter(name => !existingNames.has(name));
    const ignoredCount = itemNames.length - newNames.length;

    if (newNames.length > 0) {
        await createCustomListItemsDb(db, listId, newNames);
    }
    
    revalidatePath('/admin/custom-lists');
    let message = `Προστέθηκαν ${newNames.length} νέα αντικείμενα.`;
    if (ignoredCount > 0) {
        message += ` ${ignoredCount} παραβλέφθηκαν επειδή υπήρχαν ήδη.`;
    }

    return { success: true, message };
  } catch (error: any) {
    return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
  }
}

const UpdateItemSchema = z.object({
  id: z.string(),
  listId: z.string(),
  name: z.string().min(1, { message: "Το όνομα είναι υποχρεωτικό." }),
});

export async function updateCustomListItemAction(prevState: any, formData: FormData) {
    const validatedFields = UpdateItemSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten().fieldErrors, message: 'Σφάλματα στη φόρμα.' };
    }

    try {
        const db = getAdminDb();
        const { id, listId, name } = validatedFields.data;

        const existingItems = await getCustomListItems(db, listId);
        if (existingItems.some(item => item.name === name && item.id !== id)) {
            return { success: false, message: "Αυτό το όνομα υπάρχει ήδη σε αυτή τη λίστα." };
        }

        await updateCustomListItemDb(db, id, name);
        revalidatePath('/admin/custom-lists');
        return { success: true, message: 'Το αντικείμενο ενημερώθηκε.' };
    } catch (error: any) {
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }
}

const DeleteItemSchema = z.object({
  itemId: z.string(),
  itemName: z.string(),
});

export async function deleteCustomListItemAction(prevState: any, formData: FormData) {
  const validatedFields = DeleteItemSchema.safeParse(Object.fromEntries(formData.entries()));
   if (!validatedFields.success) {
    return { success: false, message: "Μη έγκυρα δεδομένα." };
  }
  const { itemId, itemName } = validatedFields.data;

  try {
    const db = getAdminDb();
    await deleteCustomListItemDb(db, itemId);
    revalidatePath('/admin/custom-lists');
    return { success: true, message: `Το αντικείμενο "${itemName}" διαγράφηκε.` };
  } catch (error: any) {
    return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
  }
}
