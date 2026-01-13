// Comprehensive mock data for OHS (Occupational Health & Safety) System

// ============ ORGANIZATION STRUCTURE ============
export interface Location {
  id: string;
  name: { en: string; mk: string; sq: string };
  type: 'terminal' | 'hangar' | 'building' | 'outdoor';
  parentId?: string;
}

export const locations: Location[] = [
  { id: 'loc-1', name: { en: 'Terminal 1', mk: 'Терминал 1', sq: 'Terminali 1' }, type: 'terminal' },
  { id: 'loc-2', name: { en: 'Terminal 2', mk: 'Терминал 2', sq: 'Terminali 2' }, type: 'terminal' },
  { id: 'loc-3', name: { en: 'Cargo Hangar', mk: 'Карго хангар', sq: 'Hangari i ngarkesave' }, type: 'hangar' },
  { id: 'loc-4', name: { en: 'Maintenance Hangar', mk: 'Хангар за одржување', sq: 'Hangari i mirëmbajtjes' }, type: 'hangar' },
  { id: 'loc-5', name: { en: 'Administration Building', mk: 'Административна зграда', sq: 'Ndërtesa administrative' }, type: 'building' },
  { id: 'loc-6', name: { en: 'Apron Area', mk: 'Платформа', sq: 'Zona e platformës' }, type: 'outdoor' },
  { id: 'loc-7', name: { en: 'Fuel Depot', mk: 'Депо за гориво', sq: 'Depoja e karburantit' }, type: 'outdoor' },
];

// ============ WORK POSITIONS ============
export interface WorkPosition {
  id: string;
  name: { en: string; mk: string; sq: string };
  department: { en: string; mk: string; sq: string };
  risks: string[];
  requiredTrainings: string[];
  requiredExams: string[];
  requiredPPE: string[];
}

export const workPositions: WorkPosition[] = [
  {
    id: 'pos-1',
    name: { en: 'Ground Handler', mk: 'Ракувач на платформа', sq: 'Operues tokësor' },
    department: { en: 'Ground Operations', mk: 'Земни операции', sq: 'Operacionet tokësore' },
    risks: ['noise-exposure', 'heavy-lifting', 'vehicle-traffic', 'jet-blast'],
    requiredTrainings: ['tr-1', 'tr-2', 'tr-3'],
    requiredExams: ['ex-1', 'ex-2'],
    requiredPPE: ['ppe-1', 'ppe-2', 'ppe-3', 'ppe-4', 'ppe-8'],
  },
  {
    id: 'pos-2',
    name: { en: 'Security Officer', mk: 'Службеник за обезбедување', sq: 'Oficer sigurie' },
    department: { en: 'Security', mk: 'Обезбедување', sq: 'Siguria' },
    risks: ['physical-confrontation', 'standing-long-hours'],
    requiredTrainings: ['tr-4', 'tr-5'],
    requiredExams: ['ex-1', 'ex-3'],
    requiredPPE: ['ppe-4', 'ppe-5'],
  },
  {
    id: 'pos-3',
    name: { en: 'Aircraft Technician', mk: 'Авионски техничар', sq: 'Teknik avioni' },
    department: { en: 'Maintenance', mk: 'Одржување', sq: 'Mirëmbajtja' },
    risks: ['chemical-exposure', 'working-at-height', 'noise-exposure', 'electrical-hazard'],
    requiredTrainings: ['tr-1', 'tr-6', 'tr-7', 'tr-8'],
    requiredExams: ['ex-1', 'ex-2', 'ex-4'],
    requiredPPE: ['ppe-1', 'ppe-2', 'ppe-3', 'ppe-4', 'ppe-6', 'ppe-7', 'ppe-8'],
  },
  {
    id: 'pos-4',
    name: { en: 'Fuel Operator', mk: 'Оператор за гориво', sq: 'Operator karburanti' },
    department: { en: 'Fuel Services', mk: 'Служба за гориво', sq: 'Shërbimet e karburantit' },
    risks: ['fire-hazard', 'chemical-exposure', 'vehicle-traffic'],
    requiredTrainings: ['tr-1', 'tr-2', 'tr-9'],
    requiredExams: ['ex-1', 'ex-2', 'ex-5'],
    requiredPPE: ['ppe-1', 'ppe-2', 'ppe-3', 'ppe-4', 'ppe-5'],
  },
  {
    id: 'pos-5',
    name: { en: 'Check-in Agent', mk: 'Агент за пријавување', sq: 'Agjent check-in' },
    department: { en: 'Passenger Services', mk: 'Служба за патници', sq: 'Shërbimet e pasagjerëve' },
    risks: ['ergonomic-strain', 'standing-long-hours'],
    requiredTrainings: ['tr-10', 'tr-11'],
    requiredExams: ['ex-1'],
    requiredPPE: [],
  },
];

// ============ EMPLOYEES ============
export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  positionId: string;
  department: { en: string; mk: string; sq: string };
  hireDate: string;
  supervisorId?: string;
  status: 'employed' | 'candidate' | 'terminated' | 'on-leave';
  qualifications: string[];
  photoUrl?: string;
}

