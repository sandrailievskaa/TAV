using System;
using System.Linq;
using System.Threading.Tasks;
using Test.Employees;
using Test.Trainings;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Test.Trainings;

public class TrainingAppService :
    CrudAppService<
        Training,
        TrainingDto,
        Guid,
        GetTrainingListDto,
        CreateUpdateTrainingDto>,
    ITrainingAppService
{
    public TrainingAppService(IRepository<Training, Guid> repository)
        : base(repository)
    {
    }

    protected override async Task<IQueryable<Training>> CreateFilteredQueryAsync(GetTrainingListDto input)
    {
        var query = await base.CreateFilteredQueryAsync(input);

        if (!string.IsNullOrWhiteSpace(input.Filter))
        {
            query = query.Where(x =>
                x.TrainingId.Contains(input.Filter) ||
                x.TrainingName.Contains(input.Filter) ||
                x.Instructor.Contains(input.Filter));
        }

        if (input.EmployeeId.HasValue)
        {
            query = query.Where(x => x.EmployeeId == input.EmployeeId.Value);
        }

        if (input.TrainingType.HasValue)
        {
            query = query.Where(x => x.TrainingType == input.TrainingType.Value);
        }

        if (input.Status.HasValue)
        {
            query = query.Where(x => x.Status == input.Status.Value);
        }

        return query;
    }

    protected override async Task<TrainingDto> MapToGetOutputDtoAsync(Training entity)
    {
        var dto = await base.MapToGetOutputDtoAsync(entity);
        dto.DaysUntilExpiry = entity.DaysUntilExpiry;
        return dto;
    }
}

