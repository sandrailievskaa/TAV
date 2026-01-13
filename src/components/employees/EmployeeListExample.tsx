/**
 * EmployeeList Example Component
 * Proof of Concept - демонстрира интеграција со ABP backend API
 * 
 * Оваа компонента е пример како да се користи employeeApi за вчитување на податоци
 * Од ABP backend наместо mock data.
 */

import { useEffect, useState } from 'react';
import { employeeApi } from '@/services/api/employeeApi';
import { EmployeeDto, EmployeeStatus } from '@/types/api/employee.types';
import { ApiError } from '@/services/api/apiClient';

export const EmployeeListExample = () => {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await employeeApi.getList({ maxResultCount: 20 });
        setEmployees(result.items);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Failed to load employees');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.fullName} - {employee.email} - Status: {employee.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

