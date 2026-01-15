using TavSecuritySystem.Api.Models;

namespace TavSecuritySystem.Api.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext context)
    {
        if (context.ExampleEntities.Any())
        {
            return;
        }

        var entities = new List<ExampleEntity>
        {
            new ExampleEntity
            {
                Id = Guid.NewGuid(),
                Name = "Fire Safety Inspection - Building A",
                Description = "Monthly fire safety inspection. Checked fire extinguishers and emergency exits.",
                CreatedAt = DateTime.UtcNow.AddDays(-5)
            },
            new ExampleEntity
            {
                Id = Guid.NewGuid(),
                Name = "PPE Compliance Check - Warehouse",
                Description = "Quarterly PPE compliance verification. Verified hard hats and safety equipment usage.",
                CreatedAt = DateTime.UtcNow.AddDays(-12)
            },
            new ExampleEntity
            {
                Id = Guid.NewGuid(),
                Name = "Electrical Safety Audit",
                Description = "Annual electrical safety audit. Inspected electrical panels and grounding systems.",
                CreatedAt = DateTime.UtcNow.AddDays(-30)
            }
        };

        context.ExampleEntities.AddRange(entities);
        context.SaveChanges();
    }
}
