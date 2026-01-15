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
                Name = "Пример Ентитет 1",
                Description = "Ова е пример ентитет за POC",
                CreatedAt = DateTime.UtcNow
            },
            new ExampleEntity
            {
                Id = Guid.NewGuid(),
                Name = "Пример Ентитет 2",
                Description = "Втор пример ентитет",
                CreatedAt = DateTime.UtcNow
            }
        };

        context.ExampleEntities.AddRange(entities);
        context.SaveChanges();
    }
}
