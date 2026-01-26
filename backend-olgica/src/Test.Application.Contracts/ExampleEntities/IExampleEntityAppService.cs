using System;
using Test.ExampleEntities;
using Volo.Abp.Application.Services;

namespace Test.ExampleEntities;

public interface IExampleEntityAppService :
    ICrudAppService<ExampleEntityDto, Guid, GetExampleEntityListDto, CreateUpdateExampleEntityDto>
{
}

