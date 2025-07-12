import type { Contact } from "@/lib/types";

export const mockContacts: Contact[] = [
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
    notes: " βασικός προγραμματιστής για το project 'Phoenix'. Προτιμά επικοινωνία μέσω email.",
    labels: ["freelancer", "partner"],
  },
  {
    id: "2",
    type: "company",
    avatarUrl: "https://placehold.co/100x100.png",
    companyName: "Cosmos Business Systems",
    profession: "IT Solutions",
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
    notes: "Πάροχος λύσεων πληροφορικής. Μακροχρόνιος πελάτης.",
    labels: ["client", "vendor"],
  },
  {
    id: "3",
    type: "individual",
    avatarUrl: "https://placehold.co/100x100.png",
    name: "Μαρία",
    surname: "Ιωάννου",
    profession: "Γραφίστρια",
    phones: [],
    emails: [{ id: "e4", address: "maria.i@design.com", label: "work" }],
    socials: [
      { id: "s5", platform: "instagram", url: "https://instagram.com/mariadesign" },
    ],
    notes: "Ελεύθερη επαγγελματίας. Συνεργασία σε διάφορα projects.",
    labels: ["freelancer", "prospect"],
  },
  {
    id: "4",
    type: "public-service",
    avatarUrl: "https://placehold.co/100x100.png",
    companyName: "ΔΟΥ Αμαρουσίου",
    address: {
      street: "Αριστοτέλους",
      number: "1",
      postalCode: "15124",
      city: "Μαρούσι",
    },
    phones: [
      { id: "p4", number: "+30 2131234567", label: "work" },
    ],
    emails: [],
    socials: [],
    notes: "Δημόσια Οικονομική Υπηρεσία.",
    labels: ["vendor"],
  },
];
