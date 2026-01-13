/**
 * Zod Validation Schemas for Employee Entity
 * Frontend validation schemas that match backend validation rules
 */

import { z } from 'zod';
import { EmployeeStatus, RiskLevel } from '@/types/api/employee.types';

/**
 * Schema for creating a new employee
 * Matches CreateEmployeeDto validation rules
 */
export const createEmployeeSchema = z.object({
  employeeId: z.string()
    .min(1, 'Employee ID is required')
    .max(50, 'Employee ID cannot exceed 50 characters'),
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(256, 'Full name cannot exceed 256 characters'),
  firstName: z.string().max(128).optional(),
  lastName: z.string().max(128).optional(),
  fatherName: z.string().max(128).optional(),
  placeOfBirth: z.string().max(128).optional(),
  email: z.string()
    .email('Invalid email format')
    .max(256, 'Email cannot exceed 256 characters'),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .max(50, 'Phone cannot exceed 50 characters'),
  address: z.string().max(512).optional(),
  dateOfBirth: z.string().optional(), // ISO date string
  nationality: z.string().max(128).optional(),
  position: z.string()
    .min(1, 'Position is required')
    .max(128, 'Position cannot exceed 128 characters'),
  department: z.string()
    .min(1, 'Department is required')
    .max(128, 'Department cannot exceed 128 characters'),
  location: z.string().max(128).optional(),
  status: z.nativeEnum(EmployeeStatus).default(EmployeeStatus.Active),
  hireDate: z.string().optional(), // ISO date string
  riskLevel: z.nativeEnum(RiskLevel).default(RiskLevel.Low),
  supervisor: z.string().max(256).optional(),
  notes: z.string().optional(),
});

/**
 * Schema for updating an existing employee
 * Matches UpdateEmployeeDto validation rules
 */
export const updateEmployeeSchema = z.object({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(256, 'Full name cannot exceed 256 characters'),
  firstName: z.string().max(128).optional(),
  lastName: z.string().max(128).optional(),
  fatherName: z.string().max(128).optional(),
  email: z.string()
    .email('Invalid email format')
    .max(256, 'Email cannot exceed 256 characters'),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .max(50, 'Phone cannot exceed 50 characters'),
  address: z.string().max(512).optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().max(128).optional(),
  position: z.string()
    .min(1, 'Position is required')
    .max(128, 'Position cannot exceed 128 characters'),
  department: z.string()
    .min(1, 'Department is required')
    .max(128, 'Department cannot exceed 128 characters'),
  location: z.string().max(128).optional(),
  status: z.nativeEnum(EmployeeStatus),
  hireDate: z.string().optional(),
  riskLevel: z.nativeEnum(RiskLevel),
  supervisor: z.string().max(256).optional(),
  notes: z.string().optional(),
  performanceNotes: z.string().optional(),
});

/**
 * Infer TypeScript types from schemas
 */
export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeFormData = z.infer<typeof updateEmployeeSchema>;

