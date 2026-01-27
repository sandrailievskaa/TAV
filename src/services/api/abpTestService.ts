import { apiClient } from './client';

export interface TestDto {
  id: string;
  name: string;
  age: number;
  creationTime?: string;
  lastModificationTime?: string;
}

export interface CreateTestDto {
  name: string;
  age: number;
}

interface AbpPagedResultDto<T> {
  totalCount: number;
  items: T[];
}

export const getTests = async (): Promise<TestDto[]> => {
  const response = await apiClient.get<AbpPagedResultDto<TestDto>>(
    '/app/test?SkipCount=0&MaxResultCount=100'
  );
  return response.items || [];
};

export const createTest = async (data: CreateTestDto): Promise<TestDto> => {
  return apiClient.post<TestDto>('/app/test', data);
};

export const deleteTest = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/app/test/${id}`);
};



