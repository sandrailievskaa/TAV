using System;
using System.ComponentModel.DataAnnotations;
using Test.Shared;
using Volo.Abp.Application.Dtos;

namespace Test.PPE;

public class EmployeePPEDto : AuditedEntityDto<Guid>
{
    public Guid EmployeeId { get; set; }
    public string? EmployeeName { get; set; }
    public string PPEItem { get; set; } = null!;
    public string Type { get; set; } = null!;
    public DateTime IssueDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public PPEStatus Status { get; set; }
    public int DaysUntilExpiry { get; set; }
}

public class CreateUpdateEmployeePPEDto
{
    [Required]
    public Guid EmployeeId { get; set; }

    [Required]
    [StringLength(200)]
    public string PPEItem { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string Type { get; set; } = null!;

    [Required]
    public DateTime IssueDate { get; set; }

    [Required]
    public DateTime ExpiryDate { get; set; }
}

public class GetEmployeePPEListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public Guid? EmployeeId { get; set; }
    public PPEStatus? Status { get; set; }
}

