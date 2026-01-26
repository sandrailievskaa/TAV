using System;
using System.Linq;
using System.Threading.Tasks;
using Test.Employees;
using Test.PPE;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.PPE;

public class EmployeePPEAppService :
    CrudAppService<
        EmployeePPE,
        EmployeePPEDto,
        Guid,
        GetEmployeePPEListDto,
        CreateUpdateEmployeePPEDto>,
    IEmployeePPEAppService
{
    public EmployeePPEAppService(IRepository<EmployeePPE, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<EmployeePPE>> CreateFilteredQueryAsync(GetEmployeePPEListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x =>
                x.PPEItem.Contains(input.Filter) ||
                x.Type.Contains(input.Filter));
        }

        if (input.EmployeeId.HasValue)
        {
            query = query.Where(x => x.EmployeeId == input.EmployeeId.Value);
        }

        if (input.Status.HasValue)
        {
            query = query.Where(x => x.Status == input.Status.Value);
        }

        return query;
    }

    protected override async Task<EmployeePPEDto> MapToGetOutputDtoAsync(EmployeePPE entity)
    {
        var dto = await base.MapToGetOutputDtoAsync(entity);
        dto.DaysUntilExpiry = entity.DaysUntilExpiry;
        return dto;
    }
}

