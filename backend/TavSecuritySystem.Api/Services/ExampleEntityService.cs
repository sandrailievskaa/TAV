using Microsoft.EntityFrameworkCore;
using TavSecuritySystem.Api.Data;
using TavSecuritySystem.Api.Models;
using TavSecuritySystem.Api.Models.Dtos;

namespace TavSecuritySystem.Api.Services;

public class ExampleEntityService : IExampleEntityService
{
    private readonly AppDbContext _context;

    public ExampleEntityService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ExampleEntity>> GetAllAsync(int page, int pageSize)
    {
        return await _context.ExampleEntities
            .OrderBy(e => e.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<ExampleEntity?> GetByIdAsync(Guid id)
    {
        return await _context.ExampleEntities.FindAsync(id);
    }

    public async Task<ExampleEntity> CreateAsync(CreateExampleEntityDto dto)
    {
        var entity = new ExampleEntity
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow
        };

        _context.ExampleEntities.Add(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task<ExampleEntity?> UpdateAsync(Guid id, UpdateExampleEntityDto dto)
    {
        var entity = await _context.ExampleEntities.FindAsync(id);
        if (entity == null)
            return null;

        if (!string.IsNullOrEmpty(dto.Name))
            entity.Name = dto.Name;

        if (dto.Description != null)
            entity.Description = dto.Description;

        entity.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _context.ExampleEntities.FindAsync(id);
        if (entity == null)
            return false;

        _context.ExampleEntities.Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<int> GetTotalCountAsync()
    {
        return await _context.ExampleEntities.CountAsync();
    }
}
