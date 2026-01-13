using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace SecuritySystem.Employees
{
    /// <summary>
    /// Application Service Interface for Employee operations
    /// Location: SecuritySystem.Application.Contracts/Employees/
    /// </summary>
    public interface IEmployeeAppService : IApplicationService
    {
        /// <summary>
        /// Get employee by ID
        /// </summary>
        Task<EmployeeDto> GetAsync(Guid id);

        /// <summary>
        /// Get paginated list of employees
        /// </summary>
        Task<PagedResultDto<EmployeeDto>> GetListAsync(GetEmployeeListInput input);

        /// <summary>
        /// Create a new employee
        /// </summary>
        Task<EmployeeDto> CreateAsync(CreateEmployeeDto input);

        /// <summary>
        /// Update an existing employee
        /// </summary>
        Task<EmployeeDto> UpdateAsync(Guid id, UpdateEmployeeDto input);

        /// <summary>
        /// Delete an employee
        /// </summary>
        Task DeleteAsync(Guid id);
    }
}

