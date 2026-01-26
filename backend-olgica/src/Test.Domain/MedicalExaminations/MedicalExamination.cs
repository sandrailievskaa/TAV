using System;
using Test.Employees;
using Test.Shared;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.MedicalExaminations;

public class MedicalExamination : AuditedAggregateRoot<Guid>
{
    public string ExamId { get; set; } = null!;
    public Guid EmployeeId { get; set; }
    public virtual Employee Employee { get; set; } = null!;
    public ExamType ExamType { get; set; }
    public DateTime ExamDate { get; set; }
    public DateTime ValidUntil { get; set; }
    public int ValidityMonths { get; set; }
    public string Doctor { get; set; } = null!;
    public ExamResult Result { get; set; }
    public ExamStatus Status { get; set; }
    public string? Notes { get; set; }

    protected MedicalExamination()
    {
    }

    public MedicalExamination(
        Guid id,
        string examId,
        Guid employeeId,
        ExamType examType,
        DateTime examDate,
        DateTime validUntil,
        int validityMonths,
        string doctor,
        ExamResult result) : base(id)
    {
        ExamId = examId;
        EmployeeId = employeeId;
        ExamType = examType;
        ExamDate = examDate;
        ValidUntil = validUntil;
        ValidityMonths = validityMonths;
        Doctor = doctor;
        Result = result;
        Status = CalculateStatus(validUntil);
    }

    private ExamStatus CalculateStatus(DateTime validUntil)
    {
        var daysUntilExpiry = (validUntil - DateTime.UtcNow).Days;
        if (daysUntilExpiry < 0)
            return ExamStatus.Expired;
        if (daysUntilExpiry <= 30)
            return ExamStatus.ExpiringSoon;
        return ExamStatus.Valid;
    }

    public int DaysUntilExpiry => (ValidUntil - DateTime.UtcNow).Days;
}

