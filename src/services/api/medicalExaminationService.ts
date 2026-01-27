import { apiClient } from './client';

export interface MedicalExaminationDto {
  id: string;
  examId: string;
  employeeId: string;
  employeeName?: string;
  department?: string;
  position?: string;
  examType: 'preEmployment' | 'systematic' | 'periodic' | 'targeted';
  examDate: string;
  validUntil: string;
  validityMonths: number;
  doctor: string;
  result: 'passed' | 'failed' | 'pending';
  status: 'valid' | 'expiringSoon' | 'expired';
  daysUntilExpiry: number;
  notes?: string;
}

export interface CreateUpdateMedicalExaminationDto {
  examId: string;
  employeeId: string;
  examType: 'preEmployment' | 'systematic' | 'periodic' | 'targeted';
  examDate: string;
  validUntil: string;
  validityMonths: number;
  doctor: string;
  result: 'passed' | 'failed' | 'pending';
  notes?: string;
}

interface AbpPagedResultDto<T> {
  totalCount: number;
  items: T[];
}

export const getMedicalExaminations = async (
  skipCount: number = 0,
  maxResultCount: number = 10,
  filter?: string,
  employeeId?: string
): Promise<AbpPagedResultDto<MedicalExaminationDto>> => {
  const params = new URLSearchParams({
    SkipCount: skipCount.toString(),
    MaxResultCount: maxResultCount.toString(),
  });
  
  if (filter) params.append('Filter', filter);
  if (employeeId) params.append('EmployeeId', employeeId);
  
  return apiClient.get<AbpPagedResultDto<MedicalExaminationDto>>(
    `/app/medical-examination?${params.toString()}`
  );
};

export const getMedicalExaminationById = async (id: string): Promise<MedicalExaminationDto> => {
  return apiClient.get<MedicalExaminationDto>(`/app/medical-examination/${id}`);
};

export const createMedicalExamination = async (
  data: CreateUpdateMedicalExaminationDto
): Promise<MedicalExaminationDto> => {
  return apiClient.post<MedicalExaminationDto>('/app/medical-examination', data);
};

export const updateMedicalExamination = async (
  id: string,
  data: CreateUpdateMedicalExaminationDto
): Promise<MedicalExaminationDto> => {
  return apiClient.put<MedicalExaminationDto>(`/app/medical-examination/${id}`, data);
};

export const deleteMedicalExamination = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/app/medical-examination/${id}`);
};



