using System;
using System.Linq;
using System.Threading.Tasks;
using Test.TestsDto;
using Volo.Abp.Domain.Repositories;

namespace Test;

public class TestCrudAppService
    : Volo.Abp.Application.Services.CrudAppService<
        Test,           // Entity (rename to your entity class name)
        TestDto,              // Get DTO
        Guid,                 // Primary key
        GetTestListDto,       // List input
        CreateUpdateTestDto   // Create/Update input
      >
{
    public TestCrudAppService(IRepository<Test, Guid> repository)
        : base(repository)
    {
        // Optional: set localization resource like your base class does
        // (If you want that automatically, see the "inherit base class" note below)
    }

    protected override async Task<IQueryable<Test>> CreateFilteredQueryAsync(GetTestListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x => x.Name.Contains(input.Filter));
        }

        return query;
    }
}
