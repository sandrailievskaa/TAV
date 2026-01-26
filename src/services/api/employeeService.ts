import { apiClient } from './client';

export interface EmployeeDto {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  fatherName?: string;
  placeOfBirth?: string;
  photo?: string;
  position: string;
  department: string;
  location?: string;
  status: 'active' | 'onLeave' | 'terminated' | 'candidate';
  hireDate?: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  nationality: string;
  qualifications: string[];
  riskLevel: 'low' | 'medium' | 'high';
  supervisor?: string;
  notes?: string;
  performanceNotes?: string;
  creationTime?: string;
  lastModificationTime?: string;
}

export interface CreateUpdateEmployeeDto {
  employeeId: string;
  firstName: string;
  lastName: string;
  fatherName?: string;
  placeOfBirth?: string;
  photo?: string;
  position: string;
  department: string;
  location?: string;
  status: 'active' | 'onLeave' | 'terminated' | 'candidate';
  hireDate?: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  nationality: string;
  qualifications?: string[];
  riskLevel: 'low' | 'medium' | 'high';
  supervisor?: string;
  notes?: string;
  performanceNotes?: string;
}

interface AbpPagedResultDto<T> {
  totalCount: number;
  items: T[];
}

export const getEmployees = async (
  skipCount: number = 0,
  maxResultCount: number = 10,
  filter?: string,
  department?: string,
  status?: string,
  riskLevel?: string
): Promise<AbpPagedResultDto<EmployeeDto>> => {
  const params = new URLSearchParams({
    SkipCount: skipCount.toString(),
    MaxResultCount: maxResultCount.toString(),
  });
  
  if (filter) params.append('Filter', filter);
  if (department) params.append('Department', department);
  if (status) params.append('Status', status);
  if (riskLevel) params.append('RiskLevel', riskLevel);
  
  return apiClient.get<AbpPagedResultDto<EmployeeDto>>(
    `/app/employee?${params.toString()}`
  );
};

export const getEmployeeById = async (id: string): Promise<EmployeeDto> => {
  return apiClient.get<EmployeeDto>(`/app/employee/${id}`);
};

export const createEmployee = async (
  data: CreateUpdateEmployeeDto
): Promise<EmployeeDto> => {
  return apiClient.post<EmployeeDto>('/app/employee', data);
};

export const updateEmployee = async (
  id: string,
  data: CreateUpdateEmployeeDto
): Promise<EmployeeDto> => {
  return apiClient.put<EmployeeDto>(`/app/employee/${id}`, data);
};

export const deleteEmployee = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/app/employee/${id}`);
};

