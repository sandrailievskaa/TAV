using System;
using System.Linq;
using System.Threading.Tasks;
using Test.Employees;
using Test.MedicalExaminations;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.MedicalExaminations;

public class MedicalExaminationAppService :
    CrudAppService<
        MedicalExamination,
        MedicalExaminationDto,
        Guid,
        GetMedicalExaminationListDto,
        CreateUpdateMedicalExaminationDto>,
    IMedicalExaminationAppService
{
    public MedicalExaminationAppService(
        IRepository<MedicalExamination, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<MedicalExamination>> CreateFilteredQueryAsync(GetMedicalExaminationListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x =>
                x.ExamId.Contains(input.Filter) ||
                x.Doctor.Contains(input.Filter));
        }

        if (input.EmployeeId.HasValue)
        {
            query = query.Where(x => x.EmployeeId == input.EmployeeId.Value);
        }

        if (input.ExamType.HasValue)
        {
            query = query.Where(x => x.ExamType == input.ExamType.Value);
        }

        if (input.Result.HasValue)
        {
            query = query.Where(x => x.Result == input.Result.Value);
        }

        if (input.Status.HasValue)
        {
            query = query.Where(x => x.Status == input.Status.Value);
        }

        return query;
    }

    protected override async Task<MedicalExaminationDto> MapToGetOutputDtoAsync(MedicalExamination entity)
    {
        var dto = await base.MapToGetOutputDtoAsync(entity);
        dto.DaysUntilExpiry = entity.DaysUntilExpiry;
        return dto;
    }
}

