
"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import type { Project, StageStatus } from '@/lib/types';
import { users } from '@/data/mock-data';
import { 
    getAllProjects as getAllProjectsData,
    getProjectById as getProjectDataById, 
    getProjectsByIds as getProjectsDataByIds,
    updateProject as updateProjectData,
    addProject as addProjectData,
    deleteProject as deleteProjectData,
    findInterventionAndStage as findInterventionAndStageData,
    updateStageStatus as updateStageStatusData
} from '@/data/mock-data'; // Changed to mock data temporarily

export async function getProjectById(id: string) {
    return getProjectDataById(id);
}

export async function getProjectsByIds(ids: string[]) {
    return getProjectsDataByIds(ids);
}

export async function findInterventionAndStage(projectId: string, stageId: string) {
    return findInterventionAndStageData(projectId, stageId);
}

export async function updateStageStatus(projectId: string, stageId: string, status: StageStatus) {
    return updateStageStatusData(projectId, stageId, status);
}

const UpdateStageStatusSchema = z.object({
  projectId: z.string(),
  stageId: z.string(),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
});

export async function updateStageStatusAction(prevState: any, formData: FormData) {
  const validated = UpdateStageStatusSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validated.success) {
    return {
      success: false,
      message: 'Μη έγκυρα δεδομένα για ενημέρωση κατάστασης.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { projectId, stageId, status } = validated.data;

  try {
    await updateStageStatusData(projectId, stageId, status);
    revalidatePath(`/projects/${projectId}`);
    return {
      success: true,
      message: 'Η κατάσταση του σταδίου ενημερώθηκε.',
    };
  } catch (err: any) {
    console.error('🔥 ERROR in updateStageStatusAction:', err);
    return {
      success: false,
      message: `Σφάλμα ενημέρωσης κατάστασης: ${err.message}`,
    };
  }
}

const CreateProjectSchema = z.object({
    projectName: z.string({invalid_type_error: "Παρακαλώ εισάγετε έναν έγκυρο τίτλο."}).min(3, "Ο τίτλος του έργου πρέπει να έχει τουλάχιστον 3 χαρακτήρες."),
    applicationId: z.string().optional(),
    clientName: z.string().min(1, "Παρακαλώ επιλέξτε έναν ιδιοκτήτη."),
    deadline: z.string().optional(),
});

export async function createProjectAction(prevState: any, formData: FormData) {
    const validatedFields = CreateProjectSchema.safeParse({
        projectName: formData.get('projectName'),
        applicationId: formData.get('applicationId'),
        clientName: formData.get('clientName'),
        deadline: formData.get('deadline'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Σφάλμα. Παρακαλώ διορθώστε τα πεδία με σφάλμα και προσπαθήστε ξανά.',
        };
    }

    try {
        await addProjectData(validatedFields.data);
    } catch (error: any) {
        console.error("🔥 ERROR in createProjectAction:", error);
        return { message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath('/dashboard');
    revalidatePath('/projects');
    redirect('/projects');
}

const UpdateProjectSchema = CreateProjectSchema.extend({
    id: z.string().min(1, "Το ID του έργου είναι απαραίτητο."),
});

export async function updateProjectAction(prevState: any, formData: FormData) {
    const validatedFields = UpdateProjectSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Σφάλμα. Παρακαλώ διορθώστε τα πεδία και προσπαθήστε ξανά.',
        };
    }
    const { id, ...projectData } = validatedFields.data;

    try {
        const success = await updateProjectData(id, projectData);
        if (!success) {
            throw new Error("Το έργο δεν βρέθηκε για ενημέρωση.");
        }
    } catch (error: any) {
        console.error("🔥 ERROR in updateProjectAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath('/dashboard');
    revalidatePath(`/projects`);
    revalidatePath(`/projects/${id}`);
    return { success: true, message: 'Το έργο ενημερώθηκε με επιτυχία.' };
}

const DeleteProjectSchema = z.object({
    id: z.string().min(1),
});

export async function deleteProjectAction(prevState: any, formData: FormData) {
    try {
        const validatedFields = DeleteProjectSchema.safeParse(Object.fromEntries(formData));
        if (!validatedFields.success) {
            return { success: false, message: 'Μη έγκυρα δεδομένα.' };
        }
        await deleteProjectData(validatedFields.data.id);
    } catch (error: any) {
        console.error("🔥 ERROR in deleteProjectAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath('/dashboard');
    revalidatePath('/projects');
    redirect('/projects');
}
