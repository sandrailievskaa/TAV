using System;
using Test.Organizations;
using Volo.Abp.Application.Services;

namespace Test.Organizations;

public interface IOrganizationAppService :
    ICrudAppService<OrganizationDto, Guid, GetOrganizationListDto, CreateUpdateOrganizationDto>
{
}

