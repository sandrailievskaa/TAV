import { apiClient } from './client';

export interface CorrectiveActionDto {
  id: string;
  incidentId: string;
  action: string;
  responsible: string;
  dueDate: string;
  status: 'pending' | 'completed';
  completedDate?: string;
}

export interface IncidentAttachmentDto {
  id: string;
  incidentId: string;
  name: string;
  type: string;
  fileSize: string;
  uploadedBy: string;
}

export interface IncidentDto {
  id: string;
  incidentId: string;
  type: 'injury' | 'incident' | 'nearMiss';
  date: string;
  time: string;
  location: string;
  employeeId: string;
  employeeName?: string;
  department?: string;
  position?: string;
  description: string;
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  status: 'reported' | 'underInvestigation' | 'resolved' | 'closed';
  reportedBy: string;
  reportedByPosition: string;
  treatmentType: 'noTreatment' | 'firstAid' | 'medicalTreatment' | 'hospitalization';
  lostWorkHours: number;
  lostWorkDays: number;
  rootCause: string;
  contributingFactors: string[];
  medicalCosts?: number;
  equipmentDamage?: number;
  investigationCosts?: number;
  correctiveActionCosts?: number;
  lostProductivity?: number;
  totalBudgetImpact?: number;
  correctiveActions: CorrectiveActionDto[];
  attachments: IncidentAttachmentDto[];
}

export interface CreateUpdateIncidentDto {
  incidentId: string;
  type: 'injury' | 'incident' | 'nearMiss';
  date: string;
  time: string;
  location: string;
  employeeId: string;
  description: string;
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  reportedBy: string;
  reportedByPosition: string;
  treatmentType: 'noTreatment' | 'firstAid' | 'medicalTreatment' | 'hospitalization';
  lostWorkHours: number;
  lostWorkDays: number;
  rootCause: string;
  contributingFactors?: string[];
  medicalCosts?: number;
  equipmentDamage?: number;
  investigationCosts?: number;
  correctiveActionCosts?: number;
  lostProductivity?: number;
}

interface AbpPagedResultDto<T> {
  totalCount: number;
  items: T[];
}

export const getIncidents = async (
  skipCount: number = 0,
  maxResultCount: number = 10,
  filter?: string,
  employeeId?: string
): Promise<AbpPagedResultDto<IncidentDto>> => {
  const params = new URLSearchParams({
    SkipCount: skipCount.toString(),
    MaxResultCount: maxResultCount.toString(),
  });
  
  if (filter) params.append('Filter', filter);
  if (employeeId) params.append('EmployeeId', employeeId);
  
  return apiClient.get<AbpPagedResultDto<IncidentDto>>(
    `/app/incident?${params.toString()}`
  );
};

export const getIncidentById = async (id: string): Promise<IncidentDto> => {
  return apiClient.get<IncidentDto>(`/app/incident/${id}`);
};

export const createIncident = async (
  data: CreateUpdateIncidentDto
): Promise<IncidentDto> => {
  return apiClient.post<IncidentDto>('/app/incident', data);
};

export const updateIncident = async (
  id: string,
  data: CreateUpdateIncidentDto
): Promise<IncidentDto> => {
  return apiClient.put<IncidentDto>(`/app/incident/${id}`, data);
};

export const deleteIncident = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/app/incident/${id}`);
};

