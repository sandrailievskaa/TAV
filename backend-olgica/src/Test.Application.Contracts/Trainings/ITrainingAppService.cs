using System;
using Test.Trainings;
using Volo.Abp.Application.Services;

namespace Test.Trainings;

public interface ITrainingAppService :
    ICrudAppService<TrainingDto, Guid, GetTrainingListDto, CreateUpdateTrainingDto>
{
}



