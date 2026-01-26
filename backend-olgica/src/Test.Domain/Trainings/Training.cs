using System;
using Test.Employees;
using Test.Shared;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.Trainings;

public class Training : AuditedAggregateRoot<Guid>
{
    public string TrainingId { get; set; } = null!;
    public Guid EmployeeId { get; set; }
    public virtual Employee Employee { get; set; } = null!;
    public string TrainingName { get; set; } = null!;
    public TrainingType TrainingType { get; set; }
    public DateTime CompletionDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public int ValidityMonths { get; set; }
    public TrainingStatus Status { get; set; }
    public string Instructor { get; set; } = null!;
    public string? CertificateNumber { get; set; }
    public string? Notes { get; set; }
    public bool RequiresReadAndSign { get; set; }
    public string? InstructionsContent { get; set; }
    public DateTime? SignedDate { get; set; }
    public string? SignedBy { get; set; }

    protected Training()
    {
    }

    public Training(
        Guid id,
        string trainingId,
        Guid employeeId,
        string trainingName,
        TrainingType trainingType,
        DateTime completionDate,
        int validityMonths,
        string instructor) : base(id)
    {
        TrainingId = trainingId;
        EmployeeId = employeeId;
        TrainingName = trainingName;
        TrainingType = trainingType;
        CompletionDate = completionDate;
        ValidityMonths = validityMonths;
        Instructor = instructor;
        ExpiryDate = completionDate.AddMonths(validityMonths);
        Status = CalculateStatus(ExpiryDate);
    }

    private TrainingStatus CalculateStatus(DateTime? expiryDate)
    {
        if (expiryDate == null)
            return TrainingStatus.InProgress;
        
        var daysUntilExpiry = (expiryDate.Value - DateTime.UtcNow).Days;
        if (daysUntilExpiry < 0)
            return TrainingStatus.Expired;
        return TrainingStatus.Completed;
    }

    public int? DaysUntilExpiry => ExpiryDate.HasValue ? (ExpiryDate.Value - DateTime.UtcNow).Days : null;
}