export const employees: Employee[] = [
  {
    id: 'emp-1',
    employeeId: 'TAV-001',
    firstName: 'Марко',
    lastName: 'Николовски',
    email: 'm.nikolovski@tav.mk',
    phone: '+389 70 234 567',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    address: 'ул. Македонија 45, Скопје',
    positionId: 'pos-1',
    department: { en: 'Ground Operations', mk: 'Земни операции', sq: 'Operacionet tokësore' },
    hireDate: '2018-06-01',
    supervisorId: 'emp-5',
    status: 'employed',
    qualifications: ['Forklift License', 'Dangerous Goods Certificate'],
  },
  {
    id: 'emp-2',
    employeeId: 'TAV-002',
    firstName: 'Ана',
    lastName: 'Димитрова',
    email: 'a.dimitrova@tav.mk',
    phone: '+389 71 345 678',
    dateOfBirth: '1990-07-22',
    gender: 'female',
    address: 'бул. Партизански одреди 88, Скопје',
    positionId: 'pos-5',
    department: { en: 'Passenger Services', mk: 'Служба за патници', sq: 'Shërbimet e pasagjerëve' },
    hireDate: '2020-02-15',
    supervisorId: 'emp-6',
    status: 'employed',
    qualifications: ['Customer Service Training'],
  },
  {
    id: 'emp-3',
    employeeId: 'TAV-003',
    firstName: 'Стефан',
    lastName: 'Јованов',
    email: 's.jovanov@tav.mk',
    phone: '+389 72 456 789',
    dateOfBirth: '1988-11-08',
    gender: 'male',
    address: 'ул. 11 Октомври 23, Скопје',
    positionId: 'pos-2',
    department: { en: 'Security', mk: 'Обезбедување', sq: 'Siguria' },
    hireDate: '2019-09-01',
    supervisorId: 'emp-7',
    status: 'employed',
    qualifications: ['Security License', 'First Aid Certificate'],
  },
  {
    id: 'emp-4',
    employeeId: 'TAV-004',
    firstName: 'Бујар',
    lastName: 'Ахмети',
    email: 'b.ahmeti@tav.mk',
    phone: '+389 70 567 890',
    dateOfBirth: '1982-04-30',
    gender: 'male',
    address: 'ул. Илинденска 156, Скопје',
    positionId: 'pos-3',
    department: { en: 'Maintenance', mk: 'Одржување', sq: 'Mirëmbajtja' },
    hireDate: '2015-03-20',
    supervisorId: 'emp-8',
    status: 'employed',
    qualifications: ['Aircraft Maintenance License', 'Electrical Certification', 'Working at Height'],
  },
  {
    id: 'emp-5',
    employeeId: 'TAV-005',
    firstName: 'Елена',
    lastName: 'Трајковска',
    email: 'e.trajkovska@tav.mk',
    phone: '+389 71 678 901',
    dateOfBirth: '1980-12-05',
    gender: 'female',
    address: 'ул. Никола Тесла 78, Скопје',
    positionId: 'pos-1',
    department: { en: 'Ground Operations', mk: 'Земни операции', sq: 'Operacionet tokësore' },
    hireDate: '2012-08-15',
    status: 'employed',
    qualifications: ['Supervisory Training', 'Dangerous Goods Certificate', 'Forklift License'],
  },
  {
    id: 'emp-6',
    employeeId: 'TAV-006',
    firstName: 'Катерина',
    lastName: 'Ангелова',
    email: 'k.angelova@tav.mk',
    phone: '+389 72 789 012',
    dateOfBirth: '1992-05-18',
    gender: 'female',
    address: 'ул. Орце Николов 34, Скопје',
    positionId: 'pos-4',
    department: { en: 'Fuel Services', mk: 'Служба за гориво', sq: 'Shërbimet e karburantit' },
    hireDate: '2021-01-10',
    supervisorId: 'emp-8',
    status: 'on-leave',
    qualifications: ['Fuel Handling Certificate', 'Fire Safety'],
  },
  {
    id: 'emp-7',
    employeeId: 'TAV-007',
    firstName: 'Драган',
    lastName: 'Костов',
    email: 'd.kostov@tav.mk',
    phone: '+389 70 890 123',
    dateOfBirth: '1978-09-25',
    gender: 'male',
    address: 'бул. ВМРО 112, Скопје',
    positionId: 'pos-2',
    department: { en: 'Security', mk: 'Обезбедување', sq: 'Siguria' },
    hireDate: '2010-04-01',
    status: 'employed',
    qualifications: ['Security Management', 'Crisis Management', 'First Aid Instructor'],
  },
  {
    id: 'emp-8',
    employeeId: 'TAV-008',
    firstName: 'Горан',
    lastName: 'Петров',
    email: 'g.petrov@tav.mk',
    phone: '+389 71 901 234',
    dateOfBirth: '1975-01-12',
    gender: 'male',
    address: 'ул. Гоце Делчев 67, Скопје',
    positionId: 'pos-3',
    department: { en: 'Maintenance', mk: 'Одржување', sq: 'Mirëmbajtja' },
    hireDate: '2008-11-05',
    status: 'employed',
    qualifications: ['Chief Technician License', 'Quality Inspector', 'Safety Officer'],
  },
  {
    id: 'emp-9',
    employeeId: 'TAV-CAND-001',
    firstName: 'Никола',
    lastName: 'Стојановски',
    email: 'n.stojanovski@email.com',
    phone: '+389 70 111 222',
    dateOfBirth: '1995-08-20',
    gender: 'male',
    address: 'ул. Кузман Шапкарев 15, Скопје',
    positionId: 'pos-1',
    department: { en: 'Ground Operations', mk: 'Земни операции', sq: 'Operacionet tokësore' },
    hireDate: '2026-02-01',
    status: 'candidate',
    qualifications: [],
  },
  {
    id: 'emp-10',
    employeeId: 'TAV-009',
    firstName: 'Фатмир',
    lastName: 'Хоџа',
    email: 'f.hoxha@tav.mk',
    phone: '+389 72 222 333',
    dateOfBirth: '1987-06-14',
    gender: 'male',
    address: 'ул. Шамија 45, Тетово',
    positionId: 'pos-4',
    department: { en: 'Fuel Services', mk: 'Служба за гориво', sq: 'Shërbimet e karburantit' },
    hireDate: '2017-05-10',
    supervisorId: 'emp-8',
    status: 'employed',
    qualifications: ['Fuel Handling Certificate', 'Fire Safety', 'First Aid'],
  },
];

// ============ TRAININGS ============
export interface TrainingType {
  id: string;
  name: { en: string; mk: string; sq: string };
  type: 'internal' | 'external';
  validityMonths: number;
  durationHours: number;
}

