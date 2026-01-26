using System;
using Test.Shared;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.Positions;

public class Position : AuditedAggregateRoot<Guid>
{
    public string PositionName { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string? Description { get; set; }
    public RiskLevel RiskLevel { get; set; }
    public bool IsActive { get; set; }

    protected Position()
    {
    }

    public Position(
        Guid id,
        string positionName,
        string department) : base(id)
    {
        PositionName = positionName;
        Department = department;
        RiskLevel = RiskLevel.Medium;
        IsActive = true;
    }
}

