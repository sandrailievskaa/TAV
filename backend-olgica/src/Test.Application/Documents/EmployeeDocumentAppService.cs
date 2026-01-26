using System;
using System.Linq;
using System.Threading.Tasks;
using Test.Employees;
using Test.Documents;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.Documents;

public class EmployeeDocumentAppService :
    CrudAppService<
        EmployeeDocument,
        EmployeeDocumentDto,
        Guid,
        GetEmployeeDocumentListDto,
        CreateUpdateEmployeeDocumentDto>,
    IEmployeeDocumentAppService
{
    public EmployeeDocumentAppService(IRepository<EmployeeDocument, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<EmployeeDocument>> CreateFilteredQueryAsync(GetEmployeeDocumentListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x =>
                x.DocumentName.Contains(input.Filter));
        }

        if (input.EmployeeId.HasValue)
        {
            query = query.Where(x => x.EmployeeId == input.EmployeeId.Value);
        }

        if (input.DocumentType.HasValue)
        {
            query = query.Where(x => x.DocumentType == input.DocumentType.Value);
        }

        return query;
    }

    protected override async Task<EmployeeDocumentDto> MapToGetOutputDtoAsync(EmployeeDocument entity)
    {
        var dto = await base.MapToGetOutputDtoAsync(entity);
        return dto;
    }
}

