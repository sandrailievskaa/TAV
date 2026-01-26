using System;
using System.ComponentModel.DataAnnotations;
using Test.Shared;
using Volo.Abp.Application.Dtos;

namespace Test.Documents;

public class EmployeeDocumentDto : AuditedEntityDto<Guid>
{
    public Guid EmployeeId { get; set; }
    public string? EmployeeName { get; set; }
    public string DocumentName { get; set; } = null!;
    public DocumentType DocumentType { get; set; }
    public string FileSize { get; set; } = null!;
    public string? FilePath { get; set; }
}

public class CreateUpdateEmployeeDocumentDto
{
    [Required]
    public Guid EmployeeId { get; set; }

    [Required]
    [StringLength(200)]
    public string DocumentName { get; set; } = null!;

    [Required]
    public DocumentType DocumentType { get; set; }

    [Required]
    [StringLength(50)]
    public string FileSize { get; set; } = null!;

    public string? FilePath { get; set; }
}

public class GetEmployeeDocumentListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public Guid? EmployeeId { get; set; }
    public DocumentType? DocumentType { get; set; }
}

