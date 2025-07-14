
export const mockStagesByStatus = [
  { status: 'pending', stages: 17, fill: 'var(--color-pending)' },
  { status: 'in_progress', stages: 2, fill: 'var(--color-in_progress)' },
];

export const mockStagesByContractor = [
  { name: 'Γεώργιος Δολμές', stages: 24 },
  { name: 'Ανδρέας Λαρίν', stages: 2 },
  { name: 'Αθανάσιος Γκαϊτατζής', stages: 1 },
];

export const mockReportsTableData = [
    {
        project: 'Αγγέλου Κωνσταντίνος ΕΚΟ23',
        stageCount: 2,
        details: [
            { name: 'Αντλίες θερμότητας αέρα – αέρα διαιρούμενου', description: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς' },
            { name: 'Ηλιακός (Συλλέκτης + Ταμιευτήρας)', description: 'Ενημέρωση για αυτοψία και αποστολή προσφοράς' },
        ],
    }
];