export const trainingTypes: TrainingType[] = [
  { id: 'tr-1', name: { en: 'Occupational Safety Basics', mk: 'Основи на БЗР', sq: 'Bazat e SSP' }, type: 'internal', validityMonths: 24, durationHours: 8 },
  { id: 'tr-2', name: { en: 'Airside Safety', mk: 'Безбедност на платформа', sq: 'Siguria në platformë' }, type: 'internal', validityMonths: 12, durationHours: 4 },
  { id: 'tr-3', name: { en: 'Dangerous Goods Handling', mk: 'Ракување со опасни материи', sq: 'Trajtimi i mallrave të rrezikshme' }, type: 'external', validityMonths: 24, durationHours: 16 },
  { id: 'tr-4', name: { en: 'Security Awareness', mk: 'Безбедносна свесност', sq: 'Ndërgjegjësimi i sigurisë' }, type: 'internal', validityMonths: 12, durationHours: 4 },
  { id: 'tr-5', name: { en: 'Crisis Management', mk: 'Управување со кризи', sq: 'Menaxhimi i krizave' }, type: 'external', validityMonths: 24, durationHours: 8 },
  { id: 'tr-6', name: { en: 'Working at Height', mk: 'Работа на височина', sq: 'Puna në lartësi' }, type: 'external', validityMonths: 12, durationHours: 8 },
  { id: 'tr-7', name: { en: 'Electrical Safety', mk: 'Електрична безбедност', sq: 'Siguria elektrike' }, type: 'internal', validityMonths: 24, durationHours: 4 },
  { id: 'tr-8', name: { en: 'Chemical Handling', mk: 'Ракување со хемикалии', sq: 'Trajtimi i kimikateve' }, type: 'external', validityMonths: 24, durationHours: 8 },
  { id: 'tr-9', name: { en: 'Fire Safety', mk: 'Противпожарна заштита', sq: 'Mbrojtja nga zjarri' }, type: 'internal', validityMonths: 12, durationHours: 4 },
  { id: 'tr-10', name: { en: 'Customer Service Excellence', mk: 'Квалитет на услуга', sq: 'Shërbimi i shkëlqyer' }, type: 'internal', validityMonths: 24, durationHours: 8 },
  { id: 'tr-11', name: { en: 'First Aid', mk: 'Прва помош', sq: 'Ndihma e parë' }, type: 'external', validityMonths: 24, durationHours: 16 },
];

export interface EmployeeTraining {
  id: string;
  employeeId: string;
  trainingTypeId: string;
  completionDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring-soon' | 'expired';
  certificateNumber?: string;
  score?: number;
  trainer?: string;
}

export const employeeTrainings: EmployeeTraining[] = [
  { id: 'et-1', employeeId: 'emp-1', trainingTypeId: 'tr-1', completionDate: '2024-06-15', expiryDate: '2026-06-15', status: 'valid', certificateNumber: 'BZR-2024-001', score: 92 },
  { id: 'et-2', employeeId: 'emp-1', trainingTypeId: 'tr-2', completionDate: '2025-01-10', expiryDate: '2026-01-10', status: 'expiring-soon', certificateNumber: 'AS-2025-001', score: 88 },
  { id: 'et-3', employeeId: 'emp-1', trainingTypeId: 'tr-3', completionDate: '2024-03-20', expiryDate: '2026-03-20', status: 'valid', certificateNumber: 'DG-2024-015', score: 95 },
  { id: 'et-4', employeeId: 'emp-2', trainingTypeId: 'tr-10', completionDate: '2024-08-05', expiryDate: '2026-08-05', status: 'valid', score: 90 },
  { id: 'et-5', employeeId: 'emp-2', trainingTypeId: 'tr-11', completionDate: '2023-12-01', expiryDate: '2025-12-01', status: 'expired', certificateNumber: 'FA-2023-042' },
  { id: 'et-6', employeeId: 'emp-3', trainingTypeId: 'tr-4', completionDate: '2025-02-15', expiryDate: '2026-02-15', status: 'valid', score: 85 },
  { id: 'et-7', employeeId: 'emp-3', trainingTypeId: 'tr-5', completionDate: '2024-11-20', expiryDate: '2026-11-20', status: 'valid', certificateNumber: 'CM-2024-008' },
  { id: 'et-8', employeeId: 'emp-4', trainingTypeId: 'tr-1', completionDate: '2024-04-10', expiryDate: '2026-04-10', status: 'valid', score: 98 },
  { id: 'et-9', employeeId: 'emp-4', trainingTypeId: 'tr-6', completionDate: '2025-01-25', expiryDate: '2026-01-25', status: 'expiring-soon', certificateNumber: 'WH-2025-003' },
  { id: 'et-10', employeeId: 'emp-4', trainingTypeId: 'tr-7', completionDate: '2024-09-15', expiryDate: '2026-09-15', status: 'valid', score: 94 },
  { id: 'et-11', employeeId: 'emp-5', trainingTypeId: 'tr-1', completionDate: '2024-05-20', expiryDate: '2026-05-20', status: 'valid', score: 96 },
  { id: 'et-12', employeeId: 'emp-5', trainingTypeId: 'tr-2', completionDate: '2024-12-05', expiryDate: '2025-12-05', status: 'expired' },
  { id: 'et-13', employeeId: 'emp-6', trainingTypeId: 'tr-9', completionDate: '2024-07-10', expiryDate: '2025-07-10', status: 'expired' },
  { id: 'et-14', employeeId: 'emp-7', trainingTypeId: 'tr-4', completionDate: '2025-01-05', expiryDate: '2026-01-05', status: 'expiring-soon' },
  { id: 'et-15', employeeId: 'emp-10', trainingTypeId: 'tr-9', completionDate: '2024-10-15', expiryDate: '2025-10-15', status: 'valid' },
];

// ============ MEDICAL EXAMINATIONS ============
export interface MedicalExamType {
  id: string;
  name: { en: string; mk: string; sq: string };
  type: 'pre-employment' | 'systematic' | 'periodic' | 'targeted';
  validityMonths: number;
}

export const medicalExamTypes: MedicalExamType[] = [
  { id: 'ex-1', name: { en: 'General Health Check', mk: 'Општ здравствен преглед', sq: 'Kontrolli i përgjithshëm shëndetësor' }, type: 'systematic', validityMonths: 12 },
  { id: 'ex-2', name: { en: 'Hearing Test', mk: 'Преглед на слух', sq: 'Testi i dëgjimit' }, type: 'periodic', validityMonths: 12 },
  { id: 'ex-3', name: { en: 'Vision Test', mk: 'Преглед на вид', sq: 'Testi i shikimit' }, type: 'periodic', validityMonths: 24 },
  { id: 'ex-4', name: { en: 'Respiratory Function Test', mk: 'Преглед на дишни органи', sq: 'Testi i funksionit të frymëmarrjes' }, type: 'periodic', validityMonths: 12 },
  { id: 'ex-5', name: { en: 'Toxicology Screening', mk: 'Токсиколошки преглед', sq: 'Kontrolli toksikologjik' }, type: 'targeted', validityMonths: 6 },
];

