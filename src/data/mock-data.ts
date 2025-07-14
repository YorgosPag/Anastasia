
import type { Contact, Project, Stage, StageStatus } from "@/lib/types";
import { users as mockUsers } from './users-data';

let mockContacts: Contact[] = [
  {
    id: "1",
    type: "individual",
    avatarUrl: "https://placehold.co/100x100.png",
    name: "Γεώργιος",
    surname: "Παπαδόπουλος",
    nickname: "Γιώργος",
    profession: "Web Developer",
    taxId: "123456789",
    address: {
      street: "Λεωφόρος Αθηνών",
      number: "10",
      postalCode: "10552",
      city: "Αθήνα",
      municipality: "Αθηναίων",
      prefecture: "Αττικής",
    },
    phones: [
      { id: "p1", number: "+30 2101234567", label: "work", hasWhatsapp: true, hasViber: true },
      { id: "p2", number: "+30 6971234567", label: "mobile", hasTelegram: true },
    ],
    emails: [
      { id: "e1", address: "george.p@example.com", label: "work" },
      { id: "e2", address: "gpapadopoulos@personal.com", label: "personal" },
    ],
    socials: [
      { id: "s1", platform: "linkedin", url: "https://linkedin.com/in/georgep" },
      { id: "s2", platform: "website", url: "https://georgep.dev" },
    ],
    notes: "Βασικός προγραμματιστής για το project 'Phoenix'.",
    roles: ["freelancer", "partner"],
  },
  {
    id: "2",
    type: "company",
    avatarUrl: "https://placehold.co/100x100.png",
    companyName: "Cosmos Business Systems",
    profession: "IT Solutions",
    name: "Cosmos Business Systems",
    taxId: "987654321",
    address: {
      street: "Λεωφόρος Κηφισίας",
      number: "245",
      postalCode: "14561",
      city: "Κηφισιά",
      municipality: "Κηφισιάς",
      prefecture: "Αττικής",
    },
    phones: [
      { id: "p3", number: "+30 2109876543", label: "work" },
    ],
    emails: [
      { id: "e3", address: "info@cosmos.gr", label: "work" },
    ],
    socials: [
      { id: "s3", platform: "website", url: "https://cosmos.gr" },
      { id: "s4", platform: "linkedin", url: "https://linkedin.com/company/cosmos" },
    ],
    notes: "Πάροχος λύσεων πληροφορικής.",
    roles: ["client", "vendor"],
  },
  {
    id: '3',
    type: 'company',
    name: 'PRIMASUN',
    companyName: 'PRIMASUN ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.',
    phones: [{ id: 'p1-3', label: 'work', number: '2310303303' }],
    emails: [],
    socials: [],
    roles: ['client'],
    notes: '',
  },
  {
    id: '4',
    type: 'individual',
    name: 'Κωνσταντίνος',
    surname: 'Αγγέλου',
    phones: [{ id: 'p2-4', label: 'mobile', number: '6934543843' }],
    emails: [{ id: 'e1-4', label: 'work', address: 'aggelou.k@haifoods.com' }],
    socials: [],
    roles: ['client'],
    notes: '',
  },
  {
    id: '5',
    type: 'individual',
    name: 'Ευάγγελος',
    surname: 'Αχτσιόγλου',
    phones: [{ id: 'p3-5', label: 'mobile', number: '6973982758' }],
    emails: [{ id: 'e2-5', label: 'personal', address: 'm.giannoglou@hotmail.com' }],
    socials: [],
    roles: ['client'],
    notes: '',
  },
  {
    id: '6',
    type: 'individual',
    name: 'Πολυχρόνης',
    surname: 'Γκαϊτατζής',
    phones: [{ id: 'p4-6', label: 'mobile', number: '6972660678' }],
    emails: [{ id: 'e3-6', label: 'work', address: 'ecospitigkaitatzis@gmail.com' }],
    socials: [],
    roles: ['partner'],
    notes: 'Γιος Αθανάσιου Γκαιτατζή',
  },
  {
    id: '7',
    type: 'individual',
    name: 'Αθανάσιος',
    surname: 'Γκαϊτατζής',
    phones: [
      { id: 'p5-7', label: 'mobile', number: '6977548048' },
      { id: 'p6-7', label: 'work', number: '2310708207' },
    ],
    emails: [],
    socials: [],
    roles: ['partner'],
    notes: '',
  },
  {
    id: '8',
    type: 'individual',
    name: 'Γεώργιος',
    surname: 'Δολμές',
    profession: 'Υδραυλικές εγκαταστάσεις',
    phones: [
      { id: 'p7-8', label: 'mobile', number: '6979552020' },
      { id: 'p8-8', label: 'work', number: '2310709505' },
    ],
    emails: [{ id: 'e4-8', label: 'work', address: 'dolmes@thermoland.gr' }],
    socials: [],
    roles: ['vendor', 'freelancer'],
    notes: '',
  },
  {
    id: '9',
    type: 'individual',
    name: 'Ανατολή (Εύα)',
    surname: 'Καραγιάννη',
    phones: [{ id: 'p9-9', label: 'mobile', number: '6936593180' }],
    emails: [{ id: 'e5-9', label: 'personal', address: 'lefteris.karan@hotmail.com' }],
    socials: [],
    roles: ['client'],
    notes: '',
  },
];

