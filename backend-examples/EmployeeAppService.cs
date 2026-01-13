using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace SecuritySystem.Employees
{
    /// <summary>
    /// Application Service Implementation for Employee operations
    /// Location: SecuritySystem.Application/Employees/
    /// </summary>
    [Authorize] // Add appropriate permission attribute, e.g., [Authorize(SecuritySystemPermissions.Employees)]
    public class EmployeeAppService : ApplicationService, IEmployeeAppService
    {
        private readonly IRepository<Employee, Guid> _employeeRepository;

        public EmployeeAppService(IRepository<Employee, Guid> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<EmployeeDto> GetAsync(Guid id)
        {
            var employee = await _employeeRepository.GetAsync(id);
            return ObjectMapper.Map<Employee, EmployeeDto>(employee);
        }

        public async Task<PagedResultDto<EmployeeDto>> GetListAsync(GetEmployeeListInput input)
        {
            var queryable = await _employeeRepository.GetQueryableAsync();

            // Apply filters
            if (!string.IsNullOrWhiteSpace(input.Filter))
            {
                queryable = queryable.Where(e =>
                    e.FullName.Contains(input.Filter) ||
                    e.EmployeeId.Contains(input.Filter) ||
                    e.Email.Contains(input.Filter) ||
                    e.Position.Contains(input.Filter) ||
                    e.Department.Contains(input.Filter)
                );
            }

            if (input.Status.HasValue)
            {
                queryable = queryable.Where(e => e.Status == input.Status.Value);
            }

            if (!string.IsNullOrWhiteSpace(input.Department))
            {
                queryable = queryable.Where(e => e.Department == input.Department);
            }

            // Apply sorting
            if (!string.IsNullOrWhiteSpace(input.Sorting))
            {
                // Handle sorting - simplified example
                if (input.Sorting.Contains("fullName"))
                {
                    queryable = input.Sorting.Contains("desc")
                        ? queryable.OrderByDescending(e => e.FullName)
                        : queryable.OrderBy(e => e.FullName);
                }
            }
            else
            {
                queryable = queryable.OrderBy(e => e.FullName);
            }

            // Get total count
            var totalCount = queryable.Count();

            // Apply paging
            var employees = queryable
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToList();

            var employeeDtos = ObjectMapper.Map<List<Employee>, List<EmployeeDto>>(employees);

            return new PagedResultDto<EmployeeDto>(totalCount, employeeDtos);
        }

        public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto input)
        {
            // Check if employee ID already exists
            var existingEmployee = await _employeeRepository.FirstOrDefaultAsync(e => e.EmployeeId == input.EmployeeId);
            if (existingEmployee != null)
            {
                throw new InvalidOperationException($"Employee with ID {input.EmployeeId} already exists.");
            }

            var employee = new Employee(
                GuidGenerator.Create(),
                input.EmployeeId,
                input.FullName,
                input.Email,
                input.Phone,
                input.Position,
                input.Department
            )
            {
                FirstName = input.FirstName,
                LastName = input.LastName,
                FatherName = input.FatherName,
                PlaceOfBirth = input.PlaceOfBirth,
                Address = input.Address,
                DateOfBirth = input.DateOfBirth,
                Nationality = input.Nationality,
                Location = input.Location,
                Status = input.Status,
                HireDate = input.HireDate,
                RiskLevel = input.RiskLevel,
                Supervisor = input.Supervisor,
                Notes = input.Notes
            };

            await _employeeRepository.InsertAsync(employee);

            return ObjectMapper.Map<Employee, EmployeeDto>(employee);
        }

        public async Task<EmployeeDto> UpdateAsync(Guid id, UpdateEmployeeDto input)
        {
            var employee = await _employeeRepository.GetAsync(id);

            employee.FullName = input.FullName;
            employee.FirstName = input.FirstName;
            employee.LastName = input.LastName;
            employee.FatherName = input.FatherName;
            employee.Email = input.Email;
            employee.Phone = input.Phone;
            employee.Address = input.Address;
            employee.DateOfBirth = input.DateOfBirth;
            employee.Nationality = input.Nationality;
            employee.Position = input.Position;
            employee.Department = input.Department;
            employee.Location = input.Location;
            employee.Status = input.Status;
            employee.HireDate = input.HireDate;
            employee.RiskLevel = input.RiskLevel;
            employee.Supervisor = input.Supervisor;
            employee.Notes = input.Notes;
            employee.PerformanceNotes = input.PerformanceNotes;

            await _employeeRepository.UpdateAsync(employee);

            return ObjectMapper.Map<Employee, EmployeeDto>(employee);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _employeeRepository.DeleteAsync(id);
        }
    }
}