export interface EmployeeMedicalExam {
  id: string;
  employeeId: string;
  examTypeId: string;
  examDate: string;
  expiryDate: string;
  institution: string;
  doctor: string;
  result: 'fit' | 'fit-with-restrictions' | 'unfit' | 'pending';
  restrictions?: string;
  status: 'valid' | 'expiring-soon' | 'expired';
  referralNumber?: string;
}

export const employeeMedicalExams: EmployeeMedicalExam[] = [
  { id: 'me-1', employeeId: 'emp-1', examTypeId: 'ex-1', examDate: '2025-06-10', expiryDate: '2026-06-10', institution: 'Поликлиника Букурешт', doctor: 'Др. Иванова', result: 'fit', status: 'valid', referralNumber: 'REF-2025-001' },
  { id: 'me-2', employeeId: 'emp-1', examTypeId: 'ex-2', examDate: '2025-06-10', expiryDate: '2026-06-10', institution: 'Поликлиника Букурешт', doctor: 'Др. Стојанов', result: 'fit', status: 'valid' },
  { id: 'me-3', employeeId: 'emp-2', examTypeId: 'ex-1', examDate: '2025-03-15', expiryDate: '2026-03-15', institution: 'Клиничка болница Скопје', doctor: 'Др. Петрова', result: 'fit', status: 'valid' },
  { id: 'me-4', employeeId: 'emp-3', examTypeId: 'ex-1', examDate: '2024-12-20', expiryDate: '2025-12-20', institution: 'Поликлиника Букурешт', doctor: 'Др. Иванова', result: 'fit', status: 'expired' },
  { id: 'me-5', employeeId: 'emp-3', examTypeId: 'ex-3', examDate: '2024-12-20', expiryDate: '2026-12-20', institution: 'Очен центар', doctor: 'Др. Николов', result: 'fit-with-restrictions', restrictions: 'Corrective lenses required', status: 'valid' },
  { id: 'me-6', employeeId: 'emp-4', examTypeId: 'ex-1', examDate: '2025-01-05', expiryDate: '2026-01-05', institution: 'Клиничка болница Скопје', doctor: 'Др. Петрова', result: 'fit', status: 'expiring-soon' },
  { id: 'me-7', employeeId: 'emp-4', examTypeId: 'ex-2', examDate: '2025-01-05', expiryDate: '2026-01-05', institution: 'Поликлиника Букурешт', doctor: 'Др. Стојанов', result: 'fit', status: 'expiring-soon' },
  { id: 'me-8', employeeId: 'emp-4', examTypeId: 'ex-4', examDate: '2025-01-05', expiryDate: '2026-01-05', institution: 'Клиничка болница Скопје', doctor: 'Др. Ристов', result: 'fit', status: 'expiring-soon' },
  { id: 'me-9', employeeId: 'emp-5', examTypeId: 'ex-1', examDate: '2025-08-20', expiryDate: '2026-08-20', institution: 'Поликлиника Букурешт', doctor: 'Др. Иванова', result: 'fit', status: 'valid' },
  { id: 'me-10', employeeId: 'emp-6', examTypeId: 'ex-1', examDate: '2024-09-15', expiryDate: '2025-09-15', institution: 'Клиничка болница Скопје', doctor: 'Др. Петрова', result: 'fit', status: 'expired' },
  { id: 'me-11', employeeId: 'emp-6', examTypeId: 'ex-5', examDate: '2024-09-15', expiryDate: '2025-03-15', institution: 'Токсиколошки центар', doctor: 'Др. Јовановски', result: 'fit', status: 'expired' },
  { id: 'me-12', employeeId: 'emp-7', examTypeId: 'ex-1', examDate: '2025-05-10', expiryDate: '2026-05-10', institution: 'Поликлиника Букурешт', doctor: 'Др. Иванова', result: 'fit', status: 'valid' },
  { id: 'me-13', employeeId: 'emp-10', examTypeId: 'ex-1', examDate: '2025-04-20', expiryDate: '2026-04-20', institution: 'Клиничка болница Скопје', doctor: 'Др. Петрова', result: 'fit', status: 'valid' },
  { id: 'me-14', employeeId: 'emp-10', examTypeId: 'ex-5', examDate: '2025-10-20', expiryDate: '2026-04-20', institution: 'Токсиколошки центар', doctor: 'Др. Јовановски', result: 'fit', status: 'valid' },
];

// ============ PPE & EQUIPMENT ============
export interface PPEType {
  id: string;
  name: { en: string; mk: string; sq: string };
  category: 'head' | 'eyes' | 'ears' | 'hands' | 'feet' | 'body' | 'respiratory' | 'fall-protection';
  defaultValidityMonths?: number;
  requiresInspection: boolean;
  inspectionIntervalDays?: number;
}

export const ppeTypes: PPEType[] = [
  { id: 'ppe-1', name: { en: 'Safety Helmet', mk: 'Заштитен шлем', sq: 'Helmetë sigurie' }, category: 'head', defaultValidityMonths: 60, requiresInspection: true, inspectionIntervalDays: 180 },
  { id: 'ppe-2', name: { en: 'Safety Gloves', mk: 'Заштитни ракавици', sq: 'Doreza sigurie' }, category: 'hands', defaultValidityMonths: 12, requiresInspection: false },
  { id: 'ppe-3', name: { en: 'Safety Glasses', mk: 'Заштитни очила', sq: 'Syze sigurie' }, category: 'eyes', defaultValidityMonths: 24, requiresInspection: false },
  { id: 'ppe-4', name: { en: 'Safety Shoes', mk: 'Заштитни чевли', sq: 'Këpucë sigurie' }, category: 'feet', defaultValidityMonths: 18, requiresInspection: false },
  { id: 'ppe-5', name: { en: 'High-Visibility Vest', mk: 'Рефлектирачки елек', sq: 'Jelek reflektues' }, category: 'body', defaultValidityMonths: 24, requiresInspection: false },
  { id: 'ppe-6', name: { en: 'Safety Harness', mk: 'Заштитен појас', sq: 'Brez sigurie' }, category: 'fall-protection', defaultValidityMonths: 60, requiresInspection: true, inspectionIntervalDays: 90 },
  { id: 'ppe-7', name: { en: 'Respirator', mk: 'Респиратор', sq: 'Respirator' }, category: 'respiratory', defaultValidityMonths: 12, requiresInspection: true, inspectionIntervalDays: 30 },
  { id: 'ppe-8', name: { en: 'Ear Protection', mk: 'Заштита за уши', sq: 'Mbrojtje për veshët' }, category: 'ears', defaultValidityMonths: 24, requiresInspection: false },
];

