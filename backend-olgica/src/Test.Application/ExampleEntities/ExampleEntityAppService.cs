using System;
using Test.ExampleEntities;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.ExampleEntities;

public class ExampleEntityAppService :
    CrudAppService<
        ExampleEntity,
        ExampleEntityDto,
        Guid,
        GetExampleEntityListDto,
        CreateUpdateExampleEntityDto>,
    IExampleEntityAppService
{
    public ExampleEntityAppService(IRepository<ExampleEntity, Guid> repository)
        : base(repository)
    {
    }
}



