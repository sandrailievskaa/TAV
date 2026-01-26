using System;
using System.ComponentModel.DataAnnotations;
using Test.Shared;
using Volo.Abp.Application.Dtos;

namespace Test.Trainings;

public class TrainingDto : AuditedEntityDto<Guid>
{
    public string TrainingId { get; set; } = null!;
    public Guid EmployeeId { get; set; }
    public string? EmployeeName { get; set; }
    public string? Department { get; set; }
    public string? Position { get; set; }
    public string TrainingName { get; set; } = null!;
    public TrainingType TrainingType { get; set; }
    public DateTime CompletionDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public int ValidityMonths { get; set; }
    public TrainingStatus Status { get; set; }
    public string Instructor { get; set; } = null!;
    public string? CertificateNumber { get; set; }
    public int? DaysUntilExpiry { get; set; }
    public string? Notes { get; set; }
    public bool RequiresReadAndSign { get; set; }
    public string? InstructionsContent { get; set; }
    public DateTime? SignedDate { get; set; }
    public string? SignedBy { get; set; }
}

public class CreateUpdateTrainingDto
{
    [Required]
    [StringLength(50)]
    public string TrainingId { get; set; } = null!;

    [Required]
    public Guid EmployeeId { get; set; }

    [Required]
    [StringLength(200)]
    public string TrainingName { get; set; } = null!;

    [Required]
    public TrainingType TrainingType { get; set; }

    [Required]
    public DateTime CompletionDate { get; set; }

    [Required]
    [Range(1, 120)]
    public int ValidityMonths { get; set; }

    [Required]
    [StringLength(200)]
    public string Instructor { get; set; } = null!;

    [StringLength(100)]
    public string? CertificateNumber { get; set; }

    public string? Notes { get; set; }
    public bool RequiresReadAndSign { get; set; }
    public string? InstructionsContent { get; set; }
}

public class GetTrainingListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public Guid? EmployeeId { get; set; }
    public TrainingType? TrainingType { get; set; }
    public TrainingStatus? Status { get; set; }
}

