using System;
using Test.Employees;
using Volo.Abp.Application.Services;

namespace Test.Employees;

public interface IEmployeeAppService :
    ICrudAppService<EmployeeDto, Guid, GetEmployeeListDto, CreateUpdateEmployeeDto>
{
}



