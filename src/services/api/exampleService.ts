import { apiClient } from './client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * EXAMPLE SERVICE - Proof of Concept
 * Ова е пример за како да се креира service за еден ентитет
 * 
 * Структура:
 * 1. TypeScript типови (генерирани од OpenAPI schema)
 * 2. API функции
 * 3. React Query hooks
 */

// Привремени типови - ќе се заменат со генерираните од OpenAPI
// Кога го генерирате schema.d.ts, користите ги типовите од таму
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

// ========== API Functions ==========

/**
 * Get all entities (with pagination)
 */
export const getExampleEntities = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<ExampleEntity>> => {
  return apiClient.get<PaginatedResponse<ExampleEntity>>(
    `/ExampleEntity?page=${page}&pageSize=${pageSize}`
  );
};

/**
 * Get single entity by ID
 */
export const getExampleEntityById = async (id: string): Promise<ExampleEntity> => {
  return apiClient.get<ExampleEntity>(`/ExampleEntity/${id}`);
};

/**
 * Create new entity
 */
export const createExampleEntity = async (
  data: CreateExampleEntityDto
): Promise<ExampleEntity> => {
  return apiClient.post<ExampleEntity>('/ExampleEntity', data);
};

/**
 * Update entity
 */
export const updateExampleEntity = async (
  id: string,
  data: UpdateExampleEntityDto
): Promise<ExampleEntity> => {
  return apiClient.put<ExampleEntity>(`/ExampleEntity/${id}`, data);
};

/**
 * Delete entity
 */
export const deleteExampleEntity = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/ExampleEntity/${id}`);
};

// ========== React Query Hooks ==========

/**
 * Query key factory - централизирано управување со query keys
 */
export const exampleKeys = {
  all: ['example'] as const,
  lists: () => [...exampleKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) =>
    [...exampleKeys.lists(), page, pageSize] as const,
  details: () => [...exampleKeys.all, 'detail'] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};

/**
 * Hook: Get all entities
 */
export const useExampleEntities = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: exampleKeys.list(page, pageSize),
    queryFn: () => getExampleEntities(page, pageSize),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook: Get single entity
 */
export const useExampleEntity = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: () => getExampleEntityById(id),
    enabled: enabled && !!id,
  });
};

/**
 * Hook: Create entity mutation
 */
export const useCreateExampleEntity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExampleEntity,
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
      // Може да додадете toast за success
      // toast.success('Успешно креиран запис');
    },
  });
};

/**
 * Hook: Update entity mutation
 */
export const useUpdateExampleEntity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExampleEntityDto }) =>
      updateExampleEntity(id, data),
    onSuccess: (data, variables) => {
      // Update cache for specific item
      queryClient.setQueryData(exampleKeys.detail(variables.id), data);
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
};

/**
 * Hook: Delete entity mutation
 */
export const useDeleteExampleEntity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExampleEntity,
    onSuccess: () => {
      // Invalidate all list queries
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
};

/**
 * USAGE EXAMPLE:
 * 
 * // In your component:
 * const { data, isLoading, error } = useExampleEntities(1, 10);
 * const createMutation = useCreateExampleEntity();
 * 
 * const handleCreate = async () => {
 *   try {
 *     await createMutation.mutateAsync({
 *       name: 'New Entity',
 *       description: 'Description'
 *     });
 *   } catch (error) {
 *     // Error is already handled by API client interceptor
 *     // But you can add custom handling here if needed
 *   }
 * };
 */
