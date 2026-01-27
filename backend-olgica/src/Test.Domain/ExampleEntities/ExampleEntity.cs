using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Test.ExampleEntities;

public class ExampleEntity : AuditedAggregateRoot<Guid>
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    protected ExampleEntity()
    {
    }

    public ExampleEntity(
        Guid id,
        string name,
        string? description = null) : base(id)
    {
        Name = name;
        Description = description;
    }
}



