using System;
using System.Linq;
using System.Threading.Tasks;
using Test.Organizations;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.Organizations;

public class OrganizationAppService :
    CrudAppService<
        Organization,
        OrganizationDto,
        Guid,
        GetOrganizationListDto,
        CreateUpdateOrganizationDto>,
    IOrganizationAppService
{
    public OrganizationAppService(IRepository<Organization, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<Organization>> CreateFilteredQueryAsync(GetOrganizationListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x =>
                x.Name.Contains(input.Filter) ||
                (x.Description != null && x.Description.Contains(input.Filter)) ||
                (x.Email != null && x.Email.Contains(input.Filter)));
        }

        if (input.IsActive.HasValue)
        {
            query = query.Where(x => x.IsActive == input.IsActive.Value);
        }

        return query;
    }
}

