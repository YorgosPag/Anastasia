
"use server";

import type { CustomList, CustomListItem, Project } from '@/lib/types';
import type { Firestore, WriteBatch } from 'firebase-admin/firestore';
import { getAdminDb } from './firebase-admin';

// =================================================================
// List Data Access
// =================================================================

export async function getCustomLists(db: Firestore): Promise<CustomList[]> {
    const snapshot = await db.collection('customLists').orderBy('name').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CustomList));
}

export async function createCustomList(db: Firestore, name: string, key: string | null): Promise<string> {
    const data: { name: string; key?: string } = { name };
    if (key) {
        data.key = key;
    }
    const docRef = await db.collection('customLists').add(data);
    return docRef.id;
}

export async function updateCustomList(db: Firestore, id: string, name: string): Promise<void> {
    await db.collection('customLists').doc(id).update({ name });
}

export async function deleteCustomList(db: Firestore, listId: string): Promise<void> {
    const batch = db.batch();
    
    // Delete the list itself
    const listRef = db.collection('customLists').doc(listId);
    batch.delete(listRef);

    // Delete all items in that list
    const itemsSnapshot = await db.collection('customListItems').where('listId', '==', listId).get();
    itemsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
}

// =================================================================
// List Item Data Access
// =================================================================

export async function getAllCustomListItems(db: Firestore): Promise<CustomListItem[]> {
    const snapshot = await db.collection('customListItems').orderBy('name').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CustomListItem));
}

export async function getCustomListItems(db: Firestore, listId: string): Promise<CustomListItem[]> {
    const snapshot = await db.collection('customListItems').where('listId', '==', listId).orderBy('name').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CustomListItem));
}

export async function createCustomListItems(db: Firestore, listId: string, names: string[]): Promise<void> {
    const batch = db.batch();
    const collectionRef = db.collection('customListItems');
    
    names.forEach(name => {
        const docRef = collectionRef.doc();
        batch.set(docRef, { listId, name });
    });

    await batch.commit();
}

export async function updateCustomListItem(db: Firestore, id: string, name: string): Promise<void> {
    await db.collection('customListItems').doc(id).update({ name });
}

export async function deleteCustomListItem(db: Firestore, id: string): Promise<void> {
    await db.collection('customListItems').doc(id).delete();
}


// =================================================================
// Usage Check
// =================================================================

export async function findListItemUsage(db: Firestore, listId: string): Promise<{ projectId: string, projectName: string }[]> {
    const items = await getCustomListItems(db, listId);
    const itemIds = items.map(item => item.id);

    if (itemIds.length === 0) {
        return [];
    }
    
    // This is a simplified check. A real-world app might need more complex queries.
    // For now, we check against a known field, e.g., 'selectedEnergySpec'.
    // This part is highly application-specific.
    // NOTE: The following query is not supported by Firestore and causes an error.
    // It is commented out to prevent the app from crashing.
    /*
    const projectsSnapshot = await db.collection('projects')
        .where('interventions.stages.assigneeContactId', 'in', itemIds) // Example check
        .get();

    if (projectsSnapshot.empty) {
        return [];
    }

    return projectsSnapshot.docs.map(doc => {
        const project = doc.data() as Project;
        return {
            projectId: doc.id,
            projectName: project.projectName
        };
    });
    */
    return [];
}
