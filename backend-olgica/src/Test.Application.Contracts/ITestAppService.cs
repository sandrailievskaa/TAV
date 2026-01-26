using System;
using Test.TestsDto;
using Volo.Abp.Application.Services;

namespace Test;

public interface ITestAppService :
    ICrudAppService<TestDto, Guid, GetTestListDto, CreateUpdateTestDto>
{
}