export interface EmployeePPE {
  id: string;
  employeeId: string;
  ppeTypeId: string;
  serialNumber: string;
  assignmentDate: string;
  expiryDate: string;
  returnDate?: string;
  condition: 'good' | 'fair' | 'poor' | 'damaged' | 'discarded';
  status: 'assigned' | 'returned' | 'expired' | 'expiring-soon';
  lastInspection?: string;
  nextInspection?: string;
}

export const employeePPE: EmployeePPE[] = [
  { id: 'epp-1', employeeId: 'emp-1', ppeTypeId: 'ppe-1', serialNumber: 'HLM-2023-001', assignmentDate: '2023-06-15', expiryDate: '2028-06-15', condition: 'good', status: 'assigned', lastInspection: '2025-06-15', nextInspection: '2025-12-15' },
  { id: 'epp-2', employeeId: 'emp-1', ppeTypeId: 'ppe-2', serialNumber: 'GLV-2024-042', assignmentDate: '2024-09-01', expiryDate: '2025-09-01', condition: 'fair', status: 'expiring-soon' },
  { id: 'epp-3', employeeId: 'emp-1', ppeTypeId: 'ppe-3', serialNumber: 'GLS-2024-018', assignmentDate: '2024-03-10', expiryDate: '2026-03-10', condition: 'good', status: 'assigned' },
  { id: 'epp-4', employeeId: 'emp-1', ppeTypeId: 'ppe-4', serialNumber: 'SHO-2024-033', assignmentDate: '2024-06-01', expiryDate: '2025-12-01', condition: 'good', status: 'expiring-soon' },
  { id: 'epp-5', employeeId: 'emp-1', ppeTypeId: 'ppe-8', serialNumber: 'EAR-2024-015', assignmentDate: '2024-01-15', expiryDate: '2026-01-15', condition: 'good', status: 'assigned' },
  { id: 'epp-6', employeeId: 'emp-3', ppeTypeId: 'ppe-4', serialNumber: 'SHO-2023-089', assignmentDate: '2023-09-01', expiryDate: '2025-03-01', condition: 'poor', status: 'expired' },
  { id: 'epp-7', employeeId: 'emp-3', ppeTypeId: 'ppe-5', serialNumber: 'VST-2024-056', assignmentDate: '2024-05-10', expiryDate: '2026-05-10', condition: 'good', status: 'assigned' },
  { id: 'epp-8', employeeId: 'emp-4', ppeTypeId: 'ppe-1', serialNumber: 'HLM-2022-034', assignmentDate: '2022-03-20', expiryDate: '2027-03-20', condition: 'good', status: 'assigned', lastInspection: '2025-09-20', nextInspection: '2026-03-20' },
  { id: 'epp-9', employeeId: 'emp-4', ppeTypeId: 'ppe-6', serialNumber: 'HRN-2024-008', assignmentDate: '2024-01-25', expiryDate: '2029-01-25', condition: 'good', status: 'assigned', lastInspection: '2025-10-25', nextInspection: '2026-01-25' },
  { id: 'epp-10', employeeId: 'emp-4', ppeTypeId: 'ppe-7', serialNumber: 'RSP-2025-003', assignmentDate: '2025-01-05', expiryDate: '2026-01-05', condition: 'good', status: 'expiring-soon', lastInspection: '2025-12-05', nextInspection: '2026-01-05' },
  { id: 'epp-11', employeeId: 'emp-6', ppeTypeId: 'ppe-4', serialNumber: 'SHO-2024-102', assignmentDate: '2024-01-10', expiryDate: '2025-07-10', condition: 'good', status: 'expired' },
  { id: 'epp-12', employeeId: 'emp-6', ppeTypeId: 'ppe-5', serialNumber: 'VST-2024-078', assignmentDate: '2024-01-10', expiryDate: '2026-01-10', condition: 'good', status: 'expiring-soon' },
  { id: 'epp-13', employeeId: 'emp-10', ppeTypeId: 'ppe-4', serialNumber: 'SHO-2024-156', assignmentDate: '2024-05-10', expiryDate: '2025-11-10', condition: 'good', status: 'expiring-soon' },
  { id: 'epp-14', employeeId: 'emp-10', ppeTypeId: 'ppe-5', serialNumber: 'VST-2024-112', assignmentDate: '2024-05-10', expiryDate: '2026-05-10', condition: 'good', status: 'assigned' },
];

// ============ INCIDENTS ============
export interface Incident {
  id: string;
  type: 'injury' | 'near-miss' | 'property-damage' | 'environmental';
  date: string;
  time: string;
  locationId: string;
  description: { en: string; mk: string; sq: string };
  involvedEmployeeIds: string[];
  witnessIds: string[];
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  rootCause?: { en: string; mk: string; sq: string };
  correctiveActions?: { en: string; mk: string; sq: string };
  daysLost?: number;
  estimatedCost?: number;
  reportedBy: string;
  reportedDate: string;
}

