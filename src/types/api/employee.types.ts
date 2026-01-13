/**
 * TypeScript Interfaces for Employee Entity
 * These interfaces match the DTOs from the ABP backend
 */

export enum EmployeeStatus {
  Active = 1,
  OnLeave = 2,
  Terminated = 3,
  Candidate = 4,
}

export enum RiskLevel {
  Low = 1,
  Medium = 2,
  High = 3,
}

/**
 * Employee DTO - matches EmployeeDto from backend
 */
export interface EmployeeDto {
  id: string;
  employeeId: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  fatherName?: string;
  placeOfBirth?: string;
  photo?: string;
  position: string;
  department: string;
  location?: string;
  status: EmployeeStatus;
  hireDate?: string; // ISO date string
  email: string;
  phone: string;
  address: string;
  dateOfBirth?: string; // ISO date string
  nationality: string;
  riskLevel: RiskLevel;
  supervisor?: string;
  notes?: string;
  performanceNotes?: string;
  creationTime?: string;
  lastModificationTime?: string;
  creatorId?: string;
  lastModifierId?: string;
}

/**
 * DTO for creating a new employee - matches CreateEmployeeDto from backend
 */
export interface CreateEmployeeDto {
  employeeId: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  fatherName?: string;
  placeOfBirth?: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth?: string; // ISO date string
  nationality: string;
  position: string;
  department: string;
  location?: string;
  status: EmployeeStatus;
  hireDate?: string; // ISO date string
  riskLevel: RiskLevel;
  supervisor?: string;
  notes?: string;
}

/**
 * DTO for updating an existing employee - matches UpdateEmployeeDto from backend
 */
export interface UpdateEmployeeDto {
  fullName: string;
  firstName?: string;
  lastName?: string;
  fatherName?: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth?: string; // ISO date string
  nationality: string;
  position: string;
  department: string;
  location?: string;
  status: EmployeeStatus;
  hireDate?: string; // ISO date string
  riskLevel: RiskLevel;
  supervisor?: string;
  notes?: string;
  performanceNotes?: string;
}

/**
 * Input DTO for getting paginated list - matches GetEmployeeListInput from backend
 */
export interface GetEmployeeListInput {
  filter?: string;
  status?: EmployeeStatus;
  department?: string;
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
}

/**
 * Paginated result DTO - matches PagedResultDto from ABP
 */
export interface PagedResultDto<T> {
  totalCount: number;
  items: T[];
}

/**
 * API Response wrapper for error handling
 */
export interface ApiResponse<T> {
  data?: T;
  error?: {
    code?: string;
    message?: string;
    details?: string;
  };
}

