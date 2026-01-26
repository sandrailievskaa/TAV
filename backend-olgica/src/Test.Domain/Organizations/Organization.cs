using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.Organizations;

public class Organization : AuditedAggregateRoot<Guid>
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public bool IsActive { get; set; }

    protected Organization()
    {
    }

    public Organization(
        Guid id,
        string name) : base(id)
    {
        Name = name;
        IsActive = true;
    }
}

