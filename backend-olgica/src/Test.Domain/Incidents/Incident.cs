using System;
using System.Collections.Generic;
using Test.Employees;
using Test.Shared;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.Incidents;

public class Incident : AuditedAggregateRoot<Guid>
{
    public string IncidentId { get; set; } = null!;
    public IncidentType Type { get; set; }
    public DateTime Date { get; set; }
    public string Time { get; set; } = null!;
    public string Location { get; set; } = null!;
    public Guid EmployeeId { get; set; }
    public virtual Employee Employee { get; set; } = null!;
    public string Description { get; set; } = null!;
    public Severity Severity { get; set; }
    public IncidentStatus Status { get; set; }
    public string ReportedBy { get; set; } = null!;
    public string ReportedByPosition { get; set; } = null!;
    public TreatmentType TreatmentType { get; set; }
    public int LostWorkHours { get; set; }
    public int LostWorkDays { get; set; }
    public string RootCause { get; set; } = null!;
    public string? ContributingFactors { get; set; } // JSON array stored as string
    public decimal? MedicalCosts { get; set; }
    public decimal? EquipmentDamage { get; set; }
    public decimal? InvestigationCosts { get; set; }
    public decimal? CorrectiveActionCosts { get; set; }
    public decimal? LostProductivity { get; set; }

    // Navigation properties
    public virtual ICollection<CorrectiveAction> CorrectiveActions { get; set; }
    public virtual ICollection<IncidentAttachment> Attachments { get; set; }

    protected Incident()
    {
        CorrectiveActions = new List<CorrectiveAction>();
        Attachments = new List<IncidentAttachment>();
    }

    public Incident(
        Guid id,
        string incidentId,
        IncidentType type,
        DateTime date,
        string time,
        string location,
        Guid employeeId,
        string description,
        Severity severity,
        string reportedBy,
        string reportedByPosition,
        TreatmentType treatmentType,
        string rootCause) : base(id)
    {
        IncidentId = incidentId;
        Type = type;
        Date = date;
        Time = time;
        Location = location;
        EmployeeId = employeeId;
        Description = description;
        Severity = severity;
        ReportedBy = reportedBy;
        ReportedByPosition = reportedByPosition;
        TreatmentType = treatmentType;
        RootCause = rootCause;
        Status = IncidentStatus.Reported;
        
        CorrectiveActions = new List<CorrectiveAction>();
        Attachments = new List<IncidentAttachment>();
    }

    public decimal? TotalBudgetImpact => 
        (MedicalCosts ?? 0) + 
        (EquipmentDamage ?? 0) + 
        (InvestigationCosts ?? 0) + 
        (CorrectiveActionCosts ?? 0) + 
        (LostProductivity ?? 0);
}

public class CorrectiveAction : CreationAuditedEntity<Guid>
{
    public Guid IncidentId { get; set; }
    public virtual Incident Incident { get; set; } = null!;
    public string Action { get; set; } = null!;
    public string Responsible { get; set; } = null!;
    public DateTime DueDate { get; set; }
    public ActionStatus Status { get; set; }
    public DateTime? CompletedDate { get; set; }

    protected CorrectiveAction()
    {
    }

    public CorrectiveAction(
        Guid id,
        Guid incidentId,
        string action,
        string responsible,
        DateTime dueDate) : base(id)
    {
        IncidentId = incidentId;
        Action = action;
        Responsible = responsible;
        DueDate = dueDate;
        Status = ActionStatus.Pending;
    }
}

public class IncidentAttachment : CreationAuditedEntity<Guid>
{
    public Guid IncidentId { get; set; }
    public virtual Incident Incident { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Type { get; set; } = null!;
    public string FileSize { get; set; } = null!;
    public string UploadedBy { get; set; } = null!;

    protected IncidentAttachment()
    {
    }

    public IncidentAttachment(
        Guid id,
        Guid incidentId,
        string name,
        string type,
        string fileSize,
        string uploadedBy) : base(id)
    {
        IncidentId = incidentId;
        Name = name;
        Type = type;
        FileSize = fileSize;
        UploadedBy = uploadedBy;
    }
}

