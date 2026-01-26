using System;
using System.Linq;
using System.Threading.Tasks;
using Test.Positions;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.Positions;

public class PositionAppService :
    CrudAppService<
        Position,
        PositionDto,
        Guid,
        GetPositionListDto,
        CreateUpdatePositionDto>,
    IPositionAppService
{
    public PositionAppService(IRepository<Position, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<Position>> CreateFilteredQueryAsync(GetPositionListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x =>
                x.PositionName.Contains(input.Filter) ||
                x.Department.Contains(input.Filter) ||
                (x.Description != null && x.Description.Contains(input.Filter)));
        }

        if (!string.IsNullOrWhiteSpace(input.Department))
        {
            query = query.Where(x => x.Department == input.Department);
        }

        if (input.RiskLevel.HasValue)
        {
            query = query.Where(x => x.RiskLevel == input.RiskLevel.Value);
        }

        if (input.IsActive.HasValue)
        {
            query = query.Where(x => x.IsActive == input.IsActive.Value);
        }

        return query;
    }
}

