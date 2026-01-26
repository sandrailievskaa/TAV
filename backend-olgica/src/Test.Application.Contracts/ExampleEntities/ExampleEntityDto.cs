using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace Test.ExampleEntities;

public class ExampleEntityDto : AuditedEntityDto<Guid>
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
}

public class CreateUpdateExampleEntityDto
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = null!;

    [StringLength(1000)]
    public string? Description { get; set; }
}

public class GetExampleEntityListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
}

