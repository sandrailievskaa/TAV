using Microsoft.EntityFrameworkCore;
using TavSecuritySystem.Api.Models;

namespace TavSecuritySystem.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<ExampleEntity> ExampleEntities { get; set; }
}
