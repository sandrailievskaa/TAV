using System;
using System.ComponentModel.DataAnnotations;
using Test.Shared;
using Volo.Abp.Application.Dtos;

namespace Test.Positions;

public class PositionDto : AuditedEntityDto<Guid>
{
    public string PositionName { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string? Description { get; set; }
    public RiskLevel RiskLevel { get; set; }
    public bool IsActive { get; set; }
}

public class CreateUpdatePositionDto
{
    [Required]
    [StringLength(200)]
    public string PositionName { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string Department { get; set; } = null!;

    [StringLength(1000)]
    public string? Description { get; set; }

    public RiskLevel RiskLevel { get; set; }
    public bool IsActive { get; set; }
}

public class GetPositionListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public string? Department { get; set; }
    public RiskLevel? RiskLevel { get; set; }
    public bool? IsActive { get; set; }
}