export const incidents: Incident[] = [
  {
    id: 'inc-1',
    type: 'injury',
    date: '2025-11-15',
    time: '14:30',
    locationId: 'loc-6',
    description: {
      en: 'Employee slipped on wet surface while loading baggage, resulting in sprained ankle.',
      mk: 'Вработениот се лизна на мокра површина при товарење на багаж, што резултираше со изместување на глужд.',
      sq: 'Punonjësi u rrëzua në sipërfaqe të lagur gjatë ngarkimit të bagazheve, duke rezultuar në një ndrydhje të kyçit.'
    },
    involvedEmployeeIds: ['emp-1'],
    witnessIds: ['emp-5'],
    severity: 'moderate',
    status: 'closed',
    rootCause: {
      en: 'Wet surface from rain, inadequate drainage in the area',
      mk: 'Мокра површина од дожд, несоодветна дренажа во областа',
      sq: 'Sipërfaqe e lagur nga shiu, drenazhim i pamjaftueshëm në zonë'
    },
    correctiveActions: {
      en: 'Installed additional drainage, added anti-slip mats, updated wet weather procedures',
      mk: 'Инсталирана дополнителна дренажа, додадени против-лизгачки простирки, ажурирани процедури за влажно време',
      sq: 'U instalua drenazhim shtesë, u shtuan tapetë kundër rrëshqitjes, u përditësuan procedurat për mot të lagësht'
    },
    daysLost: 5,
    estimatedCost: 1500,
    reportedBy: 'emp-5',
    reportedDate: '2025-11-15'
  },
  {
    id: 'inc-2',
    type: 'near-miss',
    date: '2025-12-02',
    time: '09:45',
    locationId: 'loc-4',
    description: {
      en: 'Forklift nearly struck employee who was walking in unmarked pedestrian area.',
      mk: 'Виљушкар речиси удри вработен кој одеше во необележана пешачка зона.',
      sq: 'Pirun-ngritësi pothuajse goditi punonjësin që po ecte në zonën e pashënuar për këmbësorë.'
    },
    involvedEmployeeIds: ['emp-4'],
    witnessIds: ['emp-8'],
    severity: 'serious',
    status: 'resolved',
    rootCause: {
      en: 'Faded floor markings, inadequate separation between vehicle and pedestrian traffic',
      mk: 'Избледени ознаки на подот, несоодветно одвојување на возила и пешаци',
      sq: 'Shenja të zbehuara në dysheme, ndarje e pamjaftueshme midis trafikut të automjeteve dhe këmbësorëve'
    },
    correctiveActions: {
      en: 'Repainted floor markings, installed physical barriers, conducted safety briefing',
      mk: 'Пребојадисани подни ознаки, инсталирани физички бариери, спроведен безбедносен брифинг',
      sq: 'U rilyenë shenjat e dyshemesë, u instaluan barriera fizike, u mbajt informim mbi sigurinë'
    },
    daysLost: 0,
    estimatedCost: 800,
    reportedBy: 'emp-8',
    reportedDate: '2025-12-02'
  },
  {
    id: 'inc-3',
    type: 'property-damage',
    date: '2025-12-20',
    time: '16:20',
    locationId: 'loc-3',
    description: {
      en: 'Cargo container damaged during handling due to equipment malfunction.',
      mk: 'Карго контејнер оштетен при ракување поради дефект на опремата.',
      sq: 'Kontenieri i ngarkesave u dëmtua gjatë trajtimit për shkak të mosfunksionimit të pajisjeve.'
    },
    involvedEmployeeIds: ['emp-1', 'emp-5'],
    witnessIds: [],
    severity: 'minor',
    status: 'closed',
    rootCause: {
      en: 'Hydraulic system failure on forklift',
      mk: 'Дефект на хидрауличниот систем на виљушкарот',
      sq: 'Dështimi i sistemit hidraulik në pirun-ngritës'
    },
    correctiveActions: {
      en: 'Repaired forklift, implemented enhanced pre-use inspection checklist',
      mk: 'Поправен виљушкар, имплементирана подобрена контролна листа пред употреба',
      sq: 'U riparua pirun-ngritësi, u zbatua lista e kontrollit të përmirësuar para përdorimit'
    },
    daysLost: 0,
    estimatedCost: 2500,
    reportedBy: 'emp-5',
    reportedDate: '2025-12-20'
  },
  {
    id: 'inc-4',
    type: 'injury',
    date: '2026-01-05',
    time: '11:15',
    locationId: 'loc-7',
    description: {
      en: 'Employee suffered minor chemical burn from fuel spillage.',
      mk: 'Вработениот претрпе мала хемиска изгореница од истекување на гориво.',
      sq: 'Punonjësi pësoi djegie të lehtë kimike nga derdhja e karburantit.'
    },
    involvedEmployeeIds: ['emp-10'],
    witnessIds: ['emp-6'],
    severity: 'minor',
    status: 'investigating',
    rootCause: {
      en: 'Under investigation - preliminary: PPE gloves removed during operation',
      mk: 'Во истрага - прелиминарно: ЛЗС ракавици отстранети за време на операцијата',
      sq: 'Në hetim - paraprake: dorezat PPE u hoqën gjatë operacionit'
    },
    daysLost: 2,
    estimatedCost: 500,
    reportedBy: 'emp-6',
    reportedDate: '2026-01-05'
  },
];

// ============ DOCUMENTS ============
export interface Document {
  id: string;
  type: 'law' | 'procedure' | 'instruction' | 'template';
  name: { en: string; mk: string; sq: string };
  category: string;
  version: string;
  effectiveDate: string;
  reviewDate: string;
  author: string;
  approvedBy?: string;
  fileName: string;
  status: 'active' | 'draft' | 'archived';
}

