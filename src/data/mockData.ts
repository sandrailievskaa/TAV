// Realistic mock data for TAV Airport Management System

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  gate: string;
  terminal: string;
  aircraft: string;
  status: 'on-time' | 'delayed' | 'cancelled' | 'boarding' | 'landed';
  passengers: number;
}

export interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  passport: string;
  nationality: string;
  flightNumber: string;
  bookingRef: string;
  seatNumber: string;
  class: 'Economy' | 'Business' | 'First';
  status: 'checked-in' | 'boarded' | 'pending';
}

export interface Staff {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  shift: 'Morning' | 'Afternoon' | 'Night';
  status: 'active' | 'on-leave' | 'off-duty';
  hireDate: string;
  supervisor: string;
}

export interface Vehicle {
  id: string;
  vehicleId: string;
  type: string;
  licensePlate: string;
  assignedTo: string;
  location: string;
  fuelLevel: number;
  status: 'active' | 'maintenance' | 'idle';
  lastService: string;
  nextService: string;
}

export interface Activity {
  id: string;
  type: 'flight' | 'passenger' | 'staff' | 'vehicle' | 'system';
  message: string;
  timestamp: string;
  user: string;
}

export const flights: Flight[] = [
  {
    id: '1',
    flightNumber: 'TK1001',
    airline: 'Turkish Airlines',
    origin: 'Istanbul (IST)',
    destination: 'Skopje (SKP)',
    departure: '08:30',
    arrival: '09:45',
    gate: 'A12',
    terminal: 'T1',
    aircraft: 'Airbus A320',
    status: 'on-time',
    passengers: 156,
  },
  {
    id: '2',
    flightNumber: 'W64521',
    airline: 'Wizz Air',
    origin: 'Skopje (SKP)',
    destination: 'Vienna (VIE)',
    departure: '10:15',
    arrival: '11:30',
    gate: 'B5',
    terminal: 'T1',
    aircraft: 'Airbus A321',
    status: 'boarding',
    passengers: 189,
  },
  {
    id: '3',
    flightNumber: 'LH1234',
    airline: 'Lufthansa',
    origin: 'Frankfurt (FRA)',
    destination: 'Skopje (SKP)',
    departure: '12:00',
    arrival: '14:30',
    gate: 'A8',
    terminal: 'T1',
    aircraft: 'Boeing 737-800',
    status: 'delayed',
    passengers: 142,
  },
  {
    id: '4',
    flightNumber: 'OS847',
    airline: 'Austrian Airlines',
    origin: 'Skopje (SKP)',
    destination: 'Vienna (VIE)',
    departure: '15:20',
    arrival: '16:35',
    gate: 'B2',
    terminal: 'T1',
    aircraft: 'Embraer E195',
    status: 'on-time',
    passengers: 98,
  },
  {
    id: '5',
    flightNumber: 'TK1003',
    airline: 'Turkish Airlines',
    origin: 'Skopje (SKP)',
    destination: 'Istanbul (IST)',
    departure: '18:45',
    arrival: '20:00',
    gate: 'A10',
    terminal: 'T1',
    aircraft: 'Airbus A320',
    status: 'on-time',
    passengers: 167,
  },
  {
    id: '6',
    flightNumber: 'FR8823',
    airline: 'Ryanair',
    origin: 'Milan (BGY)',
    destination: 'Skopje (SKP)',
    departure: '21:30',
    arrival: '23:45',
    gate: 'C1',
    terminal: 'T2',
    aircraft: 'Boeing 737 MAX 8',
    status: 'on-time',
    passengers: 185,
  },
];

export const passengers: Passenger[] = [
  {
    id: '1',
    name: 'Aleksandar Petrovski',
    email: 'a.petrovski@email.com',
    phone: '+389 70 234 567',
    passport: 'MK1234567',
    nationality: 'Macedonian',
    flightNumber: 'TK1001',
    bookingRef: 'ABC123',
    seatNumber: '12A',
    class: 'Business',
    status: 'checked-in',
  },
  {
    id: '2',
    name: 'Maria Stojanovic',
    email: 'm.stojanovic@email.com',
    phone: '+389 71 345 678',
    passport: 'MK2345678',
    nationality: 'Macedonian',
    flightNumber: 'W64521',
    bookingRef: 'DEF456',
    seatNumber: '24C',
    class: 'Economy',
    status: 'boarded',
  },
  {
    id: '3',
    name: 'Hans Mueller',
    email: 'h.mueller@email.de',
    phone: '+49 151 234 5678',
    passport: 'DE9876543',
    nationality: 'German',
    flightNumber: 'LH1234',
    bookingRef: 'GHI789',
    seatNumber: '3A',
    class: 'First',
    status: 'pending',
  },
  {
    id: '4',
    name: 'Elena Trajkovska',
    email: 'e.trajkovska@email.com',
    phone: '+389 72 456 789',
    passport: 'MK3456789',
    nationality: 'Macedonian',
    flightNumber: 'OS847',
    bookingRef: 'JKL012',
    seatNumber: '18B',
    class: 'Economy',
    status: 'checked-in',
  },
  {
    id: '5',
    name: 'Fatmir Hoxha',
    email: 'f.hoxha@email.com',
    phone: '+383 44 567 890',
    passport: 'XK4567890',
    nationality: 'Kosovar',
    flightNumber: 'TK1003',
    bookingRef: 'MNO345',
    seatNumber: '7F',
    class: 'Business',
    status: 'pending',
  },
];

