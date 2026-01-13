export type IncidentType = 'injury' | 'incident' | 'near-miss';
export type Severity = 'minor' | 'moderate' | 'serious' | 'critical';
export type Status = 'reported' | 'under-investigation' | 'resolved' | 'closed';
export type TreatmentType = 'no-treatment' | 'first-aid' | 'medical-treatment' | 'hospitalization';
export type ActionStatus = 'pending' | 'completed';

export interface CorrectiveAction {
  id: string;
  action: string;
  responsible: string;
  dueDate: string;
  status: ActionStatus;
  completedDate?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  fileSize: string;
}

export interface WorkplaceIncident {
  id: string;
  incidentId: string;
  type: IncidentType;
  date: string;
  time: string;
  location: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  description: string;
  severity: Severity;
  status: Status;
  reportedBy: string;
  reportedByPosition: string;
  treatmentType: TreatmentType;
  lostWorkHours: number;
  lostWorkDays: number;
  rootCause: string;
  contributingFactors: string[];
  correctiveActions: CorrectiveAction[];
  attachments: Attachment[];
  budgetImpact?: {
    medicalCosts: number;
    equipmentDamage: number;
    investigationCosts: number;
    correctiveActionCosts: number;
    lostProductivity: number;
    total: number;
  };
}

export const incidents: WorkplaceIncident[] = [
  {
    id: '1',
    incidentId: 'INC-2025-001',
    type: 'injury',
    date: '2025-01-15',
    time: '14:30',
    location: 'Ramp Area - Gate 3',
    employeeId: 'EMP010',
    employeeName: 'Dejan Ristovski',
    department: 'Ground Handling',
    position: 'Ramp Agent',
    description: 'Employee slipped on wet surface while handling baggage, resulting in sprained ankle.',
    severity: 'moderate',
    status: 'resolved',
    reportedBy: 'Marko Nikolovski',
    reportedByPosition: 'Shift Manager',
    treatmentType: 'medical-treatment',
    lostWorkHours: 0,
    lostWorkDays: 3,
    budgetImpact: {
      medicalCosts: 450,
      equipmentDamage: 0,
      investigationCosts: 200,
      correctiveActionCosts: 1200,
      lostProductivity: 600,
      total: 2450,
    },
    rootCause: 'Wet surface not properly marked or cleaned after rain. Lack of non-slip footwear.',
    contributingFactors: [
      'Inadequate weather protection',
      'Missing safety signage',
      'Insufficient training on wet surface handling',
    ],
    correctiveActions: [
      {
        id: '1',
        action: 'Install non-slip mats in ramp area',
        responsible: 'Maintenance Department',
        dueDate: '2025-02-01',
        status: 'completed',
        completedDate: '2025-01-28',
      },
      {
        id: '2',
        action: 'Provide non-slip footwear to all ramp agents',
        responsible: 'HR Department',
        dueDate: '2025-02-15',
        status: 'completed',
        completedDate: '2025-02-10',
      },
      {
        id: '3',
        action: 'Conduct safety briefing on wet surface procedures',
        responsible: 'Safety Officer',
        dueDate: '2025-01-25',
        status: 'completed',
        completedDate: '2025-01-22',
      },
    ],
    attachments: [
      {
        id: '1',
        name: 'Incident Report.pdf',
        type: 'PDF',
        uploadDate: '2025-01-15',
        uploadedBy: 'Marko Nikolovski',
        fileSize: '245 KB',
      },
      {
        id: '2',
        name: 'Medical Report.pdf',
        type: 'PDF',
        uploadDate: '2025-01-16',
        uploadedBy: 'Medical Center',
        fileSize: '180 KB',
      },
    ],
  },
  {
    id: '2',
    incidentId: 'INC-2025-002',
    type: 'near-miss',
    date: '2025-02-20',
    time: '09:15',
    location: 'Baggage Handling Area',
    employeeId: 'EMP016',
    employeeName: 'Filip Trajkov',
    department: 'Ground Handling',
    position: 'Baggage Handler',
    description: 'Forklift operator nearly collided with baggage cart. Operator was distracted and did not see cart approaching from blind spot.',
    severity: 'minor',
    status: 'resolved',
    reportedBy: 'Filip Trajkov',
    reportedByPosition: 'Baggage Handler',
    treatmentType: 'no-treatment',
    lostWorkHours: 0,
    lostWorkDays: 0,
    rootCause: 'Lack of visibility in blind spots. Insufficient communication between operators.',
    contributingFactors: [
      'No backup alarm on forklift',
      'Inadequate training on blind spot awareness',
      'Missing traffic management system',
    ],
    correctiveActions: [
      {
        id: '1',
        action: 'Install backup alarms on all forklifts',
        responsible: 'Maintenance Department',
        dueDate: '2025-03-15',
        status: 'completed',
        completedDate: '2025-03-10',
      },
      {
        id: '2',
        action: 'Implement traffic management system',
        responsible: 'Operations Manager',
        dueDate: '2025-04-01',
        status: 'pending',
      },
    ],
    attachments: [
      {
        id: '1',
        name: 'Near Miss Report.pdf',
        type: 'PDF',
        uploadDate: '2025-02-20',
        uploadedBy: 'Filip Trajkov',
        fileSize: '120 KB',
      },
    ],
  },
  {
    id: '3',
    incidentId: 'INC-2025-003',
    type: 'injury',
    date: '2025-03-10',
    time: '16:45',
    location: 'Maintenance Workshop',
    employeeId: 'EMP005',
    employeeName: 'Bujar Ahmeti',
    department: 'Maintenance',
    position: 'Technician',
    description: 'Employee cut hand on sharp metal edge while working on aircraft component. Required stitches.',
    severity: 'moderate',
    status: 'resolved',
    reportedBy: 'Goran Petrov',
    reportedByPosition: 'Maintenance Supervisor',
    treatmentType: 'medical-treatment',
    lostWorkHours: 0,
    lostWorkDays: 2,
    budgetImpact: {
      medicalCosts: 320,
      equipmentDamage: 0,
      investigationCosts: 150,
      correctiveActionCosts: 850,
      lostProductivity: 400,
      total: 1720,
    },
    rootCause: 'Sharp edge not properly deburred. Missing cut-resistant gloves.',
    contributingFactors: [
      'Inadequate PPE provision',
      'Rushed work schedule',
      'Missing safety inspection of components',
    ],
    correctiveActions: [
      {
        id: '1',
        action: 'Provide cut-resistant gloves to all maintenance staff',
        responsible: 'Safety Officer',
        dueDate: '2025-03-20',
        status: 'completed',
        completedDate: '2025-03-18',
      },
      {
        id: '2',
        action: 'Implement component inspection procedure',
        responsible: 'Goran Petrov',
        dueDate: '2025-03-25',
        status: 'completed',
        completedDate: '2025-03-22',
      },
    ],
    attachments: [
      {
        id: '1',
        name: 'Incident Report.pdf',
        type: 'PDF',
        uploadDate: '2025-03-10',
        uploadedBy: 'Goran Petrov',
        fileSize: '198 KB',
      },
    ],
  },
  {
    id: '4',
    incidentId: 'INC-2025-004',
    type: 'incident',
    date: '2025-04-05',
    time: '11:20',
    location: 'Security Checkpoint - Terminal 1',
    employeeId: 'EMP003',
    employeeName: 'Stefan Jovanov',
    department: 'Security',
    position: 'Security Officer',
    description: 'X-ray scanner malfunctioned, causing temporary shutdown of checkpoint. No injuries reported.',
    severity: 'minor',
    status: 'closed',
    reportedBy: 'Stefan Jovanov',
    reportedByPosition: 'Security Officer',
    treatmentType: 'no-treatment',
    lostWorkHours: 2,
    lostWorkDays: 0,
    rootCause: 'Equipment failure due to overheating. Lack of preventive maintenance.',
    contributingFactors: [
      'Insufficient cooling system',
      'Missing maintenance schedule',
      'High passenger volume',
    ],
    correctiveActions: [
      {
        id: '1',
        action: 'Install additional cooling system',
        responsible: 'Maintenance Department',
        dueDate: '2025-04-20',
        status: 'completed',
        completedDate: '2025-04-18',
      },
      {
        id: '2',
        action: 'Establish preventive maintenance schedule',
        responsible: 'Maintenance Supervisor',
        dueDate: '2025-04-15',
        status: 'completed',
        completedDate: '2025-04-12',
      },
    ],
    attachments: [
      {
        id: '1',
        name: 'Equipment Failure Report.pdf',
        type: 'PDF',
        uploadDate: '2025-04-05',
        uploadedBy: 'Stefan Jovanov',
        fileSize: '156 KB',
      },
    ],
  },
  {
    id: '5',
    incidentId: 'INC-2025-005',
    type: 'injury',
    date: '2025-05-12',
    time: '13:10',
    location: 'Customer Service Desk',
    employeeId: 'EMP002',
    employeeName: 'Ana Dimitrova',
    department: 'Customer Service',
    position: 'Check-in Agent',
    description: 'Employee developed repetitive strain injury in wrist from prolonged computer use.',
    severity: 'minor',
    status: 'resolved',
    reportedBy: 'Ana Dimitrova',
    reportedByPosition: 'Check-in Agent',
    treatmentType: 'medical-treatment',
    lostWorkHours: 0,
    lostWorkDays: 1,
    rootCause: 'Poor ergonomic workstation setup. Lack of ergonomic training.',
    contributingFactors: [
      'Inadequate workstation design',
      'Missing ergonomic assessment',
      'Long working hours without breaks',
    ],
    correctiveActions: [
      {
        id: '1',
        action: 'Conduct ergonomic assessment of all workstations',
        responsible: 'HR Department',
        dueDate: '2025-05-30',
        status: 'completed',
        completedDate: '2025-05-25',
      },
      {
        id: '2',
        action: 'Provide ergonomic training to all staff',
        responsible: 'Training Department',
        dueDate: '2025-06-15',
        status: 'pending',
      },
    ],
    attachments: [
      {
        id: '1',
        name: 'Medical Report.pdf',
        type: 'PDF',
        uploadDate: '2025-05-12',
        uploadedBy: 'Medical Center',
        fileSize: '165 KB',
      },
    ],
  },
  {
    id: '6',
    incidentId: 'INC-2025-006',
    type: 'near-miss',
    date: '2025-06-18',
    time: '08:30',
    location: 'Aircraft Parking Stand',
    employeeId: 'EMP004',
    employeeName: 'Katerina Angelova',
    department: 'Ground Handling',
    position: 'Ramp Agent',
    description: 'Aircraft ground power unit cable was left across walkway. Employee nearly tripped over it.',
    severity: 'minor',
    status: 'resolved',
    reportedBy: 'Katerina Angelova',
    reportedByPosition: 'Ramp Agent',
    treatmentType: 'no-treatment',
    lostWorkHours: 0,
    lostWorkDays: 0,
    rootCause: 'Cable management procedures not followed. Lack of visual inspection.',
    contributingFactors: [
      'Inadequate cable routing system',
      'Missing safety protocols',
      'Time pressure',
    ],
    correctiveActions: [
      {
        id: '1',
        action: 'Implement cable management system',
        responsible: 'Operations Manager',
        dueDate: '2025-07-01',
        status: 'completed',
        completedDate: '2025-06-28',
      },
      {
        id: '2',
        action: 'Add visual inspection checklist',
        responsible: 'Safety Officer',
        dueDate: '2025-06-25',
        status: 'completed',
        completedDate: '2025-06-22',
      },
    ],
    attachments: [],
  },
  {
    id: '7',
    incidentId: 'INC-2025-007',
    type: 'injury',
    date: '2025-07-22',
    time: '15:45',
    location: 'Maintenance Hangar',
    employeeId: 'EMP014',
    employeeName: 'Nikola Todorov',
    department: 'Maintenance',
    position: 'Technician',
    description: 'Employee fell from ladder while performing maintenance work. Sustained back injury.',
    severity: 'serious',
    status: 'under-investigation',
    reportedBy: 'Goran Petrov',
    reportedByPosition: 'Maintenance Supervisor',
    treatmentType: 'hospitalization',
    lostWorkHours: 0,
    lostWorkDays: 15,
    rootCause: 'Ladder not properly secured. Employee not using fall protection equipment.',
    contributingFactors: [
      'Missing fall protection training',
      'Inadequate safety equipment',
      'Rushed maintenance schedule',
    ],
    correctiveActions: [
      {
        id: '1',
        action: 'Provide fall protection equipment to all maintenance staff',
        responsible: 'Safety Officer',
        dueDate: '2025-08-01',
        status: 'pending',
      },
      {
        id: '2',
        action: 'Conduct fall protection training',
        responsible: 'Training Department',
        dueDate: '2025-08-15',
        status: 'pending',
      },
      {
        id: '3',
        action: 'Review and update ladder safety procedures',
        responsible: 'Goran Petrov',
        dueDate: '2025-07-30',
        status: 'pending',
      },
    ],
    attachments: [
      {
        id: '1',
        name: 'Incident Report.pdf',
        type: 'PDF',
        uploadDate: '2025-07-22',
        uploadedBy: 'Goran Petrov',
        fileSize: '312 KB',
      },
      {
        id: '2',
        name: 'Medical Report.pdf',
        type: 'PDF',
        uploadDate: '2025-07-23',
        uploadedBy: 'Medical Center',
        fileSize: '245 KB',
      },
    ],
  },
  {
    id: '8',
    incidentId: 'INC-2025-008',
    type: 'incident',
    date: '2025-08-10',
    time: '10:00',
    location: 'Fuel Storage Area',
    employeeId: 'EMP008',
    employeeName: 'Goran Petrov',
    department: 'Maintenance',
    position: 'Maintenance Supervisor',
    description: 'Fuel spill detected during refueling operation. Immediate containment and cleanup performed.',
    severity: 'moderate',
    status: 'resolved',
    reportedBy: 'Goran Petrov',
    reportedByPosition: 'Maintenance Supervisor',
    treatmentType: 'no-treatment',
    lostWorkHours: 4,
    lostWorkDays: 0,
    rootCause: 'Faulty fuel hose connection. Equipment not properly inspected before use.',
    contributingFactors: [
      'Missing pre-use inspection',
      'Aging equipment',
      'Inadequate maintenance schedule',
    ],
    correctiveActions: [
      {
        id: '1',
        action: 'Replace all fuel hoses',
        responsible: 'Maintenance Department',
        dueDate: '2025-08-25',
        status: 'completed',
        completedDate: '2025-08-20',
      },
      {
        id: '2',
        action: 'Implement pre-use inspection checklist',
        responsible: 'Goran Petrov',
        dueDate: '2025-08-15',
        status: 'completed',
        completedDate: '2025-08-12',
      },
    ],
    attachments: [
      {
        id: '1',
        name: 'Fuel Spill Report.pdf',
        type: 'PDF',
        uploadDate: '2025-08-10',
        uploadedBy: 'Goran Petrov',
        fileSize: '189 KB',
      },
    ],
  },
];