let mockProjects: Project[] = [
  {
    id: '1',
    clientName: 'Κωνσταντίνος Αγγέλου',
    applicationId: '61-038111',
    address: 'Μελά Παύλου 30',
    projectCode: 'EKO23',
    projectName: 'Αγγέλου Κωνσταντίνος',
    status: 'on-track',
    progress: 0,
    deadline: '30/09/2025',
    budget: 11139.11,
    notifications: 0,
    interventions: [],
    auditLog: [],
  },
  {
    id: '2',
    clientName: 'Ευάγγελος Αχτσιόγλου',
    applicationId: '41-262254',
    address: 'Μαυρομιχάλη 127 Πολίχνης',
    projectCode: 'EKO21',
    projectName: 'Αχτσιόγλου Ευάγγελος',
    status: 'on-track',
    progress: 0,
    deadline: '30/09/2025',
    budget: 13542.14,
    notifications: 0,
    interventions: [],
    auditLog: [],
  },
];

export const users = mockUsers;

// Contacts CRUD
export const getContacts = async (): Promise<Contact[]> => {
    return Promise.resolve(mockContacts);
}

export const getContactById = async (id: string): Promise<Contact | undefined> => {
    return Promise.resolve(mockContacts.find(c => c.id === id));
}

export const addContact = async (contactData: Omit<Contact, 'id' | 'phones' | 'emails' | 'socials'>): Promise<Contact> => {
    const newContact: Contact = {
        id: (mockContacts.length + 1).toString(),
        ...contactData,
        phones: [],
        emails: [],
        socials: [],
        roles: contactData.roles || []
    };
    mockContacts.unshift(newContact);
    return Promise.resolve(newContact);
}

export const updateContact = async (id: string, updates: Partial<Omit<Contact, 'id'>>): Promise<boolean> => {
    const index = mockContacts.findIndex(c => c.id === id);
    if (index > -1) {
        mockContacts[index] = { ...mockContacts[index], ...updates };
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

export const deleteContact = async (id: string): Promise<boolean> => {
    const index = mockContacts.findIndex(c => c.id === id);
    if (index > -1) {
        mockContacts.splice(index, 1);
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}


// Projects CRUD
export const getAllProjects = async (): Promise<Project[]> => {
    return Promise.resolve(mockProjects);
}

export const getProjectById = async (id: string): Promise<Project | undefined> => {
    return Promise.resolve(mockProjects.find(p => p.id === id));
}

export const getProjectsByIds = async (ids: string[]): Promise<Project[]> => {
    return Promise.resolve(mockProjects.filter(p => ids.includes(p.id)));
}

export const addProject = async (projectData: Pick<Project, 'projectName' | 'applicationId' | 'clientName' | 'deadline'>): Promise<Project> => {
    const newProject: Project = {
        id: (mockProjects.length + 1).toString(),
        ...projectData,
        status: 'quotation',
        progress: 0,
        notifications: 0,
        budget: 0,
        address: '', // default
        projectCode: '', // default
        interventions: [],
        auditLog: [
            {
                id: `log-${Date.now()}`,
                user: users[0], 
                action: 'Δημιουργία Έργου',
                timestamp: new Date().toISOString(),
                details: `Το έργο "${projectData.projectName}" δημιουργήθηκε.`
            }
        ],
    };
    mockProjects.unshift(newProject);
    return Promise.resolve(newProject);
}

export const updateProject = async (id: string, updates: Partial<Omit<Project, 'id'>>): Promise<boolean> => {
    const index = mockProjects.findIndex(p => p.id === id);
    if (index > -1) {
        mockProjects[index] = { ...mockProjects[index], ...updates };
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

export const deleteProject = async (id: string): Promise<boolean> => {
    const index = mockProjects.findIndex(p => p.id === id);
    if (index > -1) {
        mockProjects.splice(index, 1);
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

export const findInterventionAndStage = async (projectId: string, stageId: string) => {
    const project = await getProjectById(projectId);
    if (!project || !project.interventions) return null;

    for (const intervention of project.interventions) {
        if (!intervention.stages) continue;
        const stage = intervention.stages.find(s => s.id === stageId);
        if (stage) {
            return { project, intervention, stage };
        }
    }
    return null;
};

export const updateStageStatus = async (projectId: string, stageId: string, status: StageStatus): Promise<boolean> => {
    const project = await getProjectById(projectId);
    if (!project) return false;

    let stageUpdated = false;
    if (project.interventions) {
        for (const intervention of project.interventions) {
            if (!intervention.stages) continue;
            const stage = intervention.stages.find(s => s.id === stageId);
            if (stage) {
                stage.status = status;
                stage.lastUpdated = new Date().toISOString();
                stageUpdated = true;
                break;
            }
        }
    }
    if (stageUpdated) {
        await updateProject(projectId, project);
        return true;
    }
    return false;
}
