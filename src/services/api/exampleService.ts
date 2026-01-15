import { apiClient } from './client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface ExampleEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateExampleEntityDto {
  name: string;
  description?: string;
}

export interface UpdateExampleEntityDto {
  name?: string;
  description?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export const getExampleEntities = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<ExampleEntity>> => {
  return apiClient.get<PaginatedResponse<ExampleEntity>>(
    `/ExampleEntity?page=${page}&pageSize=${pageSize}`
  );
};

export const getExampleEntityById = async (id: string): Promise<ExampleEntity> => {
  return apiClient.get<ExampleEntity>(`/ExampleEntity/${id}`);
};

export const createExampleEntity = async (
  data: CreateExampleEntityDto
): Promise<ExampleEntity> => {
  return apiClient.post<ExampleEntity>('/ExampleEntity', data);
};

export const updateExampleEntity = async (
  id: string,
  data: UpdateExampleEntityDto
): Promise<ExampleEntity> => {
  return apiClient.put<ExampleEntity>(`/ExampleEntity/${id}`, data);
};

export const deleteExampleEntity = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/ExampleEntity/${id}`);
};

export const exampleKeys = {
  all: ['example'] as const,
  lists: () => [...exampleKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) =>
    [...exampleKeys.lists(), page, pageSize] as const,
  details: () => [...exampleKeys.all, 'detail'] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};

export const useExampleEntities = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: exampleKeys.list(page, pageSize),
    queryFn: () => getExampleEntities(page, pageSize),
    staleTime: 30000,
  });
};

export const useExampleEntity = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: () => getExampleEntityById(id),
    enabled: enabled && !!id,
  });
};

export const useCreateExampleEntity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExampleEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
};

export const useUpdateExampleEntity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExampleEntityDto }) =>
      updateExampleEntity(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(exampleKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
};

export const useDeleteExampleEntity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExampleEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
};

