using System;
using Test.TestsDto;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test
{
    public class TestAppServiceCrud
     : CrudAppService<
         Test,                
         TestDto,             
         Guid,                
         GetTestListDto,      
         CreateUpdateTestDto  
       >,
       ITestAppService
    {
        public TestAppServiceCrud(IRepository<Test, Guid> repository)
            : base(repository)
        {
        }
    }
}
