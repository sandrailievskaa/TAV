using System;
using Test.Positions;
using Volo.Abp.Application.Services;

namespace Test.Positions;

public interface IPositionAppService :
    ICrudAppService<PositionDto, Guid, GetPositionListDto, CreateUpdatePositionDto>
{
}

