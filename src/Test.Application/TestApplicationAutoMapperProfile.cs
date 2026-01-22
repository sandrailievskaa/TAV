using AutoMapper;
using Test.TestsDto;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Test;

public class TestApplicationAutoMapperProfile : Profile
{
    public TestApplicationAutoMapperProfile()
    {
        CreateMap<Test, TestDto>();
        CreateMap<CreateUpdateTestDto, Test>();
    }
}
