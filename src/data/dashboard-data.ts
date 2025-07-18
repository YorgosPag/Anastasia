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
  {
    id: '5',
    clientName: 'Δέσποινα Καψίδου',
    applicationId: '61-028559',
    address: 'Αγ. Ιωάννου 26 Καλαμαριάς',
    projectCode: '',
    projectName: 'Καψίδου Δέσποινα',
    status: 'on-track',
    progress: 0,
    deadline: '30/09/2025',
    budget: 12500.00,
    notifications: 0,
  },
  {
    id: '6',
    clientName: 'Θωμάς Κουκουτζέλης',
    applicationId: '41-275841',
    address: '+30 697 947 9651 0 Λαγκαδά',
    projectCode: 'EKO21',
    projectName: 'Κουκουτζέλης Θωμάς',
    status: 'on-track',
    progress: 0,
    deadline: '30/09/2025',
    budget: 14800.00,
    notifications: 0,
  },
  {
    id: '7',
    clientName: 'Γεώργιος Κυρμελίδης',
    applicationId: '61-028235',
    address: 'Ολυμπιάδος 100 Κορδελιού-Ευόσμου',
    projectCode: '',
    projectName: 'Κυρμελίδης Γεώργιος',
    status: 'on-track',
    progress: 0,
    deadline: '30/09/2025',
    budget: 16200.50,
    notifications: 0,
  },
  {
    id: '8',
    clientName: 'Ειρήνη (Βασίλειος) Λαδά (Αναγνωστόπουλος)',
    applicationId: '61-032577',
    address: 'Παπακυριαζή 22 Θεσσαλονίκης',
    projectCode: '',
    projectName: 'Λαδά Ειρήνη (Αναγνωστόπουλος Βασίλειος)',
    status: 'on-track',
    progress: 0,
    deadline: '30/09/2025',
    budget: 22450.00,
    notifications: 0,
  },
  {
    id: '9',
    clientName: 'Μαρία Νικολαΐδου',
    applicationId: '61-029876',
    address: 'Τσιμισκή 58 Θεσσαλονίκης',
    projectCode: 'EKO24',
    projectName: 'Νικολαΐδου Μαρία',
    status: 'completed',
    progress: 100,
    deadline: '15/06/2025',
    budget: 18500.00,
    notifications: 0,
  },
  {
    id: '10',
    clientName: 'Αθανάσιος Παπαγεωργίου',
    applicationId: '41-289456',
    address: 'Βενιζέλου 12 Αμπελοκήπων',
    projectCode: 'EKO22',
    projectName: 'Παπαγεωργίου Αθανάσιος',
    status: 'on-track',
    progress: 25,
    deadline: '31/10/2025',
    budget: 21000.00,
    notifications: 2,
  },
  {
    id: '11',
    clientName: 'Ελένη Στεφανίδου',
    applicationId: '61-045123',
    address: 'Μητροπόλεως 33 Θεσσαλονίκης',
    projectCode: '',
    projectName: 'Στεφανίδου Ελένη',
    status: 'delayed',
    progress: 10,
    deadline: '01/09/2025',
    budget: 14000.00,
    notifications: 3,
  },
  {
    id: '12',
    clientName: 'Χρήστος Χατζηαθανασίου',
    applicationId: '61-055555',
    address: 'Αγίας Σοφίας 15 Θεσσαλονίκης',
    projectCode: 'EKO25',
    projectName: 'Χατζηαθανασίου Χρήστος',
    status: 'on-track',
    progress: 50,
    deadline: '20/11/2025',
    budget: 17800.00,
    notifications: 0,
  },
    {
    id: '13',
    clientName: 'Όλγα Παναγιωτίδου',
    applicationId: '41-291111',
    address: 'Εγνατία 150 Θεσσαλονίκης',
    projectCode: '',
    projectName: 'Παναγιωτίδου Όλγα',
    status: 'completed',
    progress: 100,
    deadline: '01/05/2025',
    budget: 19500.00,
    notifications: 0,
  },
  {
    id: '14',
    clientName: 'Νικόλαος Ιωαννίδης',
    applicationId: '61-061234',
    address: 'Π. Μελά 25 Ευόσμου',
    projectCode: 'EKO26',
    projectName: 'Ιωαννίδης Νικόλαος',
    status: 'on-track',
    progress: 80,
    deadline: '10/10/2025',
    budget: 25000.00,
    notifications: 1,
  }
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
