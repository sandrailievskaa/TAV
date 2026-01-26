using System;
using Test.Documents;
using Volo.Abp.Application.Services;

namespace Test.Documents;

public interface IEmployeeDocumentAppService :
    ICrudAppService<EmployeeDocumentDto, Guid, GetEmployeeDocumentListDto, CreateUpdateEmployeeDocumentDto>
{
}

