using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Test.TestsDto
{
    public class GetTestListDto : PagedAndSortedResultRequestDto
    {
        public string? Filter { get; set; }
    }
}
