using TavSecuritySystem.Api.Models;
using TavSecuritySystem.Api.Models.Dtos;

namespace TavSecuritySystem.Api.Services;

public interface IExampleEntityService
{
    Task<IEnumerable<ExampleEntity>> GetAllAsync(int page, int pageSize);
    Task<ExampleEntity?> GetByIdAsync(Guid id);
    Task<ExampleEntity> CreateAsync(CreateExampleEntityDto dto);
    Task<ExampleEntity?> UpdateAsync(Guid id, UpdateExampleEntityDto dto);
    Task<bool> DeleteAsync(Guid id);
    Task<int> GetTotalCountAsync();
}
