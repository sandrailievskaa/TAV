using System;
using Test.PPE;
using Volo.Abp.Application.Services;

namespace Test.PPE;

public interface IEmployeePPEAppService :
    ICrudAppService<EmployeePPEDto, Guid, GetEmployeePPEListDto, CreateUpdateEmployeePPEDto>
{
}

