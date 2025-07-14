import type { Project } from "@/lib/types";
import { Euro, CalendarClock, AlertTriangle, FileText } from 'lucide-react';

export const mockStats = [
  {
    title: 'Συνολικός Προϋπολογισμός',
    value: '€250,350.75',
    icon: Euro,
  },
  {
    title: 'Έργα Εντός Χρονοδιαγράμματος',
    value: '12',
    icon: CalendarClock,
  },
  {
    title: 'Έργα σε Καθυστέρηση',
    value: '3',
    icon: AlertTriangle,
  },
  {
    title: 'Προσφορές σε Εκκρεμότητα',
    value: '5',
    icon: FileText,
  }
];

export const mockProjects: Project[] = [
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
  },
  {
    id: '3',
    clientName: 'Ανατολή (Εύα) Καραγιάννη',
    applicationId: '61-058764',
    address: 'Προύσης 10 Σταυρούπολης',
    projectCode: '',
    projectName: 'Καραγιάννη Ανατολή (Εύα)',
    status: 'on-track',
    progress: 0,
    deadline: '30/09/2025',
    budget: 19310.79,
    notifications: 0,
  },
  {
    id: '4',
    clientName: 'Κωνσταντίνος Καρανάσιος',
    applicationId: '61-024441',
    address: 'Ελευθερίας 20 Κορδελιού-Ευόσμου',
    projectCode: '',
    projectName: 'Καρανάσιος Κωνσταντίνος',
    status: 'delayed',
    progress: 0,
    deadline: '30/09/2025',
    budget: 15758.38,
    notifications: 1,
  },
];

export const mockChartData = [
    { name: 'Εντός', value: 85000, fill: 'hsl(var(--chart-1))' },
    { name: 'Καθυστέρηση', value: 15000, fill: 'hsl(var(--chart-2))' },
]

export const recentOffers = [
    {
        id: '1',
        title: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς',
        project: 'Αγγέλου Κωνσταντίνος ΕΚΟ23',
        time: 'σε περίπου 12 ώρες',
        date: '14/07/2025'
    },
    {
        id: '2',
        title: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς',
        project: 'Αχτσιόγλου Ευάγγελος ΕΚΟ21',
        time: 'σε περίπου 12 ώρες',
        date: '14/07/2025'
    },
    {
        id: '3',
        title: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς',
        project: 'Αχτσιόγλου Ευάγγελος ΕΚΟ21',
        time: 'σε περίπου 12 ώρες',
        date: '14/07/2025'
    },
     {
        id: '4',
        title: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς',
        project: 'Καραγιάννη Ανατολή (Εύα)',
        time: 'σε περίπου 12 ώρες',
        date: '14/07/2025'
    },
]
