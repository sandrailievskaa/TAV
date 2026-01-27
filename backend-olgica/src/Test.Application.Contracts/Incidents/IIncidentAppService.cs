using System;
using Test.Incidents;
using Volo.Abp.Application.Services;

namespace Test.Incidents;

public interface IIncidentAppService :
    ICrudAppService<IncidentDto, Guid, GetIncidentListDto, CreateUpdateIncidentDto>
{
}