export const documents: Document[] = [
  { id: 'doc-1', type: 'law', name: { en: 'Occupational Safety and Health Act', mk: 'Закон за безбедност и здравје при работа', sq: 'Ligji për sigurinë dhe shëndet në punë' }, category: 'Legal', version: '2023.1', effectiveDate: '2023-01-01', reviewDate: '2025-01-01', author: 'Министерство за труд', status: 'active', fileName: 'bzr-zakon.pdf' },
  { id: 'doc-2', type: 'procedure', name: { en: 'Emergency Evacuation Procedure', mk: 'Процедура за евакуација во итни случаи', sq: 'Procedura e evakuimit urgjent' }, category: 'Emergency', version: '3.0', effectiveDate: '2024-06-15', reviewDate: '2026-06-15', author: 'Горан Петров', approvedBy: 'Драган Костов', status: 'active', fileName: 'evacuation-procedure.pdf' },
  { id: 'doc-3', type: 'procedure', name: { en: 'PPE Usage and Maintenance', mk: 'Употреба и одржување на ЛЗС', sq: 'Përdorimi dhe mirëmbajtja e PPE' }, category: 'PPE', version: '2.1', effectiveDate: '2024-03-01', reviewDate: '2026-03-01', author: 'Горан Петров', approvedBy: 'Драган Костов', status: 'active', fileName: 'ppe-procedure.pdf' },
  { id: 'doc-4', type: 'instruction', name: { en: 'Forklift Operation Guidelines', mk: 'Упатство за ракување со виљушкар', sq: 'Udhëzimet për përdorimin e pirun-ngritësit' }, category: 'Equipment', version: '1.5', effectiveDate: '2024-01-15', reviewDate: '2025-01-15', author: 'Елена Трајковска', approvedBy: 'Горан Петров', status: 'active', fileName: 'forklift-guidelines.pdf' },
  { id: 'doc-5', type: 'template', name: { en: 'Medical Referral Form', mk: 'Упат за лекарски преглед', sq: 'Formular i referimit mjekësor' }, category: 'Medical', version: '1.2', effectiveDate: '2024-09-01', reviewDate: '2025-09-01', author: 'HR Department', status: 'active', fileName: 'medical-referral-template.docx' },
  { id: 'doc-6', type: 'template', name: { en: 'Training Certificate Template', mk: 'Шаблон за сертификат за обука', sq: 'Shablloni i certifikatës së trajnimit' }, category: 'Training', version: '2.0', effectiveDate: '2024-05-01', reviewDate: '2026-05-01', author: 'HR Department', status: 'active', fileName: 'training-certificate-template.docx' },
  { id: 'doc-7', type: 'procedure', name: { en: 'Incident Reporting Procedure', mk: 'Процедура за пријавување инциденти', sq: 'Procedura e raportimit të incidenteve' }, category: 'Incidents', version: '3.2', effectiveDate: '2024-11-01', reviewDate: '2026-11-01', author: 'Горан Петров', approvedBy: 'Драган Костов', status: 'active', fileName: 'incident-reporting.pdf' },
];

// ============ NOTIFICATIONS / ALERTS ============
export interface Notification {
  id: string;
  type: 'training-expiring' | 'medical-expiring' | 'ppe-expiring' | 'equipment-inspection' | 'incident' | 'system';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: { en: string; mk: string; sq: string };
  message: { en: string; mk: string; sq: string };
  relatedEntityId?: string;
  relatedEmployeeId?: string;
  dueDate?: string;
  createdAt: string;
  isRead: boolean;
}

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'training-expiring',
    priority: 'high',
    title: { en: 'Training Expiring Tomorrow', mk: 'Обука истекува утре', sq: 'Trajnimi skadon nesër' },
    message: { en: 'Airside Safety training for Марко Николовски expires tomorrow (2026-01-10)', mk: 'Обуката за безбедност на платформа за Марко Николовски истекува утре (2026-01-10)', sq: 'Trajnimi i sigurisë në platformë për Марко Николовски skadon nesër (2026-01-10)' },
    relatedEntityId: 'et-2',
    relatedEmployeeId: 'emp-1',
    dueDate: '2026-01-10',
    createdAt: '2026-01-09T08:00:00',
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'medical-expiring',
    priority: 'high',
    title: { en: 'Medical Exam Expiring Soon', mk: 'Лекарски преглед истекува наскоро', sq: 'Ekzaminimi mjekësor skadon së shpejti' },
    message: { en: 'General Health Check for Бујар Ахмети expires on 2026-01-05', mk: 'Општ здравствен преглед за Бујар Ахмети истекува на 2026-01-05', sq: 'Kontrolli i përgjithshëm shëndetësor për Бујар Ахмети skadon më 2026-01-05' },
    relatedEntityId: 'me-6',
    relatedEmployeeId: 'emp-4',
    dueDate: '2026-01-05',
    createdAt: '2025-12-05T08:00:00',
    isRead: true
  },
  {
    id: 'notif-3',
    type: 'ppe-expiring',
    priority: 'medium',
    title: { en: 'PPE Expiring Soon', mk: 'ЛЗС истекува наскоро', sq: 'PPE skadon së shpejti' },
    message: { en: 'Safety Gloves for Марко Николовски expire on 2025-09-01', mk: 'Заштитни ракавици за Марко Николовски истекуваат на 2025-09-01', sq: 'Dorezat e sigurisë për Марко Николовски skadojnë më 2025-09-01' },
    relatedEntityId: 'epp-2',
    relatedEmployeeId: 'emp-1',
    dueDate: '2025-09-01',
    createdAt: '2025-08-01T08:00:00',
    isRead: false
  },
  {
    id: 'notif-4',
    type: 'equipment-inspection',
    priority: 'medium',
    title: { en: 'Equipment Inspection Due', mk: 'Потребна инспекција на опрема', sq: 'Kërkohet inspektim i pajisjes' },
    message: { en: 'Safety Harness (HRN-2024-008) inspection due on 2026-01-25', mk: 'Инспекција на заштитен појас (HRN-2024-008) на 2026-01-25', sq: 'Inspektimi i brezit të sigurisë (HRN-2024-008) duhet më 2026-01-25' },
    relatedEntityId: 'epp-9',
    relatedEmployeeId: 'emp-4',
    dueDate: '2026-01-25',
    createdAt: '2026-01-10T08:00:00',
    isRead: false
  },
  {
    id: 'notif-5',
    type: 'incident',
    priority: 'high',
    title: { en: 'New Incident Reported', mk: 'Пријавен нов инцидент', sq: 'Raportuar incident i ri' },
    message: { en: 'Chemical burn incident reported at Fuel Depot - under investigation', mk: 'Пријавен инцидент со хемиска изгореница во депо за гориво - во истрага', sq: 'Raportuar incident me djegie kimike në Depoja e karburantit - në hetim' },
    relatedEntityId: 'inc-4',
    createdAt: '2026-01-05T11:30:00',
    isRead: false
  },
  {
    id: 'notif-6',
    type: 'training-expiring',
    priority: 'critical',
    title: { en: 'Training Expired', mk: 'Обука истечена', sq: 'Trajnim i skaduar' },
    message: { en: 'First Aid training for Ана Димитрова has expired (2025-12-01)', mk: 'Обуката за прва помош за Ана Димитрова е истечена (2025-12-01)', sq: 'Trajnimi i ndihmës së parë për Ана Димитрова ka skaduar (2025-12-01)' },
    relatedEntityId: 'et-5',
    relatedEmployeeId: 'emp-2',
    dueDate: '2025-12-01',
    createdAt: '2025-12-02T08:00:00',
    isRead: true
  },
];

