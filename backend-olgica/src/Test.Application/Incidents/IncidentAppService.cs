using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Test.Employees;
using Test.Incidents;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.Incidents;

public class IncidentAppService :
    CrudAppService<
        Incident,
        IncidentDto,
        Guid,
        GetIncidentListDto,
        CreateUpdateIncidentDto>,
    IIncidentAppService
{
    public IncidentAppService(IRepository<Incident, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<Incident>> CreateFilteredQueryAsync(GetIncidentListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x =>
                x.IncidentId.Contains(input.Filter) ||
                x.Description.Contains(input.Filter) ||
                x.Location.Contains(input.Filter));
        }

        if (input.EmployeeId.HasValue)
        {
            query = query.Where(x => x.EmployeeId == input.EmployeeId.Value);
        }

        if (input.Type.HasValue)
        {
            query = query.Where(x => x.Type == input.Type.Value);
        }

        if (input.Severity.HasValue)
        {
            query = query.Where(x => x.Severity == input.Severity.Value);
        }

        if (input.Status.HasValue)
        {
            query = query.Where(x => x.Status == input.Status.Value);
        }

        return query;
    }

    protected override async Task<IncidentDto> MapToGetOutputDtoAsync(Incident entity)
    {
        var dto = await base.MapToGetOutputDtoAsync(entity);
        dto.TotalBudgetImpact = entity.TotalBudgetImpact;
        
        if (!string.IsNullOrEmpty(entity.ContributingFactors))
        {
            try
            {
                dto.ContributingFactors = JsonSerializer.Deserialize<List<string>>(entity.ContributingFactors) ?? new List<string>();
            }
            catch
            {
                dto.ContributingFactors = new List<string>();
            }
        }
        
        return dto;
    }

    protected override async Task<Incident> MapToEntityAsync(CreateUpdateIncidentDto createInput)
    {
        var entity = await base.MapToEntityAsync(createInput);
        
        if (createInput.ContributingFactors != null && createInput.ContributingFactors.Any())
        {
            entity.ContributingFactors = JsonSerializer.Serialize(createInput.ContributingFactors);
        }
        
        return entity;
    }

    protected override async Task MapToEntityAsync(CreateUpdateIncidentDto updateInput, Incident entity)
    {
        await base.MapToEntityAsync(updateInput, entity);
        
        if (updateInput.ContributingFactors != null && updateInput.ContributingFactors.Any())
        {
            entity.ContributingFactors = JsonSerializer.Serialize(updateInput.ContributingFactors);
        }
    }
}

