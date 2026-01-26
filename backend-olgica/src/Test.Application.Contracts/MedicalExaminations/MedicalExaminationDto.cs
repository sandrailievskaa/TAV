using System;
using System.ComponentModel.DataAnnotations;
using Test.Shared;
using Volo.Abp.Application.Dtos;

namespace Test.MedicalExaminations;

public class MedicalExaminationDto : AuditedEntityDto<Guid>
{
    public string ExamId { get; set; } = null!;
    public Guid EmployeeId { get; set; }
    public string? EmployeeName { get; set; }
    public string? Department { get; set; }
    public string? Position { get; set; }
    public ExamType ExamType { get; set; }
    public DateTime ExamDate { get; set; }
    public DateTime ValidUntil { get; set; }
    public int ValidityMonths { get; set; }
    public string Doctor { get; set; } = null!;
    public ExamResult Result { get; set; }
    public ExamStatus Status { get; set; }
    public int DaysUntilExpiry { get; set; }
    public string? Notes { get; set; }
}

public class CreateUpdateMedicalExaminationDto
{
    [Required]
    [StringLength(50)]
    public string ExamId { get; set; } = null!;

    [Required]
    public Guid EmployeeId { get; set; }

    [Required]
    public ExamType ExamType { get; set; }

    [Required]
    public DateTime ExamDate { get; set; }

    [Required]
    public DateTime ValidUntil { get; set; }

    [Required]
    [Range(1, 120)]
    public int ValidityMonths { get; set; }

    [Required]
    [StringLength(200)]
    public string Doctor { get; set; } = null!;

    [Required]
    public ExamResult Result { get; set; }

    public string? Notes { get; set; }
}

public class GetMedicalExaminationListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public Guid? EmployeeId { get; set; }
    public ExamType? ExamType { get; set; }
    public ExamResult? Result { get; set; }
    public ExamStatus? Status { get; set; }
}

