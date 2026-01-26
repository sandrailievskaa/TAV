using System;
using Test.Employees;
using Test.Shared;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.PPE;

public class EmployeePPE : AuditedAggregateRoot<Guid>
{
    public Guid EmployeeId { get; set; }
    public virtual Employee Employee { get; set; } = null!;
    public string PPEItem { get; set; } = null!;
    public string Type { get; set; } = null!;
    public DateTime IssueDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public PPEStatus Status { get; set; }

    protected EmployeePPE()
    {
    }

    public EmployeePPE(
        Guid id,
        Guid employeeId,
        string ppeItem,
        string type,
        DateTime issueDate,
        DateTime expiryDate) : base(id)
    {
        EmployeeId = employeeId;
        PPEItem = ppeItem;
        Type = type;
        IssueDate = issueDate;
        ExpiryDate = expiryDate;
        Status = CalculateStatus(expiryDate);
    }

    private PPEStatus CalculateStatus(DateTime expiryDate)
    {
        var daysUntilExpiry = (expiryDate - DateTime.UtcNow).Days;
        if (daysUntilExpiry < 0)
            return PPEStatus.Expired;
        if (daysUntilExpiry <= 30)
            return PPEStatus.ExpiringSoon;
        return PPEStatus.Valid;
    }

    public int DaysUntilExpiry => (ExpiryDate - DateTime.UtcNow).Days;
}

