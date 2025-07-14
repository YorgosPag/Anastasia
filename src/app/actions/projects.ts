"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import type { Project, Contact, Stage, Attachment, User, StageStatus, Intervention } from '@/lib/types';
// import { getAdminDb } from "@/lib/firebase-admin"; // This should be set up
import { getContacts as getContactsData, getContactById as getContactDataById } from '@/lib/contacts-data';
import { users } from '@/data/mock-data';
// import { calculateClientProjectMetrics } from '@/lib/client-utils';
import { 
    getAllProjects as getAllProjectsData,
    getProjectById as getProjectDataById, 
    getProjectsByIds as getProjectsDataByIds,
    updateProjectData,
    addProjectData,
    deleteProjectData,
    findInterventionAndStage as findInterventionAndStageData,
    updateStageStatus as updateStageStatusData
} from '@/lib/projects-data';

// Mock DB until firebase-admin is set up
const getAdminDb = () => ({} as any);

export async function getProjectById(id: string) {
    const db = getAdminDb();
    return getProjectDataById(db, id);
}

export async function getProjectsByIds(ids: string[]) {
    const db = getAdminDb();
    return getProjectsDataByIds(db, ids);
}

export async function findInterventionAndStage(projectId: string, stageId: string) {
    const db = getAdminDb();
    return findInterventionAndStageData(db, projectId, stageId);
}