export const calculateAFR = (injuries: number, totalHours: number): number => {
  if (totalHours === 0) return 0;
  return (injuries * 1000000) / totalHours;
};

export const calculateASR = (lostDays: number, totalHours: number): number => {
  if (totalHours === 0) return 0;
  return (lostDays * 1000000) / totalHours;
};

export const severityConfig = {
  minor: {
    label: { en: 'Minor', mk: 'Мала', sq: 'E Vogël' },
    className: 'badge-success',
  },
  moderate: {
    label: { en: 'Moderate', mk: 'Умерена', sq: 'E Mesme' },
    className: 'badge-warning',
  },
  serious: {
    label: { en: 'Serious', mk: 'Сериозна', sq: 'Serioze' },
    className: 'badge-danger',
  },
  critical: {
    label: { en: 'Critical', mk: 'Критична', sq: 'Kritike' },
    className: 'badge-danger',
  },
};

export const statusConfig = {
  reported: {
    label: { en: 'Reported', mk: 'Пријавено', sq: 'Raportuar' },
    className: 'badge-warning',
  },
  'under-investigation': {
    label: { en: 'Under Investigation', mk: 'Под истрага', sq: 'Nën Hetim' },
    className: 'badge-warning',
  },
  resolved: {
    label: { en: 'Resolved', mk: 'Решено', sq: 'E Zgjidhur' },
    className: 'badge-success',
  },
  closed: {
    label: { en: 'Closed', mk: 'Затворено', sq: 'E Mbyllur' },
    className: 'bg-muted text-muted-foreground border-border',
  },
};

export const typeConfig = {
  injury: {
    label: { en: 'Injury', mk: 'Повреда', sq: 'Lëndim' },
    className: 'badge-danger',
  },
  incident: {
    label: { en: 'Incident', mk: 'Инцидент', sq: 'Incident' },
    className: 'badge-warning',
  },
  'near-miss': {
    label: { en: 'Near Miss', mk: 'Близу пропуст', sq: 'Gati Humbur' },
    className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
};

