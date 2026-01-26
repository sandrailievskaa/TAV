using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Test.Employees;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.Employees;

public class EmployeeAppService :
    CrudAppService<
        Employee,
        EmployeeDto,
        Guid,
        GetEmployeeListDto,
        CreateUpdateEmployeeDto>,
    IEmployeeAppService
{
    public EmployeeAppService(IRepository<Employee, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<EmployeeDto> MapToGetOutputDtoAsync(Employee entity)
    {
        var dto = await base.MapToGetOutputDtoAsync(entity);
        dto.FullName = entity.FullName;
        
        if (!string.IsNullOrEmpty(entity.Qualifications))
        {
            try
            {
                dto.Qualifications = JsonSerializer.Deserialize<List<string>>(entity.Qualifications) ?? new List<string>();
            }
            catch
            {
                dto.Qualifications = new List<string>();
            }
        }
        
        return dto;
    }

    protected override async Task<Employee> MapToEntityAsync(CreateUpdateEmployeeDto createInput)
    {
        var entity = await base.MapToEntityAsync(createInput);
        
        if (createInput.Qualifications != null && createInput.Qualifications.Any())
        {
            entity.Qualifications = JsonSerializer.Serialize(createInput.Qualifications);
        }
        
        return entity;
    }

    protected override async Task MapToEntityAsync(CreateUpdateEmployeeDto updateInput, Employee entity)
    {
        await base.MapToEntityAsync(updateInput, entity);
        
        if (updateInput.Qualifications != null && updateInput.Qualifications.Any())
        {
            entity.Qualifications = JsonSerializer.Serialize(updateInput.Qualifications);
        }
    }
}

