import { apiClient } from './client';

export interface TrainingDto {
  id: string;
  trainingId: string;
  employeeId: string;
  employeeName?: string;
  department?: string;
  position?: string;
  trainingName: string;
  trainingType: 'internal' | 'external';
  completionDate: string;
  expiryDate?: string;
  validityMonths: number;
  status: 'completed' | 'inProgress' | 'expired';
  instructor: string;
  certificateNumber?: string;
  daysUntilExpiry?: number;
  notes?: string;
  requiresReadAndSign: boolean;
  instructionsContent?: string;
  signedDate?: string;
  signedBy?: string;
}

export interface CreateUpdateTrainingDto {
  trainingId: string;
  employeeId: string;
  trainingName: string;
  trainingType: 'internal' | 'external';
  completionDate: string;
  validityMonths: number;
  instructor: string;
  certificateNumber?: string;
  notes?: string;
  requiresReadAndSign?: boolean;
  instructionsContent?: string;
}

interface AbpPagedResultDto<T> {
  totalCount: number;
  items: T[];
}

export const getTrainings = async (
  skipCount: number = 0,
  maxResultCount: number = 10,
  filter?: string,
  employeeId?: string
): Promise<AbpPagedResultDto<TrainingDto>> => {
  const params = new URLSearchParams({
    SkipCount: skipCount.toString(),
    MaxResultCount: maxResultCount.toString(),
  });
  
  if (filter) params.append('Filter', filter);
  if (employeeId) params.append('EmployeeId', employeeId);
  
  return apiClient.get<AbpPagedResultDto<TrainingDto>>(
    `/app/training?${params.toString()}`
  );
};

export const getTrainingById = async (id: string): Promise<TrainingDto> => {
  return apiClient.get<TrainingDto>(`/app/training/${id}`);
};

export const createTraining = async (
  data: CreateUpdateTrainingDto
): Promise<TrainingDto> => {
  return apiClient.post<TrainingDto>('/app/training', data);
};

export const updateTraining = async (
  id: string,
  data: CreateUpdateTrainingDto
): Promise<TrainingDto> => {
  return apiClient.put<TrainingDto>(`/app/training/${id}`, data);
};

export const deleteTraining = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/app/training/${id}`);
};