export async function updateStageStatus(projectId: string, stageId: string, status: StageStatus) {
    const db = getAdminDb();
    return updateStageStatusData(db, projectId, stageId, status);
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
    const db = getAdminDb();
    await updateStageStatusData(db, projectId, stageId, status);
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

// =================================================================
// Server Actions
// =================================================================

export async function getBatchWorkOrderData(projectIds: string[]): Promise<{ projects: Project[], contacts: Contact[] }> {
    const db = getAdminDb();
    
    // const [allContacts, resolvedProjects] = await Promise.all([
    //     getContactsData(db),
    //     getProjectsDataByIds(db, projectIds),
    // ]);

    // const clientSideProjects = resolvedProjects.map(p => calculateClientProjectMetrics(p));

    return {
        projects: [], // clientSideProjects,
        contacts: [], // allContacts,
    };
}

const CreateProjectSchema = z.object({
    projectName: z.string({invalid_type_error: "Παρακαλώ εισάγετε έναν έγκυρο τίτλο."}).min(3, "Ο τίτλος του έργου πρέπει να έχει τουλάχιστον 3 χαρακτήρες."),
    applicationId: z.string().optional(),
    clientName: z.string().min(1, "Παρακαλώ επιλέξτε έναν ιδιοκτήτη."),
    deadline: z.string().optional(),
});

export async function createProjectAction(prevState: any, formData: FormData) {
    try {
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

        const { projectName, applicationId, clientName, deadline } = validatedFields.data;
        const db = getAdminDb();

        const newProject: Partial<Project> = {
            projectName,
            applicationId,
            clientName,
            deadline: deadline ? new Date(deadline).toISOString() : undefined,
            status: 'on-track', // Default status
            interventions: [],
            auditLog: [
                {
                    id: `log-${Date.now()}`,
                    user: users[0], 
                    action: 'Δημιουργία Έργου',
                    timestamp: new Date().toISOString(),
                    details: `Το έργο "${projectName}" δημιουργήθηκε.`
                }
            ],
        };

        await addProjectData(db, newProject);
    } catch (error: any) {
        console.error("🔥 ERROR in createProjectAction:", error);
        return { message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath('/dashboard');
    revalidatePath('/projects');
    redirect('/projects');
}

const UpdateProjectSchema = z.object({
    id: z.string().min(1, "Το ID του έργου είναι απαραίτητο."),
    projectName: z.string({invalid_type_error: "Παρακαλώ εισάγετε έναν έγκυρο τίτλο."}).min(3, "Ο τίτλος του έργου πρέπει να έχει τουλάχιστον 3 χαρακτήρες."),
    applicationId: z.string().optional(),
    clientName: z.string().min(1, "Παρακαλώ επιλέξτε έναν ιδιοκτήτη."),
    deadline: z.string().optional(),
});

export async function updateProjectAction(prevState: any, formData: FormData) {
    const validatedFields = UpdateProjectSchema.safeParse({
        id: formData.get('id'),
        projectName: formData.get('projectName'),
        applicationId: formData.get('applicationId'),
        clientName: formData.get('clientName'),
        deadline: formData.get('deadline'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Σφάλμα. Παρακαλώ διορθώστε τα πεδία και προσπαθήστε ξανά.',
        };
    }
    const { id } = validatedFields.data;

    try {
        const db = getAdminDb();
        const { projectName, applicationId, clientName, deadline } = validatedFields.data;
        const projectData: Partial<Project> = {
            projectName,
            applicationId,
            clientName,
            deadline: deadline ? new Date(deadline).toISOString() : '',
        };

        const success = await updateProjectData(db, id, projectData);
        if (!success) {
            throw new Error("Το έργο δεν βρέθηκε για ενημέρωση.");
        }
    } catch (error: any) {
        console.error("🔥 ERROR in updateProjectAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath('/dashboard');
    revalidatePath(`/projects/${id}`);
    return { success: true, message: 'Το έργο ενημερώθηκε με επιτυχία.' };
}

const ActivateProjectSchema = z.object({
    projectId: z.string().min(1),
});

export async function activateProjectAction(prevState: any, formData: FormData) {
    const validatedFields = ActivateProjectSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { success: false, message: 'Μη έγκυρο ID έργου.' };
    }
    const { projectId } = validatedFields.data;

    try {
        const db = getAdminDb();
        
        const project = await getProjectDataById(db, projectId);
        if (!project) {
            throw new Error("Το έργο δεν βρέθηκε.");
        }
        
        const auditLog = project.auditLog || [];
        auditLog.unshift({
            id: `log-${Date.now()}`,
            user: users[0],
            action: 'Ενεργοποίηση Έργου',
            timestamp: new Date().toISOString(),
            details: 'Η κατάσταση του έργου άλλαξε από "Προσφορά" σε "Εντός Χρονοδιαγράμματος".',
        });

        const updateData = {
            status: 'on-track', // Changed from 'On Track'
            auditLog: auditLog
        };

        const success = await updateProjectData(db, projectId, updateData);
        if (!success) {
            throw new Error("Η ενεργοποίηση του έργου απέτυχε.");
        }
    } catch (error: any) {
        console.error("🔥 ERROR in activateProjectAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath(`/projects/${projectId}`);
    revalidatePath(`/projects`);
    revalidatePath(`/dashboard`);
    return { success: true, message: 'Το έργο ενεργοποιήθηκε με επιτυχία.' };
}


const DeleteProjectSchema = z.object({
    id: z.string().min(1),
});

export async function deleteProjectAction(prevState: any, formData: FormData) {
    try {
        const validatedFields = DeleteProjectSchema.safeParse({
            id: formData.get('id'),
        });

        if (!validatedFields.success) {
            return { success: false, message: 'Μη έγκυρα δεδομένα.' };
        }
        
        const db = getAdminDb();
        await deleteProjectData(db, validatedFields.data.id);
    } catch (error: any) {
        console.error("🔥 ERROR in deleteProjectAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath('/dashboard');
    revalidatePath('/projects');
    redirect('/projects');
}

const LogEmailNotificationSchema = z.object({
    projectId: z.string(),
    stageId: z.string(),
    assigneeName: z.string(),
});

export async function logEmailNotificationAction(prevState: any, formData: FormData) {
    const validatedFields = LogEmailNotificationSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'Μη έγκυρα δεδομένα για καταγραφή.' };
    }

    const { projectId, stageId, assigneeName } = validatedFields.data;

    try {
        const db = getAdminDb();
        const project = await getProjectDataById(db, projectId);
        if (!project) throw new Error('Project not found');

        const lookup = await findInterventionAndStageData(db, projectId, stageId);
        if (!lookup) throw new Error('Stage not found');

        const { stage, intervention } = lookup;
        
        if (!project.auditLog) project.auditLog = [];
        project.auditLog.unshift({
            id: `log-${Date.now()}`,
            user: users[0],
            action: 'Αποστολή Email',
            timestamp: new Date().toISOString(),
            details: `Εστάλη ειδοποίηση στον/στην ${assigneeName} για το στάδιο "${stage.title}" της παρέμβασης "${intervention.interventionCategory}".`,
        });
        
        await updateProjectData(db, projectId, project);

    } catch (error: any) {
        console.error("🔥 ERROR in logEmailNotificationAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath(`/projects/${projectId}`);
    return { success: true, message: 'Η αποστολή email καταγράφηκε.' };
}


const AddStageSchema = z.object({
    projectId: z.string(),
    interventionMasterId: z.string(),
    title: z.string().min(3, 'Ο τίτλος πρέπει να έχει τουλάχιστον 3 χαρακτήρες.'),
    deadline: z.string().min(1, 'Η προθεσμία είναι υποχρεωτική.'),
    notes: z.string().optional(),
    assigneeContactId: z.string().optional(),
    supervisorContactId: z.string().optional(),
});

export async function addStageAction(prevState: any, formData: FormData) {
    const validatedFields = AddStageSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Σφάλμα. Παρακαλώ διορθώστε τα πεδία και προσπαθήστε ξανά.',
        };
    }
    const { projectId, interventionMasterId } = validatedFields.data;

    try {
        const db = getAdminDb();
        const project = await getProjectDataById(db, projectId);
        if (!project) throw new Error('Project not found');

        if (!project.interventions) project.interventions = [];
        const intervention = project.interventions.find(i => i.id === interventionMasterId); // Assuming masterId is just id for now
        if (!intervention) throw new Error('Intervention not found');
        
        const { title, deadline, notes, assigneeContactId, supervisorContactId } = validatedFields.data;

        const newStage: Stage = {
            id: `stage-${Date.now()}`,
            title,
            status: 'pending',
            deadline: new Date(deadline).toISOString(),
            lastUpdated: new Date().toISOString(),
            files: [],
            notes: notes || undefined,
            assigneeContactId: assigneeContactId && assigneeContactId !== 'none' ? assigneeContactId : undefined,
            supervisorContactId: supervisorContactId && supervisorContactId !== 'none' ? supervisorContactId : undefined,
        };
        
        if (!intervention.stages) intervention.stages = [];
        intervention.stages.push(newStage);

        if (!project.auditLog) project.auditLog = [];
        project.auditLog.unshift({
            id: `log-${Date.now()}`,
            user: users[0],
            action: 'Προσθήκη Σταδίου',
            timestamp: new Date().toISOString(),
            details: `Προστέθηκε το στάδιο "${title}" στην παρέμβαση "${intervention.interventionCategory}".`,
        });
        
        await updateProjectData(db, projectId, project);

    } catch (error: any) {
        console.error("🔥 ERROR in addStageAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath(`/projects/${projectId}`);
    return { success: true, message: 'Το στάδιο προστέθηκε με επιτυχία.' };
}


const UpdateStageSchema = AddStageSchema.extend({
  stageId: z.string(),
});

export async function updateStageAction(prevState: any, formData: FormData) {
    const validatedFields = UpdateStageSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Σφάλμα. Παρακαλώ διορθώστε τα πεδία και προσπαθήστε ξανά.',
        };
    }
    const { projectId, stageId } = validatedFields.data;

    try {
        const db = getAdminDb();
        const project = await getProjectDataById(db, projectId);
        if (!project) throw new Error('Project not found');

        const lookup = await findInterventionAndStageData(db, projectId, stageId);
        if (!lookup) throw new Error('Stage not found');
        
        const { stage, intervention } = lookup;
        
        const { title, deadline, notes, assigneeContactId, supervisorContactId } = validatedFields.data;
        
        stage.title = title;
        stage.deadline = new Date(deadline).toISOString();
        stage.notes = notes || undefined;
        stage.assigneeContactId = assigneeContactId && assigneeContactId !== 'none' ? assigneeContactId : undefined;
        stage.supervisorContactId = supervisorContactId && supervisorContactId !== 'none' ? supervisorContactId : undefined;
        stage.lastUpdated = new Date().toISOString();

        if (!project.auditLog) project.auditLog = [];
        project.auditLog.unshift({
            id: `log-${Date.now()}`,
            user: users[0],
            action: 'Επεξεργασία Σταδίου',
            timestamp: new Date().toISOString(),
            details: `Επεξεργάστηκε το στάδιο "${title}" στην παρέμβαση "${intervention.interventionCategory}".`,
        });

        await updateProjectData(db, projectId, project);

    } catch (error: any) {
        console.error("🔥 ERROR in updateStageAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath(`/projects/${projectId}`);
    return { success: true, message: 'Το στάδιο ενημερώθηκε με επιτυχία.' };
}

const DeleteStageSchema = z.object({
  projectId: z.string(),
  stageId: z.string(),
});

export async function deleteStageAction(prevState: any, formData: FormData) {
    const validatedFields = DeleteStageSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'Μη έγκυρα δεδομένα.' };
    }
    const { projectId, stageId } = validatedFields.data;

    try {
        const db = getAdminDb();
        const project = await getProjectDataById(db, projectId);
        if (!project) throw new Error('Project not found');

        const lookup = await findInterventionAndStageData(db, projectId, stageId);
        if (!lookup) throw new Error('Stage or intervention not found');
        
        const { stage, intervention } = lookup;
        
        if (!intervention.stages) throw new Error('Intervention has no stages');
        const stageIndex = intervention.stages.findIndex(s => s.id === stageId);
        if (stageIndex === -1) throw new Error('Stage index not found in intervention');

        intervention.stages.splice(stageIndex, 1);
        
        if (!project.auditLog) project.auditLog = [];
        project.auditLog.unshift({
            id: `log-${Date.now()}`,
            user: users[0],
            action: 'Διαγραφή Σταδίου',
            timestamp: new Date().toISOString(),
            details: `Διαγράφηκε το στάδιο "${stage.title}" από την παρέμβαση "${intervention.interventionCategory}".`,
        });

        await updateProjectData(db, projectId, project);

    } catch (error: any) {
        console.error("🔥 ERROR in deleteStageAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath(`/projects/${projectId}`);
    return { success: true, message: 'Το στάδιο διαγράφηκε με επιτυχία.' };
}

const MoveStageSchema = z.object({
  projectId: z.string(),
  interventionMasterId: z.string(),
  stageId: z.string(),
  direction: z.enum(['up', 'down']),
});

export async function moveStageAction(prevState: any, formData: FormData) {
    const validatedFields = MoveStageSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return { success: false, message: 'Μη έγκυρα δεδομένα.' };
    }
    const { projectId, interventionMasterId, stageId, direction } = validatedFields.data;

    try {
        const db = getAdminDb();
        const project = await getProjectDataById(db, projectId);
        if (!project || !project.interventions) throw new Error('Project or interventions not found');

        const intervention = project.interventions.find(i => i.id === interventionMasterId);
        if (!intervention || !intervention.stages) throw new Error('Intervention or stages not found');

        const stages = intervention.stages;
        const fromIndex = stages.findIndex(s => s.id === stageId);
        if (fromIndex === -1) throw new Error('Stage not found');
        
        const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;

        if (toIndex >= 0 && toIndex < stages.length) {
            [stages[fromIndex], stages[toIndex]] = [stages[toIndex], stages[fromIndex]]; // Swap
        } else {
            return { success: true, message: 'Δεν είναι δυνατή η περαιτέρω μετακίνηση.' };
        }
        
        await updateProjectData(db, projectId, project);

    } catch (error: any) {
        console.error("🔥 ERROR in moveStageAction:", error);
        return { success: false, message: `Σφάλμα Βάσης Δεδομένων: ${error.message}` };
    }

    revalidatePath(`/projects/${projectId}`);
    return { success: true, message: 'Η σειρά άλλαξε.' };
}

// --- Data Export Action ---

async function projectsToMarkdown(db: any, projects: Project[]): Promise<string> {
    let markdown = '# Λίστα Έργων Βάσης Δεδομένων\n\n';
    markdown += 'Ακολουθούν τα αναλυτικά στοιχεία για όλα τα έργα που είναι καταχωρημένα στο σύστημα.\n\n---\n\n';

    for (const project of projects) {
        markdown += `## ${project.projectName || 'Έργο χωρίς τίτλο'} (ID: ${project.id})\n\n`;
        markdown += `- **Αρ. Αίτησης:** ${project.applicationId || 'Δ/Υ'}\n`;
        markdown += `- **Κατάσταση:** ${project.status || 'Δ/Υ'}\n`;
        if (project.deadline) {
            markdown += `- **Προθεσμία:** ${new Date(project.deadline).toLocaleDateString('el-GR')}\n`;
        }
        
        markdown += `- **Ιδιοκτήτης:** ${project.clientName || 'Άγνωστος'}\n`;


        markdown += `\n### Παρεμβάσεις\n\n`;
        if (project.interventions && project.interventions.length > 0) {
            project.interventions.forEach(intervention => {
                markdown += `#### ${intervention.interventionSubcategory || intervention.interventionCategory}\n`;
                // This part needs adjustment if subInterventions are not part of the model
                // if (intervention.subInterventions && intervention.subInterventions.length > 0) {
                //     markdown += '| Κωδικός | Περιγραφή | Κόστος |\n';
                //     markdown += '|:---|:---|---:|\n';
                //     intervention.subInterventions.forEach(sub => {
                //         markdown += `| ${sub.subcategoryCode} | ${sub.description} | ${sub.cost.toLocaleString('el-GR', { style: 'currency', currency: 'EUR' })} |\n`;
                //     });
                //      markdown += '\n';
                // }

                if (intervention.stages && intervention.stages.length > 0) {
                    markdown += '**Στάδια Υλοποίησης:**\n';
                     intervention.stages.forEach(stage => {
                         markdown += `- **${stage.title}**: ${stage.status} (Προθεσμία: ${new Date(stage.deadline).toLocaleDateString('el-GR')})\n`;
                     });
                     markdown += '\n';
                }
            });
        } else {
            markdown += `_Δεν υπάρχουν καταχωρημένες παρεμβάσεις για αυτό το έργο._\n\n`;
        }
        markdown += '---\n\n';
    }

    return markdown;
}


export async function exportProjectsToMarkdownAction() {
  try {
    const db = getAdminDb();
    const projects = await getAllProjectsData(db);
    if (projects.length === 0) {
      return { success: true, data: "Δεν βρέθηκαν έργα στη βάση δεδομένων." };
    }
    const markdownData = await projectsToMarkdown(db, projects);
    return { success: true, data: markdownData };
  } catch (error: any) {
    console.error("🔥 ERROR in exportProjectsToMarkdownAction:", error);
    return { success: false, error: `Η εξαγωγή απέτυχε: ${error.message}` };
  }
}
