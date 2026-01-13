using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SecuritySystem.Employees;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;

namespace SecuritySystem.Controllers
{
    /// <summary>
    /// REST API Controller for Employee operations
    /// Location: SecuritySystem.HttpApi/Controllers/
    /// </summary>
    [Route("api/app/employees")]
    public class EmployeesController : SecuritySystemController
    {
        private readonly IEmployeeAppService _employeeAppService;

        public EmployeesController(IEmployeeAppService employeeAppService)
        {
            _employeeAppService = employeeAppService;
        }

        /// <summary>
        /// GET /api/app/employees
        /// Get paginated list of employees
        /// </summary>
        [HttpGet]
        public async Task<PagedResultDto<EmployeeDto>> GetListAsync([FromQuery] GetEmployeeListInput input)
        {
            return await _employeeAppService.GetListAsync(input);
        }

        /// <summary>
        /// GET /api/app/employees/{id}
        /// Get employee by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<EmployeeDto> GetAsync(Guid id)
        {
            return await _employeeAppService.GetAsync(id);
        }

        /// <summary>
        /// POST /api/app/employees
        /// Create a new employee
        /// </summary>
        [HttpPost]
        public async Task<EmployeeDto> CreateAsync([FromBody] CreateEmployeeDto input)
        {
            return await _employeeAppService.CreateAsync(input);
        }

        /// <summary>
        /// PUT /api/app/employees/{id}
        /// Update an existing employee
        /// </summary>
        [HttpPut("{id}")]
        public async Task<EmployeeDto> UpdateAsync(Guid id, [FromBody] UpdateEmployeeDto input)
        {
            return await _employeeAppService.UpdateAsync(id, input);
        }

        /// <summary>
        /// DELETE /api/app/employees/{id}
        /// Delete an employee
        /// </summary>
        [HttpDelete("{id}")]
        public async Task DeleteAsync(Guid id)
        {
            await _employeeAppService.DeleteAsync(id);
        }
    }
}

