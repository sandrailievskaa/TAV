using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Test.Shared;
using Volo.Abp.Application.Dtos;

namespace Test.Incidents;

public class IncidentDto : AuditedEntityDto<Guid>
{
    public string IncidentId { get; set; } = null!;
    public IncidentType Type { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; } = null!;
    public string Location { get; set; } = null!;
    public Guid EmployeeId { get; set; }
    public string? EmployeeName { get; set; }
    public string? Department { get; set; }
    public string? Position { get; set; }
    public string Description { get; set; } = null!;
    public Severity Severity { get; set; }
    public IncidentStatus Status { get; set; }
    public string ReportedBy { get; set; } = null!;
    public string ReportedByPosition { get; set; } = null!;
    public TreatmentType TreatmentType { get; set; }
    public int LostWorkHours { get; set; }
    public int LostWorkDays { get; set; }
    public string RootCause { get; set; } = null!;
    public List<string> ContributingFactors { get; set; } = new();
    public decimal? MedicalCosts { get; set; }
    public decimal? EquipmentDamage { get; set; }
    public decimal? InvestigationCosts { get; set; }
    public decimal? CorrectiveActionCosts { get; set; }
    public decimal? LostProductivity { get; set; }
    public decimal? TotalBudgetImpact { get; set; }
    public List<CorrectiveActionDto> CorrectiveActions { get; set; } = new();
    public List<IncidentAttachmentDto> Attachments { get; set; } = new();
}

public class CorrectiveActionDto : CreationAuditedEntityDto<Guid>
{
    public Guid IncidentId { get; set; }
    public string Action { get; set; } = null!;
    public string Responsible { get; set; } = null!;
    public DateTime DueDate { get; set; }
    public ActionStatus Status { get; set; }
    public DateTime? CompletedDate { get; set; }
}

public class IncidentAttachmentDto : CreationAuditedEntityDto<Guid>
{
    public Guid IncidentId { get; set; }
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public string FileSize { get; set; } = null!;
    public string UploadedBy { get; set; } = null!;
}

public class CreateUpdateIncidentDto
{
    [Required]
    [StringLength(50)]
    public string IncidentId { get; set; } = null!;

    [Required]
    public IncidentType Type { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    [StringLength(10)]
    public string Time { get; set; } = null!;

    [Required]
    [StringLength(200)]
    public string Location { get; set; } = null!;

    [Required]
    public Guid EmployeeId { get; set; }

    [Required]
    [StringLength(2000)]
    public string Description { get; set; } = null!;

    [Required]
    public Severity Severity { get; set; }

    [Required]
    [StringLength(200)]
    public string ReportedBy { get; set; } = null!;

    [Required]
    [StringLength(200)]
    public string ReportedByPosition { get; set; } = null!;

    [Required]
    public TreatmentType TreatmentType { get; set; }

    public int LostWorkHours { get; set; }
    public int LostWorkDays { get; set; }

    [Required]
    [StringLength(1000)]
    public string RootCause { get; set; } = null!;

    public List<string>? ContributingFactors { get; set; }
    public decimal? MedicalCosts { get; set; }
    public decimal? EquipmentDamage { get; set; }
    public decimal? InvestigationCosts { get; set; }
    public decimal? CorrectiveActionCosts { get; set; }
    public decimal? LostProductivity { get; set; }
}

public class GetIncidentListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
    public Guid? EmployeeId { get; set; }
    public IncidentType? Type { get; set; }
    public Severity? Severity { get; set; }
    public IncidentStatus? Status { get; set; }
}