export const staff: Staff[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'Marko Nikolovski',
    email: 'm.nikolovski@tav.com.mk',
    phone: '+389 70 111 222',
    department: 'Operations',
    position: 'Shift Manager',
    shift: 'Morning',
    status: 'active',
    hireDate: '2018-03-15',
    supervisor: 'Dragan Kostov',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Ana Dimitrova',
    email: 'a.dimitrova@tav.com.mk',
    phone: '+389 71 222 333',
    department: 'Customer Service',
    position: 'Check-in Agent',
    shift: 'Morning',
    status: 'active',
    hireDate: '2020-06-01',
    supervisor: 'Marko Nikolovski',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Stefan Jovanov',
    email: 's.jovanov@tav.com.mk',
    phone: '+389 72 333 444',
    department: 'Security',
    position: 'Security Officer',
    shift: 'Afternoon',
    status: 'active',
    hireDate: '2019-09-20',
    supervisor: 'Vlado Mitrovski',
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'Katerina Angelova',
    email: 'k.angelova@tav.com.mk',
    phone: '+389 70 444 555',
    department: 'Ground Handling',
    position: 'Ramp Agent',
    shift: 'Night',
    status: 'on-leave',
    hireDate: '2021-01-10',
    supervisor: 'Marko Nikolovski',
  },
  {
    id: '5',
    employeeId: 'EMP005',
    name: 'Bujar Ahmeti',
    email: 'b.ahmeti@tav.com.mk',
    phone: '+389 71 555 666',
    department: 'Maintenance',
    position: 'Technician',
    shift: 'Morning',
    status: 'active',
    hireDate: '2017-11-05',
    supervisor: 'Goran Petrov',
  },
];

export const vehicles: Vehicle[] = [
  {
    id: '1',
    vehicleId: 'VH001',
    type: 'Baggage Tractor',
    licensePlate: 'SK-1234-AB',
    assignedTo: 'Ground Handling',
    location: 'Apron A',
    fuelLevel: 85,
    status: 'active',
    lastService: '2024-12-15',
    nextService: '2025-01-15',
  },
  {
    id: '2',
    vehicleId: 'VH002',
    type: 'Passenger Bus',
    licensePlate: 'SK-2345-CD',
    assignedTo: 'Passenger Services',
    location: 'Terminal 1',
    fuelLevel: 62,
    status: 'active',
    lastService: '2024-12-20',
    nextService: '2025-01-20',
  },
  {
    id: '3',
    vehicleId: 'VH003',
    type: 'Fuel Truck',
    licensePlate: 'SK-3456-EF',
    assignedTo: 'Fuel Services',
    location: 'Fuel Depot',
    fuelLevel: 95,
    status: 'active',
    lastService: '2024-12-10',
    nextService: '2025-01-10',
  },
  {
    id: '4',
    vehicleId: 'VH004',
    type: 'Catering Truck',
    licensePlate: 'SK-4567-GH',
    assignedTo: 'Catering',
    location: 'Gate B5',
    fuelLevel: 45,
    status: 'maintenance',
    lastService: '2024-11-25',
    nextService: '2025-01-25',
  },
  {
    id: '5',
    vehicleId: 'VH005',
    type: 'De-icing Vehicle',
    licensePlate: 'SK-5678-IJ',
    assignedTo: 'Winter Operations',
    location: 'Hangar 2',
    fuelLevel: 78,
    status: 'idle',
    lastService: '2024-12-01',
    nextService: '2025-02-01',
  },
];

export const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'flight',
    message: 'Flight TK1001 departed from Gate A12',
    timestamp: '10 min ago',
    user: 'System',
  },
  {
    id: '2',
    type: 'passenger',
    message: 'Passenger Hans Mueller checked in for LH1234',
    timestamp: '25 min ago',
    user: 'Ana Dimitrova',
  },
  {
    id: '3',
    type: 'vehicle',
    message: 'Vehicle VH004 marked for maintenance',
    timestamp: '1 hour ago',
    user: 'Bujar Ahmeti',
  },
  {
    id: '4',
    type: 'staff',
    message: 'Shift change completed for Morning shift',
    timestamp: '2 hours ago',
    user: 'Marko Nikolovski',
  },
  {
    id: '5',
    type: 'system',
    message: 'Daily backup completed successfully',
    timestamp: '3 hours ago',
    user: 'System',
  },
  {
    id: '6',
    type: 'flight',
    message: 'Flight LH1234 delayed by 45 minutes',
    timestamp: '4 hours ago',
    user: 'System',
  },
];

export const dashboardStats = {
  totalFlights: 24,
  flightsChange: '+3',
  activePassengers: 1847,
  passengersChange: '+12%',
  staffOnDuty: 156,
  staffChange: '0',
  vehiclesActive: 42,
  vehiclesChange: '-2',
};

export const passengerFlowData = [
  { hour: '06:00', arrivals: 120, departures: 85 },
  { hour: '08:00', arrivals: 340, departures: 290 },
  { hour: '10:00', arrivals: 280, departures: 420 },
  { hour: '12:00', arrivals: 190, departures: 310 },
  { hour: '14:00', arrivals: 250, departures: 280 },
  { hour: '16:00', arrivals: 380, departures: 350 },
  { hour: '18:00', arrivals: 420, departures: 390 },
  { hour: '20:00', arrivals: 280, departures: 240 },
  { hour: '22:00', arrivals: 150, departures: 120 },
];

export const flightStatusDistribution = [
  { name: 'On Time', value: 18, color: 'hsl(var(--success))' },
  { name: 'Delayed', value: 4, color: 'hsl(var(--warning))' },
  { name: 'Cancelled', value: 1, color: 'hsl(var(--destructive))' },
  { name: 'Boarding', value: 1, color: 'hsl(var(--accent))' },
];
