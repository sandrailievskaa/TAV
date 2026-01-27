using System;
using Test.MedicalExaminations;
using Volo.Abp.Application.Services;

namespace Test.MedicalExaminations;

public interface IMedicalExaminationAppService :
    ICrudAppService<MedicalExaminationDto, Guid, GetMedicalExaminationListDto, CreateUpdateMedicalExaminationDto>
{
}



