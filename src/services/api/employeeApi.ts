/**
 * Employee API Service
 * Handles all API calls related to Employee entity
 */

import apiClient from './apiClient';
import {
  EmployeeDto,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  GetEmployeeListInput,
  PagedResultDto,
} from '@/types/api/employee.types';

const EMPLOYEE_ENDPOINT = '/api/app/employees';

/**
 * Employee API Service
 */
export const employeeApi = {
  /**
   * GET /api/app/employees
   * Get paginated list of employees
   */
  getList: async (input?: GetEmployeeListInput): Promise<PagedResultDto<EmployeeDto>> => {
    return apiClient.get<PagedResultDto<EmployeeDto>>(EMPLOYEE_ENDPOINT, input);
  },

  /**
   * GET /api/app/employees/{id}
   * Get employee by ID
   */
  getById: async (id: string): Promise<EmployeeDto> => {
    return apiClient.get<EmployeeDto>(`${EMPLOYEE_ENDPOINT}/${id}`);
  },

  /**
   * POST /api/app/employees
   * Create a new employee
   */
  create: async (input: CreateEmployeeDto): Promise<EmployeeDto> => {
    return apiClient.post<EmployeeDto>(EMPLOYEE_ENDPOINT, input);
  },

  /**
   * PUT /api/app/employees/{id}
   * Update an existing employee
   */
  update: async (id: string, input: UpdateEmployeeDto): Promise<EmployeeDto> => {
    return apiClient.put<EmployeeDto>(`${EMPLOYEE_ENDPOINT}/${id}`, input);
  },

  /**
   * DELETE /api/app/employees/{id}
   * Delete an employee
   */
  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`${EMPLOYEE_ENDPOINT}/${id}`);
  },
};

export default employeeApi;

