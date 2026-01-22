using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Test.TestsDto
{
    public class TestDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; } = null!;
        public int Age { get; set; }
    }
}
