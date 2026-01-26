using AutoMapper;
using Test.TestsDto;
using Test.Incidents;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Test;

public class TestApplicationAutoMapperProfile : Profile
{
    public TestApplicationAutoMapperProfile()
    {
        CreateMap<Test, TestDto>();
        CreateMap<CreateUpdateTestDto, Test>();
        
        // Incident mappings
        CreateMap<CorrectiveAction, CorrectiveActionDto>();
        CreateMap<IncidentAttachment, IncidentAttachmentDto>();
    }
}