// ============ ACTIVITY LOG ============
export interface ActivityLog {
  id: string;
  action: string;
  module: 'employees' | 'trainings' | 'medical' | 'equipment' | 'incidents' | 'documents' | 'system';
  userId: string;
  userName: string;
  details: { en: string; mk: string; sq: string };
  timestamp: string;
  ipAddress: string;
}

export const activityLogs: ActivityLog[] = [
  { id: 'log-1', action: 'CREATE', module: 'incidents', userId: 'user-1', userName: 'Катерина Ангелова', details: { en: 'Reported new incident INC-2026-004', mk: 'Пријавен нов инцидент INC-2026-004', sq: 'Raportuar incident i ri INC-2026-004' }, timestamp: '2026-01-05T11:30:00', ipAddress: '192.168.1.45' },
  { id: 'log-2', action: 'UPDATE', module: 'employees', userId: 'user-2', userName: 'HR Admin', details: { en: 'Updated employee profile for Никола Стојановски', mk: 'Ажуриран профил на вработен за Никола Стојановски', sq: 'U përditësua profili i punonjësit për Никола Стојановски' }, timestamp: '2026-01-05T10:15:00', ipAddress: '192.168.1.10' },
  { id: 'log-3', action: 'CREATE', module: 'trainings', userId: 'user-3', userName: 'Горан Петров', details: { en: 'Scheduled new training session: Fire Safety', mk: 'Закажана нова сесија за обука: Противпожарна заштита', sq: 'U planifikua sesion i ri trajnimi: Mbrojtja nga zjarri' }, timestamp: '2026-01-04T14:20:00', ipAddress: '192.168.1.22' },
  { id: 'log-4', action: 'UPDATE', module: 'medical', userId: 'user-2', userName: 'HR Admin', details: { en: 'Updated medical exam results for Бујар Ахмети', mk: 'Ажурирани резултати од лекарски преглед за Бујар Ахмети', sq: 'U përditësuan rezultatet e ekzaminimit mjekësor për Бујар Ахмети' }, timestamp: '2026-01-04T09:45:00', ipAddress: '192.168.1.10' },
  { id: 'log-5', action: 'CREATE', module: 'equipment', userId: 'user-4', userName: 'Елена Трајковска', details: { en: 'Assigned new PPE to Фатмир Хоџа', mk: 'Доделена нова ЛЗС на Фатмир Хоџа', sq: 'U caktua PPE e re për Фатмир Хоџа' }, timestamp: '2026-01-03T16:30:00', ipAddress: '192.168.1.33' },
  { id: 'log-6', action: 'DELETE', module: 'documents', userId: 'user-3', userName: 'Горан Петров', details: { en: 'Archived outdated procedure document', mk: 'Архивиран застарен документ за процедура', sq: 'U arkivua dokument i vjetruar i procedurës' }, timestamp: '2026-01-03T11:00:00', ipAddress: '192.168.1.22' },
  { id: 'log-7', action: 'LOGIN', module: 'system', userId: 'user-1', userName: 'Драган Костов', details: { en: 'User logged in', mk: 'Корисникот се најави', sq: 'Përdoruesi u kyç' }, timestamp: '2026-01-03T08:00:00', ipAddress: '192.168.1.100' },
];

// ============ DASHBOARD STATS ============
export const dashboardStats = {
  totalEmployees: employees.filter(e => e.status === 'employed').length,
  totalCandidates: employees.filter(e => e.status === 'candidate').length,
  activeTrainings: 5,
  pendingExams: employeeMedicalExams.filter(e => e.status === 'expiring-soon').length,
  openIncidents: incidents.filter(i => i.status === 'open' || i.status === 'investigating').length,
  expiringTrainings: {
    tomorrow: 1,
    within30Days: employeeTrainings.filter(t => t.status === 'expiring-soon').length,
    expired: employeeTrainings.filter(t => t.status === 'expired').length,
  },
  expiringMedical: {
    tomorrow: 0,
    within30Days: employeeMedicalExams.filter(e => e.status === 'expiring-soon').length,
    expired: employeeMedicalExams.filter(e => e.status === 'expired').length,
  },
  expiringPPE: {
    tomorrow: 0,
    within30Days: employeePPE.filter(p => p.status === 'expiring-soon').length,
    expired: employeePPE.filter(p => p.status === 'expired').length,
  },
  lostWorkHours: incidents.reduce((sum, i) => sum + (i.daysLost || 0) * 8, 0),
  complianceRate: 87,
  trainingCompletionRate: 92,
  afrRate: 2.3,
  asrRate: 15.4,
};

// ============ CHART DATA ============
export const trainingCompletionData = [
  { month: 'Jul', completed: 45, scheduled: 52 },
  { month: 'Aug', completed: 38, scheduled: 40 },
  { month: 'Sep', completed: 52, scheduled: 55 },
  { month: 'Oct', completed: 48, scheduled: 50 },
  { month: 'Nov', completed: 41, scheduled: 45 },
  { month: 'Dec', completed: 35, scheduled: 38 },
];

export const incidentTrendData = [
  { month: 'Jul', injuries: 2, nearMiss: 5, propertyDamage: 1 },
  { month: 'Aug', injuries: 1, nearMiss: 3, propertyDamage: 2 },
  { month: 'Sep', injuries: 0, nearMiss: 4, propertyDamage: 0 },
  { month: 'Oct', injuries: 1, nearMiss: 2, propertyDamage: 1 },
  { month: 'Nov', injuries: 1, nearMiss: 3, propertyDamage: 0 },
  { month: 'Dec', injuries: 2, nearMiss: 1, propertyDamage: 1 },
];

export const complianceByDepartmentData = [
  { name: 'Ground Operations', compliance: 94 },
  { name: 'Security', compliance: 88 },
  { name: 'Maintenance', compliance: 91 },
  { name: 'Fuel Services', compliance: 85 },
  { name: 'Passenger Services', compliance: 82 },
];
